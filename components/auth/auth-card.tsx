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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative z-10 bg-white text-card-foreground w-full md:max-w-[480px] md:rounded-3xl p-8 md:p-10 md:flex-none flex flex-col shadow-2xl -mt-10 md:mt-0 rounded-t-3xl"
    >
      {children}
    </motion.div>
  )
}
