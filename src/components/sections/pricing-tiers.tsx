"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type TierKey = "essential" | "professional" | "premium";

interface TierFeatures {
  renders: number;
  videos: number;
  carousels: number;
  platforms: number;
  platformList: string;
  portals: number;
  refresh: string;
  abTesting: boolean;
  leadQualification: string;
  languages: number;
  languageList: string;
  supportHours: string;
}

interface Tier {
  name: string;
  setup: number;
  monthly: number;
  marketPriceRange: [number, number];
  popular?: boolean;
  features: TierFeatures;
}

const tiers: Record<TierKey, Tier> = {
  essential: {
    name: "Essential",
    setup: 5500,
    monthly: 2499,
    marketPriceRange: [5100, 8900],
    features: {
      renders: 20,
      videos: 4,
      carousels: 5,
      platforms: 2,
      platformList: "Instagram, Facebook",
      portals: 4,
      refresh: "Weekly",
      abTesting: false,
      leadQualification: "None",
      languages: 1,
      languageList: "Spanish",
      supportHours: "24 hours",
    },
  },
  professional: {
    name: "Professional",
    setup: 6500,
    monthly: 3499,
    marketPriceRange: [10200, 16200],
    popular: true,
    features: {
      renders: 40,
      videos: 8,
      carousels: 5,
      platforms: 4,
      platformList: "IG, TikTok, FB, LinkedIn",
      portals: 4,
      refresh: "Daily",
      abTesting: true,
      leadQualification: "Basic",
      languages: 2,
      languageList: "Spanish + English",
      supportHours: "24 hours",
    },
  },
  premium: {
    name: "Premium Luxury",
    setup: 10000,
    monthly: 5999,
    marketPriceRange: [20100, 32500],
    features: {
      renders: 60,
      videos: 12,
      carousels: 8,
      platforms: 5,
      platformList: "IG, TikTok, FB, LinkedIn, YouTube",
      portals: 4,
      refresh: "Daily + bi-weekly rotation",
      abTesting: true,
      leadQualification: "Premium",
      languages: 3,
      languageList: "Trilingual",
      supportHours: "4 hours priority",
    },
  },
};

const setupIncludes = [
  "Marketing & creative strategy",
  "Listings setup",
  "Initial batch of renders",
  "360° VR tour",
  "Landing page creation",
  "Social media accounts setup",
];

const featureList = [
  { key: "renders", label: "AI Renders/month" },
  { key: "videos", label: "Videos/month" },
  { key: "carousels", label: "Carousels/month" },
  { key: "platforms", label: "Social Platforms" },
  { key: "portals", label: "Portals Managed" },
  { key: "languages", label: "Languages" },
];


function TierCard({ tierKey, tier, isSelected, onSelect }: {
  tierKey: TierKey;
  tier: Tier;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      onClick={onSelect}
      className={cn(
        "relative p-6 md:p-8 rounded-2xl cursor-pointer transition-all duration-300",
        tier.popular
          ? "bg-white border-2 border-gold shadow-xl"
          : "bg-white border border-silver hover:border-gold/50",
        isSelected && !tier.popular && "border-gold/70 shadow-lg"
      )}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-white text-sm font-medium rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          Most Popular
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-midnight mb-2">{tier.name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl md:text-5xl font-bold text-midnight">
            €{tier.monthly.toLocaleString()}
          </span>
          <span className="text-midnight/60">/mo</span>
        </div>
        {/* Market Price Comparison */}
        <div className="mt-2 space-y-1">
          <p className="text-sm text-midnight/50">
            Market price:{" "}
            <span className="line-through text-midnight/40">
              €{tier.marketPriceRange[0].toLocaleString()}+
            </span>
          </p>
          <p className="text-xs font-medium text-gold">
            Save {Math.round(((tier.marketPriceRange[0] - tier.monthly) / tier.marketPriceRange[0]) * 100)}%+ vs market
          </p>
        </div>
        <p className="text-sm text-midnight/50 mt-2">
          Setup: €{tier.setup.toLocaleString()}
        </p>
      </div>

      {/* Setup Includes */}
      <div className="mb-4 pb-4 border-b border-silver/50">
        <p className="text-xs font-medium text-midnight/50 uppercase tracking-wide mb-2">
          Setup includes:
        </p>
        <ul className="space-y-1.5">
          {setupIncludes.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-midnight/70">
              <Check className="w-3 h-3 text-gold/70 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Monthly Deliverables */}
      <p className="text-xs font-medium text-midnight/50 uppercase tracking-wide mb-2">
        Monthly:
      </p>
      <ul className="space-y-3 mb-6">
        {featureList.map((feature) => (
          <li key={feature.key} className="flex items-center gap-3 text-sm">
            <Check className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-midnight/80">
              <strong>{tier.features[feature.key as keyof TierFeatures]}</strong> {feature.label}
            </span>
          </li>
        ))}
      </ul>

      <Button
        className={cn(
          "w-full",
          tier.popular
            ? "bg-gold hover:bg-bronze text-white"
            : "bg-midnight hover:bg-midnight/90 text-white"
        )}
        asChild
      >
        <a href="#contact">
          {tier.popular ? "Get Started" : tierKey === "premium" ? "Contact Sales" : "Get Started"}
        </a>
      </Button>

      {isSelected && (
        <motion.div
          layoutId="selectedIndicator"
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full"
        />
      )}
    </motion.div>
  );
}



export function PricingTiers() {
  const [selectedTier, setSelectedTier] = useState<TierKey>("professional");

  return (
    <Section id="pricing" className="bg-white">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-sm font-medium rounded-full mb-4"
          >
            Transparent Pricing
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight mb-4"
          >
            Pricing for Serious Developers
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-midnight/70 max-w-2xl mx-auto"
          >
            Choose the plan that matches your project scale. All plans include our AI-powered content creation and portal management.
          </motion.p>
        </motion.div>

        {/* Tier Cards */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          {(Object.keys(tiers) as TierKey[]).map((tierKey) => (
            <TierCard
              key={tierKey}
              tierKey={tierKey}
              tier={tiers[tierKey]}
              isSelected={selectedTier === tierKey}
              onSelect={() => setSelectedTier(tierKey)}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-midnight/60 mb-4">
            Not sure which plan is right? Let&apos;s discuss your project.
          </p>
          <Button
            size="lg"
            className="bg-gold hover:bg-bronze text-white px-8"
            asChild
          >
            <a href="#contact">Schedule a Call</a>
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
