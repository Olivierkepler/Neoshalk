// app/dashboard/projects/api/parse-pdf/route.ts
import { NextResponse } from "next/server";

// FIX: Import the 'PDFParse' class, as shown in the v2 documentation
import { PDFParse } from "pdf-parse";

export async function POST(request: Request) {
  // Define parser outside the try block to access it in 'finally'
  let parser: PDFParse | null = null;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF." },
        { status: 400 }
      );
    }

    // 1. Convert the file to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Use the new v2 'PDFParse' class
    // We pass the buffer to the constructor
    parser = new PDFParse({ data: buffer });

    // 3. Get the text result
    const result = await parser.getText();

    // 4. Return the extracted text
    // The v2 'getText' method returns an object with a 'text' property.
    return NextResponse.json({
      text: result.text,
    });

  } catch (error) {
    console.error("[PDF_PARSE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to parse PDF." },
      { status: 500 }
    );
  } finally {
    // 5. ALWAYS destroy the parser to free up memory
    // (As shown in the official documentation)
    if (parser) {
      await parser.destroy();
    }
  }
}

