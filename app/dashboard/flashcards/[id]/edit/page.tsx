"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditFlashcard() {
  const { id } = useParams();
  const router = useRouter();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch single flashcard by ID
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(`/api/flashcards/${id}`);
        if (!res.ok) throw new Error("Failed to fetch flashcard");
        const data = await res.json();
        setFront(data.front || "");
        setBack(data.back || "");
      } catch (error) {
        console.error("Error fetching card:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCard();
  }, [id]);

  // Update flashcard
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/flashcards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ front, back }),
      });

      if (!res.ok) throw new Error("Failed to update flashcard");

      router.push("/dashboard/flashcards");
    } catch (error) {
      console.error("Error updating flashcard:", error);
      alert("Failed to update flashcard. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-slate-500 dark:text-slate-300">
        Loading flashcard...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-md mx-auto mt-12 p-6 rounded-xl border border-slate-300 dark:border-slate-700 
                 bg-white dark:bg-slate-900 shadow-sm space-y-4"
    >
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
        Edit Flashcard {id}
      </h1>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Front
        </label>
        <Input
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="Question side..."
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Back
        </label>
        <Input
          value={back}
          onChange={(e) => setBack(e.target.value)}
          placeholder="Answer side..."
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/flashcards")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
}
