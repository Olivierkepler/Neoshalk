import React from "react";

interface TabNavProps {
  tabs: string[];
  activeTab: number;
  onChange: (index: number) => void;
}

export default function TabNavigation({ tabs, activeTab, onChange }: TabNavProps) {
  return (
    <div className="flex justify-around border-b border-slate-200">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onChange(i)}
          className={`py-2 px-3 text-sm font-medium transition ${
            i === activeTab
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-slate-500 hover:text-blue-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
