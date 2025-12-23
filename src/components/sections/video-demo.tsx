"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";
import { Container, Section } from "@/components/layout";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const DEMO_VIDEO_ID = "cLPSK7-hl6w";

export function VideoDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section background="white" id="demo">
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
              See It In Action
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-midnight mb-6"
            >
              Watch How{" "}
              <span className="text-gradient">Floor2Feed Works</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-midnight/70"
            >
              See the transformation from floor plan to full marketing content
              in under 2 minutes.
            </motion.p>
          </div>

          {/* Video Embed */}
          <motion.div
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-luxury bg-midnight">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-gold rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-gold rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-gold rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-gold rounded-br-2xl" />

              {/* Video Container */}
              <div className="aspect-video relative">
                <iframe
                  src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}?rel=0&modestbranding=1`}
                  title="Floor2Feed Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            {/* Video Caption */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-center mt-6"
            >
              <p className="text-midnight/60 text-sm">
                <span className="inline-flex items-center gap-2">
                  <Play className="w-4 h-4 text-gold" />
                  From floor plan to social media content in 7 days
                </span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
