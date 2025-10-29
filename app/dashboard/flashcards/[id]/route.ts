import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ shared Prisma client

// 🟢 GET — Fetch single flashcard by ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const card = await prisma.flashcard.findUnique({ where: { id } });

    if (!card) {
      return NextResponse.json({ error: "Flashcard not found" }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error("GET /flashcards/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch flashcard" }, { status: 500 });
  }
}

// 🟡 PUT — Replace both front and back fields
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const { front, back } = await req.json();

    const updated = await prisma.flashcard.update({
      where: { id },
      data: { front, back },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /flashcards/[id] error:", error);
    return NextResponse.json({ error: "Failed to update flashcard" }, { status: 500 });
  }
}

// 🟠 PATCH — Update one or both fields (inline editing support)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const data = await req.json(); // could be { front } or { back }

    const updated = await prisma.flashcard.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /flashcards/[id] error:", error);
    return NextResponse.json({ error: "Failed to patch flashcard" }, { status: 500 });
  }
}

// 🔴 DELETE — Remove flashcard by ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    await prisma.flashcard.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /flashcards/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete flashcard" }, { status: 500 });
  }
}
