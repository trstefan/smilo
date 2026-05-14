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

function VisualContainer({ imageUrl, alt, badge }: { imageUrl: string, alt: string, badge?: React.ReactNode }) {
  return (
    <div className="relative group">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5] md:aspect-[3/4] w-full max-w-[450px] mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
      >
        <Image 
          src={imageUrl} 
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
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
              <span className="inline-block px-4 py-1.5 rounded-full border border-[#2D2621]/10 text-[#2D2621]/40 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                Disconnect
              </span>
              <h2 className="text-5xl md:text-7xl font-serif italic text-[#2D2621] leading-[1.1] mb-8 tracking-tighter">
                Reconnect with <br /> people
              </h2>
              <p className="text-xl md:text-2xl text-[#2D2621]/60 leading-relaxed font-medium max-w-xl">
                Research shows that meaningful gestures, however small, boost happiness for both the giver and the receiver. Smilo is built around that truth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
              <div className="space-y-4">
                <div className="text-orange-500">
                  <Users size={32} weight="fill" />
                </div>
                <h4 className="text-xl font-black text-[#2D2621] tracking-tight">Deeper connections</h4>
                <p className="text-[#2D2621]/50 leading-relaxed">
                  Every gesture on Smilo is designed to strengthen real bonds, not followers or likes.
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-orange-500">
                  <Handshake size={32} weight="fill" />
                </div>
                <h4 className="text-xl font-black text-[#2D2621] tracking-tight">Built-in accountability</h4>
                <p className="text-[#2D2621]/50 leading-relaxed">
                  Stay on track together with group rewards that make going offline rewarding.
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
              imageUrl="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop"
              alt="Kindness gesture"
              badge={
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <Heart size={24} weight="fill" />
                  </div>
                  <div>
                    <p className="text-[#2D2621] font-black text-sm leading-none mb-1">Momentum</p>
                    <p className="text-[#2D2621]/40 text-[10px] font-bold uppercase tracking-widest">Kindness is contagious</p>
                  </div>
                </div>
              }
            />
          </motion.div>
        </div>

        {/* Block 2: Small acts, every day */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative lg:order-1 order-2"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-500/5 blur-[100px] rounded-full -z-10" />
             
             <VisualContainer 
                imageUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop"
                alt="Friends laughing"
                badge={
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                      <TrendUp size={24} weight="bold" />
                    </div>
                    <div>
                      <p className="text-[#2D2621] font-black text-sm leading-none mb-1">Growth</p>
                      <p className="text-[#2D2621]/40 text-[10px] font-bold uppercase tracking-widest">A way of life</p>
                    </div>
                  </div>
                }
              />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10 lg:order-2 order-1"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-[#2D2621]/10 text-[#2D2621]/40 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                Build Habits
              </span>
              <h2 className="text-5xl md:text-7xl font-serif italic text-[#2D2621] leading-[1.1] mb-8 tracking-tighter">
                Small acts, <br /> every day
              </h2>
              <p className="text-xl md:text-2xl text-[#2D2621]/60 leading-relaxed font-medium max-w-xl">
                Kindness isn't a one-time event; it's a practice. Smilo helps you build the "kindness muscle" with reminders that fit into your busy life.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { text: "Turn 'I should' into 'I did' with gentle nudges.", icon: Sparkle, color: "text-amber-500" },
                { text: "Keep the momentum going with personal streaks.", icon: Heart, color: "text-red-500" },
                { text: "Celebrate the small wins that make a big difference.", icon: CheckCircle, color: "text-emerald-500" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-5 rounded-[2rem] border border-black/5 group hover:bg-white transition-all"
                >
                  <div className={item.color}>
                    <item.icon size={28} weight="fill" className="group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[#2D2621] font-bold tracking-tight text-lg">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
