"use client";

import { useEffect, useState, useMemo } from "react";

// --- QUESTION BANK ---
type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  category: "DSA" | "JavaScript" | "DB" | "General";
  difficulty: "easy" | "medium" | "hard";
};

const QUESTION_BANK: Question[] = [
  {
    id: "q1",
    question: "Which sorting algorithm has average O(n log n)?",
    options: ["Bubble Sort", "Merge Sort", "Insertion Sort", "Selection Sort"],
    answer: "Merge Sort",
    category: "DSA",
    difficulty: "easy",
  },
  {
    id: "q2",
    question: "Which data structure uses FIFO order?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
    category: "DSA",
    difficulty: "easy",
  },
  {
    id: "q3",
    question: "Which JS method converts JSON string to object?",
    options: ["JSON.parse()", "JSON.stringify()", "toString()", "Object.assign()"],
    answer: "JSON.parse()",
    category: "JavaScript",
    difficulty: "easy",
  },
  {
    id: "q4",
    question: "In SQL, which clause filters after GROUP BY?",
    options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"],
    answer: "HAVING",
    category: "DB",
    difficulty: "medium",
  },
];

// --- HELPERS ---
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count);
}

// --- MAIN COMPONENT ---
export default function PracticeTest() {
  const [category, setCategory] = useState<"All" | Question["category"]>("All");
  const [difficulty, setDifficulty] = useState<"All" | Question["difficulty"]>("All");
  const [minutes, setMinutes] = useState(5);
  const [numQuestions, setNumQuestions] = useState(3);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | null>>({});
  const [index, setIndex] = useState(0);

  // Filter question pool
  const filteredPool = useMemo(() => {
    return QUESTION_BANK.filter((q) => {
      const catOk = category === "All" || q.category === category;
      const diffOk = difficulty === "All" || q.difficulty === difficulty;
      return catOk && diffOk;
    });
  }, [category, difficulty]);

  // Timer
  useEffect(() => {
    if (!started || submitted) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setSubmitted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [started, submitted]);

  // Derived values
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const current = questions[index];
  const score = submitted
    ? questions.reduce((s, q) => s + (answers[q.id] === q.answer ? 1 : 0), 0)
    : 0;

  // Start the test
  const startTest = () => {
    const chosen = sample(filteredPool.length ? filteredPool : QUESTION_BANK, numQuestions);
    const shuffled = chosen.map((q) => ({ ...q, options: shuffle(q.options) }));
    const init: Record<string, string | null> = {};
    shuffled.forEach((q) => (init[q.id] = null));
    setQuestions(shuffled);
    setAnswers(init);
    setStarted(true);
    setSubmitted(false);
    setSecondsLeft(minutes * 60);
  };

  const pickAnswer = (opt: string) => {
    if (!started || submitted) return;
    setAnswers((prev) => ({ ...prev, [current.id]: opt }));
  };

  const next = () => setIndex((i) => Math.min(i + 1, questions.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const submit = () => setSubmitted(true);

  const restart = () => {
    setStarted(false);
    setSubmitted(false);
    setIndex(0);
  };

  // NEW: Cancel button resets without saving progress or submitting
  const cancel = () => {
    if (confirm("Are you sure you want to cancel the test? Your progress will be lost.")) {
      restart();
    }
  };

  // --- UI ---
  return (
    <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-700 shadow-lg">
     
      {!started ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Configure Your Test</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col">
              <span>Category</span>
              <select
                className="bg-slate-800 border border-slate-700 rounded-md p-2"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                <option value="All">All</option>
                <option value="DSA">DSA</option>
                <option value="JavaScript">JavaScript</option>
                <option value="DB">DB</option>
                <option value="General">General</option>
              </select>
            </label>

            <label className="flex flex-col">
              <span>Difficulty</span>
              <select
                className="bg-slate-800 border border-slate-700 rounded-md p-2"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
              >
                <option value="All">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <label className="flex flex-col">
              <span>Number of Questions</span>
              <input
                type="number"
                className="bg-slate-800 border border-slate-700 rounded-md p-2"
                value={numQuestions}
                min={1}
                max={10}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
              />
            </label>

            <label className="flex flex-col">
              <span>Timer (minutes)</span>
              <input
                type="number"
                className="bg-slate-800 border border-slate-700 rounded-md p-2"
                value={minutes}
                min={1}
                max={60}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
            </label>
          </div>

          <button
            onClick={startTest}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Start Test
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-400">
              Question {index + 1} / {questions.length}
            </p>
            <p className={`font-mono ${secondsLeft < 30 ? "text-red-400" : "text-blue-400"}`}>
              ⏳ {mm}:{ss}
            </p>
          </div>

          <h3 className="text-lg font-semibold">{current.question}</h3>

          <div className="space-y-3">
            {current.options.map((opt) => {
              const selected = answers[current.id] === opt;
              const correct = submitted && opt === current.answer;
              const wrong = submitted && selected && opt !== current.answer;
              return (
                <button
                  key={opt}
                  onClick={() => pickAnswer(opt)}
                  disabled={submitted}
                  className={`w-full text-left px-4 py-2 rounded-md border transition ${
                    correct
                      ? "border-green-400 bg-green-900/30"
                      : wrong
                      ? "border-red-400 bg-red-900/30"
                      : selected
                      ? "border-blue-400 bg-blue-900/30"
                      : "border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-between  gap-2">
            <button onClick={prev} disabled={index === 0} className="px-4 py-2 cursor-pointer rounded-md bg-slate-700 hover:bg-slate-600">
              Prev
            </button>

            {!submitted ? (
              index === questions.length - 1 ? (
                <button onClick={submit} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 cursor-pointer rounded-md">
                  Submit
                </button>
              ) : (
                <button onClick={next} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 cursor-pointer rounded-md">
                  Next
                </button>
              )
            ) : (
              <button onClick={restart} className="px-4 py-2 bg-slate-600 cursor-pointer hover:bg-slate-700 rounded-md">
                Restart
              </button>
            )}

            {/* 🚫 Cancel Button */}
            <button
              onClick={cancel}
              className="px-4 py-2 bg-red-600/50 cursor-pointer hover:bg-red-700/50 text-white rounded-md"
            >
              Cancel
            </button>
          </div>

          {submitted && (
            <div className="mt-6 text-center">
              <p className="text-xl font-bold">
                ✅ Score: {score} / {questions.length}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
