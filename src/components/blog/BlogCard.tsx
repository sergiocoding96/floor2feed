"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { Post, Media, Category } from "@/payload-types";

interface BlogCardProps {
  post: Post;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const featuredImage = post.featuredImage as Media | undefined;
  const category = post.category as Category | undefined;

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
          {featuredImage?.url ? (
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-silver" />
          )}
          {category && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-white text-xs font-medium rounded-full">
              {category.name}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-midnight group-hover:text-gold transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-midnight/70 line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-midnight/60">
              {formattedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
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
