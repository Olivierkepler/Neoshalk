import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { AuthOptions, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";      

// 🧠 Get all flashcards for the logged-in user
export async function GET() {
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const cards = await prisma.flashcard.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(cards);
}

// 🧠 Create a new flashcard for the logged-in user
export async function POST(req: Request) {
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { front, back } = await req.json();

  if (!front || !back) {
    return NextResponse.json({ error: "Both sides are required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const card = await prisma.flashcard.create({
    data: {
      front,
      back,
      userId: user.id, // ✅ Connect flashcard to logged-in user
    },
  });

  return NextResponse.json(card, { status: 201 });
}
