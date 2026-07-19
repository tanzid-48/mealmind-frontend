import Link from "next/link";
import { ChefHat, Github, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/explore", label: "Explore Recipes" },
    { href: "/ai-chef", label: "AI Chef" },
    { href: "/recipes/add", label: "Add a Recipe" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-card dark:border-ink/20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-herb dark:text-saffron">
            <ChefHat size={20} />
            MealMind
          </Link>
          <p className="mt-3 max-w-xs text-sm text-ink/70">
            Cook smarter with what's already in your kitchen. AI-powered recipes,
            nutrition, and a chef in your pocket.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="https://github.com/tanzid-48" target="_blank" rel="noreferrer" className="text-ink/60 hover:text-paprika dark:hover:text-saffron">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/tanzidmondol" target="_blank" rel="noreferrer" className="text-ink/60 hover:text-paprika dark:hover:text-saffron">
              <Linkedin size={18} />
            </a>
            <a href="mailto:hello@mealmind.ai" className="text-ink/60 hover:text-paprika dark:hover:text-saffron">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h4 className="font-display text-sm font-semibold text-ink">{section}</h4>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink/70 hover:text-paprika dark:hover:text-saffron">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-ink/10 px-6 py-4 text-center text-xs text-ink/50 dark:border-ink/20">
        © {new Date().getFullYear()} MealMind AI. Built for SCIC-13 Career Incubator.
      </div>
    </footer>
  );
}
