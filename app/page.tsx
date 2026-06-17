'use client'

import LandingNav from "@/components/landing/landing-nav";
import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import HowItWorksSection from "@/components/landing/howIt-works-section";
import PricingSection from "@/components/landing//pricing-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import FaqSection from "@/components/landing/faq-section";
import FooterSection from "@/components/landing/footer-section";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <FooterSection />
    </div>
  );
}