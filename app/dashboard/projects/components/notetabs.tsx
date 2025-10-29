"use client";

import { X, ChevronLeft, ChevronRight, Plus, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FocusModeButton from "./FocusModeButton"; // ✅ make sure this path is correct

interface NoteTabsProps {
  notes: { id: number; title: string }[];
  selected: number | null;
  setSelected: (id: number) => void;
  closeNote: (id: number) => void;
  addNote: () => void;
  isFocusMode: boolean; // ✅ added
  toggleFocusMode: () => void; // ✅ added
  maxWidth?: number;
}

export default function NoteTabs({
  notes,
  selected,
  setSelected,
  closeNote,
  addNote,
  isFocusMode,
  toggleFocusMode,
  maxWidth = 800,
}: NoteTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (!selected || !activeRef.current || !scrollRef.current) return;
    const container = scrollRef.current;
    const tab = activeRef.current;
    const containerRect = container.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
      tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [selected]);

  // Check scroll position for chevrons
  const updateScrollState = () => {
    const container = scrollRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [notes]);

  const scrollByAmount = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div
      className="flex items-center bg-gray-100 dark:bg-gray-800 gap-2 px-2 py-2 
                 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
    >
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          onClick={() => scrollByAmount(-200)}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
          title="Previous tabs"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Tabs container */}
      <div
        ref={scrollRef}
        className="flex items-center flex-1 font-logo overflow-hidden hide-scrollbar space-x-1 select-none"
      >
        {notes.map((note) => {
          const isActive = selected === note.id;
          return (
            <div
              key={note.id}
              ref={isActive ? activeRef : null}
              onClick={() => setSelected(note.id)}
              className={`group flex items-center gap-1 px-3 py-1.5 border border-transparent rounded-md cursor-pointer whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700  dark:text-blue-300 font-bold shadow-sm"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
              }`}
            >
              <span className="truncate text-sm font-medium">{note.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeNote(note.id);
                }}
                className={`p-0.5  rounded-sm opacity-0 group-hover:opacity-100 transition-opacity ${
                  isActive
                    ? " hover:bg-gray-800 cursor-pointer"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                }`}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}

        {/* Add new tab */}
        <button
          onClick={addNote}
          className="flex font-logo cursor-pointer items-center justify-center px-2 py-1.5 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          title="New note"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={() => scrollByAmount(200)}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
          title="Next tabs"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* 👁 Focus Mode Button (icon-based) */}
      <FocusModeButton isFocusMode={isFocusMode} toggleFocusMode={toggleFocusMode} />

      {/* ⚙ Settings */}
      <button
        title="Settings"
        className="p-1 ml-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
      >
        <Settings size={18} />
      </button>
    </div>
  );
}
