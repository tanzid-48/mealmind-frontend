"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Clock, Star, Users, ChefHat } from "lucide-react";
import { api } from "@/lib/api";
import { safeImageSrc } from "@/lib/image";
import { NutritionChart } from "@/components/ui/NutritionChart";
import { FavoriteButton } from "@/components/ui/FavoriteButton";
import { ReviewsSection } from "@/components/recipe/ReviewsSection";
import { RelatedRecipes } from "@/components/recipe/RelatedRecipes";
import type { Recipe } from "@/types/recipe";

export default function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getRecipeById(id)
      .then((data) => setRecipe(data as Recipe))
      .catch(() => setError("Recipe not found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 text-center text-ink/50">Loading recipe...</div>;
  }

  if (error || !recipe) {
    return <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 text-center text-paprika">{error}</div>;
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="relative h-56 w-full overflow-hidden rounded-card bg-herb/10 sm:h-96">
        <Image
          src={safeImageSrc(recipe.images[0])}
          alt={recipe.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-4xl">
            {recipe.title}
          </h1>
          <p className="mt-2 text-sm text-ink/70 sm:text-base">{recipe.shortDesc}</p>
        </div>
        <FavoriteButton recipeId={recipe._id} />
      </div>

      {recipe.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <span key={tag} className="pantry-tag border border-ink/15 bg-card px-3 py-1 font-mono text-xs text-ink/60">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-ink/60 sm:gap-6 sm:text-sm">
        <span className="flex items-center gap-1"><Clock size={14} /> {recipe.cookTime} min</span>
        <span className="flex items-center gap-1"><Users size={14} /> {recipe.servings} servings</span>
        <span className="flex items-center gap-1 text-saffron"><Star size={14} fill="currentColor" /> {recipe.ratingAvg.toFixed(1)} ({recipe.ratingCount})</span>
        <span className="flex items-center gap-1"><ChefHat size={14} /> {recipe.difficulty}</span>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {/* Ingredients */}
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Ingredients</h2>
          <ul className="mt-3 space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="pantry-tag inline-block w-full border border-ink/10 bg-card px-3 py-1.5 text-sm">
                {ing.name} — <span className="font-mono text-ink/60">{ing.qty}</span>
              </li>
            ))}
          </ul>

          {/* Nutrition chart */}
          <h2 className="mt-8 font-display text-lg font-semibold text-ink">Nutrition</h2>
          <div className="mt-3">
            <NutritionChart nutrition={recipe.nutrition} />
          </div>
        </div>

        {/* Steps */}
        <div className="md:col-span-2">
          <h2 className="font-display text-lg font-semibold text-ink">Instructions</h2>
          <ol className="mt-3 space-y-4">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-herb/10 font-mono text-xs text-herb dark:bg-saffron/10 dark:text-saffron">
                  {i + 1}
                </span>
                <p className="text-sm text-ink/80">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <ReviewsSection recipeId={recipe._id} />
      <RelatedRecipes recipeId={recipe._id} />
    </section>
  );
}
