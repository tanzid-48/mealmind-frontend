"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "Is MealMind free to use?", a: "Yes, browsing and generating recipes is free. Create an account to save recipes and chat with the AI chef." },
  { q: "What if the AI recipe doesn't match my diet?", a: "You can set a diet preference (vegan, keto, high-protein, etc.) before generating, and regenerate as many times as you like." },
  { q: "Can I add my own recipes?", a: "Yes — once logged in, go to Add Recipe and it'll appear in the public explore page and your own Manage Recipes list." },
  { q: "Does the AI chef remember our conversation?", a: "Yes, each chat session keeps its history so you can ask follow-up questions naturally." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-center font-display text-3xl font-semibold text-ink sm:text-4xl">
        Frequently asked questions
      </h2>
      <div className="mt-10 space-y-3">
        {faqs.map((faq, i) => (
          <div key={faq.q} className="rounded-card border border-ink/10 bg-card">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium text-ink">{faq.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }}>
                <ChevronDown size={18} className="text-ink/50" />
              </motion.span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden px-5"
                >
                  <p className="pb-4 text-sm text-ink/70">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
