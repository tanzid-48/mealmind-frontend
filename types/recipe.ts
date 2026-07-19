export interface Ingredient {
  name: string;
  qty: string;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  _id: string;
  title: string;
  shortDesc: string;
  steps: string[];
  ingredients: Ingredient[];
  images: string[];
  cuisineType: string;
  dietType: string;
  cookTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  nutrition: Nutrition;
  authorId: string;
  tags: string[];
  ratingAvg: number;
  ratingCount: number;
  createdAt: string;
}

export interface Review {
  _id: string;
  recipeId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface RecipeListResponse {
  recipes: Recipe[];
  total: number;
  page: number;
  totalPages: number;
}
