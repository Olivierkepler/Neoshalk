"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FlashcardAnalytics from "@/app/dashboard/FlashcardAnalytics"; 

type Flashcard = {
  id: number;
  front: string;
  back: string;
  createdAt?: string;
};

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [editing, setEditing] = useState<{ id: number; field: "front" | "back" } | null>(null);
  const [tempValue, setTempValue] = useState("");

  // Fetch flashcards
  const fetchCards = async () => {
    try {
      const res = await fetch("/api/flashcards");
      const data = await res.json();
      setCards(data);
    } catch (error) {
      console.error("Failed to fetch flashcards:", error);
    }
  };

  // Delete a card
  const handleDelete = async (id: number) => {
    await fetch(`/api/flashcards/${id}`, { method: "DELETE" });
    fetchCards();
  };

  // Save inline edit
  const handleSave = async (id: number, field: "front" | "back") => {
    try {
      await fetch(`/api/flashcards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: tempValue }),
      });
      setEditing(null);
      fetchCards();
    } catch (error) {
      console.error("Failed to update flashcard:", error);
    }
  };

  // Start editing
  const startEditing = (id: number, field: "front" | "back", currentValue: string) => {
    setEditing({ id, field });
    setTempValue(currentValue);
  };

  // Key actions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number, field: "front" | "back") => {
    if (e.key === "Enter") handleSave(id, field);
    if (e.key === "Escape") setEditing(null);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Flashcards Dashboard</h1>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/flashcards/study">
            <Button variant="outline">Study Mode</Button>
          </Link>
          <Link href="/dashboard/flashcards/new">
            <Button>Add New</Button>
          </Link>
        </div>
      </div>

      {/* 📈 Progress Analytics */}
      <FlashcardAnalytics cards={cards} />

      {/* Excel-style Table */}
      <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-slate-300 dark:border-slate-700 text-sm uppercase font-semibold">
              <th className="px-4 py-3 w-16 text-center">ID</th>
              <th className="px-4 py-3 w-1/3">Front</th>
              <th className="px-4 py-3 w-1/3">Back</th>
              <th className="px-4 py-3 w-1/4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-slate-500 dark:text-slate-400 italic">
                  No flashcards yet — add one to get started.
                </td>
              </tr>
            ) : (
              cards.map((card) => (
                <tr
                  key={card.id}
                  className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 py-3 text-center font-medium text-slate-700 dark:text-slate-300">{card.id}</td>
                  <td
                    className="px-4 py-3 text-slate-800 dark:text-slate-100 cursor-pointer"
                    onClick={() => startEditing(card.id, "front", card.front)}
                  >
                    {editing?.id === card.id && editing.field === "front" ? (
                      <input
                        type="text"
                        className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-blue-400 rounded px-2 py-1 outline-none"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onBlur={() => handleSave(card.id, "front")}
                        onKeyDown={(e) => handleKeyDown(e, card.id, "front")}
                        autoFocus
                      />
                    ) : (
                      card.front
                    )}
                  </td>
                  <td
                    className="px-4 py-3 text-slate-700 dark:text-slate-300 cursor-pointer"
                    onClick={() => startEditing(card.id, "back", card.back)}
                  >
                    {editing?.id === card.id && editing.field === "back" ? (
                      <input
                        type="text"
                        className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-blue-400 rounded px-2 py-1 outline-none"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onBlur={() => handleSave(card.id, "back")}
                        onKeyDown={(e) => handleKeyDown(e, card.id, "back")}
                        autoFocus
                      />
                    ) : (
                      card.back
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <Link href={`/dashboard/flashcards/${card.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(card.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
