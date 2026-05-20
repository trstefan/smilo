"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IntroAnimation } from "@/components/IntroAnimation";
import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { 
  ArrowRight 
} from "lucide-react";
import { UserCircle, Target, Gift, Sparkle, Lightning } from "@phosphor-icons/react";
import { WhyItMatters } from "@/components/WhyItMatters";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#FAF7F2]">
      {!showContent && (
        <IntroAnimation onComplete={() => setShowContent(true)} />
      )}

      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col w-full min-h-screen text-black overflow-x-hidden"
        >

          <Navbar />

          {/* Hero Section */}
          <HeroSection />

          {/* Why It Matters Section */}
          <WhyItMatters />

          {/* How It Works */}
          <HowItWorks />

          {/* FAQ Section */}
          <FAQSection />

          {/* Features Grid */}
          <section className="py-32 px-6 max-w-7xl mx-auto w-full">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-7xl font-serif text-[#2D2621] text-center mb-16 leading-[1.1] italic">
               Engineered for good
              </h2>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto font-semibold text-[#2D2621]/70 tracking-tight">
               Every feature exists for one reason: to help you be a little kinder, every day.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<UserCircle size={32} weight="bold" />}
                title="Personal"
                description="Built around your life
No guilt, no streaks, no pressure. Smilo works with your schedule, not against it. Miss a day? The world still needs you tomorrow."
                color="bg-[#76E0A8]"
              />
              <FeatureCard
                icon={<Target size={32} weight="bold" />}
                title="Intentional"
                description="Every gesture suggestion is curated to be doable, meaningful, and real for your specific situation."
                color="bg-[#9FB2F5]"
              />
              <FeatureCard
                icon={<Gift size={32} weight="bold" />}
                title="Free Always"
                description="Smilo is 100% free. No premium tier. No hidden features. No 'upgrade to unlock kindness.' Every single thing Smilo does is free, because it always should be "
                color="bg-[#F9A8A8]"
              />
            </div>
          </section>

        
          {/* Ripple effect section */}
          <section className="py-32 px-6 text-center max-w-5xl mx-auto">
            <h2 
              className="text-6xl md:text-[12rem] font-serif mb-20 italic leading-[1.1] bg-clip-text text-transparent bg-cover bg-center select-none py-10 px-4"
              style={{ backgroundImage: "url('/images/carousel/2.jfif')" }}
            >
              The Ripple Effect
            </h2>
            {/* Ripple effect content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-8xl mx-auto mt-24">
              <div className="bg-[#FAF7F2] p-12 rounded-[2.5rem] text-left relative overflow-hidden group hover:bg-[#F5F1EA] transition-colors border border-black/5">
                <h3 className="text-2xl font-bold font-serif mb-8 text-[#2D2621]/60 tracking-tight">
                  One gesture
                </h3>
                <p className="text-2xl md:text-3xl font-serif text-[#2D2621] italic leading-relaxed">
                  "You give a flower to a stranger on a grey Monday morning."
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-12 rounded-[2.5rem] text-left relative overflow-hidden group hover:bg-[#F5F1EA] transition-colors border border-black/5">
                <h3  className="text-2xl font-bold font-serif mb-8 text-[#2D2621]/60 tracking-tight">
                  A thousand smiles
                </h3>
                <p className="text-2xl md:text-3xl font-serif text-[#2D2621] italic leading-relaxed">
                  "They go home lighter. They hug their kids a little longer. Someone notices. Something shifts."
                </p>
              </div>
            </div>
          </section>

          <Footer />
        </motion.div>
      )}
    </main>
  );
}
