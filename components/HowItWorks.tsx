"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Coffee, PenLine, Gift, Sparkles, Bell, Check, Calendar, Star } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Discover",
    headline: "Find your gesture",
    description:
      "Browse or get suggested gestures, from 'write a handwritten note' to 'bring coffee to a colleague'.",
  },
  {
    number: "02",
    title: "Commit",
    headline: "Make it yours",
    description:
      "Pick one that feels right. Set a reminder if you need a little nudge.",
  },
  {
    number: "03",
    title: "Do It",
    headline: "Go make someone's day.",
    description:
      "Go out and make it happen. Log it, feel good about it, and come back for more.",
  },
]

function StepOneVisual() {
  const gestures = [
    { icon: PenLine, label: "Write a handwritten note", color: "bg-amber-500/20 text-amber-400" },
    { icon: Coffee, label: "Bring coffee to a colleague", color: "bg-orange-500/20 text-orange-400", active: true },
    { icon: Gift, label: "Surprise someone with a gift", color: "bg-pink-500/20 text-pink-400" },
    { icon: Heart, label: "Give a genuine compliment", color: "bg-red-500/20 text-red-400" },
  ]

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 w-full max-w-[280px] border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={14} className="text-[#FFEA31]" />
        <p className="text-white/60 text-xs">Suggested for you</p>
      </div>
      <div className="flex flex-col gap-2">
        {gestures.map((gesture, i) => (
          <motion.div
            key={gesture.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
              gesture.active 
                ? "bg-[#FFEA31]/10 border border-[#FFEA31]/30" 
                : "hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className={`p-2 rounded-lg ${gesture.color}`}>
              <gesture.icon size={16} />
            </div>
            <span className={`text-sm ${gesture.active ? "text-white font-medium" : "text-white/70"}`}>
              {gesture.label}
            </span>
            {gesture.active && (
              <div className="ml-auto w-2 h-2 rounded-full bg-[#FFEA31]" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StepTwoVisual() {
  return (
    <div className="relative w-full max-w-[280px]">
      <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/10">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-xl bg-orange-500/20">
            <Coffee size={20} className="text-orange-400" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">Bring coffee to a colleague</p>
            <p className="text-white/40 text-xs">Selected gesture</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <Bell size={16} className="text-[#FFEA31]" />
            <div className="flex-1">
              <p className="text-white/80 text-xs">Reminder</p>
              <p className="text-white text-sm font-medium">Tomorrow, 9:00 AM</p>
            </div>
            <div className="w-8 h-5 rounded-full bg-[#FFEA31] flex items-center justify-end px-0.5">
              <div className="w-4 h-4 rounded-full bg-black" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <Calendar size={16} className="text-white/50" />
            <div className="flex-1">
              <p className="text-white/80 text-xs">Add to calendar</p>
            </div>
            <div className="w-8 h-5 rounded-full bg-white/20 flex items-center px-0.5">
              <div className="w-4 h-4 rounded-full bg-white/60" />
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-5 py-3 rounded-xl bg-[#FFEA31] text-black font-bold text-sm"
        >
          Commit to this gesture
        </motion.button>
      </div>
    </div>
  )
}

function StepThreeVisual() {
  return (
    <div className="relative w-full max-w-[280px]">
      <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center text-center mb-5"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3"
          >
            <Check size={32} className="text-emerald-400" />
          </motion.div>
          <p className="text-white font-bold text-lg">You did it!</p>
          <p className="text-white/50 text-sm">Gesture completed</p>
        </motion.div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <Coffee size={16} className="text-orange-400" />
            <p className="text-white/80 text-sm">Brought coffee to Sarah</p>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={14} className="text-[#FFEA31] fill-[#FFEA31]" />
            ))}
            <span className="text-white/40 text-xs ml-2">Felt amazing!</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-center">
          <div>
            <p className="text-[#FFEA31] text-2xl font-bold">12</p>
            <p className="text-white/40 text-xs">Gestures done</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-[#FFEA31] text-2xl font-bold">5</p>
            <p className="text-white/40 text-xs">Day streak</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <p className="text-[#FFEA31] text-2xl font-bold">8</p>
            <p className="text-white/40 text-xs">People smiled</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const visuals = [StepOneVisual, StepTwoVisual, StepThreeVisual]

export function HowItWorks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-32 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
            HOW IT WORKS.
          </h2>
          <p className="text-xl text-white/50 max-w-xl">
            Three simple steps to transform your daily routine.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-4 min-h-[500px]">
          {steps.map((step, index) => {
            const Visual = visuals[index]
            const isHovered = hoveredIndex === index
            const hasHover = hoveredIndex !== null
            
            return (
              <motion.div
                key={step.number}
                className="relative bg-[#0a0a0a] rounded-[2rem] p-8 border border-white/10 overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  flex: isHovered ? 2 : hasHover ? 1 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Step number and title */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-white/30 text-4xl md:text-5xl font-light">{step.number}</span>
                  <span className="text-white text-4xl md:text-5xl font-black italic">{step.title}</span>
                </div>

                {/* Visual - shows on hover or always on mobile */}
                <motion.div
                  className="mb-8 flex justify-center items-center min-h-[200px] lg:min-h-[250px]"
                  animate={{
                    opacity: isHovered || !hasHover ? 1 : 0.3,
                    scale: isHovered ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Visual />
                </motion.div>

                {/* Text content */}
                <motion.div
                  animate={{
                    opacity: isHovered || !hasHover ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{step.headline}</h3>
                  <p className="text-white/50 text-base md:text-lg">{step.description}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
