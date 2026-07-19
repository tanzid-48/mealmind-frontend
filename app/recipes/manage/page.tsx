"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { api } from "@/lib/api";
import { safeImageSrc } from "@/lib/image";
import type { Recipe } from "@/types/recipe";

export default function ManageRecipesPage() {
  const { session, isPending } = useProtectedRoute();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    api
      .getMyRecipes()
      .then((data) => setRecipes(data as Recipe[]))
      .finally(() => setLoading(false));
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this recipe? This can't be undone.")) return;
    try {
      await api.deleteRecipe(id);
      setRecipes((prev) => prev.filter((r) => r._id !== id));
      toast.success("Recipe deleted.");
    } catch (err: any) {
      toast.error(err.message || "Could not delete recipe.");
    }
  };

  if (isPending || !session) {
    return <div className="mx-auto max-w-5xl px-6 py-20 text-center text-ink/50">Checking session...</div>;
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-ink">My recipes</h1>
        <Link href="/recipes/add" className="rounded-full bg-paprika px-4 py-2 text-sm font-medium text-white">
          + Add Recipe
        </Link>
      </div>

      {loading && <p className="mt-8 text-sm text-ink/50">Loading your recipes...</p>}

      {!loading && recipes.length === 0 && (
        <p className="mt-8 rounded-card border border-ink/10 bg-card p-8 text-center text-sm text-ink/60">
          You haven't added any recipes yet. Click "Add Recipe" to share your first one.
        </p>
      )}

      {!loading && recipes.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-card border border-ink/10">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-card font-mono text-xs uppercase text-ink/50">
              <tr>
                <th className="px-4 py-3">Recipe</th>
                <th className="hidden px-4 py-3 sm:table-cell">Cuisine</th>
                <th className="px-4 py-3">Cook time</th>
                <th className="hidden px-4 py-3 sm:table-cell">Rating</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((r) => (
                <tr key={r._id} className="border-t border-ink/10 bg-paper">
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
                      <Image
                        src={safeImageSrc(r.images[0])}
                        alt={r.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-ink">{r.title}</span>
                  </td>
                  <td className="hidden px-4 py-3 text-ink/70 sm:table-cell">{r.cuisineType}</td>
                  <td className="px-4 py-3 font-mono text-ink/70">{r.cookTime}m</td>
                  <td className="hidden px-4 py-3 font-mono text-saffron sm:table-cell">{r.ratingAvg.toFixed(1)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-3">
                      <Link href={`/recipes/${r._id}`} className="text-herb dark:text-saffron">
                        <Eye size={16} />
                      </Link>
                      <button onClick={() => handleDelete(r._id)} className="text-paprika">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
