"use client";

import { BlogCard } from "./BlogCard";

interface RelatedPost {
  slug: string;
  title: string;
  excerpt?: string;
  featuredImage?: string;
  publishedAt?: string;
  readTime?: number;
  category?: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 border-t border-silver">
      <h2 className="text-2xl font-bold text-midnight mb-8">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            featuredImage={post.featuredImage}
            publishedAt={post.publishedAt}
            readTime={post.readTime}
            category={post.category}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
