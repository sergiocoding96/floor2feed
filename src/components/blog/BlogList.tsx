'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'
import { BlogCard } from './BlogCard'
import type { Post, Media, Author, Category } from '@/payload-types'

type PostWithRelations = Post & {
  featuredImage: Media
  author: Author
  categories?: Category[]
}

interface BlogListProps {
  posts: PostWithRelations[]
}

export function BlogList({ posts }: BlogListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">No posts found.</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </motion.div>
  )
}
