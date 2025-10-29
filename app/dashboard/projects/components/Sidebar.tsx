"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plus,
  StickyNote,
  PanelLeft,
  PanelLeftClose,
  BarChart2,
  Calendar,
  BookOpen,
  FileText,
  ArrowUpRight, // 👈 new icon for button
} from "lucide-react";
import ActivityBar from "./ActivityBar";

interface SidebarProps {
  notes: { id: number; title: string; content?: string }[];
  selected: number | null;
  setSelected: (id: number) => void;
  addNote: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  deleteNote: (id: number) => void;
  activeNavTab: "progress" | "calendar" | "study" | null;
  onNavTabChange: (tab: "progress" | "calendar" | "study" | null) => void;
}

export default function Sidebar({
  notes,
  selected,
  setSelected,
  addNote,
  darkMode,
  toggleDarkMode,
  deleteNote,
  activeNavTab,
  onNavTabChange,
}: SidebarProps) {
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "notes" | "progress" | "calendar" | "study"
  >("notes");

  const isResizing = useRef(false);

  const handleMouseDown = () => {
    if (!collapsed) isResizing.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current) {
      const newWidth = e.clientX;
      if (newWidth >= 180 && newWidth <= 600) setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleNoteClick = (id: number) => setSelected(id);

  const activityTabs = [
    { key: "notes", icon: FileText, label: "Notes" },
    { key: "progress", icon: BarChart2, label: "Progress" },
    { key: "calendar", icon: Calendar, label: "Calendar" },
    { key: "study", icon: BookOpen, label: "Study" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "notes":
        return (
          <div className="p-3 h-180 space-y-3">
            <h2 className="font-logo text-lg text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <StickyNote size={18} /> Notes
            </h2>

            <button
              onClick={addNote}
              className="w-full flex items-center justify-start gap-2 py-2 rounded-md
                hover:scale-105 transition-all duration-300 cursor-pointer
                text-gray-800 dark:text-gray-100 font-logo text-lg"
            >
              <Plus size={16} /> Add New Note
            </button>

            <div className="space-y-1">
              {notes.length ? (
                notes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => handleNoteClick(note.id)}
                    className={`w-full flex justify-between items-center text-left px-3 py-2 transition-colors group
                      ${
                        selected === note.id
                          ? "uppercase font-bold rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer"
                          : "rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer"
                      }`}
                  >
                    <span className="truncate">{note.title}</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="text-sm opacity-0 group-hover:opacity-70 hover:opacity-100 cursor-pointer transition-opacity duration-150"
                    >
                      ✕
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                  No notes yet. Create one above.
                </p>
              )}
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="p-4 text-gray-800 dark:text-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-logo text-lg mb-2 flex items-center gap-2">
                <BarChart2 size={18} /> Progress
              </h2>

              {/* 👇 New "Open in Tab" button */}
              <button
                onClick={() => onNavTabChange("progress")}
                className="flex items-center gap-1 text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md transition"
              >
                <ArrowUpRight size={12} /> Open Tab
              </button>
            </div>

            <p className="text-sm mb-3">
              Track your study and project completion milestones.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Notes Reviewed</span>
                <span className="text-blue-500 dark:text-blue-400 font-semibold">
                  8 / 12
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tasks Completed</span>
                <span className="text-green-500 font-semibold">5 / 9</span>
              </div>
              <div className="flex justify-between">
                <span>Learning Streaks</span>
                <span className="text-purple-500 font-semibold">7 days 🔥</span>
              </div>
            </div>
          </div>
        );

      case "calendar":
        return (
          <div className="p-4 text-gray-800 dark:text-gray-200">
            <h2 className="font-logo text-lg mb-3 flex items-center gap-2">
              <Calendar size={18} /> Calendar
            </h2>
            <p className="text-sm mb-4">
              View and plan your weekly study sessions.
            </p>
            <div className="grid grid-cols-2 gap-2 text-center text-sm">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="rounded-md py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        );

      case "study":
        return (
          <div className="p-4 text-gray-800 dark:text-gray-200">
            <h2 className="font-logo text-lg mb-3 flex items-center gap-2">
              <BookOpen size={18} /> Study Materials
            </h2>
            <p className="text-sm mb-3">
              Access your study guides, assignments, and learning paths.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
                📘 Algorithms Revisions
              </li>
              <li className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
                💾 Embedded Systems Notes
              </li>
              <li className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
                ⚡ Thermodynamics Summary
              </li>
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <aside
      className="h-screen border-r border-gray-300/50 dark:border-gray-700 flex transition-all duration-300 relative"
      style={{ width: collapsed ? 64 : sidebarWidth }}
    >
      {/* Sidebar Content */}
      {!collapsed && (
        <div className="flex flex-col flex-1 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-300 dark:border-gray-700">
            <ActivityBar
              activityTabs={activityTabs}
              activeTab={activeTab}
              setActiveTab={(tab) => setActiveTab(tab as any)}
            />
          </div>

          <div className="flex-1 overflow-y-auto">{renderTabContent()}</div>
        </div>
      )}

      {/* Collapse/Expand Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-4 cursor-pointer right-2 p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition z-10"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <PanelLeft size={24} /> : <PanelLeftClose size={24} />}
      </button>
    </aside>
  );
}
