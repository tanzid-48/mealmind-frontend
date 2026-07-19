"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import type { Nutrition } from "@/types/recipe";

const COLORS = ["#2D4A3E", "#D4A017", "#B33A2E"];

export function NutritionChart({ nutrition }: { nutrition: Nutrition }) {
  const data = [
    { name: "Protein", value: nutrition.protein },
    { name: "Carbs", value: nutrition.carbs },
    { name: "Fat", value: nutrition.fat },
  ];

  return (
    <div>
      <div className="rounded-card border border-ink/10 bg-card p-4 text-center">
        <p className="font-mono text-xs uppercase text-ink/50">Calories</p>
        <p className="mt-1 font-display text-2xl font-semibold text-ink">
          {nutrition.calories} <span className="text-sm font-normal text-ink/50">kcal</span>
        </p>
      </div>

      <div className="mt-3 h-36 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "currentColor" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 10, fill: "currentColor" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value: number) => [`${value}g`, "Amount"]}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
