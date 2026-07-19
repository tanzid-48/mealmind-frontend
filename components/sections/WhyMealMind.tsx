"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { old: "Google random blog recipes, hope it's edible", newWay: "AI recipe built exactly around what you have" },
  { old: "Guess the nutrition info, or skip it entirely", newWay: "Calories, protein, carbs & fat calculated for you" },
  { old: "No one to ask when a step goes wrong", newWay: "AI Chef answers substitution & timing questions live" },
  { old: "Save recipes in 10 open browser tabs", newWay: "One place to save, manage, and revisit your recipes" },
];

export function WhyMealMind() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-center font-display text-3xl font-semibold text-ink sm:text-4xl">
        Cooking, the old way vs. with MealMind
      </h2>

      <div className="mt-10 overflow-hidden rounded-card border border-ink/10">
        <div className="grid grid-cols-2 bg-card font-mono text-xs uppercase tracking-wide text-ink/50">
          <div className="border-r border-ink/10 px-4 py-3 sm:px-6">Old way</div>
          <div className="px-4 py-3 sm:px-6">With MealMind</div>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row.old}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="grid grid-cols-2 border-t border-ink/10 bg-paper text-sm"
          >
            <div className="flex items-start gap-2 border-r border-ink/10 px-4 py-4 text-ink/60 sm:px-6">
              <X size={16} className="mt-0.5 shrink-0 text-paprika/60" />
              {row.old}
            </div>
            <div className="flex items-start gap-2 px-4 py-4 text-ink sm:px-6">
              <Check size={16} className="mt-0.5 shrink-0 text-herb dark:text-saffron" />
              {row.newWay}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
