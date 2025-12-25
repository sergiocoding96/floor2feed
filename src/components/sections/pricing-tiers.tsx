"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Check, X, Star, TrendingDown } from "lucide-react";
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
  marketValue: number;
  popular?: boolean;
  features: TierFeatures;
}

const tiers: Record<TierKey, Tier> = {
  essential: {
    name: "Essential",
    setup: 5500,
    monthly: 2499,
    marketValue: 13800,
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
    marketValue: 35700,
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
    marketValue: 46799,
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

const featureList = [
  { key: "renders", label: "AI Renders/month" },
  { key: "videos", label: "Videos/month" },
  { key: "carousels", label: "Carousels/month" },
  { key: "platforms", label: "Social Platforms" },
  { key: "portals", label: "Portals Managed" },
  { key: "languages", label: "Languages" },
];

const comparisonRows = [
  { label: "Renders/Month", key: "renders" },
  { label: "Videos/Month", key: "videos" },
  { label: "Carousels/Month", key: "carousels" },
  { label: "Platforms", key: "platforms" },
  { label: "Portal Refresh", key: "refresh" },
  { label: "A/B Testing", key: "abTesting" },
  { label: "Lead Qualification", key: "leadQualification" },
  { label: "Languages", key: "languages" },
  { label: "Support Response", key: "supportHours" },
];

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useState(() => {
    if (isInView) {
      const duration = 1500;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(value * easeOut));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  });

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

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

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-midnight mb-2">{tier.name}</h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl md:text-5xl font-bold text-midnight">
            €{tier.monthly.toLocaleString()}
          </span>
          <span className="text-midnight/60">/mo</span>
        </div>
        <p className="text-sm text-midnight/50 mt-2">
          Setup: €{tier.setup.toLocaleString()}
        </p>
      </div>

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

function CostComparisonBar({ selectedTier }: { selectedTier: TierKey }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tier = tiers[selectedTier];
  const floor2feedTotal = tier.setup + tier.monthly * 12;
  const traditionalTotal = tier.marketValue * 12;
  const savings = traditionalTotal - floor2feedTotal;
  const savingsPercent = Math.round((savings / traditionalTotal) * 100);
  const floor2feedWidth = (floor2feedTotal / traditionalTotal) * 100;

  return (
    <div ref={ref} className="bg-pearl rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold text-midnight mb-6 text-center">
        12-Month Cost Comparison: {tier.name}
      </h3>

      <div className="space-y-6">
        {/* Traditional Agency Bar (Full Width) */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-midnight/70">Traditional Agency</span>
            <span className="text-lg font-bold text-midnight">
              €{traditionalTotal.toLocaleString()}
            </span>
          </div>
          <div className="h-12 bg-midnight/10 rounded-lg relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="absolute inset-y-0 left-0 bg-midnight/80 rounded-lg"
            />
            {/* Floor2Feed Stacked Inside */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${floor2feedWidth}%` } : { width: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="absolute inset-y-0 left-0 bg-gold rounded-lg flex items-center justify-end pr-3"
            >
              <span className="text-white text-sm font-medium whitespace-nowrap">
                Floor2Feed
              </span>
            </motion.div>
          </div>
        </div>

        {/* Floor2Feed Details */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-midnight/70">
            Floor2Feed {tier.name}: €{tier.setup.toLocaleString()} setup + €{tier.monthly.toLocaleString()}/mo × 12
          </span>
          <span className="font-semibold text-gold">
            €{floor2feedTotal.toLocaleString()}
          </span>
        </div>

        {/* Savings Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-gradient-to-r from-gold to-bronze rounded-xl p-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingDown className="w-6 h-6 text-white" />
            <span className="text-white/90 font-medium">You Save</span>
          </div>
          <div className="text-3xl md:text-4xl font-bold text-white">
            €{savings.toLocaleString()}
          </div>
          <div className="text-white/80 mt-1">
            {savingsPercent}% less than traditional agencies
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function OutputComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-silver">
            <th className="text-left py-4 px-4 text-midnight/60 font-medium">What You Get</th>
            {(Object.keys(tiers) as TierKey[]).map((key) => (
              <th
                key={key}
                className={cn(
                  "text-center py-4 px-4 font-semibold",
                  tiers[key].popular ? "text-gold" : "text-midnight"
                )}
              >
                {tiers[key].name}
                {tiers[key].popular && <Star className="w-4 h-4 inline ml-1 fill-gold text-gold" />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, index) => (
            <tr key={row.key} className={index % 2 === 0 ? "bg-pearl/50" : ""}>
              <td className="py-3 px-4 text-midnight/80">{row.label}</td>
              {(Object.keys(tiers) as TierKey[]).map((tierKey) => {
                const value = tiers[tierKey].features[row.key as keyof TierFeatures];
                return (
                  <td key={tierKey} className="text-center py-3 px-4">
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="w-5 h-5 text-gold mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-midnight/30 mx-auto" />
                      )
                    ) : (
                      <span className={cn(
                        "font-medium",
                        tiers[tierKey].popular ? "text-gold" : "text-midnight"
                      )}>
                        {value}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

        {/* Cost Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <CostComparisonBar selectedTier={selectedTier} />
        </motion.div>

        {/* Output Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl border border-silver p-6 md:p-8"
        >
          <h3 className="text-xl font-semibold text-midnight mb-6 text-center">
            Detailed Comparison
          </h3>
          <OutputComparisonTable />
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
