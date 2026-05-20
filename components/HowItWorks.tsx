"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  PencilCircle, 
  Coffee, 
  Gift, 
  Heart, 
  Sparkle, 
  Bell, 
  CheckCircle, 
  Calendar, 
  Star 
} from "@phosphor-icons/react"

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
    { icon: PencilCircle, label: "Write a note", color: "bg-amber-500/10 text-amber-600" },
    { icon: Coffee, label: "Bring coffee", color: "bg-orange-500/10 text-orange-600", active: true },
    { icon: Gift, label: "Surprise gift", color: "bg-pink-500/10 text-pink-600" },
    { icon: Heart, label: "Compliment", color: "bg-red-500/10 text-red-600" },
  ]

  return (
    <div className="bg-white rounded-3xl p-6 w-full max-w-[300px] border border-black/5 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Sparkle size={16} weight="fill" className="text-amber-500" />
        <p className="text-[#2D2621]/60 text-xs font-bold uppercase tracking-wider">Suggested for you</p>
      </div>
      <div className="flex flex-col gap-3">
        {gestures.map((gesture, i) => (
          <motion.div
            key={gesture.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
              gesture.active 
                ? "bg-black text-white shadow-lg" 
                : "bg-[#FAF7F2] text-[#2D2621]/70"
            }`}
          >
            <div className={`p-2 rounded-xl ${gesture.active ? "bg-white/20 text-white" : gesture.color}`}>
              <gesture.icon size={20} weight={gesture.active ? "bold" : "regular"} />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              {gesture.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StepTwoVisual() {
  return (
    <div className="relative w-full max-w-[300px]">
      <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-600">
            <Coffee size={24} weight="bold" />
          </div>
          <div>
            <p className="text-[#2D2621] font-bold text-sm tracking-tight leading-none mb-1">Bring coffee</p>
            <p className="text-[#2D2621]/40 text-xs font-medium uppercase tracking-wider">Selected gesture</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-black/5">
            <Bell size={20} weight="fill" className="text-amber-500" />
            <div className="flex-1">
              <p className="text-[#2D2621]/40 text-[10px] font-black uppercase tracking-[0.1em] mb-0.5">Reminder</p>
              <p className="text-[#2D2621] text-sm font-bold tracking-tight">Tomorrow, 9:00 AM</p>
            </div>
            <div className="w-10 h-6 rounded-full bg-black flex items-center justify-end px-1">
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-black/5 opacity-50">
            <Calendar size={20} weight="regular" className="text-[#2D2621]/40" />
            <div className="flex-1">
              <p className="text-[#2D2621]/80 text-sm font-semibold tracking-tight">Add to calendar</p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-4 rounded-2xl bg-black text-white font-bold text-sm tracking-tight"
        >
          Commit to this
        </motion.button>
      </div>
    </div>
  )
}

function StepThreeVisual() {
  return (
    <div className="relative w-full max-w-[300px]">
      <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center text-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4"
          >
            <CheckCircle size={40} weight="fill" className="text-emerald-500" />
          </motion.div>
          <p className="text-[#2D2621] font-bold text-xl tracking-tighter leading-none mb-1">You did it!</p>
          <p className="text-[#2D2621]/40 text-xs font-bold uppercase tracking-widest">Gesture completed</p>
        </motion.div>

        <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-black/5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Coffee size={18} weight="bold" className="text-orange-600" />
            <p className="text-[#2D2621] text-sm font-bold tracking-tight italic font-serif">Brought coffee to Sarah</p>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={14} weight="fill" className="text-amber-500" />
            ))}
            <span className="text-[#2D2621]/40 text-[10px] font-bold uppercase tracking-widest ml-3">Felt amazing!</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-center gap-4 px-2">
          <div>
            <p className="text-[#2D2621] text-2xl font-bold leading-none mb-1">12</p>
            <p className="text-[#2D2621]/30 text-[10px] font-bold uppercase tracking-widest leading-none">Gestures</p>
          </div>
          <div className="w-px h-8 bg-black/5" />
          <div>
            <p className="text-[#2D2621] text-2xl font-bold leading-none mb-1">5</p>
            <p className="text-[#2D2621]/30 text-[10px] font-bold uppercase tracking-widest leading-none">Streak</p>
          </div>
          <div className="w-px h-8 bg-black/5" />
          <div>
            <p className="text-[#2D2621] text-2xl font-bold leading-none mb-1">8</p>
            <p className="text-[#2D2621]/30 text-[10px] font-bold uppercase tracking-widest leading-none">Smiles</p>
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
    <section className="py-40 px-6 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="text-5xl md:text-8xl font-serif text-[#2D2621] tracking-tighter italic mb-8">
            How It Works
          </h2>
          <p className="text-xl md:text-2xl text-[#2D2621]/80 max-w-2xl mx-auto font-semibold">
            Three simple steps to transform your daily routine into a journey of kindness.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 min-h-[550px]">
          {steps.map((step, index) => {
            const Visual = visuals[index]
            const isHovered = hoveredIndex === index
            const hasHover = hoveredIndex !== null
            
            return (
              <motion.div
                key={step.number}
                className="relative bg-white rounded-[3rem] p-10 border border-black/5 overflow-hidden cursor-pointer shadow-sm group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  flex: isHovered ? 2.5 : hasHover ? 1 : 1,
                  backgroundColor: isHovered ? "#ffffff" : "#fcfbf9",
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.32, 0.72, 0, 1],
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Step number and title */}
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-[#2D2621]/20 text-4xl md:text-6xl font-light italic font-serif leading-none">{step.number}</span>
                  <span className="text-[#2D2621] text-4xl md:text-6xl font-serif italic tracking-tighter leading-none">{step.title}</span>
                </div>

                {/* Visual - shows on hover or always on mobile */}
                <motion.div
                  className="mb-10 flex justify-center items-center min-h-[250px]"
                  animate={{
                    opacity: isHovered || !hasHover ? 1 : 0.2,
                    scale: isHovered ? 1.05 : 0.95,
                    y: isHovered ? 0 : 10,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Visual />
                </motion.div>

                {/* Text content */}
                <motion.div
                  animate={{
                    opacity: isHovered || !hasHover ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-[#2D2621] text-2xl md:text-3xl font-serif italic mb-4 leading-tight">{step.headline}</h3>
                  <p className="text-[#2D2621]/80 text-lg md:text-xl leading-relaxed font-semibold">{step.description}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
