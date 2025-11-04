// File: FillInTheBlank.jsx
// Purpose: Interactive 'Fill in the Blank' quiz component (McGraw-Hill style)
"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function FillInTheBlank() {
  // ================================
  // 1️⃣ Question Data Structure
  // ================================
  const question = {
    text: 'The file pages/api/hello.js defines an _______ endpoint, which runs only on the _______ side.',
    blanks: [
      {
        id: 1, // blank number
        options: ['API', 'client', 'server'], // dropdown choices
        correct: 'API' // correct answer
      },
      {
        id: 2,
        options: ['client', 'server'],
        correct: 'server'
      }
    ]
  };

  // ================================
  // 2️⃣ State Management
  // ================================
  const [answers, setAnswers] = useState({ 1: '', 2: '' }); // track user selections
  const [submitted, setSubmitted] = useState(false); // track submit state

  // ================================
  // 3️⃣ Handlers
  // ================================
  const handleSelect = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({ 1: '', 2: '' });
    setSubmitted(false);
  };

  const isCorrect = (id: number) => answers[id as keyof typeof answers] === question.blanks[id - 1].correct;

  // ================================
  // 4️⃣ Render Component
  // ================================
  return (
    <div className="flex flex-col mt-40 items-center p-6 space-y-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-semibold">Fill in the Blank</h2>

          {/* Question with dropdown blanks */}
          <p className="text-lg">
            The file <code>pages/api/hello.js</code> defines an
            <select
              className="mx-2 border rounded px-2 py-1"
              onChange={(e) => handleSelect(1, e.target.value)}
              value={answers[1]}
              disabled={submitted}
            >
              <option value="">--Select--</option>
              {question.blanks[0].options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            endpoint, which runs only on the
            <select
              className="mx-2 border rounded px-2 py-1"
              onChange={(e) => handleSelect(2, e.target.value)}
              value={answers[2]}
              disabled={submitted}
            >
              <option value="">--Select--</option>
              {question.blanks[1].options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            side.
          </p>

          {/* Buttons and Feedback */}
          {!submitted ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <div className="space-y-2">
              <p>
                {isCorrect(1) && isCorrect(2)
                  ? '✅ Correct!'
                  : '❌ Try again.'}
              </p>
              <Button onClick={handleRetry}>Retry</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
