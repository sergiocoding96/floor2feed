"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container, Section } from "@/components/layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";

const faqs = [
  {
    question: "How can you create content without visiting our construction site?",
    answer:
      "Our AI technology generates photorealistic renders and visualizations directly from your architectural floor plans. We combine these with Google Earth imagery for location context, aerial views, and lifestyle content. This means you have professional marketing materials from day one—no completed construction required.",
  },
  {
    question: "What file formats do you need to get started?",
    answer:
      "We work with PDF floor plans, CAD files (DWG/DXF), or even high-quality images of your architectural drawings. If you have existing renders from your architect, those are helpful but not required. We can work with whatever documentation you have available.",
  },
  {
    question: "How realistic are the AI-generated renders?",
    answer:
      "Our AI produces photorealistic visualizations that are virtually indistinguishable from traditional CGI renders. We can show your properties in different lighting conditions, seasons, and times of day. Many of our clients use these renders in their sales offices alongside traditional materials.",
  },
  {
    question: "What's included in the monthly social media management?",
    answer:
      "You receive 15 professionally designed posts per month across Instagram, Facebook, and LinkedIn. This includes property renders, lifestyle content, location highlights, construction updates (styled professionally), and promotional materials. We also provide bilingual captions (Spanish/English), relevant hashtags, and a posting schedule optimized for engagement.",
  },
  {
    question: "How long does it take to receive the initial deliverables?",
    answer:
      "From receiving your floor plans, we typically deliver your complete initial package within 7 days. This includes AI renders, the property video, VR tour, and the first month's social media content. Rush delivery is available if needed.",
  },
  {
    question: "Can we request revisions to the content?",
    answer:
      "Absolutely. Unlimited revisions are included in all our packages. Whether you want to adjust furniture styles, lighting, color schemes, or any other elements—we'll refine until you're completely satisfied. Most clients approve within 1-2 revision rounds.",
  },
  {
    question: "Do you work with developments outside of Spain?",
    answer:
      "While we specialize in the Spanish market (Costa del Sol, Madrid, Barcelona, Valencia), we work with developers across Europe and internationally. Our AI technology works with any location, and we can adapt our content strategy for different markets and languages.",
  },
  {
    question: "What happens if our project timeline changes?",
    answer:
      "Real estate development rarely goes exactly as planned—we understand that. Our monthly plans are flexible with no long-term contracts required. You can scale up during launch phases or pause during slower periods. We also adapt content to reflect any design changes in your development.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We provide monthly analytics reports covering engagement rates, follower growth, reach, and most importantly—lead generation. We track inquiries that come through social channels and can integrate with your CRM for full attribution. Our average client sees a 40% faster sellout compared to traditional marketing approaches.",
  },
  {
    question: "What makes Floor2Feed different from a traditional marketing agency?",
    answer:
      "Traditional agencies need finished construction for photography, have long lead times, and charge per project. We use AI to create unlimited content from floor plans alone, deliver in days not weeks, and offer fixed monthly pricing. Plus, our content evolves with your project—from groundbreaking to sold out.",
  },
];

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section background="white" id="faq">
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
            Frequently Asked Questions
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-midnight mb-6"
          >
            Got Questions?{" "}
            <span className="text-gradient">We&apos;ve Got Answers</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-midnight/70"
          >
            Everything you need to know about Floor2Feed and how we help
            developers sell faster.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-pearl rounded-xl border-none px-6 data-[state=open]:bg-gold/5 transition-colors duration-200"
              >
                <AccordionTrigger className="text-left text-midnight font-medium hover:no-underline py-5 [&[data-state=open]>svg]:text-gold [&>svg]:text-midnight/40 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-midnight/70 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-midnight/70 mb-4">
            Still have questions?
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-gold hover:text-bronze font-medium transition-colors"
          >
            <span>Contact our team directly</span>
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
