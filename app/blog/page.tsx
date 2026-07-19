const posts = [
  { title: "5 ingredient swaps that save a broken recipe", desc: "Out of buttermilk? No eggs? Here's what actually works as a substitute — and what doesn't." },
  { title: "How to read a nutrition label in 10 seconds", desc: "Skip the jargon. Here's what actually matters when you're checking calories, protein, and sugar." },
  { title: "Meal prepping for one, without the boredom", desc: "Cooking for one doesn't mean eating the same three meals on repeat. A few tricks that help." },
];

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Cooking tips & notes</h1>
      <p className="mt-2 text-ink/70">Short, practical reads from the MealMind kitchen.</p>

      <div className="mt-10 space-y-6">
        {posts.map((post) => (
          <article key={post.title} className="rounded-card border border-ink/10 bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-ink">{post.title}</h2>
            <p className="mt-2 text-sm text-ink/70">{post.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
