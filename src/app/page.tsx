import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  Problem,
  Solution,
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
