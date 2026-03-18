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
      whileHover={{ y: -10 }}
      className={`${color} ${dark ? "text-white" : "text-black"} p-10 rounded-[3rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-start gap-6`}
    >
      <div
        className={`${dark ? "bg-[#FFEA31] text-black" : "bg-black text-white"} p-4 rounded-2xl`}
      >
        {icon}
      </div>
      <h3 className="text-3xl font-black uppercase italic">{title}</h3>
      <p
        className={`text-lg leading-relaxed ${dark ? "opacity-80" : "opacity-70"}`}
      >
        {description}
      </p>
    </motion.div>
  );
}
