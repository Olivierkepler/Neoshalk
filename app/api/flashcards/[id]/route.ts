import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AuthOptions, getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";  // ← Changed import path


// 🧠 Update a flashcard (with ownership check)
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { front, back } = await req.json();

  // ✅ Get the logged-in user session
  const session = await getServerSession(authOptions as AuthOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ Get the current user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // ✅ Check ownership before updating
  const flashcard = await prisma.flashcard.findUnique({
    where: { id: Number(id) },
  });

  if (!flashcard || flashcard.userId !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // ✅ Proceed with update
  const updated = await prisma.flashcard.update({
    where: { id: Number(id) },
    data: { front, back },
  });

  return NextResponse.json(updated);
}

// 🧹 Delete a flashcard (with ownership check)
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  // ✅ Get the logged-in user session
  const session = await getServerSession(authOptions as AuthOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ✅ Get the current user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // ✅ Check ownership before deleting
  const flashcard = await prisma.flashcard.findUnique({
    where: { id: Number(id) },
  });

  if (!flashcard || flashcard.userId !== user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  // ✅ Proceed with deletion
  const deleted = await prisma.flashcard.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(deleted);
}