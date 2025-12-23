"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileUp, Palette, Clock, Repeat } from "lucide-react";
import { Container, Section } from "@/components/layout";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    icon: FileUp,
    step: "01",
    title: "Send Floor Plans",
    description:
      "Share your architectural floor plans, renders (if any), and brand guidelines. We handle everything from there.",
    timeline: "Day 1",
    details: ["PDF or CAD files accepted", "No site visit required", "Quick onboarding call"],
  },
  {
    icon: Palette,
    step: "02",
    title: "We Create Everything",
    description:
      "Our AI generates photorealistic renders, videos, and VR tours. We design your social media strategy and content calendar.",
    timeline: "Days 2-5",
    details: ["AI-powered generation", "Multiple style options", "Brand-aligned content"],
  },
  {
    icon: Clock,
    step: "03",
    title: "Review & Approve",
    description:
      "You review all deliverables and request any adjustments. Unlimited revisions until you're satisfied.",
    timeline: "Days 6-7",
    details: ["Easy approval process", "Unlimited revisions", "Fast turnaround"],
  },
  {
    icon: Repeat,
    step: "04",
    title: "Ongoing Content",
    description:
      "We post 15 pieces of content monthly across all platforms. Monthly reports track engagement and leads generated.",
    timeline: "Month 1+",
    details: ["Consistent posting schedule", "Monthly analytics reports", "Strategy adjustments"],
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section background="white" id="process">
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
            How It Works
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-midnight mb-6"
          >
            From Floor Plan to Feed in{" "}
            <span className="text-gradient">7 Days</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-midnight/70"
          >
            A streamlined process designed for busy developers.
            You focus on building—we handle everything else.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop: Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-silver" />

          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                className="relative"
              >
                {/* Mobile/Tablet: Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-8 top-20 bottom-0 w-0.5 bg-silver sm:hidden" />
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Step Number Circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-lg z-10 relative">
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-midnight flex items-center justify-center text-white text-sm font-bold">
                      {step.step}
                    </div>
                  </div>

                  {/* Timeline Badge */}
                  <span className="inline-flex px-3 py-1 bg-gold/10 text-gold text-sm font-medium rounded-full mb-4">
                    {step.timeline}
                  </span>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-midnight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-midnight/70 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-sm text-midnight/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-midnight rounded-full text-white">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-sm font-medium">
              Ready to start? Most clients launch within 7 days.
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
