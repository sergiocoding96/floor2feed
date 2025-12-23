import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  Problem,
  Solution,
  VideoDemo,
  Transformation,
  Deliverables,
  PricingCalculator,
  Process,
  CaseStudies,
  FAQ,
  ContactCTA,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <VideoDemo />
        <Transformation />
        <Deliverables />
        <Process />
        <PricingCalculator />
        <CaseStudies />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
