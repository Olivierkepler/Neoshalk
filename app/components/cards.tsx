"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  GraduationCap,
  Check,
  X,
  RefreshCw,
  BarChart3,
} from "lucide-react";

interface Flashcard {
  id: number;
  front: string;
  back: string;
  createdAt: string;
}

export default function FlashcardsPage() {
  const { status } = useSession();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [studyMode, setStudyMode] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Fetch flashcards
  useEffect(() => {
    if (status === "authenticated") {
      (async () => {
        try {
          const res = await fetch("/api/flashcards");
          const data = await res.json();
          setFlashcards(data);
        } catch (error) {
          console.error("Error fetching flashcards:", error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [status]);

  // Navigation Handlers
  const handleNext = useCallback(() => {
    setDirection(1);
    setFlipped(false);
    setIndex((prev) => {
      const next = (prev + 1) % flashcards.length;
      if (studyMode && next === 0 && prev !== 0) {
        setShowResults(true);
      }
      return next;
    });
  }, [flashcards.length, studyMode]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setFlipped(false);
    setIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  }, [flashcards.length]);

  const handleFlip = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  // Study mode scoring
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setCorrectCount((c) => c + 1);
    else setIncorrectCount((c) => c + 1);

    // End study mode if last card
    if (index === flashcards.length - 1) {
      setShowResults(true);
    } else {
      handleNext();
    }
  };

  const handleRestart = () => {
    setCorrectCount(0);
    setIncorrectCount(0);
    setIndex(0);
    setShowResults(false);
    setFlipped(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showResults) return;
      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        handleFlip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, handleFlip, showResults]);

  if (status === "loading" || loading) {
    return <p className="text-center mt-20 text-slate-500">Loading flashcards...</p>;
  }

  if (!flashcards.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-slate-500">
        <p>No flashcards yet.</p>
        <p className="text-sm">Go ahead and create your first one!</p>
      </div>
    );
  }

  const currentCard = flashcards[index];
  const progress = ((index + 1) / flashcards.length) * 100;
  const accuracy =
    correctCount + incorrectCount > 0
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 0;

  return (
    <main className="flex flex-col w-full items-center justify-center py-10 select-none">
      {/* Study Mode Toggle */}
      <div className="flex justify-between items-center w-3/4 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setStudyMode((prev) => !prev);
            setCorrectCount(0);
            setIncorrectCount(0);
            setIndex(0);
            setShowResults(false);
            setFlipped(false);
          }}
          className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm border 
            ${
              studyMode
                ? "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                : "text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
        >
          <GraduationCap size={18} />
          {studyMode ? "Exit Study Mode" : "Enter Study Mode"}
        </motion.button>

        {studyMode && !showResults && (
          <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Score:{" "}
            <span className="text-gray-600 dark:text-gray-400">{correctCount}</span> /
            <span className="text-gray-600 dark:text-gray-400">{incorrectCount}</span>
          </div>
        )}
      </div>

      {/* RESULTS SCREEN */}
      <AnimatePresence>
        {showResults && studyMode && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center text-center p-8 rounded-2xl shadow-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700"
          >
            <BarChart3 size={40} className="text-blue-600 dark:text-blue-400 mb-4" />
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
              Study Session Complete
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              You answered {correctCount + incorrectCount} cards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="px-6 py-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
                  {correctCount} Correct
                </p>
              </div>
              <div className="px-6 py-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
                  {incorrectCount} Incorrect
                </p>
              </div>
            </div>

            <p className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-6">
              Accuracy:{" "}
              <span
                className={`font-semibold ${
                  accuracy >= 75
                    ? "text-green-600 dark:text-green-400"
                    : accuracy >= 50
                    ? "text-yellow-500"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {accuracy}%
              </span>
            </p>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-200 cursor-pointer   dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 shadow-md"
              >
                <RefreshCw size={16} /> Restart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setStudyMode(false)}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-200 cursor-pointer dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 shadow-md"
              >
                Exit
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN FLASHCARD VIEW (hidden if results are showing) */}
      {!showResults && (
        <>
          {/* Flashcard Counter */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-logo text-slate-900 dark:text-white mb-4 text-lg tracking-wide"
          >
            Flashcard {index + 1} of {flashcards.length}
          </motion.p>

          {/* Progress Bar */}
          <div className="w-3/4 sm:w-1/2 md:w-2/5 h-0.5 mb-8 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* Flashcard Display */}
          <div className="relative w-3/4 sm:w-1/2 md:w-full h-64 md:h-100 perspective mb-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentCard.id}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 100 : -100,
                    opacity: 0,
                  }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -100 : 100,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  onClick={handleFlip}
                  className="relative w-full h-full rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl 
                    bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 
                    text-center text-xl font-logo text-slate-900 dark:text-white transition-transform cursor-pointer"
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-8 backface-hidden">
                    {currentCard.front}
                  </div>

                  {(!studyMode || flipped) && (
                    <div className="absolute inset-0 flex items-center justify-center p-8 backface-hidden rotate-y-180 text-slate-700 dark:text-slate-300">
                      {currentCard.back}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Study Mode Actions */}
          {studyMode && flipped && (
            <div className="flex gap-6 mt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAnswer(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-full cursor-pointer bg-green-100 dark:bg-green-900/30 hover:bg-green-700 text-white shadow-md"
             
              >
                <Check size={16} /> Correct
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAnswer(false)}
                className="flex items-center gap-2 px-5 py-2 rounded-full cursor-pointer bg-red-100 dark:bg-red-900/30 hover:bg-red-700 text-white shadow-md"
              >
                <X size={16} /> Incorrect
              </motion.button>
            </div>
          )}

          {/* Navigation Controls */}
          {!studyMode && (
            <div className="flex gap-8 items-center font-logo mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="group flex items-center gap-2 cursor-pointer px-6 py-2.5 rounded-full text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-all duration-300"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFlip}
                className="px-6 py-2.5 rounded-full border border-slate-200 cursor-pointer dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-all duration-300"
              >
                <RotateCcw size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="group flex items-center cursor-pointer gap-2 px-6 py-2.5 rounded-full text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-all duration-300"
              >
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
