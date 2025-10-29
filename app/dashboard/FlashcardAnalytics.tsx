"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Flashcard = {
  id: number;
  createdAt?: string;
};

interface FlashcardAnalyticsProps {
  cards: Flashcard[];
}

export default function FlashcardAnalytics({ cards }: FlashcardAnalyticsProps) {
  // Format data for chart display
  const progressData = useMemo(() => {
    const grouped: Record<string, number> = {};

    cards.forEach((card) => {
      const date = new Date(card.createdAt || "").toLocaleDateString();
      grouped[date] = (grouped[date] || 0) + 1;
    });

    return Object.entries(grouped)
      .map(([date, count]) => ({ date, count }))
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [cards]);

  return (
    <div className="mb-10 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-6 shadow-sm">
      {/* <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
       Your Progress Over Time
      </h2> */}

      {progressData.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 italic">
          No progress data yet — start adding flashcards to see your growth.
        </p>
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.2} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#f8fafc",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
