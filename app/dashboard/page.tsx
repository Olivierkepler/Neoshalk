"use client";

import { useSession } from "next-auth/react";




export default function DashboardPage() {
  const { status } = useSession();

  if (status === "loading") return <p className="text-center mt-20">Loading...</p>;
  

  return (
    <main className="min-h-screen mt-10 px-8 py-16  transition-colors">
    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
      <p className="text-slate-500 text-2xl dark:text-slate-400 mt-2">
        Welcome to your main dashboard overview.
      </p>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6 w-full">
          <div className="flex-1 rounded-xl p-8 bg-white shadow hover:shadow-lg transition text-2xl font-bold text-slate-900 dark:bg-slate-800 dark:text-white">
            Flashcards
          </div>
          <div className="flex-1 rounded-xl p-8 bg-white shadow hover:shadow-lg transition text-2xl font-bold text-slate-900 dark:bg-slate-800 dark:text-white">
            As you go test
          </div>
          <div className="flex-1 rounded-xl p-8 bg-white shadow hover:shadow-lg transition text-2xl font-bold text-slate-900 dark:bg-slate-800 dark:text-white">
            Practise test
          </div>
        </div>
      </div>
    </main>
  );
}
