import { redirect } from "next/navigation";

export default function RecipesIndexRedirect() {
  redirect("/explore");
}
