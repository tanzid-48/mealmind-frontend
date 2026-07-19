import { ChefHat, Sparkles, Users, Heart } from "lucide-react";

const values = [
  { icon: Sparkles, title: "AI that actually helps", desc: "No gimmicks — the AI chef and recipe generator solve a real problem: figuring out what to cook with what you already have." },
  { icon: Users, title: "Built by home cooks", desc: "MealMind started as a final-year project by a developer tired of wasting ingredients and Googling substitutions mid-recipe." },
  { icon: Heart, title: "No wasted food", desc: "Every feature is designed around one goal: helping you use what's in your kitchen before it goes bad." },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex items-center gap-2 text-herb dark:text-saffron">
        <ChefHat size={26} />
        <span className="font-display text-lg font-semibold">MealMind</span>
      </div>

      <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
        About MealMind AI
      </h1>
      <p className="mt-4 max-w-2xl text-ink/70">
        MealMind AI turns whatever's in your fridge into a real recipe. Tell us your
        ingredients, and our AI builds a complete recipe around them — with nutrition
        info, step-by-step instructions, and a chef on standby for follow-up questions.
        It's built as a SCIC-13 career incubator project, combining a full MERN-style
        stack with a genuinely useful AI feature set rather than a chatbot bolted onto
        a CRUD app.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-card border border-ink/10 bg-card p-6">
            <v.icon size={22} className="text-saffron" />
            <h3 className="mt-3 font-display text-base font-semibold text-ink">{v.title}</h3>
            <p className="mt-2 text-sm text-ink/70">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
