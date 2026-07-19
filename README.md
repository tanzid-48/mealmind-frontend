# MealMind AI — Frontend (Phase 2)

## What's included in this phase
- Next.js 14 (App Router) + TypeScript + Tailwind
- Design system: kitchen recipe-box aesthetic (see plan.md for full token list)
  - Fraunces (display), Inter (body), IBM Plex Mono (meta/numbers)
  - Colors: herb green, saffron gold, paprika red, parchment/cream neutrals
  - Signature "index card" recipe card with torn-edge top and pantry-jar tags
- Dark/light mode via next-themes (toggle in navbar)
- Fully responsive Navbar + Footer
- Landing page with 7 sections: Hero, How It Works, Trending Recipes, Categories,
  Stats, Testimonials, FAQ, Newsletter
- RecipeCard + RecipeCardSkeleton components (ready for Phase 3 listing page)

## How to run locally

1. Open a terminal in this `client/` folder
2. Install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open http://localhost:3000 — you should see the full landing page.

Make sure the backend (Phase 1) is also running on port 5000 at the same time,
since some features later will call it.

## Note on placeholder content
The "Trending This Week" section currently uses 4 hardcoded sample recipes with
real Unsplash images — this gets replaced with a live call to
`GET /api/recipes?sort=rating` from the backend in Phase 3. This is normal at
this stage and is not the same as lorem-ipsum placeholder text.

## Next phase
Phase 3: Explore/Listing page (search, filter, sort, pagination), Recipe Details
page, and the protected Add/Manage Recipe pages — wired to the Phase 1 backend.
