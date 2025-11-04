"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import Sidebar from "@/app/dashboard/projects/components/Sidebar";
import NoteTabs from "@/app/dashboard/projects/components/notetabs";
import HeaderBar from "./components/HeaderBar";
import RightSidebar from "@/app/dashboard/projects/components/chatbot/RightSidebar";
import NoteEditor from "@/app/dashboard/projects/components/NoteEditor";
import EditorPane from "@/app/dashboard/projects/components/EditorPane";
import ProgressEditor from "@/app/dashboard/projects/components/ProgressEditor";

interface Note {
  id: number;
  title: string;
  content?: string;
}

interface Tab {
  id: string;
  title: string;
  type: "note" | "progress" | "calendar" | "study";
}

export default function ProjectsPage() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: "Welcome", content: "This is your first note." },
    { id: 2, title: "Project Plan", content: "Define your project goals here." },
  ]);

  const [openTabs, setOpenTabs] = useState<Tab[]>([
    { id: "note-1", title: "Welcome", type: "note" },
  ]);
  const [selectedTab, setSelectedTab] = useState<string>("note-1");
  const [isFocusMode, setIsFocusMode] = useState(false);

  const toggleDarkMode = () => setTheme(isDark ? "light" : "dark");

  /** 📝 Add new note */
  const addNote = () => {
    const newId = Date.now();
    const newNote = { id: newId, title: `New Note ${notes.length + 1}`, content: "" };
    setNotes([...notes, newNote]);
    const newTab = { id: `note-${newId}`, title: newNote.title, type: "note" };
    setOpenTabs([...openTabs, newTab as Tab]);
    setSelectedTab(newTab.id);
  };

  /** ❌ Close a tab */
  const closeTab = (id: string) => {
    setOpenTabs((prev) => prev.filter((t) => t.id !== id));
    if (selectedTab === id) {
      const remaining = openTabs.filter((t) => t.id !== id);
      setSelectedTab(remaining.length ? remaining[0].id : "");
    }
  };

  /** 🗑 Delete note */
  const deleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
    closeTab(`note-${id}`);
  };

  /** 💾 Update note title or content */
  const updateNote = (id: number, updatedNote: { title: string; content: string }) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updatedNote } : note))
    );
    setOpenTabs((prev) =>
      prev.map((tab) =>
        tab.id === `note-${id}` ? { ...tab, title: updatedNote.title } : tab
      )
    );
  };

  /** 🧭 Handle sidebar nav tab change */
  const handleNavTabChange = (tab: "progress" | "calendar" | "study" | null) => {
    if (!tab) return;
    const id = tab;
    const title = tab.charAt(0).toUpperCase() + tab.slice(1);
    if (!openTabs.find((t) => t.id === id)) {
      setOpenTabs([...openTabs, { id, title, type: tab }]);
    }
    setSelectedTab(id);
  };

  /** 🪄 Handle tab opening from inside modules (e.g., ProgressEditor button) */
  const handleOpenTabFromModule = (id: string, title: string, type: Tab["type"]) => {
    setOpenTabs((prev) => {
      if (prev.find((t) => t.id === id)) return prev; // already open
      return [...prev, { id, title, type }];
    });
    setSelectedTab(id);
  };

  return (
    <div className="transition-colors duration-300 bg-white dark:bg-gray-950 text-black dark:text-white">
      <HeaderBar />

      {/* 🗂 Tabs */}
      <NoteTabs
        isFocusMode={isFocusMode}
        toggleFocusMode={() => setIsFocusMode(!isFocusMode)}
        notes={openTabs.map((t) => ({
          id: Number(t.id.replace("note-", "")),
          title: t.title,
        }))}
        selected={selectedTab.startsWith("note-") ? Number(selectedTab.replace("note-", "")) : null}
        setSelected={(id) => setSelectedTab(`note-${id}`)}
        closeNote={(id) => closeTab(`note-${id}`)}
        addNote={addNote}
      />

      <div className="flex min-h-screen transition-all duration-300">
        {/* 🧭 Sidebar */}
        {!isFocusMode && (
          <Sidebar
            notes={notes}
            selected={
              selectedTab.startsWith("note-")
                ? Number(selectedTab.replace("note-", ""))
                : null
            }
            setSelected={(id) => setSelectedTab(`note-${id}`)}
            addNote={addNote}
            deleteNote={deleteNote}
            darkMode={isDark}
            toggleDarkMode={toggleDarkMode}
            activeNavTab={
              ["progress", "calendar", "study"].includes(selectedTab)
                ? (selectedTab as "progress" | "calendar" | "study")
                : null
            }
            onNavTabChange={handleNavTabChange}
          />
        )}

        {/* 🧱 Main Content */}
        <main className="flex-1 p-6 h-screen text-black dark:text-white relative overflow-y-auto">
          {(() => {
            const active = openTabs.find((t) => t.id === selectedTab);
            if (!active) return <p>No tab selected.</p>;

            /** ✏️ Notes */
            if (active.type === "note") {
              const note = notes.find((n) => `note-${n.id}` === selectedTab);
              return note ? <NoteEditor note={note} onUpdate={updateNote} /> : null;
            }

            /** 📊 Progress */
            if (active.type === "progress") {
              return (
                <EditorPane
                  content=""
                  setContent={() => {}}
                  dividerPosition={50}
                  isDragging={false}
                  isSplit={true}
                  ModuleComponent={
                    <ProgressEditor
                      onOpenTab={(id, title, type) =>
                        handleOpenTabFromModule(id, title, type)
                      }
                    />
                  }
                  readOnly
                />
              );
            }

            /** 🗓 Future Calendar / Study Views */
            return (
              <div className="p-6 text-gray-600 dark:text-gray-300">
                <h2 className="text-xl font-semibold mb-2">{active.title}</h2>
                <p>This section is under construction.</p>
              </div>
            );
          })()}
        </main>

        {/* 💬 Right Sidebar */}
        {!isFocusMode && <RightSidebar />}
      </div>
    </div>
  );
}
