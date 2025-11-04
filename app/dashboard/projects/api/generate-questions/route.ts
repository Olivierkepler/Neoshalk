import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { text } = await req.json();

  const prompt = `
You are an intelligent tutor. 
Create 4 fill-in-the-blank questions from the following text. 
Return them as a JSON array of objects with { id, text, answer } fields. 
Each question should replace one key term or phrase with "_____" and provide its correct answer.

Text: """${text}"""
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0].message?.content;
  const parsed = JSON.parse(content || "{}");

  return NextResponse.json(parsed);
}
