"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Image as ImageIcon, Video, View, Share2 } from "lucide-react";
import Image from "next/image";
import { Container, Section } from "@/components/layout";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";

const deliverables = [
  {
    icon: ImageIcon,
    title: "10 AI Architectural Renders",
    description:
      "Photorealistic interior and exterior visualizations from your floor plans. Multiple styles, lighting conditions, and seasonal variations.",
    image: "/images/deliverable-renders.jpg",
    features: ["Day & Night Versions", "Seasonal Variations", "Multiple Styles"],
  },
  {
    icon: Video,
    title: "Cinematic Property Video",
    description:
      "60-second animated walkthrough showcasing your development's lifestyle and amenities. Perfect for social media and presentations.",
    image: "/images/deliverable-video.jpg",
    features: ["4K Resolution", "Music & Sound Design", "Shareable Format"],
  },
  {
    icon: View,
    title: "Interactive VR Tour",
    description:
      "Immersive 360° virtual experience letting buyers explore every room. Accessible on any device, no app required.",
    image: "/images/deliverable-vr.jpg",
    features: ["360° Panoramas", "Mobile Compatible", "Embed on Website"],
  },
  {
    icon: Share2,
    title: "15 Monthly Social Posts",
    description:
      "Professionally designed content for Instagram, Facebook, and LinkedIn. Captions, hashtags, and posting schedule included.",
    image: "/images/deliverable-social.jpg",
    features: ["Multi-Platform", "Bilingual Captions", "Content Calendar"],
  },
];

export function Deliverables() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section background="white" id="deliverables">
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
            What You Get
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-midnight mb-6"
          >
            Everything You Need to{" "}
            <span className="text-gradient">Sell Out Faster</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-midnight/70 mb-8"
          >
            A complete marketing package that works from day one. No waiting for
            construction, no coordinating photographers, no content gaps.
          </motion.p>

          {/* Floor Plan Source Indicator */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-4 bg-pearl rounded-full px-6 py-3 border border-silver"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gold">
                <Image
                  src="/floor-plan.jpg"
                  alt="Source floor plan"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm text-midnight/70">Your floor plan</span>
            </div>
            <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span className="text-sm font-medium text-midnight">All content below</span>
          </motion.div>
        </motion.div>

        {/* Deliverables Grid */}
        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {deliverables.map((deliverable) => (
            <motion.div
              key={deliverable.title}
              variants={fadeInUp}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div
                variants={cardHover}
                className="bg-pearl rounded-xl overflow-hidden h-full relative group border-2 border-transparent hover:border-gold transition-colors duration-300"
              >
                {/* Included Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-gold text-white text-xs font-semibold uppercase tracking-wider rounded-full">
                    Included
                  </span>
                </div>

                {/* Image */}
                <div className="aspect-[4/3] relative bg-silver overflow-hidden">
                  <Image
                    src={deliverable.image}
                    alt={deliverable.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Icon Overlay */}
                  <div className="absolute inset-0 bg-midnight/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center">
                      <deliverable.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-midnight mb-2">
                    {deliverable.title}
                  </h3>
                  <p className="text-sm text-midnight/70 mb-4 leading-relaxed">
                    {deliverable.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {deliverable.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-midnight/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-midnight/60 text-sm">
            All deliverables created from your{" "}
            <span className="font-medium text-gold">floor plans only</span>.
            Updates included as your project evolves.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
