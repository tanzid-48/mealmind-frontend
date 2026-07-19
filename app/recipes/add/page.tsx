"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { api } from "@/lib/api";

export default function AddRecipePage() {
  const { session, isPending } = useProtectedRoute();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [steps, setSteps] = useState<string[]>([""]);
  const [ingredients, setIngredients] = useState([{ name: "", qty: "" }]);
  const [cuisineType, setCuisineType] = useState("Bangladeshi");
  const [dietType, setDietType] = useState("Any");
  const [cookTime, setCookTime] = useState(20);
  const [difficulty, setDifficulty] = useState("Easy");
  const [servings, setServings] = useState(2);
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [suggestingTags, setSuggestingTags] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const suggestTags = async () => {
    if (!title.trim() || ingredients.filter((i) => i.name).length === 0) {
      toast.error("Add a title and at least one ingredient first.");
      return;
    }
    setSuggestingTags(true);
    try {
      const data = (await api.generateTags({
        title,
        ingredients: ingredients.filter((i) => i.name).map((i) => i.name),
      })) as { tags: string[] };
      setTags(Array.from(new Set([...tags, ...data.tags])));
    } catch (err: any) {
      toast.error(err.message || "Could not suggest tags.");
    } finally {
      setSuggestingTags(false);
    }
  };

  if (isPending || !session) {
    return <div className="mx-auto max-w-2xl px-6 py-20 text-center text-ink/50">Checking session...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.createRecipe({
        title,
        shortDesc,
        steps: steps.filter(Boolean),
        ingredients: ingredients.filter((i) => i.name && i.qty),
        images: imageUrl ? [imageUrl] : [],
        cuisineType,
        dietType,
        cookTime,
        difficulty,
        servings,
        tags,
        nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      });
      toast.success("Recipe added!");
      router.push("/recipes/manage");
    } catch (err: any) {
      setError(err.message || "Could not add recipe.");
      toast.error(err.message || "Could not add recipe.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Add a new recipe</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="text-sm font-medium text-ink/80">Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-card border border-ink/15 bg-card px-4 py-2.5 text-sm focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-ink/80">Short description</label>
          <input
            required
            maxLength={200}
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            className="mt-1 w-full rounded-card border border-ink/15 bg-card px-4 py-2.5 text-sm focus:outline-none"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="text-sm font-medium text-ink/80">Ingredients</label>
          {ingredients.map((ing, i) => (
            <div key={i} className="mt-2 flex gap-2">
              <input
                placeholder="Ingredient"
                value={ing.name}
                onChange={(e) => {
                  const copy = [...ingredients];
                  copy[i].name = e.target.value;
                  setIngredients(copy);
                }}
                className="w-2/3 rounded-card border border-ink/15 bg-card px-3 py-2 text-sm"
              />
              <input
                placeholder="Qty (e.g. 200g)"
                value={ing.qty}
                onChange={(e) => {
                  const copy = [...ingredients];
                  copy[i].qty = e.target.value;
                  setIngredients(copy);
                }}
                className="w-1/3 rounded-card border border-ink/15 bg-card px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={() => setIngredients(ingredients.filter((_, idx) => idx !== i))}
                className="text-paprika"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setIngredients([...ingredients, { name: "", qty: "" }])}
            className="mt-2 flex items-center gap-1 text-sm font-medium text-herb dark:text-saffron"
          >
            <Plus size={14} /> Add ingredient
          </button>
        </div>

        {/* Steps */}
        <div>
          <label className="text-sm font-medium text-ink/80">Full description / steps</label>
          {steps.map((step, i) => (
            <div key={i} className="mt-2 flex gap-2">
              <textarea
                placeholder={`Step ${i + 1}`}
                value={step}
                onChange={(e) => {
                  const copy = [...steps];
                  copy[i] = e.target.value;
                  setSteps(copy);
                }}
                className="w-full rounded-card border border-ink/15 bg-card px-3 py-2 text-sm"
                rows={2}
              />
              <button
                type="button"
                onClick={() => setSteps(steps.filter((_, idx) => idx !== i))}
                className="text-paprika"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setSteps([...steps, ""])}
            className="mt-2 flex items-center gap-1 text-sm font-medium text-herb dark:text-saffron"
          >
            <Plus size={14} /> Add step
          </button>
        </div>

        {/* Tags */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-ink/80">Tags</label>
            <button
              type="button"
              onClick={suggestTags}
              disabled={suggestingTags}
              className="flex items-center gap-1 rounded-full border border-herb/30 px-3 py-1 text-xs font-medium text-herb disabled:opacity-60 dark:border-saffron/30 dark:text-saffron"
            >
              <Sparkles size={12} /> {suggestingTags ? "Thinking..." : "Suggest with AI"}
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="pantry-tag flex items-center gap-1 border border-ink/15 bg-card px-3 py-1 font-mono text-xs">
                {tag}
                <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))}>
                  <X size={12} />
                </button>
              </span>
            ))}
            {tags.length === 0 && (
              <p className="text-xs text-ink/40">No tags yet — fill in title & ingredients, then try "Suggest with AI".</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-ink/80">Cuisine type</label>
            <input value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} className="mt-1 w-full rounded-card border border-ink/15 bg-card px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink/80">Diet type</label>
            <input value={dietType} onChange={(e) => setDietType(e.target.value)} className="mt-1 w-full rounded-card border border-ink/15 bg-card px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink/80">Cook time (minutes)</label>
            <input type="number" min={1} value={cookTime} onChange={(e) => setCookTime(+e.target.value)} className="mt-1 w-full rounded-card border border-ink/15 bg-card px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink/80">Servings</label>
            <input type="number" min={1} value={servings} onChange={(e) => setServings(+e.target.value)} className="mt-1 w-full rounded-card border border-ink/15 bg-card px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-ink/80">Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-1 w-full rounded-card border border-ink/15 bg-card px-3 py-2 text-sm">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-ink/80">Image URL (optional)</label>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 w-full rounded-card border border-ink/15 bg-card px-3 py-2 text-sm" />
          </div>
        </div>

        {error && <p className="text-sm text-paprika">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-paprika py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit recipe"}
        </button>
      </form>
    </section>
  );
}
