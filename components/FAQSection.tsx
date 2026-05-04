"use client"

import React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

interface FAQItem {
  id: number
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How does Smilo suggest gestures for me?",
    answer:
      "Smilo offers a growing library of gestures for strangers, friends, family, and colleagues. You can browse freely or get a daily suggestion to keep things fresh.",
  },
  {
    id: 2,
    question: "Does Smilo share my data or activity?",
    answer:
      "Never. Your gestures are yours alone. We don't share, sell, or display your activity anywhere.",
  },
  {
    id: 3,
    question: "Is Smilo really free?",
    answer:
      "100%. No hidden plans, no premium tiers. Smilo is free for everyone, forever.",
  },
]

export function FAQSection() {
  const [activeId, setActiveId] = useState<number | null>(1)

  return (
    <section className="py-24 px-6 bg-[#FAF7F2] flex justify-center">
      <div className="w-full max-w-6xl p-12 md:p-24 flex flex-col items-center">
        {/* Header */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-serif text-[#2D2621] text-center mb-16 leading-[1.1] italic"
        >
          Everything you need
          <br />
          to know about Smilo
        </motion.h2>

        {/* Accordion */}
        <div className="w-full max-w-3xl">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="border-t border-[#2D2621]/10 last:border-b"
            >
              <button
                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                className="w-full py-8 flex items-center justify-between text-left group transition-all duration-300"
              >
                <span className={`text-xl md:text-2xl font-medium transition-all duration-300 ${
                  activeId === item.id ? 'text-[#2D2621]' : 'text-[#2D2621]/70'
                }`}>
                  {item.question}
                </span>
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  activeId === item.id 
                    ? 'bg-[#2D2621] text-[#FAF7F2] rotate-180' 
                    : 'bg-[#2D2621] text-[#FAF7F2] hover:scale-110'
                }`}>
                  {activeId === item.id ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-12">
                      <p className="text-[#2D2621]/60 text-lg leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

