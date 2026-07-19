"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChefHat, ArrowRight } from "lucide-react";

const sampleExchange = [
  { role: "user", text: "What can I use instead of buttermilk?" },
  { role: "assistant", text: "Mix 1 cup milk with 1 tbsp lemon juice or vinegar, let it sit 5 minutes — works great as a 1:1 substitute." },
  { role: "user", text: "Perfect, thanks!" },
];

export function AIChefTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-herb dark:text-saffron">
            <ChefHat size={22} />
            <span className="font-mono text-xs uppercase tracking-wide">Always in the kitchen with you</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Stuck mid-recipe? Just ask.
          </h2>
          <p className="mt-3 max-w-md text-ink/70">
            The AI Chef remembers your conversation, understands substitutions, timing,
            and technique — like texting a friend who actually knows how to cook.
          </p>
          <Link
            href="/ai-chef"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-herb px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105 dark:bg-saffron dark:text-ink"
          >
            Chat with the AI Chef <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="index-card rounded-b-card bg-card p-6"
        >
          <div className="space-y-3">
            {sampleExchange.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-card px-4 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-herb text-white dark:bg-saffron dark:text-ink"
                      : "border border-ink/10 bg-paper text-ink"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
