'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Category } from '@/payload-types'

interface CategoryFilterProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (slug: string | null) => void
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          activeCategory === null
            ? 'bg-gold text-white'
            : 'bg-silver text-midnight hover:bg-gold/20'
        }`}
      >
        All Posts
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === category.slug
              ? 'bg-gold text-white'
              : 'bg-silver text-midnight hover:bg-gold/20'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
