"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { RecipeCard } from "@/components/ui/RecipeCard";
import { RecipeCardSkeleton } from "@/components/ui/RecipeCardSkeleton";
import { api } from "@/lib/api";
import type { Recipe, RecipeListResponse } from "@/types/recipe";

const cuisines = ["", "Bangladeshi", "Italian", "Chinese", "Indian", "Continental"];
const diets = ["", "Any", "Vegan", "Vegetarian", "Keto", "High-Protein"];

export default function ExplorePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search input so we don't hit the API on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = (await api.getRecipes({
        search,
        cuisine,
        diet,
        sort,
        page: String(page),
        limit: "8",
      })) as RecipeListResponse;
      setRecipes(data.recipes);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError("Could not load recipes. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [search, cuisine, diet, sort, page]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        Explore recipes
      </h1>

      {/* Search + filters */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 min-w-[220px] items-center gap-2 rounded-full border border-ink/15 bg-card px-4 py-2.5">
          <Search size={16} className="text-ink/40" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </div>

        <select
          value={cuisine}
          onChange={(e) => {
            setPage(1);
            setCuisine(e.target.value);
          }}
          className="rounded-full border border-ink/15 bg-card px-4 py-2.5 text-sm"
        >
          <option value="">All cuisines</option>
          {cuisines.slice(1).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={diet}
          onChange={(e) => {
            setPage(1);
            setDiet(e.target.value);
          }}
          className="rounded-full border border-ink/15 bg-card px-4 py-2.5 text-sm"
        >
          <option value="">All diets</option>
          {diets.slice(1).map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-ink/15 bg-card px-4 py-2.5 text-sm"
        >
          <option value="newest">Newest</option>
          <option value="rating">Top rated</option>
          <option value="quickest">Quickest</option>
        </select>
      </div>

      {/* Results */}
      {error && (
        <p className="mt-8 rounded-card border border-paprika/30 bg-paprika/5 p-4 text-sm text-paprika">
          {error}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading &&
          Array.from({ length: 8 }).map((_, i) => <RecipeCardSkeleton key={i} />)}

        {!loading && recipes.length === 0 && !error && (
          <p className="col-span-full text-center text-sm text-ink/50">
            No recipes match your search yet. Try a different filter, or be the first
            to add one.
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

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-mono text-sm text-ink/70">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
