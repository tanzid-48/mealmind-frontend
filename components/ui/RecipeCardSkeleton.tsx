export function RecipeCardSkeleton() {
  return (
    <div className="index-card overflow-hidden rounded-b-card bg-card">
      <div className="h-40 w-full animate-pulse bg-ink/10" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-ink/10" />
        <div className="h-3 w-full animate-pulse rounded bg-ink/10" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-ink/10" />
        <div className="mt-3 h-8 w-full animate-pulse rounded-full bg-ink/10" />
      </div>
    </div>
  );
}
