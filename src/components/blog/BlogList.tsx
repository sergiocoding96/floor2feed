"use client";

import { BlogCard } from "./BlogCard";
import type { Post } from "@/payload-types";

interface BlogListProps {
  posts: Post[];
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
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}
