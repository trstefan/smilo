"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F2]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/wall.jpg"
          alt="Textured wall background"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Gradient overlay for better text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/80 via-transparent to-[#FAF7F2]" />
      </div>

      <div className="relative z-10 pt-48 pb-32 px-6 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
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
          className="text-xl md:text-2xl max-w-3xl mb-16 font-semibold leading-relaxed text-[#2D2621]"
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
            className="bg-[#FAF7F2] text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto transition-colors hover:cursor-pointer hover:bg-[#b2f03d]"
          >
            Start finding
            <ArrowRight size={20} />
          </motion.button>
          <p className="text-[#2D2621]/50 font-serif italic text-lg tracking-wide">It's completely free to start</p>
        </motion.div>
      </div>
    </section>
  );
}
