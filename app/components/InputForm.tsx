"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateSlides } from "@/lib/slideGenerator";
import { useAppStore } from "@/lib/store";

export default function InputForm() {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");
  const router = useRouter();
  const { setSlides } = useAppStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slides = generateSlides({ title, points });
    setSlides(slides);
    router.push("/preview"); // <--- ✅ new route
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          className="mt-1 w-full rounded-lg border p-2"
          placeholder="Intro to My Project"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Bullet points (one per line)</label>
        <textarea
          className="mt-1 h-40 w-full rounded-lg border p-2"
          placeholder={`Problem\nApproach\nResults\nNext steps`}
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Generate & Preview
      </button>
    </form>
  );
}
