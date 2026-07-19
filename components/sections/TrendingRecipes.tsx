"use client";

import { motion } from "framer-motion";
import { RecipeCard } from "@/components/ui/RecipeCard";

// Placeholder data — replaced by a real API call to GET /api/recipes?sort=rating in Phase 3
const trending = [
  { title: "Garlic Butter Chicken", shortDesc: "Pan-seared chicken thighs in a garlicky herb butter sauce.", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400", cookTime: 25, rating: 4.8, difficulty: "Easy" },
  { title: "Spinach & Egg Skillet", shortDesc: "A one-pan breakfast loaded with greens and soft eggs.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400", cookTime: 15, rating: 4.6, difficulty: "Easy" },
  { title: "Tomato Basil Risotto", shortDesc: "Creamy arborio rice simmered with fresh tomato and basil.", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400", cookTime: 40, rating: 4.9, difficulty: "Medium" },
  { title: "Ginger Soy Salmon", shortDesc: "Flaky salmon glazed with a ginger-soy reduction.", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400", cookTime: 20, rating: 4.7, difficulty: "Medium" },
];

export function TrendingRecipes() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Trending this week
        </h2>
        <a href="/explore" className="text-sm font-medium text-paprika hover:underline dark:text-saffron">
          View all →
        </a>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trending.map((recipe, i) => (
          <motion.div
            key={recipe.title}
            initial={{ opacity: 0, y: 60, rotate: -6, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: i * 0.1 }}
          >
            <RecipeCard {...recipe} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
