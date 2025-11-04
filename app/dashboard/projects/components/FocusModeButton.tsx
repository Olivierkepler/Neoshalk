"use client";

import { Eye, EyeOff } from "lucide-react";

interface FocusModeButtonProps {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
}

export default function FocusModeButton({
  isFocusMode,
  toggleFocusMode,
}: FocusModeButtonProps) {
  return (
    <button
      onClick={toggleFocusMode}
      className="
        cursor-pointer
        flex items-center gap-2
        px-3 py-1.5 rounded-md text-sm font-medium
        bg-gray-200 hover:bg-gray-300
        dark:bg-gray-800 dark:hover:bg-gray-700
        text-gray-700 dark:text-gray-200
        transition-colors
      "
      title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
    >
      {isFocusMode ? (
        <>
          <Eye size={16} />
          {/* <span className="hidden sm:inline">Exit</span> */}
        </>
      ) : (
        <>
          <EyeOff size={16} />
          {/* <span className="hidden sm:inline">Focus</span> */}
        </>
      )}
    </button>
  );
}
