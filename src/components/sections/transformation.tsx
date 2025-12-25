"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Grid3X3, View } from "lucide-react";
import { Container, Section } from "@/components/layout";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Dynamic import for 360 viewer (client-only, reduces initial bundle)
const Viewer360 = dynamic(
  () => import("@/components/features/viewer-360").then((mod) => mod.Viewer360),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video bg-midnight/10 rounded-xl flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
);

type ViewMode = "grid" | "360";

export function Transformation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  return (
    <Section background="pearl" id="transformation">
      <Container>
        <motion.div
          ref={ref}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.p
              variants={fadeInUp}
              className="text-sm font-medium text-gold uppercase tracking-wider mb-4"
            >
              The Magic
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-midnight mb-6"
            >
              One Floor Plan.{" "}
              <span className="text-gradient">Endless Content.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-midnight/70"
            >
              See how we transform a simple architectural drawing into months of
              professional social media content that sells.
            </motion.p>
          </div>

          {/* Transformation Visual */}
          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            {/* Main Grid */}
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Floor Plan - Left Side */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-gold">
                    <div className="text-center mb-3">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-midnight">
                        <span className="w-2 h-2 rounded-full bg-gold" />
                        Your Floor Plan
                      </span>
                    </div>
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-pearl">
                      <Image
                        src="/floor-plan.jpg"
                        alt="Original architectural floor plan"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  </div>

                  {/* Arrow on desktop */}
                  <div className="hidden lg:flex absolute -right-10 top-1/2 -translate-y-1/2 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-0.5 bg-gold" />
                      <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-12 h-0.5 bg-gold" />
                    </div>
                  </div>

                  {/* Arrow on mobile */}
                  <div className="flex lg:hidden justify-center my-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-0.5 bg-gold" />
                      <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-lg">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="h-8 w-0.5 bg-gold" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Content Output - Right Side */}
              <div className="lg:col-span-9">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-lg">
                    {/* Tab Buttons */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={cn(
                          "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          viewMode === "grid"
                            ? "bg-gold text-white"
                            : "bg-pearl text-midnight/70 hover:bg-silver"
                        )}
                      >
                        <Grid3X3 className="w-4 h-4" />
                        Social Grid
                      </button>
                      <button
                        onClick={() => setViewMode("360")}
                        className={cn(
                          "relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          viewMode === "360"
                            ? "bg-gold text-white"
                            : "bg-gradient-to-r from-gold/20 to-bronze/20 text-midnight hover:from-gold/30 hover:to-bronze/30 border border-gold/50"
                        )}
                      >
                        <View className={cn("w-4 h-4", viewMode !== "360" && "animate-pulse")} />
                        360° Render
                        {viewMode !== "360" && (
                          <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-gold text-white text-[10px] font-bold rounded-full animate-bounce">
                            TRY
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Content Area */}
                    <div className="relative rounded-lg overflow-hidden">
                      {viewMode === "grid" ? (
                        <Image
                          src="/images/social-grid.png"
                          alt="Social media content grid generated from floor plan"
                          width={1200}
                          height={800}
                          className="w-full h-auto"
                        />
                      ) : (
                        <Viewer360 imageUrl="/360-render.png" />
                      )}
                    </div>
                  </div>

                  {/* Stats floating badges */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="absolute -top-4 -right-4 bg-midnight text-white rounded-lg px-4 py-2 shadow-lg hidden sm:block"
                  >
                    <p className="text-xs font-medium">36 Months of Content</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1, duration: 0.4 }}
                    className="absolute -bottom-4 -left-4 bg-gold text-white rounded-lg px-4 py-2 shadow-lg hidden sm:block"
                  >
                    <p className="text-xs font-medium">15 Posts/Month</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="text-center mt-12"
            >
              <p className="text-midnight/60 text-sm mb-4">
                All this content from{" "}
                <span className="font-semibold text-gold">one floor plan</span>.
                No photographers. No waiting for construction.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-gold hover:text-bronze font-medium transition-colors"
              >
                See what we can create for your project
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
