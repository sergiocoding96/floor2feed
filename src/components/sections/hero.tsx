"use client";

import { motion } from "framer-motion";
import { Play, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-subtle">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gold-light/10 rounded-full blur-2xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-xl"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                AI-Powered Marketing
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-midnight leading-tight tracking-tight mb-6"
            >
              AI-Powered Social Media for{" "}
              <span className="text-gradient">Real Estate Developments</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-midnight/70 leading-relaxed mb-8"
            >
              From groundbreaking to sold out—we create all your content for
              24-36 months using just your floor plans.{" "}
              <span className="font-medium text-midnight">
                No photography, no hassle, no gaps.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button
                size="lg"
                className="bg-gold hover:bg-bronze text-white font-medium px-8 py-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
                asChild
              >
                <Link href="#demo" className="flex items-center gap-2">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-midnight text-midnight hover:bg-midnight hover:text-white font-medium px-8 py-6 rounded-lg transition-all duration-300"
                asChild
              >
                <Link href="#contact" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Discovery Call
                </Link>
              </Button>
            </motion.div>

            {/* Trust Signal */}
            <motion.p
              variants={fadeInUp}
              className="text-sm text-midnight/60"
            >
              Trusted by developers building across{" "}
              <span className="font-medium text-midnight">
                Costa del Sol, Madrid, and Barcelona
              </span>
            </motion.p>
          </motion.div>

          {/* Visual - Floor Plan Transformation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Before/After Transformation */}
            <div className="relative rounded-2xl overflow-hidden shadow-luxury bg-white">
              <div className="grid grid-cols-2 gap-1 bg-silver">
                {/* Before - Floor Plan */}
                <div className="relative aspect-square bg-white p-2">
                  <div className="absolute top-2 left-2 z-10 bg-midnight/80 text-white text-xs font-medium px-2 py-1 rounded">
                    Your Floor Plan
                  </div>
                  <Image
                    src="/floor-plan.jpg"
                    alt="Original floor plan sent by developer"
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>

                {/* After - AI Generated Content */}
                <div className="relative aspect-square">
                  <div className="absolute top-2 right-2 z-10 bg-gold text-white text-xs font-medium px-2 py-1 rounded">
                    AI Generated
                  </div>
                  <Image
                    src="/images/hero-mockup.jpg"
                    alt="AI-generated marketing content from floor plan"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-silver"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-gold">40%</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-midnight">Faster Sellout</p>
                    <p className="text-xs text-midnight/60">Average client result</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Feature Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -top-4 -right-4 bg-midnight text-white rounded-lg px-4 py-2 shadow-lg"
              >
                <p className="text-xs font-medium">1 Floor Plan → 36 Months Content</p>
              </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -z-10 inset-0 translate-x-4 translate-y-4 rounded-2xl bg-gold/10" />
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-midnight/50">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-midnight/20 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-gold"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
