'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface BlogHeroProps {
  title?: string
  description?: string
}

export function BlogHero({
  title = 'Blog',
  description = 'Insights on real estate marketing, AI technology, and strategies for Spanish developers to stand out in a competitive market.',
}: BlogHeroProps) {
  return (
    <section className="relative bg-midnight py-20 md:py-28 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,165,116,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,165,116,0.2),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-medium mb-6"
          >
            Floor2Feed Insights
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
