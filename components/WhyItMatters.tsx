"use client"

import { motion } from "framer-motion"
import { 
  Users, 
  Handshake, 
  CheckCircle,
  Heart,
  Sparkle,
  TrendUp
} from "@phosphor-icons/react"
import Image from "next/image"

function VisualContainer({ src, alt, badge }: { src: string, alt: string, badge?: React.ReactNode }) {
  return (
    <div className="relative group">
      <motion.div 
        
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5] md:aspect-[3/4] w-full max-w-[450px] mx-auto rounded-[3rem] overflow-hidden shadow-2xl"
      >
        <Image 
          src={src} 
          alt={alt}
          fill
          className="object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>
      
      {badge && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="absolute -bottom-6 -right-6 md:-right-10 bg-white p-6 rounded-[2rem] shadow-xl border border-black/5 z-20 hidden md:block"
        >
          {badge}
        </motion.div>
      )}
    </div>
  )
}

export function WhyItMatters() {
  return (
    <section className="py-32 md:py-48 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-48">
        
        {/* Block 1: Reconnect with people */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-6xl md:text-7xl font-serif font-medium italic text-[#2D2621] leading-[1.1] mb-8 tracking-tighter">
                Reconnect with <br /> people
              </h2>
              <p className="text-xl md:text-2xl text-[#2D2621]/80 leading-relaxed font-semibold max-w-xl">
                Research shows that meaningful gestures, however small, boost happiness for both the giver and the receiver. Smilo is built around that truth.
              </p>
            </div>

            <div className=" pt-4">
              <div className="space-y-4">
                <div className="text-orange-500">
                  <Users size={32} weight="fill" />
                </div>
                <h4 className="text-xl font-bold font-serif text-[#2D2621] tracking-tight">Deeper connections</h4>
                <p className="text-[#2D2621]/70 leading-relaxed font-medium">
                  Every gesture on Smilo is designed to strengthen real bonds, not followers or likes.
                </p>
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-500/5 blur-[100px] rounded-full -z-10" />
            
            <VisualContainer 
              src="/images/carousel/2.jfif"
              alt="Kindness gesture"
              badge={
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <Heart size={24} weight="fill" />
                  </div>
                  <div>
                    <p className="text-[#2D2621] font-bold text-sm leading-none mb-1">Momentum</p>
                    <p className="text-[#2D2621]/60 text-[10px] font-bold uppercase tracking-widest">Kindness is contagious</p>
                  </div>
                </div>
              }
            />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
