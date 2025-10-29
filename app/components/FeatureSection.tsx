"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Layers,
  BarChart3,
  Rocket,
  Code2,
  CloudLightning,
} from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      icon: <Cpu className="w-8 h-8 mb-3" />,
      title: "Adaptive Intelligence",
      desc: "Smart algorithms that evolve with user behavior — precision built into every action.",
    },
    {
      icon: <Layers className="w-8 h-8 mb-3" />,
      title: "Modular Design",
      desc: "Each component is structured, scalable, and reusable — built to adapt to your needs.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 mb-3" />,
      title: "Visual Analytics",
      desc: "Turn data into clear visual insights with dynamic, interactive dashboards.",
    },
    {
      icon: <Rocket className="w-8 h-8 mb-3" />,
      title: "Lightning Performance",
      desc: "Optimized speed and seamless transitions for smooth, immersive experiences.",
    },
    {
      icon: <Code2 className="w-8 h-8 mb-3" />,
      title: "Developer Freedom",
      desc: "Built with flexibility in mind — integrate, extend, and customize with ease.",
    },
    {
      icon: <CloudLightning className="w-8 h-8 mb-3" />,
      title: "Cloud Ready",
      desc: "Scalable infrastructure built for modern deployment across any environment.",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-28 sm:py-36 px-6 overflow-hidden transition-colors duration-500 text-slate-800 dark:text-white"
    >
      {/* Gradient background with smooth light/dark adaptation */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/5 backdrop-blur-[80px] dark:from-slate-950/70 dark:via-slate-900/80 dark:to-slate-950 transition-all duration-500"
      />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl font-logo tracking-tight mb-6 text-slate-800 dark:text-white"
          >
            Features That Define{" "}
            <span className="text-blue-600 dark:text-cyan-400 drop-shadow-sm">Neoshark</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300"
          >
            Power, design, and intelligence — streamlined into every interaction.  
            Discover what makes Neoshark more than just a platform.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group rounded-2xl p-8 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 bg-white/70 border border-slate-200/60 backdrop-blur-xl dark:bg-slate-800/70 dark:border-slate-700/60"
            >
              <div className="flex justify-center mb-3 text-blue-600 dark:text-cyan-400">
                {feature.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-3 mt-2 group-hover:text-blue-400 transition text-slate-800 dark:text-white"
              >
                {feature.title}
              </h3>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glowing accent line */}
      <div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent blur-sm"
      />
    </section>
  );
}
