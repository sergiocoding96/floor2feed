"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  publishedAt?: string | null;
  readTime?: number | null;
  category?: string | null;
  index?: number;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  featuredImage,
  publishedAt,
  readTime,
  category,
  index = 0,
}: BlogCardProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const categoryName = category
    ? category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gold/10 to-bronze/10 flex items-center justify-center">
              <span className="text-4xl font-bold text-gold/30">F2F</span>
            </div>
          )}
          {categoryName && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-white text-xs font-medium rounded-full">
              {categoryName}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-midnight group-hover:text-gold transition-colors duration-200 line-clamp-2">
            {title}
          </h3>

          {excerpt && <p className="text-midnight/70 line-clamp-2">{excerpt}</p>}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-midnight/60">
              {formattedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
              )}
              {readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {readTime} min read
                </span>
              )}
            </div>

            <span className="flex items-center gap-1 text-gold font-medium text-sm group-hover:gap-2 transition-all duration-200">
              Read more
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
