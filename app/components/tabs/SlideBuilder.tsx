"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { generateSlides } from "@/lib/slideGenerator";

// ✅ Tab Components
import TabNavigation from "./TabNavigation";
import OverviewTab from "./OverviewTab";
import ContentTab from "./ContentTab";
import DesignTab from "./DesignTab";
import MediaTab from "./MediaTab";
import ReviewTab from "./ReviewTab";

export default function SlideBuilder() {
  const tabs = ["Overview", "Content", "Design", "Media", "Review"];
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    points: "",
    theme: "default",
    images: [],
  });

  const { setSlides } = useAppStore();
  const router = useRouter();

  const handleNext = () => setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
  const handlePrev = () => setActiveTab((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    const slides = generateSlides(formData);
    setSlides(slides);
    router.push("/preview");
  };

  return (
    <div className="mx-auto mt-10 max-w-3xl p-6 bg-white/90 rounded-2xl shadow-xl border border-slate-200">
      {/* Navigation Tabs */}
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Animated Tab Content */}
      <div className="relative mt-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 0 && <OverviewTab data={formData} setData={setFormData} />}
            {activeTab === 1 && <ContentTab data={formData} setData={setFormData} />}
            {activeTab === 2 && <DesignTab data={formData} setData={setFormData} />}
            {activeTab === 3 && <MediaTab data={formData} setData={setFormData} />}
            {activeTab === 4 && <ReviewTab data={formData} onSubmit={handleSubmit} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrev}
          disabled={activeTab === 0}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Back
        </button>
        {activeTab < tabs.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Generate Slides
          </button>
        )}
      </div>
    </div>
  );
}
