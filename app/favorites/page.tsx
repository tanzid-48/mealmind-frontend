"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { api } from "@/lib/api";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { RecipeCardSkeleton } from "@/components/ui/RecipeCardSkeleton";
import type { Recipe } from "@/types/recipe";

export default function FavoritesPage() {
  const { session, isPending } = useProtectedRoute();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    api
      .getFavorites()
      .then((data) => setRecipes(data as Recipe[]))
      .finally(() => setLoading(false));
  }, [session]);

  if (isPending || !session) {
    return <div className="mx-auto max-w-6xl px-6 py-20 text-center text-ink/50">Checking session...</div>;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex items-center gap-2 text-herb dark:text-saffron">
        <Heart size={22} fill="currentColor" />
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">My Favorites</h1>
      </div>
      <p className="mt-1 text-sm text-ink/60">Recipes you've saved for later.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => <RecipeCardSkeleton key={i} />)}

        {!loading && recipes.length === 0 && (
          <p className="col-span-full rounded-card border border-ink/10 bg-card p-10 text-center text-sm text-ink/60">
            No favorites yet. Browse <a href="/explore" className="text-paprika hover:underline dark:text-saffron">recipes</a> and tap the heart icon to save them here.
          </p>
        )}

        {!loading &&
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              id={recipe._id}
              title={recipe.title}
              shortDesc={recipe.shortDesc}
              image={recipe.images[0]}
              cookTime={recipe.cookTime}
              rating={recipe.ratingAvg}
              difficulty={recipe.difficulty}
            />
          ))}
      </div>
    </section>
  );
}
