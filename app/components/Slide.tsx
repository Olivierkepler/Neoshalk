// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { useAppStore } from "@/lib/store";
// import { generateSlides } from "@/lib/slideGenerator";

// // ✅ Tab Components
// import TabNavigation from "./tabs/TabNavigation";
// import OverviewTab from "./tabs/OverviewTab";
// import ContentTab from "./tabs/ContentTab";
// import DesignTab from "./tabs/DesignTab";
// import MediaTab from "./tabs/MediaTab";
// import ReviewTab from "./tabs/ReviewTab";

// export default function SlideBuilder() {
//   const tabs = ["Overview", "Content", "Design", "Media", "Review"];
//   const [activeTab, setActiveTab] = useState(0);
//   const [formData, setFormData] = useState({
//     title: "",
//     subtitle: "",
//     description: "",
//     points: [],
//     theme: "default",
//     font: "sans-serif",
//     accentColor: "#3B82F6",
//     images: [],
    
//   });

//   const { setSlides } = useAppStore();
//   const router = useRouter();

//   const handleNext = () => setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
//   const handlePrev = () => setActiveTab((prev) => Math.max(prev - 1, 0));

//   const handleSubmit = () => {
//     const slides = generateSlides(formData as any);
//     setSlides(slides);
//     router.push("/preview");
//   };

//   // 🧩 Color themes for preview background
//   const themeClasses: Record<string, string> = {
//     default: "bg-slate-100 text-slate-900",
//     dark: "bg-slate-800 ",
//     minimal: "bg-white text-black border border-slate-200",
//     vibrant: "bg-gradient-to-br from-blue-500 to-pink-500 ",
//   };

//   return (
//     <div className="mx-auto mt-10 max-w-7xl p-6 bg-white/90 rounded-2xl shadow-xl border border-slate-200">
//       {/* Tab Navigation */}
//       <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

//       {/* Two-Column Layout */}
//       <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* LEFT — Input Panel */}
//         <div>
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               {activeTab === 0 && <OverviewTab data={formData} setData={setFormData} />}
//               {activeTab === 1 && <ContentTab data={formData} setData={setFormData} />}
//               {activeTab === 2 && <DesignTab data={formData} setData={setFormData} />}
//               {activeTab === 3 && <MediaTab data={formData} setData={setFormData} />}
//               {activeTab === 4 && <ReviewTab data={formData} onSubmit={handleSubmit} />}
//             </motion.div>
//           </AnimatePresence>

//           {/* Navigation Buttons */}
//           <div className="flex justify-between mt-8 ">
//             <button
//               onClick={handlePrev}
//               disabled={activeTab === 0}
//               className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
//             >
//               Back
//             </button>
//             {activeTab < tabs.length - 1 ? (
//               <button
//                 onClick={handleNext}
//                 className="px-4 py-2 rounded bg-blue-600  hover:bg-blue-700"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 rounded bg-green-600  hover:bg-green-700"
//               >
//                 Generate Slides
//               </button>
//             )}
//           </div>
//         </div>

//         {/* RIGHT — Live Preview */}
//         <div className="hidden lg:block">
//           <motion.div
//             className={`rounded-xl p-8 shadow-inner h-full flex flex-col justify-center ${themeClasses[formData.theme]}`}
//             style={{
//               fontFamily: formData.font,
//               borderColor:
//                 formData.theme === "minimal" ? formData.accentColor : undefined,
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <h2
//               className="text-3xl  font-bold mb-2"
//               style={{ color: formData.accentColor }}
//             >
//               {formData.title || "Your Title Preview" }
//             </h2>
//             {formData.subtitle && (
//               <p className="text-lg mb-4 opacity-80">{formData.subtitle}</p>
//             )}
//             {formData.description && (
//               <p className="text-base mb-4 leading-relaxed opacity-90">
//                 {formData.description}
//               </p>
//             )}
//             {formData.points?.length > 0 && (
//               <ul className="list-disc pl-6 space-y-1 text-sm">
//                 {formData.points.map((p, i) => (
//                   <li key={i}>{p}</li>
//                 ))}
//               </ul>
//             )}
//             {formData.images?.length > 0 && (
//               <div className="grid grid-cols-2 gap-2 mt-4">
//                 {formData.images.slice(0, 2).map((img, i) => (
//                   <img
//                     key={i}
//                     src={img}
//                     alt={`Preview ${i + 1}`}
//                     className="w-full h-32 object-cover rounded-lg shadow"
//                   />
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
