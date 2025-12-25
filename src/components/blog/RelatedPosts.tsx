'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { BlogCard } from './BlogCard'
import type { Post, Media, Author, Category } from '@/payload-types'

type PostWithRelations = Post & {
  featuredImage: Media
  author: Author
  categories?: Category[]
}

interface RelatedPostsProps {
  posts: PostWithRelations[]
  title?: string
}

export function RelatedPosts({ posts, title = 'Related Articles' }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-silver/30">
      <div className="container mx-auto px-4">
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-midnight mb-10 text-center"
        >
          {title}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
