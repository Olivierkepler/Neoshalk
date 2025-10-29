"use client";

import { useState, useRef, useEffect } from "react";
import { PanelRight, PanelRightClose } from "lucide-react";

import Chat from "./Chat";

export default function RightSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(280);
  const isResizing = useRef(false);

  // Start resizing
  const handleMouseDown = () => {
    if (!collapsed) {
      isResizing.current = true;
      document.body.style.userSelect = "none"; // disable text highlighting while resizing
    }
  };

  // Handle resize drag
  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 180 && newWidth <= 600) setWidth(newWidth);
    }
  };

  // Stop resize
  const handleMouseUp = () => {
    isResizing.current = false;
    document.body.style.userSelect = ""; // re-enable text selection
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <aside
      className={`
        border-l border-gray-300/50 dark:border-gray-700
        bg-gray-50 dark:bg-gray-900
        flex flex-col relative overflow-hidden
        transition-[width,background-color] duration-300 ease-in-out
      `}
      style={{ width: collapsed ? 60 : width }}
    >
      {/* Header */}
      <div
        className={`
          flex items-center justify-between px-3 py-4
          border-b border-gray-300 dark:border-gray-700
          transition-all duration-300
          ${collapsed ? "px-2 justify-center" : ""}
        `}
      >
        {/* Title (fades when collapsing) */}
        <h2
          className={`
            font-logo text-md text-gray-800 dark:text-gray-200 truncate
            transition-all duration-300
            ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
          `}
        >
          NeoShark Assistant
        </h2>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelRight size={24} /> : <PanelRightClose size={24} />}
        </button>
      </div>

      {/* Chat content */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${collapsed ? "opacity-0 translate-x-4 pointer-events-none" : "opacity-100 translate-x-0"}
        `}
      >
        <Chat />
      </div>

      {/* Resize Handle */}
      {!collapsed && (
        <div
          onMouseDown={handleMouseDown}
          className={`
            absolute top-0 left-0 w-1 cursor-col-resize h-full bg-transparent
            transition-colors duration-200
            ${isResizing ? "bg-blue-500/30" : "hover:bg-blue-500/10"}
          `}
        />
      )}
    </aside>
  );
}
