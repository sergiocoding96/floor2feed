"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Sparkles, Calendar } from "lucide-react";
import { Container, Section } from "@/components/layout";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";

const features = [
  {
    icon: Globe,
    title: "Google Earth Content Strategy",
    description:
      "We create location content from day one. No site visits needed. Show beaches, restaurants, schools, and lifestyle.",
    highlight: "Zero photography required",
  },
  {
    icon: Sparkles,
    title: "AI-Generated Variations",
    description:
      "One floor plan becomes 100+ unique renders. Different times of day, seasons, furniture styles, and lighting.",
    highlight: "Unlimited creative possibilities",
  },
  {
    icon: Calendar,
    title: "Full Lifecycle Management",
    description:
      "15 posts per month for 24-36 months. You focus on building. We handle all your marketing content.",
    highlight: "Complete hands-off solution",
  },
];

export function Solution() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section background="gold-light" id="services">
      <Container>
        <motion.div
          ref={ref}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="text-sm font-medium text-gold uppercase tracking-wider mb-4"
          >
            The Solution
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-midnight mb-6"
          >
            Unlimited Content,{" "}
            <span className="text-gradient">Zero Photography</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-midnight/70"
          >
            We manage your social media from groundbreaking to sold out. Professional
            content every day, without a single photographer visit.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div
                variants={cardHover}
                className="bg-white rounded-xl p-8 h-full relative overflow-hidden group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-gold" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-midnight mb-3">
                  {feature.title}
                </h3>
                <p className="text-midnight/70 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Highlight */}
                <p className="text-sm font-medium text-gold">
                  {feature.highlight}
                </p>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
