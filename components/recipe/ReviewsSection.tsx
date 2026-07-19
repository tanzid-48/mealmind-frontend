"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import type { Review } from "@/types/recipe";

export function ReviewsSection({ recipeId }: { recipeId: string }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = () => {
    api
      .getReviews(recipeId)
      .then((data) => setReviews(data as Review[]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("Log in to leave a review.");
      return;
    }
    if (rating === 0) {
      toast.error("Pick a star rating first.");
      return;
    }
    setSubmitting(true);
    try {
      await api.createReview({ recipeId, rating, comment });
      toast.success("Review posted!");
      setRating(0);
      setComment("");
      loadReviews();
    } catch (err: any) {
      toast.error(err.message || "Could not post review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12">
      <h2 className="font-display text-lg font-semibold text-ink">
        Reviews {reviews.length > 0 && <span className="text-ink/40">({reviews.length})</span>}
      </h2>

      {/* Review form */}
      <form onSubmit={submitReview} className="mt-4 rounded-card border border-ink/10 bg-card p-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(n)}
              className="text-saffron"
            >
              <Star size={22} fill={n <= (hoverRating || rating) ? "currentColor" : "none"} />
            </button>
          ))}
          <span className="ml-2 text-xs text-ink/50">
            {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""}` : "Rate this recipe"}
          </span>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts (optional)..."
          rows={2}
          className="mt-3 w-full rounded-card border border-ink/15 bg-paper px-3 py-2 text-sm focus:outline-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-full bg-herb px-4 py-2 text-xs font-medium text-white disabled:opacity-60 dark:bg-saffron dark:text-ink"
        >
          {submitting ? "Posting..." : "Post review"}
        </button>
      </form>

      {/* Review list */}
      <div className="mt-6 space-y-4">
        {loading && <p className="text-sm text-ink/40">Loading reviews...</p>}
        {!loading && reviews.length === 0 && (
          <p className="text-sm text-ink/40">No reviews yet — be the first to try this recipe.</p>
        )}
        {reviews.map((r) => (
          <div key={r._id} className="border-b border-ink/10 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink">{r.userName}</span>
              <div className="flex items-center gap-0.5 text-saffron">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill={i < r.rating ? "currentColor" : "none"} />
                ))}
              </div>
            </div>
            {r.comment && <p className="mt-1 text-sm text-ink/70">{r.comment}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
