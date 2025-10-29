"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewFlashcard() {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ front, back }),
    });
    router.push("/dashboard/flashcards");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 space-y-4">
      <h1 className="text-2xl font-bold">New Flashcard</h1>
      <Input
        placeholder="Front"
        value={front}
        onChange={(e) => setFront(e.target.value)}
        required
      />
      <Input
        placeholder="Back"
        value={back}
        onChange={(e) => setBack(e.target.value)}
        required
      />
      <Button type="submit">Create</Button>
    </form>
  );
}
