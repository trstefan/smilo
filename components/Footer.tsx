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
           Ready to make someone's day?
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mb-8">
            
It costs nothing. It takes a minute. And it stays with them longer than you'd think
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FAF7F2] text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto transition-colors hover:cursor-pointer hover:bg-[#b2f03d]"
          >
            Start finding
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        {/* Navigation */}
       
        {/* Bottom Bar */}
       
      </div>
    </footer>
  );
}
