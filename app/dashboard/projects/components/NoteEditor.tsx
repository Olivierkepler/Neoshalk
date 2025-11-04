"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Save,
  Edit3,
  SplitSquareHorizontal,
  Columns,
  Maximize2,
  Minimize2,
  BookOpen, // 1. Import a new icon for the "Study" button
} from "lucide-react";
import EditorPane from "./EditorPane";
import PreviewPane from "./preview/PreviewPane";
import SplitDivider from "./SplitDivider";
import { MODULES } from "./preview/modules";
import { PdfUploadButton } from "./PdfUploadButton";

// 2. Import your two Zustand stores
import { useTabsStore } from "../store/useTabsStore";
import { usePracticeStore } from "../store/usePracticeStore";
import { Button } from "@/components/ui/button"; // 3. Import the base Button

interface Note {
  id: number;
  title: string;
  content?: string;
}

interface NoteEditorProps {
  note: Note;
  onUpdate: (id: number, updatedNote: { title: string; content: string }) => void;
}

export default function NoteEditor({ note, onUpdate }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isSplit, setIsSplit] = useState(true);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [dividerPosition, setDividerPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeModule, setActiveModule] = useState("Flashcard");

  const containerRef = useRef<HTMLDivElement>(null);

  // 4. Get the actions from your Zustand stores
  const setActiveTab = useTabsStore((state) => state.setActiveIndex);
  const setTextToStudy = usePracticeStore((state) => state.setTextToStudy);

  // 💾 Auto-save with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (title !== note.title || content !== note.content) {
        setIsSaving(true);
        onUpdate(note.id, { title, content });
        setTimeout(() => setIsSaving(false), 600);
      }
    }, 700);
    return () => clearTimeout(timeout);
  }, [title, content, note, onUpdate]);

  // Sync when switching notes
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content || "");
  }, [note]);

  // 📏 Split view drag behavior
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !isSplit || !containerRef.current || isPreviewExpanded) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      setDividerPosition(Math.min(80, Math.max(20, newWidth)));
    },
    [isDragging, isSplit, isPreviewExpanded]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleTextFromAI = (aiText: string) => {
    if (content.trim() === "") {
      setContent(aiText);
    } else {
      const separator = "\n\n\n\n\n-------------------------------------------\n\n";
      setContent((currentContent) => currentContent + separator + aiText);
    }
  };

  // 5. This is the new handler for your "Study" button
  const handleStudyClick = () => {
    // A. Send the current note's content to the "mailbox"
    setTextToStudy(content);
    
    // B. Switch the "yellow box" view to the "Practice Tests" tab
    // (Assuming "Practice Tests" is the 2nd tab, at index 1)
    setActiveTab(1);
  };

  const ActiveModuleComponent = MODULES[activeModule as keyof typeof MODULES];

  return (
    <div className="relative flex flex-col h-full font-logo text-gray-800 dark:text-gray-100">
      {/* 🧭 Header */}
      <header className="flex items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-2">
        <div className="flex items-center gap-2 w-full">
          <Edit3 size={18} className="text-gray-500 dark:text-gray-400" />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent outline-none text-2xl font-semibold w-full"
            placeholder="Untitled Note"
          />
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <button
            onClick={() => setIsSplit(!isSplit)}
            className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isSplit ? <Columns size={18} /> : <SplitSquareHorizontal size={18} />}
          </button>

          {isSplit && (
            <button
              onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
              className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isPreviewExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          )}

          <span className="flex items-center gap-1">
            <Save size={14} />
            {isSaving ? <span className="animate-pulse">Saving...</span> : "Saved"}
          </span>
        </div>
      </header>

      {/* --- Action Bar --- */}
      <div className="flex items-center gap-2 py-2 border-b border-gray-300 dark:border-gray-700">
        <PdfUploadButton onTextOrganized={handleTextFromAI} />
        
        {/* --- 6. This is your new "Study" button --- */}
        <Button
          onClick={handleStudyClick}
          variant="outline" // Styled just like the Upload button
          size="sm"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Study
        </Button>
      </div>

      {/* 🧱 Main Layout */}
      <section ref={containerRef} className="flex-1 flex flex-col overflow-hidden pt-4">
        <div className={`flex-1 flex ${isSplit ? "flex-row" : "flex-col"}`}>
          {!isPreviewExpanded && (
            <EditorPane
              content={content}
              setContent={setContent}
              dividerPosition={dividerPosition}
              isDragging={isDragging}
              isSplit={isSplit}
            />
          )}

          {isSplit && !isPreviewExpanded && (
            <SplitDivider dividerPosition={dividerPosition} onMouseDown={handleMouseDown} />
          )}

          {isSplit && (
            <PreviewPane
              width={isPreviewExpanded ? "100%" : `${100 - dividerPosition}%`}
              ActiveModule={ActiveModuleComponent as React.ComponentType<{}>}
              activeModule={activeModule}
              setActiveModule={setActiveModule}
            />
          )}
        </div>
      </section>
    </div>
  );
}

