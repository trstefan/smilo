"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bot } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Technology", href: "#" },
    { label: "Safety", href: "#" },
    { label: "Specifications", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Blog", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Support", href: "#" },
    { label: "API", href: "#" },
    { label: "Partners", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Compliance", href: "#" },
    { label: "Patents", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black text-white border ">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-black tracking-tight">SMILO</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Making kindness a daily habit
            </p>
            <div className="flex gap-4">
              {["X", "Li", "Gh", "Yt"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all text-xs font-bold"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-6">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs">
            © 2026 Smilo. All rights reserved.
          </p>
        </div>
      </div>

      {/* Giant Logo Background */}
      <div className="relative overflow-hidden py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-[20vw] font-black tracking-tighter text-pink-500 leading-none select-none">
            SMILO
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
