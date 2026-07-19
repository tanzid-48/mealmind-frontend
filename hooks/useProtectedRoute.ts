"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

// Redirects to /login if there's no active session.
// Use at the top of any page under /recipes/add, /recipes/manage, /ai-chef, etc.
export function useProtectedRoute() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  return { session, isPending };
}
