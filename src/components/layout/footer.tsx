"use client";

import Link from "next/link";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import { useState } from "react";

const footerLinks = {
  services: [
    { href: "#services", label: "Social Media Management" },
    { href: "#services", label: "AI Renders & Video" },
    { href: "#services", label: "VR Tours" },
    { href: "#services", label: "Content Strategy" },
  ],
  company: [
    { href: "#about", label: "About Us" },
    { href: "#case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};

const socialLinks = [
  { href: "https://instagram.com/floor2feed", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/company/floor2feed", icon: Linkedin, label: "LinkedIn" },
  { href: "https://youtube.com/@floor2feed", icon: Youtube, label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-midnight text-white">
      <Container>
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-semibold">
                  <span className="text-gold">Floor</span>
                  <span className="text-white">2Feed</span>
                </span>
              </Link>
              <p className="text-white/70 mb-6 max-w-sm">
                AI-Powered Real Estate Marketing. From groundbreaking to sold
                out—we create all your content using just your floor plans.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 hover:bg-gold transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/50">
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/50">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-white/50">
                Newsletter
              </h4>
              <p className="text-white/70 mb-4 text-sm">
                Marketing insights for developers. No spam, just value.
              </p>
              {isSubscribed ? (
                <p className="text-gold text-sm">
                  Thanks for subscribing!
                </p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gold hover:bg-bronze text-white"
                  >
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Floor2Feed. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/50 hover:text-gold text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-white/50 text-sm">
              Barcelona, Spain
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
