const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include", // send Better Auth session cookie
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  getRecipes: (params: Record<string, string>) =>
    request(`/api/recipes?${new URLSearchParams(params).toString()}`),

  getRecipeById: (id: string) => request(`/api/recipes/${id}`),

  getMyRecipes: () => request(`/api/recipes/mine`),

  createRecipe: (data: unknown) =>
    request(`/api/recipes`, { method: "POST", body: JSON.stringify(data) }),

  deleteRecipe: (id: string) =>
    request(`/api/recipes/${id}`, { method: "DELETE" }),

  generateRecipe: (data: unknown) =>
    request(`/api/ai/generate-recipe`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getChatHistory: (sessionId: string) =>
    request(`/api/ai/chat/history/${sessionId}`),

  getRelatedRecipes: (id: string) => request(`/api/recipes/${id}/related`),

  getReviews: (recipeId: string) => request(`/api/reviews/${recipeId}`),

  createReview: (data: { recipeId: string; rating: number; comment: string }) =>
    request(`/api/reviews`, { method: "POST", body: JSON.stringify(data) }),

  generateTags: (data: { title: string; ingredients: string[] }) =>
    request(`/api/ai/generate-tags`, { method: "POST", body: JSON.stringify(data) }),

  getFavorites: () => request(`/api/favorites`),

  getFavoriteIds: () => request(`/api/favorites/ids`),

  addFavorite: (recipeId: string) =>
    request(`/api/favorites/${recipeId}`, { method: "POST" }),

  removeFavorite: (recipeId: string) =>
    request(`/api/favorites/${recipeId}`, { method: "DELETE" }),
};
