"use client";

// 1. Import 'useCallback' from react
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  GraduationCap,
  Sparkles,
  BarChart3,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import ReviewAnalytics from "./ReviewAnalytics";

// 2. Import your new Zustand store
import { usePracticeStore } from "../../../store/usePracticeStore";

interface Question {
  id: number;
  text: string;
  answer: string;
}

export default function PracticeTestModule() {
  // This state remains the source of truth for the text area
  const [inputText, setInputText] = useState("");
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [confidenceData, setConfidenceData] = useState<{ [key: number]: number }>({});
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(true);

  // 3. Get the "mailbox" text and the "clear" action from the store
  const textToStudy = usePracticeStore((state) => state.textToStudy);
  const clearTextToStudy = usePracticeStore((state) => state.clearTextToStudy);

  const currentQuestion = questions[currentIndex];
  const total = questions.length;

  // Load previous accuracy
  const [previousAccuracy, setPreviousAccuracy] = useState<number | null>(null);
  useEffect(() => {
    // Note: localStorage will not work in this environment, but leaving logic
    const stored = localStorage.getItem("practice_accuracy");
    if (stored) setPreviousAccuracy(parseFloat(stored));
  }, []);

  // 4. Update handleGenerateQuestions to accept optional text
  // We wrap it in 'useCallback' so the 'useEffect' hook can use it safely
  const handleGenerateQuestions = useCallback(async (textToUse?: string) => {
    // If textToUse is provided (from "Study" button), use it.
    // Otherwise, use the text from the state (from manual typing).
    const text = textToUse || inputText;
    if (!text.trim()) return;
    
    setIsGenerating(true);
    try {
      const res = await fetch("/dashboard/projects/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Use the determined 'text' variable here
        body: JSON.stringify({ text: text }),
      });
      const data = await res.json();
      setQuestions(data.questions || []);
      setCurrentIndex(0);
      setUserAnswer("");
      setCorrectCount(0);
      setIncorrectCount(0);
    } catch (err) {
      console.error("Error generating questions:", err);
    } finally {
      setIsGenerating(false);
    }
  }, [inputText]); // It only needs 'inputText' as a dependency

  // 5. This is the new "listener" hook
  useEffect(() => {
    // Check if the "Study" button sent us new text
    if (textToStudy) {
      console.log("PracticeTestModule: Received new text to study!");
      
      // A. Put the new text into the text area
      setInputText(textToStudy);
      
      // B. Automatically call the generate function, passing the text directly
      handleGenerateQuestions(textToStudy);
      
      // C. CRITICAL: Clear the "mailbox" so this doesn't run again.
      clearTextToStudy();
    }
    // This effect runs *only* when textToStudy changes
  }, [textToStudy, clearTextToStudy, handleGenerateQuestions]);

  // Cancel test
  const handleCancel = () => {
    setIsGenerating(false);
    setQuestions([]);
    setInputText(""); // Also clear the text area
    setIsAnswered(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setConfidenceData({});
  };

  // Submit answer
  const handleSubmit = () => {
    if (!questions.length || isAnswered) return;
    const normalized = userAnswer.trim().toLowerCase();
    const isCorrect = normalized === currentQuestion.answer.toLowerCase();
    if (isCorrect) setCorrectCount((c) => c + 1);
    else setIncorrectCount((c) => c + 1);
    setIsAnswered(true);

    setTimeout(() => {
      setUserAnswer("");
      setIsAnswered(false);
      if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
    }, 1000);
  };

  // Accuracy
  const accuracy =
    correctCount + incorrectCount > 0
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 0;

  const handleConfidenceChange = (questionId: number, value: number) => {
    setConfidenceData((prev) => ({ ...prev, [questionId]: value }));
  };

  return (
    <div className="w-full flex flex-col items-center py-10 select-none">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 text-slate-800 dark:text-slate-100">
        <GraduationCap className="text-indigo-600 dark:text-indigo-400" size={28} />
        <h1 className="text-2xl font-semibold font-logo tracking-wide">
          AI Fill-in-the-Blank Practice Test
        </h1>
      </div>

      {/* Previous Accuracy */}
      {previousAccuracy !== null && (
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Last session accuracy:{" "}
          <span
            className={`font-semibold ${
              previousAccuracy >= 75
                ? "text-green-600"
                : previousAccuracy >= 50
                ? "text-yellow-500"
                : "text-red-600"
            }`}
          >
            {previousAccuracy.toFixed(0)}%
          </span>
        </p>
      )}

      {/* Quiz / Input Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-11/12 sm:w-3/4 md:w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700"
      >
        {/* Cancel button */}
        {questions.length > 0 && (
          <button
            onClick={handleCancel}
            className="absolute top-3 right-3 text-slate-500 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>
        )}

        {/* Before test */}
        {!questions.length && !isGenerating && (
          <>
            <p className="text-slate-700 dark:text-slate-300 mb-4 text-lg font-medium text-center">
              Paste your notes and generate smart fill-in-the-blank questions
            </p>
            {/* 6. NO CHANGE NEEDED HERE. 
              This <textarea> is still bound to 'inputText'.
              When the 'useEffect' calls 'setInputText(textToStudy)', 
              this UI will update automatically. 
              The 'onChange' still allows manual typing.
            */}
            <textarea
              rows={6}
              placeholder="e.g. Newton’s first law states that..."
              className="w-full p-3 mb-4 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white resize-none transition-all"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="flex justify-center gap-3">
              {/* 7. NO CHANGE NEEDED HERE.
                This button *correctly* calls 'handleGenerateQuestions' with NO argument.
                This means it will use the 'inputText' from the state,
                perfectly preserving your manual-entry feature.
              */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGenerateQuestions()}
                disabled={!inputText.trim()}
                className="flex items-center gap-2 px-5 py-3 rounded-full text-white font-medium shadow-md bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-lg transition-all disabled:opacity-50"
              >
                <Sparkles size={18} />
                Generate Practice Test
              </motion.button>
            </div>
          </>
        )}

        {/* Loading */}
        {isGenerating && (
          <p className="text-center text-slate-500 dark:text-slate-400 animate-pulse">
            Generating intelligent questions...
          </p>
        )}

        {/* Test in progress (No changes needed below) */}
        {questions.length > 0 && currentQuestion && (
          <div className="mt-4 text-center">
            <p className="text-lg py-8  md:text-xl text-slate-900 dark:text-slate-100 font-medium mb-6">
              {currentQuestion.text}
            </p>

            <input
              type="text"
              placeholder="Type your answer..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              disabled={isAnswered}
              className="w-full px-4  py-2 mb-6 text-center border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-slate-800 dark:text-white transition-all"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={!userAnswer}
              className={`px-6 py-2.5 rounded-full text-white shadow-md transition-all duration-300 ${
                isAnswered
                  ? "bg-slate-400 dark:bg-slate-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg"
              }`}
            >
              Submit
            </motion.button>

            {/* Feedback */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 flex flex-col items-center"
                >
                  {userAnswer.trim().toLowerCase() ===
                  currentQuestion.answer.toLowerCase() ? (
                    <>
                      <CheckCircle size={36} className="text-green-500 dark:text-green-400 mb-2" />
                      <p className="text-green-600 dark:text-green-400 font-semibold">Correct!</p>
                    </>
                  ) : (
                    <>
                      <XCircle size={36} className="text-red-500 dark:text-red-400 mb-2" />
                      <p className="text-red-600 dark:text-red-400 font-semibold">
                        Answer: {currentQuestion.answer}
                      </p>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 📊 Collapsible Analytics Panel */}
        <div className="mt-10 border-t border-slate-200 dark:border-slate-700 pt-4">
          <button
            onClick={() => setIsAnalyticsOpen((prev) => !prev)}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <BarChart3 size={16} />
            {isAnalyticsOpen ? "Hide Analytics Dashboard" : "Show Analytics Dashboard"}
            {isAnalyticsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <AnimatePresence>
            {isAnalyticsOpen && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-6"
              >
                <ReviewAnalytics
                  accuracy={accuracy}
                  confidenceData={confidenceData}
                  totalQuestions={questions.length}
                  correctCount={correctCount}
                  incorrectCount={incorrectCount}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
