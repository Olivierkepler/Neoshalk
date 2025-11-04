import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

function normalizeCase(text: string): string {
  // Skip if text is already mixed case (contains lowercase)
  if (/[a-z]/.test(text)) return text;

  // Convert to sentence case — keeps acronyms & formatting intact
  return text
    .toLowerCase()
    .replace(/(^\w{1}|\.\s*\w{1}|\!\s*\w{1}|\?\s*\w{1})/g, (match) =>
      match.toUpperCase()
    );
}

export async function POST(req: Request) {
  try {
    const { message, stream } = await req.json();

    if (!stream) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      });

      let reply = completion.choices[0].message?.content || "No response.";
      reply = normalizeCase(reply);
      return NextResponse.json({ reply });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      messages: [{ role: "user", content: message }],
    });

    const encoder = new TextEncoder();

    const streamResponse = new ReadableStream({
      async start(controller) {
        let streamedText = "";
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              streamedText += content;
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(encoder.encode("\n[Error streaming response]\n"));
        } finally {
          controller.close();

          // 🧠 Normalize casing after full stream (for long texts)
          streamedText = normalizeCase(streamedText);
        }
      },
    });

    return new Response(streamResponse, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Error generating response." },
      { status: 500 }
    );
  }
}
