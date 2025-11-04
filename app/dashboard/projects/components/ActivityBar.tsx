"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface ActivityTab {
  key: string;
  icon: LucideIcon;
  label: string;
}

interface ActivityBarProps {
  activityTabs: ActivityTab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ActivityBar({
  activityTabs,
  activeTab,
  setActiveTab,
}: ActivityBarProps) {
  return (
    <div
      className=" flex flex-row items-center gap-2 cursor-pointer
      "
    >
      {activityTabs.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => setActiveTab(key)}
          title={label}
          className={`flex cursor-pointer  items-center justify-center w-10 h-10 my-1 rounded-md
            text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700
            transition-colors
            ${
              activeTab === key
                ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                : ""
            }`}
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
}
