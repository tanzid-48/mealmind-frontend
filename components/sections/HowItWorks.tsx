"use client";

import { motion } from "framer-motion";
import { ShoppingBasket, Sparkles, UtensilsCrossed } from "lucide-react";

const steps = [
  {
    icon: ShoppingBasket,
    title: "Tell us what you have",
    desc: "Add the ingredients sitting in your fridge or pantry right now — no shopping required.",
  },
  {
    icon: Sparkles,
    title: "AI builds your recipe",
    desc: "Gemini generates a complete recipe tuned to your diet, with steps and nutrition info.",
  },
  {
    icon: UtensilsCrossed,
    title: "Cook, ask, adjust",
    desc: "Chat with the AI Chef mid-cook for substitutions, timing help, or plating tips.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-display text-3xl font-semibold text-ink sm:text-4xl"
      >
        How MealMind works
      </motion.h2>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="rounded-card border border-ink/10 bg-card p-8 text-center"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-herb/10 text-herb dark:bg-saffron/10 dark:text-saffron">
              <step.icon size={26} />
            </div>
            <p className="mt-4 font-mono text-xs text-ink/40">STEP {i + 1}</p>
            <h3 className="mt-1 font-display text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm text-ink/70">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
