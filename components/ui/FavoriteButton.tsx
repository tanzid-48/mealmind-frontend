"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";

export function FavoriteButton({ recipeId }: { recipeId: string }) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!session) {
      setChecked(true);
      return;
    }
    api
      .getFavoriteIds()
      .then((ids) => setIsFavorite((ids as string[]).includes(recipeId)))
      .finally(() => setChecked(true));
  }, [session, recipeId]);

  const toggle = async () => {
    if (!session) {
      toast.error("Log in to save favorites.");
      return;
    }
    try {
      if (isFavorite) {
        await api.removeFavorite(recipeId);
        setIsFavorite(false);
        toast.success("Removed from favorites.");
      } else {
        await api.addFavorite(recipeId);
        setIsFavorite(true);
        toast.success("Saved to favorites!");
      }
    } catch (err: any) {
      toast.error(err.message || "Could not update favorites.");
    }
  };

  if (!checked) return null;

  return (
    <button
      onClick={toggle}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
        isFavorite
          ? "border-paprika bg-paprika/10 text-paprika"
          : "border-ink/15 text-ink/50 hover:border-paprika/40 hover:text-paprika"
      }`}
    >
      <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
    </button>
  );
}
