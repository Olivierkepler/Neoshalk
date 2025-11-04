"use client";

import { FilePlus2, LayoutDashboard, FolderOpen } from "lucide-react";

const features = [
  {
    title: "Create New Slides",
    description: "Start a new AI-powered presentation in seconds.",
    icon: FilePlus2,
    color: "bg-blue-600/10 text-blue-600",
  },
  {
    title: "View My Projects",
    description: "Access and manage your saved slide decks.",
    icon: FolderOpen,
    color: "bg-purple-600/10 text-purple-600",
  },
  {
    title: "Preview Mode",
    description: "Test your presentations before sharing.",
    icon: LayoutDashboard,
    color: "bg-green-600/10 text-green-600",
  },
];

export default function DashboardGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <div
          key={i}
          className="group rounded-2xl border border-slate-200 dark:border-slate-800 p-8 
          bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-sm hover:shadow-lg 
          transition-all duration-200"
        >
          <div className={`p-3 rounded-xl w-fit mb-4 ${f.color}`}>
            <f.icon size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
            {f.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {f.description}
          </p>
        </div>
      ))}
    </div>
  );
}
