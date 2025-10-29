"use client";

import { motion } from "framer-motion";
import { Cpu, Sparkles, Globe, Zap } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 transition-all duration-300 group-hover:scale-110" />,
      title: "Innovation at Core",
      desc: "We design intelligent systems where creativity meets engineering precision.",
    },
    {
      icon: <Sparkles className="w-8 h-8 transition-all duration-300 group-hover:scale-110" />,
      title: "Crafted with Vision",
      desc: "Every line of code and pixel is guided by clarity, purpose, and imagination.",
    },
    {
      icon: <Globe className="w-8 h-8 transition-all duration-300 group-hover:scale-110" />,
      title: "Global Perspective",
      desc: "Our solutions scale seamlessly — bridging technology, people, and progress.",
    },
    {
      icon: <Zap className="w-8 h-8 transition-all duration-300 group-hover:scale-110" />,
      title: "Performance & Depth",
      desc: "Neoshark stands for power, precision, and speed — both in design and execution.",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 px-6 overflow-hidden"
    >
      {/* Frosted gradient background that blends with the Three.js grid */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/5
                   dark:from-transparent dark:via-slate-900/40 dark:to-slate-950/70 backdrop-blur-[80px]"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2
            className="text-4xl sm:text-5xl font-logo text-slate-800 dark:text-white"
          >
            Our Mission
          </h2>
          <p
            className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-slate-800 dark:text-slate-300"
          >
            At <span className="text-blue-600">Neoshark</span>, we merge human creativity with
            technical precision — crafting immersive digital experiences that
            evolve, adapt, and inspire.
            <br />
            We believe in technology that moves like water — fluid, strong, and alive.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-20">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              viewport={{ once: true }}
              className="group rounded-2xl p-8 cursor-pointer hover:-translate-y-2 transition-all duration-300 bg-white/60 backdrop-blur-xl shadow-md border border-slate-200/60 dark:bg-slate-900/60 dark:border-white/10"
            >
              <div className="mb-4 flex justify-center text-blue-600">
                {feature.icon}
              </div>
              <h3
                className="text-xl font-bold mb-3 text-slate-800 dark:text-white"
              >
                {feature.title}
              </h3>
              <p className="text-base leading-relaxed text-slate-800 dark:text-slate-300">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle cyan accent line for polish */}
      <div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent blur-sm"
      />
    </section>
  );
}
