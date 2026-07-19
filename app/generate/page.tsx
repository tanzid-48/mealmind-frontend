"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, X, Sparkles, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { api } from "@/lib/api";

interface GeneratedRecipe {
  title: string;
  shortDesc: string;
  steps: string[];
  cookTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  nutrition: { calories: number; protein: number; carbs: number; fat: number };
}

const diets = ["Any", "Vegan", "Vegetarian", "Keto", "High-Protein"];

export default function GenerateRecipePage() {
  const { session, isPending } = useProtectedRoute();
  const router = useRouter();

  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietType, setDietType] = useState("Any");
  const [servings, setServings] = useState(2);
  const [detailLevel, setDetailLevel] = useState<"short" | "detailed">("detailed");

  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  if (isPending || !session) {
    return <div className="mx-auto max-w-2xl px-6 py-20 text-center text-ink/50">Checking session...</div>;
  }

  const addIngredient = () => {
    const val = ingredientInput.trim();
    if (val && !ingredients.includes(val)) {
      setIngredients([...ingredients, val]);
      setIngredientInput("");
    }
  };

  const generate = async () => {
    if (ingredients.length === 0) {
      toast.error("Add at least one ingredient first.");
      return;
    }
    setLoading(true);
    try {
      const data = (await api.generateRecipe({
        ingredients,
        dietType,
        servings,
        detailLevel,
      })) as GeneratedRecipe;
      setRecipe(data);
    } catch (err: any) {
      toast.error(err.message || "AI could not generate a recipe. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveRecipe = async () => {
    if (!recipe) return;
    setSaving(true);
    try {
      await api.createRecipe({
        title: recipe.title,
        shortDesc: recipe.shortDesc,
        steps: recipe.steps,
        ingredients: ingredients.map((name) => ({ name, qty: "as needed" })),
        images: [],
        cuisineType: "AI Generated",
        dietType,
        cookTime: recipe.cookTime,
        difficulty: recipe.difficulty,
        servings,
        nutrition: recipe.nutrition,
      });
      toast.success("Saved to your recipes!");
      router.push("/recipes/manage");
    } catch (err: any) {
      toast.error(err.message || "Could not save recipe.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex items-center gap-2 text-herb dark:text-saffron">
        <Sparkles size={22} />
        <h1 className="font-display text-3xl font-semibold text-ink">AI Recipe Generator</h1>
      </div>
      <p className="mt-2 text-sm text-ink/60">
        Tell us what's in your kitchen — we'll build a recipe around it.
      </p>

      {/* Ingredient input */}
      <div className="mt-8">
        <label className="text-sm font-medium text-ink/80">Ingredients</label>
        <div className="mt-2 flex gap-2">
          <input
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addIngredient())}
            placeholder="e.g. chicken, garlic, spinach"
            className="w-full rounded-full border border-ink/15 bg-card px-4 py-2.5 text-sm focus:outline-none"
          />
          <button
            onClick={addIngredient}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-herb text-white dark:bg-saffron dark:text-ink"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {ingredients.map((ing) => (
            <span key={ing} className="pantry-tag flex items-center gap-1 border border-ink/15 bg-card px-3 py-1 font-mono text-xs">
              {ing}
              <button onClick={() => setIngredients(ingredients.filter((i) => i !== ing))}>
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-ink/80">Diet</label>
          <select value={dietType} onChange={(e) => setDietType(e.target.value)} className="mt-1 w-full rounded-full border border-ink/15 bg-card px-4 py-2.5 text-sm">
            {diets.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-ink/80">Servings</label>
          <input type="number" min={1} value={servings} onChange={(e) => setServings(+e.target.value)} className="mt-1 w-full rounded-full border border-ink/15 bg-card px-4 py-2.5 text-sm" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-sm font-medium text-ink/80">Output length:</span>
        <button
          onClick={() => setDetailLevel("short")}
          className={`rounded-full px-3 py-1 text-xs ${detailLevel === "short" ? "bg-herb text-white dark:bg-saffron dark:text-ink" : "border border-ink/15"}`}
        >
          Short
        </button>
        <button
          onClick={() => setDetailLevel("detailed")}
          className={`rounded-full px-3 py-1 text-xs ${detailLevel === "detailed" ? "bg-herb text-white dark:bg-saffron dark:text-ink" : "border border-ink/15"}`}
        >
          Detailed
        </button>
      </div>

      <button
        onClick={generate}
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-paprika py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        <Sparkles size={16} />
        {loading ? "Generating..." : recipe ? "Regenerate" : "Generate My Recipe"}
      </button>

      {/* Result */}
      {recipe && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="index-card mt-8 rounded-b-card bg-card p-6"
        >
          <h2 className="font-display text-xl font-semibold text-ink">{recipe.title}</h2>
          <p className="mt-1 text-sm text-ink/70">{recipe.shortDesc}</p>

          <div className="mt-3 flex gap-6 font-mono text-xs text-ink/60">
            <span>{recipe.cookTime} min</span>
            <span>{recipe.difficulty}</span>
            <span>{recipe.nutrition.calories} cal</span>
          </div>

          <ol className="mt-4 space-y-2">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink/80">
                <span className="font-mono text-herb dark:text-saffron">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-6 flex gap-3">
            <button
              onClick={generate}
              className="flex items-center gap-1 rounded-full border border-ink/15 px-4 py-2 text-xs font-medium"
            >
              <RotateCcw size={12} /> Regenerate
            </button>
            <button
              onClick={saveRecipe}
              disabled={saving}
              className="flex items-center gap-1 rounded-full bg-herb px-4 py-2 text-xs font-medium text-white dark:bg-saffron dark:text-ink"
            >
              <Save size={12} /> {saving ? "Saving..." : "Save recipe"}
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
