"use client";

import { useState } from "react";
import { BarChart2, Target, CheckCircle, Plus, Eye } from "lucide-react";

interface ProgressEditorProps {
  /** 👇 Called when user clicks the button to open a new tab */
  onOpenTab?: (
    tabId: string,
    title: string,
    type: "note" | "progress" | "calendar" | "study"
  ) => void;
}

export default function ProgressEditor({ onOpenTab }: ProgressEditorProps) {
  const [tasksCompleted] = useState(5);
  const [totalTasks] = useState(9);
  const [notesReviewed] = useState(8);
  const [totalNotes] = useState(12);
  const [showDetails, setShowDetails] = useState(false); // 👈 new local state

  const percentTasks = Math.round((tasksCompleted / totalTasks) * 100);
  const percentNotes = Math.round((notesReviewed / totalNotes) * 100);

  return (
    <div className="flex flex-col h-full font-logo text-gray-800 dark:text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2 mb-4">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <BarChart2 size={20} /> Progress Overview
        </h2>

        <div className="flex gap-2">
          {/* 👇 Inline details toggle */}
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
          >
            <Eye size={14} /> {showDetails ? "Hide Details" : "Show Details"}
          </button>

          {/* 👇 Existing button that opens a tab */}
          <button
            onClick={() =>
              onOpenTab?.("progress-details", "Progress Details", "progress")
            }
            className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
          >
            <Plus size={14} /> Open Tab
          </button>
        </div>
      </header>

      {/* Main content */}
      <section className="flex-1 flex flex-col gap-4 overflow-y-auto">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Target size={18} /> Study Metricsq
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm mb-1">Notes Reviewed</p>
                <div className="h-2 bg-gray-300 dark:bg-gray-800 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${percentNotes}%` }}
                  />
                </div>
                <p className="text-xs mt-1">{notesReviewed} / {totalNotes}</p>
              </div>

              <div>
                <p className="text-sm mb-1">Tasks Completed</p>
                <div className="h-2 bg-gray-300 dark:bg-gray-800 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${percentTasks}%` }}
                  />
                </div>
                <p className="text-xs mt-1">{tasksCompleted} / {totalTasks}</p>
              </div>

              <div>
                <p className="text-sm mb-1">Learning Streak</p>
                <p className="text-purple-500 font-semibold">7 days 🔥</p>
                <button onClick={() => onOpenTab?.("learning-streak", "Learning Streak", "study")}>Open Tab</button>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle size={18} /> Milestones
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
                ✅ Completed Chapter 3 of Algorithms
              </li>
              <li className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
                🧠 Reviewed 10 flashcards
              </li>
              <li className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
                ⏰ Scheduled next review for Friday
              </li>
            </ul>
          </div>
        </div>

        {/* 👇 Toggleable inline content section */}
        {showDetails && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-inner border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">
              Detailed Progress Insights
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              You’ve completed <strong>{percentTasks}%</strong> of your planned tasks and
              reviewed <strong>{percentNotes}%</strong> of your study notes this week.  
              Keep this momentum going — consistency compounds!
            </p>
            <ul className="mt-3 list-disc pl-6 text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Next milestone: Finish Chapter 4 (due in 2 days).</li>
              <li>Focus area: Strengthen algorithm analysis and proofs.</li>
              <li>Tip: Schedule review breaks for every 45 minutes of study.</li>
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
