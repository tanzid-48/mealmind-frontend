"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2,400+", label: "Recipes shared" },
  { value: "18K+", label: "AI recipes generated" },
  { value: "96%", label: "Would cook again" },
  { value: "4.8/5", label: "Average rating" },
];

export function Stats() {
  return (
    <section className="bg-herb py-16 dark:bg-herb/20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-mono text-3xl font-semibold text-saffron">{s.value}</p>
            <p className="mt-1 text-sm text-white/80 dark:text-ink/70">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
