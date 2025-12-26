"use client";

import type { Category } from "@/payload-types";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          activeCategory === null
            ? "bg-gold text-white"
            : "bg-silver/50 text-midnight/70 hover:bg-silver"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category.slug
              ? "bg-gold text-white"
              : "bg-silver/50 text-midnight/70 hover:bg-silver"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
