interface PreviewPaneProps {
  width: string;
  ActiveModule: React.ComponentType;
  activeModule: string;
  setActiveModule: (name: string) => void;
}

export default function PreviewPane({
  width,
  ActiveModule,
  activeModule,
  setActiveModule,
}: PreviewPaneProps) {
  // Define user-facing labels + internal keys
  const modules = [
    { key: "Flashcard", label: "Flashcards" },
    { key: "PracticeTests", label: "Practice Tests" },
    { key: "MultipleChoice", label: "Multiple Choice Test" },
  ];

  return (
    <div
      style={{ width }}
      className="h-full   border border-gray-300 dark:border-gray-700 rounded-md p-3 
                 overflow-auto bg-gray-50 dark:bg-gray-900/40 transition-all"
    >
      
      {/* 🧭 Mode Switch Buttons */}
      <div className="flex gap-2 mb-4 ">
        {modules.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveModule(key)}
            className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
              key === activeModule
                ? "bg-gray-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Render the selected module dynamically */}
      <ActiveModule />
    </div>
  );
}
