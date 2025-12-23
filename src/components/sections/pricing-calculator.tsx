"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, X, Calculator, TrendingDown } from "lucide-react";
import { Container, Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";

interface ServiceOption {
  id: string;
  name: string;
  floor2feedPrice: number;
  traditionalPrice: number;
  description: string;
}

const services: ServiceOption[] = [
  {
    id: "renders",
    name: "AI Architectural Renders (10)",
    floor2feedPrice: 800,
    traditionalPrice: 3500,
    description: "Photorealistic interior/exterior visualizations",
  },
  {
    id: "video",
    name: "Cinematic Property Video",
    floor2feedPrice: 600,
    traditionalPrice: 5000,
    description: "60-second animated walkthrough",
  },
  {
    id: "vr",
    name: "Interactive VR Tour",
    floor2feedPrice: 400,
    traditionalPrice: 2500,
    description: "360° virtual experience",
  },
  {
    id: "social",
    name: "Social Media Management (Monthly)",
    floor2feedPrice: 500,
    traditionalPrice: 2000,
    description: "15 posts/month + strategy",
  },
];

function AnimatedNumber({ value, prefix = "€" }: { value: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, { damping: 30, stiffness: 100 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString("es-ES")
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, value, isInView]);

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [display]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}
    </span>
  );
}

export function PricingCalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [selectedServices, setSelectedServices] = useState<string[]>([
    "renders",
    "video",
    "vr",
    "social",
  ]);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Calculate totals
  const floor2feedTotal = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.floor2feedPrice, 0);

  const traditionalTotal = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.traditionalPrice, 0);

  // Bundle discount (10% off when selecting 3+ services)
  const bundleDiscount = selectedServices.length >= 3 ? 0.1 : 0;
  const floor2feedFinal = Math.round(floor2feedTotal * (1 - bundleDiscount));

  const savings = traditionalTotal - floor2feedFinal;
  const savingsPercent = traditionalTotal > 0
    ? Math.round((savings / traditionalTotal) * 100)
    : 0;

  return (
    <Section background="pearl" id="pricing">
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
            Pricing Calculator
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-midnight mb-6"
          >
            See How Much You&apos;ll{" "}
            <span className="text-gradient">Save</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-midnight/70"
          >
            Compare our AI-powered approach with traditional photography and
            agency costs. Select your services to see the difference.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Service Selection */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-midnight">
                  Select Your Services
                </h3>
                <p className="text-sm text-midnight/60">
                  {selectedServices.length >= 3 && (
                    <span className="text-gold font-medium">
                      10% bundle discount applied!
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    selectedServices.includes(service.id)
                      ? "border-gold bg-gold/5"
                      : "border-silver hover:border-gold/50"
                  }`}
                  onClick={() => toggleService(service.id)}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => toggleService(service.id)}
                      className="mt-1 border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={service.id}
                        className="text-midnight font-medium cursor-pointer"
                      >
                        {service.name}
                      </Label>
                      <p className="text-sm text-midnight/60 mt-1">
                        {service.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gold font-semibold">
                        €{service.floor2feedPrice.toLocaleString("es-ES")}
                      </p>
                      <p className="text-sm text-midnight/40 line-through">
                        €{service.traditionalPrice.toLocaleString("es-ES")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Comparison Results */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* Floor2Feed Card */}
            <div className="bg-midnight rounded-2xl p-8 text-white relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-sm uppercase tracking-wider">
                      Floor2Feed
                    </p>
                    <p className="text-4xl font-semibold mt-1">
                      <AnimatedNumber value={floor2feedFinal} />
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-gold rounded-lg">
                    <p className="text-xs font-medium uppercase">Your Price</p>
                  </div>
                </div>

                {bundleDiscount > 0 && (
                  <p className="text-gold text-sm mb-4">
                    Includes 10% bundle discount (-€{Math.round(floor2feedTotal * bundleDiscount)})
                  </p>
                )}

                <ul className="space-y-2 mb-6">
                  {[
                    "AI-generated from floor plans",
                    "Delivered in 7 days",
                    "Unlimited revisions included",
                    "No site visits required",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-white/80">
                      <Check className="w-4 h-4 text-gold" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className="w-full bg-gold hover:bg-bronze text-white font-medium"
                  asChild
                >
                  <Link href="#contact">Get Started</Link>
                </Button>
              </div>
            </div>

            {/* Traditional Agency Card */}
            <div className="bg-white rounded-2xl p-8 border-2 border-silver">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-midnight/60 text-sm uppercase tracking-wider">
                    Traditional Agency
                  </p>
                  <p className="text-4xl font-semibold text-midnight/40 mt-1">
                    <AnimatedNumber value={traditionalTotal} />
                  </p>
                </div>
                <div className="px-4 py-2 bg-silver rounded-lg">
                  <p className="text-xs font-medium text-midnight/60 uppercase">
                    Market Rate
                  </p>
                </div>
              </div>

              <ul className="space-y-2">
                {[
                  "Requires completed construction",
                  "4-8 weeks delivery time",
                  "Revisions cost extra",
                  "Multiple site visits needed",
                ].map((drawback) => (
                  <li key={drawback} className="flex items-center gap-2 text-sm text-midnight/60">
                    <X className="w-4 h-4 text-red-400" />
                    {drawback}
                  </li>
                ))}
              </ul>
            </div>

            {/* Savings Banner */}
            {savings > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-gold to-bronze rounded-2xl p-6 text-white"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                    <TrendingDown className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Your Total Savings</p>
                    <p className="text-3xl font-semibold">
                      <AnimatedNumber value={savings} /> ({savingsPercent}%)
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-midnight/60 text-sm">
            Prices shown are one-time fees. Monthly social media management billed separately.{" "}
            <Link href="#contact" className="text-gold hover:text-bronze font-medium transition-colors">
              Contact us for custom quotes
            </Link>
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
