"use client";

import { motion } from "framer-motion";

export function BlogHero() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-pearl to-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold rounded-full text-sm font-medium mb-6">
            Floor2Feed Blog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight mb-6">
            Real Estate Marketing{" "}
            <span className="text-gold">Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-midnight/70 max-w-2xl mx-auto">
            Expert strategies, AI innovations, and proven tactics to transform
            your property marketing and accelerate sales.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
