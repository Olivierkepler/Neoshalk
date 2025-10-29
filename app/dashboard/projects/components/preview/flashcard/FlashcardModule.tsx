"use client";

import { useEffect, useState } from "react";
import PracticeTextTabs from "./PracticeText";
import Cards from "@/app/components/cards";
import FlashcardAnalytics from "@/app/dashboard/FlashcardAnalytics";

type Flashcard = {
  id: number;
  front: string;
  back: string;
  createdAt?: string;
};

export default function FlashcardModule() {
  const [cards, setCards] = useState<Flashcard[]>([]);

  // ✅ Fetch flashcards
  const fetchCards = async () => {
    try {
      const res = await fetch("/api/flashcards");
      const data = await res.json();
      setCards(data);
    } catch (error) {
      console.error("Failed to fetch flashcards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // ✅ Tabs setup
  const FLASHCARD_TABS = [
    { title: "Flashcard List", content: <Cards /> },
    // { title: "Flashcard Analytics", content: <Cards /> },
  ];

  return (
    <div className="w-full ">
  <div className="px-8">
    <Cards />
  </div>

      {/* Optional: show analytics separately below as well */}
      <div className="mt-8 px-8">
        <FlashcardAnalytics cards={cards} />
      </div>
    </div>
  );
}
