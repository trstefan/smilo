"use client";

import { motion } from "framer-motion";
import { Bot, ArrowRight, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import localFont from "next/font/local"

const mondaFont = localFont({
  src: "../public/fonts/monda-font/monda.otf",
  display: "swap",
})

const navLinks = [
  { label: "About", href: "#" },
  { label: "Features", href: "#" },
  { label: "How It Works", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Support", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Logo */}
        <div         
          className="flex items-center gap-2 mb-8"
        >
          <span className={`text-2xl font-semibold tracking-widest text-white ${mondaFont.className}`}>smilo</span>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-serif italic mb-6 max-w-4xl mx-auto leading-[1.1]">
            Make Kindness a <br /> Daily Habit
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Join thousands of people spreading positivity and building 
            stronger communities through small, meaningful gestures.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#C3FF4D] text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto transition-colors hover:bg-[#b2f03d]"
          >
            Get Started
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        {/* Navigation */}
       
        {/* Bottom Bar */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/40 text-sm font-medium order-2 md:order-1">
            By Stefan
          </div>

          <div className="flex items-center gap-6 order-1 md:order-2">
            <a href="#" className="text-white/40 hover:text-[#C3FF4D] transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-white/40 hover:text-[#C3FF4D] transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-white/40 hover:text-[#C3FF4D] transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="text-white/40 hover:text-[#C3FF4D] transition-colors">
              <Instagram size={18} />
            </a>
          </div>

          <div className="text-white/40 text-sm font-medium order-3">
            Powered by Smilo
          </div>
        </div>
      </div>
    </footer>
  );
}
