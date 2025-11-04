import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize the OpenAI client (same as your other file)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    // 1. Get the raw text from the request body
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided." }, { status: 400 });
    }

    // 2. This is the new "brain" prompt
    const prompt = `
You are an expert academic assistant and note-taker.
A user has provided raw, unformatted text from a PDF.
Your task is to organize this text into a clear, concise, and easy-to-study note.

- Use bullet points (-) for lists or key facts. but dont use the on the top title.
- Keep the language professional and academic.
- Do NOT add any preamble or conversation (e.g., "Here are your notes:").
- Just return the clean, organized notes.

Raw Text:
"""
${text}
"""
`;

    // 3. Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using the same model as your other file
      messages: [{ role: "user", content: prompt }],
      // We are NOT asking for JSON, so we remove the 'response_format' field.
      // We want plain markdown text.
    });

    // 4. Get the resulting markdown text
    const organizedMarkdown = completion.choices[0].message?.content;

    // 5. Send the organized text back to the client
    // We send it as { text: "..." } for consistency with the /api/parse-pdf route.
    return NextResponse.json({ text: organizedMarkdown });
    
  } catch (error) {
    console.error("[OPENAI_ORGANIZE_ERROR]", error);
    // Add error handling
    return NextResponse.json(
      { error: "Failed to organize note." },
      { status: 500 }
    );
  }
}
