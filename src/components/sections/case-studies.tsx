"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, MapPin, Home, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Container, Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";

const caseStudies = [
  {
    id: 1,
    projectName: "Marina Heights",
    location: "Marbella, Costa del Sol",
    developer: "Grupo Inmobiliario Costa",
    image: "/images/case-study-1.jpg",
    units: 32,
    priceRange: "€450k - €890k",
    result: "40% faster sellout",
    testimonial:
      "Floor2Feed transformed our marketing. We had professional content from day one, before we even broke ground. The AI renders were indistinguishable from real photography.",
    author: "Carlos Martínez",
    role: "Director Comercial",
    stats: [
      { label: "Leads Generated", value: "847" },
      { label: "Social Engagement", value: "+312%" },
      { label: "Time to Sellout", value: "14 mo" },
    ],
  },
  {
    id: 2,
    projectName: "Barcelona Residences",
    location: "Diagonal Mar, Barcelona",
    developer: "Desarrollos Urbanos BCN",
    image: "/images/case-study-2.jpg",
    units: 48,
    priceRange: "€380k - €720k",
    result: "65% pre-sold before completion",
    testimonial:
      "We used to struggle with content during construction. With Floor2Feed, we had fresh posts every week. Our social following tripled and we pre-sold 65% before completion.",
    author: "Ana García Ruiz",
    role: "Marketing Director",
    stats: [
      { label: "Pre-Sales", value: "65%" },
      { label: "Followers Gained", value: "12.4k" },
      { label: "Avg. Engagement", value: "8.2%" },
    ],
  },
  {
    id: 3,
    projectName: "Valencia Gardens",
    location: "Ciudad de las Artes, Valencia",
    developer: "Promociones Valencia Sur",
    image: "/images/case-study-3.jpg",
    units: 24,
    priceRange: "€290k - €450k",
    result: "3x more qualified inquiries",
    testimonial:
      "The VR tours were a game-changer. International buyers could explore units remotely. We closed deals with clients who never visited in person until signing.",
    author: "Miguel Fernández",
    role: "CEO",
    stats: [
      { label: "International Buyers", value: "45%" },
      { label: "VR Tour Views", value: "2.3k" },
      { label: "Inquiries", value: "+218%" },
    ],
  },
];

export function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <Section background="gold-light" id="case-studies">
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
            Success Stories
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-midnight mb-6"
          >
            Developers Who{" "}
            <span className="text-gradient">Sold Out Faster</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-midnight/70"
          >
            Real results from developers across Spain who trusted Floor2Feed
            with their marketing.
          </motion.p>
        </motion.div>

        {/* Desktop: Cards Grid */}
        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="hidden lg:grid lg:grid-cols-3 gap-8"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={fadeInUp}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div
                variants={cardHover}
                className="bg-white rounded-2xl overflow-hidden h-full shadow-lg"
              >
                {/* Image */}
                <div className="aspect-[16/10] relative bg-silver">
                  <Image
                    src={study.image}
                    alt={study.projectName}
                    fill
                    className="object-cover"
                  />
                  {/* Result Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gold text-white text-sm font-medium rounded-full flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {study.result}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Project Info */}
                  <h3 className="text-xl font-semibold text-midnight mb-2">
                    {study.projectName}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-midnight/60 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {study.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      {study.units} units
                    </span>
                  </div>

                  {/* Testimonial */}
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-1 w-6 h-6 text-gold/30" />
                    <p className="text-midnight/70 text-sm leading-relaxed pl-4 italic">
                      &quot;{study.testimonial}&quot;
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-silver">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <span className="text-gold font-semibold text-sm">
                        {study.author.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-midnight">
                        {study.author}
                      </p>
                      <p className="text-xs text-midnight/60">{study.role}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    {study.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-lg font-semibold text-gold">
                          {stat.value}
                        </p>
                        <p className="text-xs text-midnight/60">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile/Tablet: Carousel */}
        <div className="lg:hidden">
          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={fadeInUp}
            className="relative"
          >
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: `-${activeIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex"
              >
                {caseStudies.map((study) => (
                  <div key={study.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                      {/* Image */}
                      <div className="aspect-[16/10] relative bg-silver">
                        <Image
                          src={study.image}
                          alt={study.projectName}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4 px-3 py-1 bg-gold text-white text-sm font-medium rounded-full flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {study.result}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-midnight mb-2">
                          {study.projectName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-midnight/60 mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {study.location}
                          </span>
                        </div>

                        <p className="text-midnight/70 text-sm leading-relaxed mb-4 italic">
                          &quot;{study.testimonial}&quot;
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                            <span className="text-gold font-semibold text-sm">
                              {study.author.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-midnight">
                              {study.author}
                            </p>
                            <p className="text-xs text-midnight/60">{study.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full border-midnight/20 hover:border-gold hover:bg-gold hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === activeIndex
                        ? "bg-gold w-6"
                        : "bg-midnight/20 hover:bg-midnight/40"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full border-midnight/20 hover:border-gold hover:bg-gold hover:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
