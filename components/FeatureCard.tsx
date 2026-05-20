"use client";

import type React from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  dark?: boolean;
}

export function FeatureCard({
  icon,
  title,
  description,
  color,
  dark = false,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, x: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${color} ${dark ? "text-white" : "text-black"} p-10 rounded-[3rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-start gap-6`}
    >
      <div
        className={`${dark ? "bg-white text-black" : "bg-black text-white"} p-4 rounded-2xl flex items-center justify-center`}
      >
        {icon}
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold font-serif italic tracking-tight">
          {title}
        </h3>
        <p className={`text-lg leading-relaxed font-semibold ${dark ? "text-white/90" : "text-black/80"}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}
