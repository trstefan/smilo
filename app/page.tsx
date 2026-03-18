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
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Target,
  Zap,
  MessageCircleQuestion,
  Heart,
} from "lucide-react";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <main className="relative min-h-screen bg-background">
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
          <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-black text-[#FFEA31] px-5 py-1.5 rounded-full text-xs font-bold italic tracking-[0.2em] mb-8 inline-flex items-center gap-2"
            >
              A little goes a long way

            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-[8rem] font-black leading-[0.85] mb-12 tracking-tighter uppercase"
            >
              MAKE SOMEONE'S DAY.
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl max-w-2xl mb-12 font-medium leading-relaxed text-black/60"
            >
              Smilo helps you show up for the people around you with small gestures that leave a big mark. Free, personal, and always meaningful
            </motion.p>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button className="bg-black text-white px-10 py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-black/10">
                Start Smilingt <ArrowRight size={20} />
              </button>
              <button className="bg-white/50 backdrop-blur-sm border-2 border-black/10 text-black px-10 py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 hover:bg-white transition-all">
                See how it works
              </button>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 md:left-20 top-1/2 hidden lg:block"
            >
              <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-black/5 -rotate-12">
                <BrainCircuit
                  size={64}
                  strokeWidth={1.5}
                  className="text-black"
                />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 md:right-20 bottom-1/4 hidden lg:block"
            >
              <div className="bg-black p-6 rounded-[2.5rem] shadow-2xl border border-white/10 rotate-[8deg]">
                <Target
                  size={64}
                  strokeWidth={1.5}
                  className="text-[#FFEA31]"
                />
              </div>
            </motion.div>
          </section>

          {/*  WHY IT MATTERS. Section */}
          <section className="bg-black text-[#FFEA31] py-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
                  WHY IT MATTERS?
                </h2>
                <p className="text-xl md:text-2xl mb-12 opacity-80 leading-relaxed max-w-md">
                  Research shows that meaningful gestures, however small, boost happiness for both the giver and the receiver. Smilo is built around that truth.
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-5">
                    <div className="bg-[#FFEA31] p-3 rounded-2xl text-black">
                      <Sparkles size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl uppercase tracking-wider">
                        HUMAN CONNECTION

                      </h4>
                      <p className="opacity-60 text-lg">
                        Every gesture on Smilo is designed to strengthen real bonds, not followers, not likes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="bg-[#FFEA31] p-3 rounded-2xl text-black">
                      <Zap size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl uppercase tracking-wider">
                        INSTANT INSPIRATION
                      </h4>
                      <p className="opacity-60 text-lg">
                        Stuck on what to do? Smilo suggests ideas tailored to the moment, the mood, and the person.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-[#111] border border-white/10 rounded-[3rem] p-10 md:p-14 min-h-75 flex items-center justify-center"
              >
                <p className="text-white/40 text-lg">
                  Interactive demo coming soon
                </p>
              </motion.div>
            </div>
          </section>

          {/* How It Works */}
          <HowItWorks />

          {/* FAQ Section */}
          <FAQSection />

          {/* Features Grid */}
          <section className="py-32 px-6 max-w-7xl mx-auto w-full">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase italic">
               ENGINEERED FOR GOOD.
              </h2>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto font-medium opacity-50">
               Every feature exists for one reason: to help you be a little kinder, every day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <FeatureCard
                icon={<Target size={32} />}
                title="PERSONAL"
                description="Just for you. No social feed, no followers. Your kindness journey is private and pressure-free."
                color="bg-white"
              />
              <FeatureCard
                icon={<MessageCircleQuestion size={32} />}
                title="INTENTIONAL"
                description="Every gesture suggestion is curated to be doable, meaningful, and real."
                color="bg-black"
                dark
              />
              <FeatureCard
                icon={<Heart size={32} />}
                title=" FREE, ALWAYS"
                description="Smilo is completely free. Because kindness shouldn't cost a thing."
                color="bg-white"
              />
            </div>
          </section>

        
          {/* Bottom CTA */}
          <section className="py-32 px-6 text-center max-w-5xl mx-auto">
            <h2 className="text-6xl md:text-[10rem] font-black mb-12 italic tracking-[-0.05em] uppercase leading-none">
            THE RIPPLE EFFECT.
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-12">
              <div className="text-left max-w-xs">
                <p className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">
                  One gesture.
                </p>
                <p className="text-lg font-bold italic">
                  You give a flower to a stranger on a grey Monday morning.
                </p>
              </div>
              <div className="h-px md:h-20 w-20 md:w-px bg-black/10" />
              <div className="text-left max-w-xs">
                <p className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-gray-400">
                  A thousand smiles.
                </p>
                <p className="text-lg font-bold italic">
                  They go home lighter. They hug their kids a little longer. Someone notices. Something shifts.
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
