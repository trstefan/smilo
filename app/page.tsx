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

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#FAF7F2]">
      {!showContent && (
        <IntroAnimation onComplete={() => setShowContent(true)} />
      )}

      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col w-full min-h-screen text-black overflow-x-hidden"
        >
          <Navbar />

          {/* Hero Section */}
          <section className="relative pt-48 pb-32 px-6 max-w-7xl mx-auto w-full text-center flex flex-col items-center overflow-visible">
            {/* Background Glow */}
            

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-[#FAF7F2] border border-black/5 text-[#2D2621]/60 px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] mb-12 inline-flex items-center gap-2 uppercase shadow-sm"
            >
              <Sparkle size={14} weight="fill" className="text-amber-500" />
              A little goes a long way
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-[9rem] font-serif italic leading-[0.85] mb-12 tracking-tight text-[#2D2621]"
            >
              Make someone's <br /> day.
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl max-w-3xl mb-12 font-medium leading-relaxed text-[#2D2621]/50"
            >
              Smilo helps you show up for the people around you with small gestures that leave a big mark. Private, meaningful, and always free.
            </motion.p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col items-center gap-8"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-14 py-6 rounded-[2rem] text-xl font-bold flex items-center justify-center gap-4 hover:shadow-2xl hover:shadow-black/20 transition-all"
              >
                Start Smiling <ArrowRight size={24} />
              </motion.button>
              <p className="text-[#2D2621]/30 font-serif italic text-lg tracking-wide">It's completely free to start</p>
            </motion.div>
          </section>

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
              <p className="text-xl md:text-2xl max-w-3xl mx-auto font-medium opacity-50">
               Every feature exists for one reason: to help you be a little kinder, every day.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<UserCircle size={32} weight="bold" />}
                title="PERSONAL"
                description="Just for you. No social feed, no followers. Your kindness journey is private and pressure-free."
                color="bg-[#76E0A8]"
              />
              <FeatureCard
                icon={<Target size={32} weight="bold" />}
                title="INTENTIONAL"
                description="Every gesture suggestion is curated to be doable, meaningful, and real for your specific situation."
                color="bg-[#9FB2F5]"
              />
              <FeatureCard
                icon={<Gift size={32} weight="bold" />}
                title="FREE ALWAYS"
                description="Smilo is 100% free. No hidden plans, no premium tiers. Because kindness shouldn't cost a thing."
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
                <h3 className="text-2xl font-black mb-8 text-[#2D2621]/40">
                  One gesture
                </h3>
                <p className="text-2xl md:text-3xl font-serif text-[#2D2621] italic leading-relaxed">
                  "You give a flower to a stranger on a grey Monday morning."
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-12 rounded-[2.5rem] text-left relative overflow-hidden group hover:bg-[#F5F1EA] transition-colors border border-black/5">
                <h3  className="text-2xl font-black mb-8 text-[#2D2621]/40">
                  A thousand smiles
                </h3>
                <p className="text-2xl md:text-3xl font-serif text-[#2D2621] italic leading-relaxed">
                  "They go home lighter. They hug their kids a little longer. Someone notices. Something shifts."
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </main>
  );
}
