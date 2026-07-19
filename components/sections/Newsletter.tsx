"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export function Newsletter() {
  return (
    <section className="px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl rounded-card border border-ink/10 bg-card p-10 text-center"
      >
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Get a new recipe idea every week
        </h2>
        <p className="mt-2 text-sm text-ink/70">
          No spam — just one AI-picked recipe worth trying, straight to your inbox.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-full border border-ink/15 bg-paper px-2 py-1.5"
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="w-full bg-transparent px-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1 rounded-full bg-paprika px-4 py-2 text-xs font-medium text-white"
          >
            Subscribe <Send size={12} />
          </button>
        </form>
      </motion.div>
    </section>
  );
}
