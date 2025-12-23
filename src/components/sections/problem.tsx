"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, HardHat, Megaphone } from "lucide-react";
import { Container, Section } from "@/components/layout";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const phases = [
  {
    icon: FileText,
    phase: "Phase 1",
    months: "Months 1-6",
    title: "Pre-Construction",
    problem: "Reposting the same 5 architect renders",
    emotion: "Boring",
    color: "text-blue-500",
  },
  {
    icon: HardHat,
    phase: "Phase 2",
    months: "Months 7-18",
    title: "Construction",
    problem: "Ugly construction site photos",
    emotion: "Embarrassing",
    color: "text-orange-500",
  },
  {
    icon: Megaphone,
    phase: "Phase 3",
    months: "Months 19-36",
    title: "Sales Push",
    problem: '"Last Units!" desperate posts',
    emotion: "Amateur",
    color: "text-red-500",
  },
];

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section background="white" id="problem">
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
            The Problem
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-midnight mb-6"
          >
            You invested €10k in launch materials.{" "}
            <span className="text-gradient">Then what?</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-midnight/70"
          >
            Most developers face the same content crisis: great launch assets that
            run dry within months, leaving years of awkward gaps.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop: Horizontal Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-silver -translate-y-1/2" />

          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 md:gap-6"
          >
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                variants={fadeInUp}
                className="relative"
              >
                {/* Mobile: Vertical Line */}
                {index < phases.length - 1 && (
                  <div className="md:hidden absolute left-8 top-16 bottom-0 w-0.5 bg-silver -translate-x-1/2" />
                )}

                <div className="bg-pearl rounded-xl p-6 relative z-10 hover:shadow-lg transition-shadow duration-300">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto md:mx-0 mb-4 border-2 border-silver">
                    <phase.icon className={`w-8 h-8 ${phase.color}`} />
                  </div>

                  {/* Phase Info */}
                  <div className="text-center md:text-left">
                    <span className="text-xs font-medium text-gold uppercase tracking-wider">
                      {phase.phase}
                    </span>
                    <p className="text-sm text-midnight/50 mb-2">{phase.months}</p>
                    <h3 className="text-xl font-semibold text-midnight mb-3">
                      {phase.title}
                    </h3>
                    <p className="text-midnight/70 mb-4">{phase.problem}</p>

                    {/* Emotion Tag */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                        index === 0
                          ? "bg-blue-50 text-blue-600"
                          : index === 1
                          ? "bg-orange-50 text-orange-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {index === 0 && "😴"}
                      {index === 1 && "😬"}
                      {index === 2 && "😰"}
                      <span>{phase.emotion}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-midnight/70">
            Sound familiar?{" "}
            <span className="font-medium text-gold">
              There&apos;s a better way.
            </span>
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
