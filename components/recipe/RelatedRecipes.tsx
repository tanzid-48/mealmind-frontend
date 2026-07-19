"use client";

import { useEffect, useState } from "react";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { api } from "@/lib/api";
import type { Recipe } from "@/types/recipe";

export function RelatedRecipes({ recipeId }: { recipeId: string }) {
  const [related, setRelated] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getRelatedRecipes(recipeId)
      .then((data) => setRelated(data as Recipe[]))
      .finally(() => setLoading(false));
  }, [recipeId]);

  if (loading || related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-display text-lg font-semibold text-ink">You might also like</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {related.map((r) => (
          <RecipeCard
            key={r._id}
            id={r._id}
            title={r.title}
            shortDesc={r.shortDesc}
            image={r.images[0]}
            cookTime={r.cookTime}
            rating={r.ratingAvg}
            difficulty={r.difficulty}
          />
        ))}
      </div>
    </section>
  );
}
