"use client"

import React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Minus, 
  Heart, 
  Users, 
  Briefcase, 
  UserCircle,
  Lock,
  EyeOff,
  ShieldCheck,
  Sparkles,
  Gift,
  Infinity as InfinityIcon,
  HandHeart
} from "lucide-react"

interface FAQItem {
  id: number
  question: string
  answer: string
  visual: React.ReactNode
}

// Visual 1: Gesture Library with categories
function GestureLibraryVisual() {
  const categories = [
    { icon: Users, label: "Strangers", color: "from-cyan-500 to-blue-500", gestures: ["Hold the door", "Pay it forward", "Give directions"] },
    { icon: Heart, label: "Friends", color: "from-pink-500 to-rose-500", gestures: ["Surprise visit", "Send a meme", "Plan a hangout"] },
    { icon: UserCircle, label: "Family", color: "from-amber-500 to-orange-500", gestures: ["Call mom", "Share photos", "Cook together"] },
    { icon: Briefcase, label: "Colleagues", color: "from-emerald-500 to-teal-500", gestures: ["Bring coffee", "Share credit", "Give praise"] },
  ]

  const [hoveredCategory, setHoveredCategory] = useState(2)

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-3xl p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={14} className="text-[#FFEA31]" />
        <p className="text-white/50 text-xs font-medium">Gesture Library</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onHoverStart={() => setHoveredCategory(i)}
            className={`p-4 rounded-2xl cursor-pointer transition-all ${
              hoveredCategory === i 
                ? "bg-white/10 border-white/20" 
                : "bg-white/5 border-white/5"
            } border`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3`}>
              <cat.icon size={20} className="text-white" />
            </div>
            <p className="text-white font-medium text-sm">{cat.label}</p>
            <p className="text-white/40 text-xs">{cat.gestures.length}+ gestures</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        key={hoveredCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-white/5 rounded-xl p-4 border border-white/10"
      >
        <p className="text-white/40 text-xs mb-3">Popular in {categories[hoveredCategory].label}</p>
        <div className="flex flex-col gap-2">
          {categories[hoveredCategory].gestures.map((gesture, i) => (
            <motion.div 
              key={gesture}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFEA31]" />
              <span className="text-white/80 text-sm">{gesture}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Visual 2: Privacy Shield Animation
function PrivacyVisual() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-3xl p-6 flex flex-col items-center justify-center">
      <div className="relative mb-8">
        {/* Outer rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-48 h-48 -m-6"
        >
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <motion.div
              key={angle}
              className="absolute w-3 h-3 rounded-full bg-emerald-500/30"
              style={{
                left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 80}px - 6px)`,
                top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 80}px - 6px)`,
              }}
            />
          ))}
        </motion.div>
        
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-36 h-36 rounded-full bg-emerald-500/10 flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
            className="w-28 h-28 rounded-full bg-emerald-500/20 flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
              className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center"
            >
              <Lock size={32} className="text-black" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          {[
            { icon: EyeOff, label: "No tracking" },
            { icon: ShieldCheck, label: "No sharing" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2"
            >
              <item.icon size={14} className="text-emerald-400" />
              <span className="text-white/60 text-xs">{item.label}</span>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-emerald-400 text-sm font-medium"
        >
          Your data stays with you
        </motion.p>
      </div>
    </div>
  )
}

// Visual 3: Free Forever Animation
function FreeForeverVisual() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-3xl p-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative mb-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-40 h-40 rounded-full border border-dashed border-[#FFEA31]/30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-28 h-28 rounded-full bg-[#FFEA31]/10 flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-[#FFEA31] flex items-center justify-center"
            >
              <InfinityIcon size={36} className="text-black" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <p className="text-4xl font-black text-white mb-2">$0</p>
        <p className="text-white/50 text-sm mb-4">forever</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-2"
      >
        {["No premium", "No ads", "No limits"].map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

// Default empty state visual
function DefaultVisual() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-3xl flex items-center justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="relative"
      >
        <div className="w-24 h-24 rounded-full bg-[#FFEA31]/10 flex items-center justify-center">
          <HandHeart size={40} className="text-[#FFEA31]/50" />
        </div>
        <motion.div
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#FFEA31]/30"
        />
        <motion.div
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-[#FFEA31]/20"
        />
      </motion.div>
    </div>
  )
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How does Smilo suggest gestures for me?",
    answer:
      "Smilo offers a growing library of gestures for strangers, friends, family, and colleagues. You can browse freely or get a daily suggestion to keep things fresh.",
    visual: <GestureLibraryVisual />,
  },
  {
    id: 2,
    question: "Does Smilo share my data or activity?",
    answer:
      "Never. Your gestures are yours alone. We don't share, sell, or display your activity anywhere.",
    visual: <PrivacyVisual />,
  },
  {
    id: 3,
    question: "Is Smilo really free?",
    answer:
      "100%. No hidden plans, no premium tiers. Smilo is free for everyone, forever.",
    visual: <FreeForeverVisual />,
  },
]

export function FAQSection() {
  const [activeId, setActiveId] = useState<number | null>(1)

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40 mb-4">
            FAQ
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
            Everything you need
            <br />
            to know about Smilo
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Questions */}
          <div className="flex flex-col">
            {faqItems.map((item) => (
              <motion.div
                key={item.id}
                className="border-t border-black/10 last:border-b"
              >
                <button
                  onClick={() =>
                    setActiveId(activeId === item.id ? null : item.id)
                  }
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span
                    className={`text-lg md:text-xl font-semibold transition-colors ${activeId === item.id ? "text-black" : "text-black/70 group-hover:text-black"}`}
                  >
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeId === item.id ? "bg-black text-white" : "bg-black/5 text-black"}`}
                  >
                    {activeId === item.id ? (
                      <Minus size={16} />
                    ) : (
                      <Plus size={16} />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {activeId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <p className="text-black/60 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Visual */}
          <div className="relative h-[400px] lg:h-auto lg:min-h-[500px] rounded-3xl overflow-hidden bg-black/5">
            <AnimatePresence mode="wait">
              {activeId ? (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  {faqItems.find((item) => item.id === activeId)?.visual}
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  <DefaultVisual />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
