"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AuthCardProps {
  children: ReactNode
  animationKey: string
}

export function AuthCard({ children, animationKey }: AuthCardProps) {
  return (
    <motion.div
      key={animationKey}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 bg-white/95 backdrop-blur-sm text-card-foreground w-full md:max-w-[700px] md:rounded-[2.5rem] p-10 md:p-14 md:flex-none flex flex-col shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] -mt-10 md:mt-0 rounded-t-3xl border border-white/20"
    >
      {children}
    </motion.div>
  )
}

