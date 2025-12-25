import { Navbar, Footer } from "@/components/layout";
import {
  Hero,
  Problem,
  Solution,
  VideoDemo,
  Transformation,
  Deliverables,
  PricingTiers,
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
        <PricingTiers />
        <CaseStudies />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
