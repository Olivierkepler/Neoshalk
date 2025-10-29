"use client";

import { ReactNode } from "react";

interface EditorPaneProps {
  content: string;
  setContent: (val: string) => void;
  dividerPosition: number;
  isDragging: boolean;
  isSplit: boolean;
  /** 👇 Optional custom module (for Progress, Calendar, Study, etc.) */
  ModuleComponent?: ReactNode;
  readOnly?: boolean;
}

export default function EditorPane({
  content,
  setContent,
  dividerPosition,
  isDragging,
  isSplit,
  ModuleComponent,
  readOnly = false,
}: EditorPaneProps) {
  // If a module (like ProgressEditor) is passed, render that instead of textarea
  if (ModuleComponent) {
    return (
      <div
        style={{
          width: isSplit ? `${dividerPosition}%` : "100%",
          transition: isDragging ? "none" : "width 0.2s ease",
        }}
        className="h-full overflow-y-auto border border-gray-300 dark:border-gray-700 
                   rounded-md p-4 bg-gray-50 dark:bg-gray-900 transition-all"
      >
        {ModuleComponent}
      </div>
    );
  }

  // Default: Text editing pane (for notes)
  return (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      readOnly={readOnly}
      placeholder={readOnly ? "This view is read-only..." : "Start writing your note..."}
      style={{
        width: isSplit ? `${dividerPosition}%` : "100%",
        transition: isDragging ? "none" : "width 0.2s ease",
      }}
      className={`h-full resize-none border border-gray-300 dark:border-gray-700 rounded-md p-3 
        outline-none bg-transparent text-base leading-relaxed font-light 
        text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 
        focus:ring-1 focus:ring-blue-400/40 dark:focus:ring-blue-600/40 transition-all ${
          readOnly ? "cursor-default select-none" : ""
        }`}
    />
  );
}
