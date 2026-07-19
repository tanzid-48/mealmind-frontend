"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  { name: "Nusrat J.", role: "Home cook", quote: "I stopped wasting vegetables. MealMind turns whatever's left in the fridge into an actual dinner." },
  { name: "Rafiul H.", role: "Grad student", quote: "The AI chef talked me through a curry I'd never made before, step by step, at 11pm." },
  { name: "Priya M.", role: "Fitness coach", quote: "Nutrition breakdown on every recipe makes meal planning for clients so much faster." },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center font-display text-3xl font-semibold text-ink sm:text-4xl">
        Loved in home kitchens
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-card border border-ink/10 bg-card p-6"
          >
            <Quote size={20} className="text-saffron" />
            <p className="mt-3 text-sm text-ink/80">"{t.quote}"</p>
            <p className="mt-4 font-display text-sm font-semibold text-ink">{t.name}</p>
            <p className="text-xs text-ink/50">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
