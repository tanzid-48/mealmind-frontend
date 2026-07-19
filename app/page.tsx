import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrendingRecipes } from "@/components/sections/TrendingRecipes";
import { Categories } from "@/components/sections/Categories";
import { AIChefTeaser } from "@/components/sections/AIChefTeaser";
import { WhyMealMind } from "@/components/sections/WhyMealMind";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <TrendingRecipes />
      <Categories />
      <AIChefTeaser />
      <WhyMealMind />
      <Stats />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </>
  );
}
