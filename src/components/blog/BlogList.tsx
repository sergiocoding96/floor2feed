"use client";

import { BlogCard } from "./BlogCard";

interface KeystaticPost {
  slug: string;
  entry: {
    title: string;
    excerpt?: string | null;
    featuredImage?: string | null;
    publishedAt?: string | null;
    readTime?: number | null;
    category?: string | null;
  };
}

interface BlogListProps {
  posts: KeystaticPost[];
}

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-midnight/60 text-lg">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <BlogCard
          key={post.slug}
          slug={post.slug}
          title={post.entry.title}
          excerpt={post.entry.excerpt}
          featuredImage={post.entry.featuredImage}
          publishedAt={post.entry.publishedAt}
          readTime={post.entry.readTime}
          category={post.entry.category}
          index={index}
        />
      ))}
    </div>
  );
}
