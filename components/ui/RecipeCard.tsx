"use client";

import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import Image from "next/image";
import { safeImageSrc } from "@/lib/image";
import Link from "next/link";

export interface RecipeCardProps {
  id?: string;
  title: string;
  shortDesc: string;
  image: string;
  cookTime: number;
  rating: number;
  difficulty: string;
}

export function RecipeCard({ id, title, shortDesc, image, cookTime, rating, difficulty }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ rotate: -1 }}
      whileHover={{ y: -4, rotate: 0, boxShadow: "0 12px 24px rgba(0,0,0,0.12)" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="index-card overflow-hidden rounded-b-card bg-card"
    >
      <div className="relative h-40 w-full bg-herb/10">
        <Image src={safeImageSrc(image)} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-ink/60">{shortDesc}</p>
        <div className="mt-3 flex items-center justify-between font-mono text-xs text-ink/60">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {cookTime}m
          </span>
          <span className="flex items-center gap-1 text-saffron">
            <Star size={12} fill="currentColor" /> {rating.toFixed(1)}
          </span>
          <span>{difficulty}</span>
        </div>
        <Link
          href={id ? `/recipes/${id}` : "/recipes"}
          className="mt-3 block w-full rounded-full border border-herb/30 py-1.5 text-center text-xs font-medium text-herb transition-colors hover:bg-herb hover:text-white dark:border-saffron/30 dark:text-saffron dark:hover:bg-saffron dark:hover:text-ink"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
