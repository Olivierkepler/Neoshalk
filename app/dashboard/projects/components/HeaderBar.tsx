"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Layout,
  Package,
  Settings,
  Sun,
  Moon,
} from "lucide-react";

export default function HeaderBar() {
  const [query, setQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header
      className="
        flex items-center justify-center px-3 py-2
        bg-white dark:bg-gray-900
        border-b border-gray-300 dark:border-gray-700
        transition-colors duration-300
      "
    >
      {/* Search bar */}
      <div
        className="
          flex items-center flex-1 max-w-md mx-4 font-logo 
          rounded-md px-2 py-1
          bg-white text-gray-800 border border-gray-300
          focus-within:ring-1 focus-within:ring-blue-500
          dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100
          transition-all
        "
      >
        <Search size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            flex-1 bg-transparent outline-none text-sm
            placeholder:text-gray-500 dark:placeholder:text-gray-400
            text-gray-500 dark:text-gray-400
            font-logo
          "
        />
      </div>

      {/* Right-side controls */}
      <div className="flex items-center gap-2">
        <button
          className="
            p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800
            transition-colors
          "
          title="Split View"
        >
          <Layout size={16} />
        </button>
        <button
          className="
            p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800
            transition-colors
          "
          title="Extensions"
        >
          <Package size={16} />
        </button>
        <button
          className="
            p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800
            transition-colors
          "
          title="Settings"
        >
          <Settings size={16} />
        </button>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="
              p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800
              transition cursor-pointer
            "
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400 cursor-pointer" />
            ) : (
              <Moon className="h-5 w-5 text-sky-500 cursor-pointer" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
