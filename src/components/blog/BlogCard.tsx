'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { cardHover, fadeInUp } from '@/lib/animations'
import type { Post, Media, Author, Category } from '@/payload-types'

interface BlogCardProps {
  post: Post & {
    featuredImage: Media
    author: Author
    categories?: Category[]
  }
  index?: number
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <motion.article
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <motion.div
          variants={cardHover}
          initial="rest"
          whileHover="hover"
          className="bg-white rounded-2xl overflow-hidden border border-silver"
        >
          {/* Featured Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.featuredImage.url || '/placeholder.jpg'}
              alt={post.featuredImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Category Badge */}
            {post.categories && post.categories.length > 0 && (
              <div className="absolute top-4 left-4">
                <span
                  className="px-3 py-1 text-xs font-medium rounded-full text-white"
                  style={{ backgroundColor: post.categories[0].color || '#D4A574' }}
                >
                  {post.categories[0].name}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              {publishedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {publishedDate}
                </span>
              )}
              {post.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min read
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-midnight mb-2 line-clamp-2 group-hover:text-gold transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

            {/* Author & CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {post.author.avatar && typeof post.author.avatar !== 'string' && (
                  <Image
                    src={post.author.avatar.url || ''}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm text-gray-600">{post.author.name}</span>
              </div>
              <span className="flex items-center gap-1 text-gold font-medium text-sm group-hover:gap-2 transition-all">
                Read More
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}
