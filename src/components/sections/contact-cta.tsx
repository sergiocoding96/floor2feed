"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check, Calendar, Shield, Clock, Users } from "lucide-react";
import { Container, Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name is required"),
  projectName: z.string().min(2, "Project name is required"),
  units: z.string().min(1, "Please select the number of units"),
  location: z.string().min(2, "Please enter the project location"),
  timeline: z.string().min(1, "Please select your timeline"),
  message: z.string().optional(),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const trustSignals = [
  {
    icon: Clock,
    text: "Response within 24 hours",
  },
  {
    icon: Shield,
    text: "100% confidential",
  },
  {
    icon: Users,
    text: "No obligation consultation",
  },
];

export function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      gdprConsent: false,
    },
  });

  const gdprConsent = watch("gdprConsent");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // TODO: Implement Formspree or other form submission
    console.log("Form data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <Section background="midnight" id="contact">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Content */}
          <motion.div
            ref={ref}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={staggerContainer}
            className="text-white"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm font-medium text-gold uppercase tracking-wider mb-4"
            >
              Get Started
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6"
            >
              Ready to{" "}
              <span className="text-gold">Transform</span> Your Marketing?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/70 mb-8"
            >
              Book a free discovery call and see how Floor2Feed can help you
              sell out faster. We&apos;ll review your project and show you exactly
              what we can create.
            </motion.p>

            {/* What to Expect */}
            <motion.div variants={fadeInUp} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                What to expect:
              </h3>
              <ul className="space-y-3">
                {[
                  "15-minute call to understand your project",
                  "Custom content preview based on your floor plans",
                  "Tailored pricing for your specific needs",
                  "No obligation—just valuable insights",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6"
            >
              {trustSignals.map((signal) => (
                <div key={signal.text} className="flex items-center gap-2">
                  <signal.icon className="w-5 h-5 text-gold" />
                  <span className="text-sm text-white/60">{signal.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Alternative CTA */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Prefer to schedule directly?
                  </h4>
                  <p className="text-white/60 text-sm mb-3">
                    Pick a time that works for you on our calendar.
                  </p>
                  <Button
                    variant="outline"
                    className="border-gold text-gold hover:bg-gold hover:text-white"
                  >
                    Book on Calendar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-gold" />
                  </div>
                  <h3 className="text-2xl font-semibold text-midnight mb-3">
                    Thank You!
                  </h3>
                  <p className="text-midnight/70 mb-6">
                    We&apos;ve received your request and will be in touch within 24
                    hours to schedule your discovery call.
                  </p>
                  <p className="text-sm text-midnight/50">
                    Check your email for a confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="text-xl font-semibold text-midnight mb-6">
                    Request Your Free Consultation
                  </h3>

                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Carlos Martínez"
                        {...register("name")}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="carlos@empresa.com"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        placeholder="+34 600 000 000"
                        {...register("phone")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company *</Label>
                      <Input
                        id="company"
                        placeholder="Grupo Inmobiliario"
                        {...register("company")}
                        className={errors.company ? "border-red-500" : ""}
                      />
                      {errors.company && (
                        <p className="text-sm text-red-500">{errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Name & Location */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name *</Label>
                      <Input
                        id="projectName"
                        placeholder="Marina Heights"
                        {...register("projectName")}
                        className={errors.projectName ? "border-red-500" : ""}
                      />
                      {errors.projectName && (
                        <p className="text-sm text-red-500">{errors.projectName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        placeholder="Marbella, Costa del Sol"
                        {...register("location")}
                        className={errors.location ? "border-red-500" : ""}
                      />
                      {errors.location && (
                        <p className="text-sm text-red-500">{errors.location.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Units & Timeline */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Number of Units *</Label>
                      <Select onValueChange={(value) => setValue("units", value)}>
                        <SelectTrigger className={errors.units ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select units" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<20">Less than 20</SelectItem>
                          <SelectItem value="20-50">20-50 units</SelectItem>
                          <SelectItem value="50-100">50-100 units</SelectItem>
                          <SelectItem value="100+">100+ units</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.units && (
                        <p className="text-sm text-red-500">{errors.units.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Project Timeline *</Label>
                      <Select onValueChange={(value) => setValue("timeline", value)}>
                        <SelectTrigger className={errors.timeline ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pre-construction">Pre-construction</SelectItem>
                          <SelectItem value="under-construction">Under construction</SelectItem>
                          <SelectItem value="nearing-completion">Nearing completion</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.timeline && (
                        <p className="text-sm text-red-500">{errors.timeline.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Details (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project and marketing goals..."
                      rows={3}
                      {...register("message")}
                    />
                  </div>

                  {/* GDPR Consent */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="gdprConsent"
                      checked={gdprConsent}
                      onCheckedChange={(checked) =>
                        setValue("gdprConsent", checked as boolean)
                      }
                      className="mt-1 border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                    />
                    <div>
                      <Label htmlFor="gdprConsent" className="text-sm text-midnight/70 cursor-pointer">
                        I agree to the{" "}
                        <a href="/privacy" className="text-gold hover:text-bronze">
                          Privacy Policy
                        </a>{" "}
                        and consent to Floor2Feed contacting me about my inquiry. *
                      </Label>
                      {errors.gdprConsent && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.gdprConsent.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gold hover:bg-bronze text-white font-medium py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Request Free Consultation
                      </span>
                    )}
                  </Button>

                  <p className="text-center text-xs text-midnight/50">
                    We respond to all inquiries within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
