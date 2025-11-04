"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ReviewAnalyticsProps {
  accuracy: number;
  confidenceData: { [key: number]: number };
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
}

export default function ReviewAnalytics({
  accuracy,
  confidenceData,
  totalQuestions,
  correctCount,
  incorrectCount,
}: ReviewAnalyticsProps) {
  const confidenceChartData = Object.keys(confidenceData).map((key, i) => ({
    question: `Q${i + 1}`,
    confidence: confidenceData[parseInt(key)] || 0,
  }));

  const avgConfidence =
    confidenceChartData.reduce((acc, d) => acc + d.confidence, 0) /
      (confidenceChartData.length || 1);

  const accuracyColor =
    accuracy >= 75
      ? "text-green-500"
      : accuracy >= 50
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mt-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 text-center">
        Live Performance Analytics
      </h3>

      {/* Accuracy circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-300 dark:text-slate-600"
              fill="transparent"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke="url(#grad)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: accuracy / 100 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xl font-semibold ${accuracyColor}`}>
              {accuracy}%
            </span>
          </div>
        </div>
      </div>

      {/* Confidence Bar Chart */}
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={confidenceChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.15} />
            <XAxis
              dataKey="question"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                color: "#fff",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="confidence"
              fill="url(#barGrad)"
              radius={[8, 8, 0, 0]}
              animationDuration={700}
            />
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center mt-4 text-sm text-slate-500 dark:text-slate-400">
        <p>
          <span className="font-semibold text-indigo-500 dark:text-indigo-400">
            {correctCount}
          </span>{" "}
          correct ·{" "}
          <span className="font-semibold text-red-500 dark:text-red-400">
            {incorrectCount}
          </span>{" "}
          incorrect · Avg Confidence:{" "}
          <span className="font-semibold text-indigo-500 dark:text-indigo-400">
            {avgConfidence.toFixed(1)}%
          </span>
        </p>
      </div>
    </motion.div>
  );
}
