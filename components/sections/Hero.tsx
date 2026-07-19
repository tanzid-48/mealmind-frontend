"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Clock, ChefHat, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

const suggestions = ["Chicken", "Rice", "Tomato", "Spinach", "Eggs", "Garlic"];
const MAX_DEMO_INGREDIENTS = 3;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface DemoRecipe {
  title: string;
  shortDesc: string;
  cookTime: number;
  difficulty: string;
  previewSteps: string[];
  totalSteps: number;
}

export function Hero() {
  const [chips, setChips] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoRecipe, setDemoRecipe] = useState<DemoRecipe | null>(null);

  const toggleChip = (item: string) => {
    setChips((prev) => {
      if (prev.includes(item)) return prev.filter((c) => c !== item);
      if (prev.length >= MAX_DEMO_INGREDIENTS) {
        toast.info(`Demo is capped at ${MAX_DEMO_INGREDIENTS} ingredients — sign up for unlimited.`);
        return prev;
      }
      return [...prev, item];
    });
  };

  const addCustomIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    const val = customInput.trim();
    if (!val) return;
    if (chips.includes(val)) {
      setCustomInput("");
      return;
    }
    if (chips.length >= MAX_DEMO_INGREDIENTS) {
      toast.info(`Demo is capped at ${MAX_DEMO_INGREDIENTS} ingredients — sign up for unlimited.`);
      return;
    }
    setChips([...chips, val]);
    setCustomInput("");
  };

  const generateDemo = async () => {
    if (chips.length === 0) {
      toast.error("Pick or type at least one ingredient first.");
      return;
    }
    setLoading(true);
    setDemoRecipe(null);
    try {
      const res = await fetch(`${API_URL}/api/ai/demo-generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: chips }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not generate a preview. Try again.");
        return;
      }
      setDemoRecipe(data);
    } catch {
      toast.error("Could not reach the AI. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center gap-2 rounded-full border border-saffron/40 bg-saffron/10 px-4 py-1.5 font-mono text-xs text-herb dark:text-saffron"
      >
        <Sparkles size={14} /> AI-powered recipes from your own pantry
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl"
      >
        What's in your fridge?
        <br />
        <span className="text-paprika dark:text-saffron">Let's cook something.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 max-w-xl text-base text-ink/70"
      >
        Tell MealMind what ingredients you have, and get a recipe built around them —
        with nutrition info, step-by-step instructions, and a chef on standby.
      </motion.p>

      <motion.form
        onSubmit={addCustomIngredient}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 flex w-full max-w-xl items-center gap-2 rounded-full border border-ink/15 bg-card px-4 py-2 shadow-sm"
      >
        <Search size={18} className="text-ink/40" />
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Type an ingredient and press Enter..."
          className="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
        />
      </motion.form>

      <div className="mt-5 flex max-w-xl flex-wrap items-center justify-center gap-2">
        {suggestions.map((item, i) => (
          <motion.button
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
            onClick={() => toggleChip(item)}
            className={`pantry-tag border px-4 py-1.5 font-mono text-xs transition-colors ${
              chips.includes(item)
                ? "border-herb bg-herb text-white dark:bg-saffron dark:text-ink"
                : "border-ink/20 bg-card text-ink/70 hover:border-herb/50"
            }`}
          >
            {item}
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        onClick={generateDemo}
        disabled={loading}
        className="mt-8 flex items-center gap-2 rounded-full bg-paprika px-8 py-3 font-medium text-white shadow-lg shadow-paprika/20 transition-transform hover:scale-105 disabled:opacity-60"
      >
        <Sparkles size={16} />
        {loading ? "Cooking up an idea..." : "Generate My Recipe"}
      </motion.button>
      <p className="mt-2 text-xs text-ink/40">
        Free preview, no account needed — up to {MAX_DEMO_INGREDIENTS} ingredients
      </p>

      {/* Live demo result */}
      <AnimatePresence>
        {demoRecipe && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="index-card mt-8 w-full max-w-xl rounded-b-card bg-card p-6 text-left"
          >
            <div className="flex items-center gap-2 text-saffron">
              <ChefHat size={16} />
              <span className="font-mono text-xs uppercase tracking-wide">AI preview</span>
            </div>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">{demoRecipe.title}</h3>
            <p className="mt-1 text-sm text-ink/70">{demoRecipe.shortDesc}</p>

            <div className="mt-3 flex gap-5 font-mono text-xs text-ink/60">
              <span className="flex items-center gap-1"><Clock size={12} /> {demoRecipe.cookTime} min</span>
              <span>{demoRecipe.difficulty}</span>
            </div>

            <ol className="mt-4 space-y-2">
              {demoRecipe.previewSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink/80">
                  <span className="font-mono text-herb dark:text-saffron">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>

            {demoRecipe.totalSteps > demoRecipe.previewSteps.length && (
              <p className="mt-2 text-xs text-ink/40">
                +{demoRecipe.totalSteps - demoRecipe.previewSteps.length} more step
                {demoRecipe.totalSteps - demoRecipe.previewSteps.length > 1 ? "s" : ""} — sign up to see the full recipe
              </p>
            )}

            <Link
              href="/register"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-herb py-2.5 text-sm font-medium text-white dark:bg-saffron dark:text-ink"
            >
              Sign up to save & unlock full recipe <ArrowRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
