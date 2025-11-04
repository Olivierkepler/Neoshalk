"use client";

import Image from "next/image";

export default function DashboardHeader({ session }: { session: any }) {
  const user = session?.user;

  return (
    <div className="flex items-center justify-between mb-12">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your presentations and explore new features.
        </p>
      </div>

      
    </div>
  );
}
