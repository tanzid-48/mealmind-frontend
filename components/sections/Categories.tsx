"use client";

import { motion } from "framer-motion";

const categories = [
  { name: "Breakfast", emoji: "🍳" },
  { name: "Vegan", emoji: "🥦" },
  { name: "Quick Meals", emoji: "⏱️" },
  { name: "High Protein", emoji: "🍗" },
  { name: "Desserts", emoji: "🍰" },
  { name: "Soups", emoji: "🍲" },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        Browse by category
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="cursor-pointer rounded-card border border-ink/10 bg-card p-5 text-center transition-shadow hover:shadow-md"
          >
            <div className="text-3xl">{cat.emoji}</div>
            <p className="mt-2 text-sm font-medium text-ink/80">{cat.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
