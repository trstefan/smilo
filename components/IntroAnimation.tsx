"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import localFont from "next/font/local"

import { Heart, House, Star, Gift, Asterisk } from "@phosphor-icons/react"

const symbols = [
  <Heart key="1" size={32} weight="fill" />,
  <House key="2" size={32} weight="fill" />,
  <Star key="3" size={32} weight="fill" />,
  <Gift key="4" size={32} weight="fill" />,
  <Asterisk key="5" size={32} weight="bold" />,
];

const letters = ["s", "m", "i", "l", "o"]

const mondaFont = localFont({
  src: "../public/fonts/monda-font/monda.otf",
  display: "swap",
})

const INTRO_SHOWN_KEY = "smilo-intro-shown"

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"symbols" | "morph" | "exit" | "skip">("symbols")
  const [hydrated, setHydrated] = useState(false)
  const [visibleSymbols, setVisibleSymbols] = useState<number>(0)
  const [morphedLetters, setMorphedLetters] = useState<number>(0)

  useEffect(() => {
    const hasShown = sessionStorage.getItem(INTRO_SHOWN_KEY)
    if (hasShown) {
      setPhase("skip")
    } else {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    // Phase 1: Reveal symbols one by one
    if (phase === "symbols" && hydrated && visibleSymbols < symbols.length) {
      const timer = setTimeout(() => {
        setVisibleSymbols((prev) => prev + 1)
      }, 120)
      return () => clearTimeout(timer)
    }

    // Transition to morph phase
    if (phase === "symbols" && hydrated && visibleSymbols === symbols.length) {
      const timer = setTimeout(() => {
        setPhase("morph")
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [phase, hydrated, visibleSymbols])

  useEffect(() => {
    // Phase 2: Morph symbols to letters
    if (phase === "morph" && morphedLetters < letters.length) {
      const timer = setTimeout(() => {
        setMorphedLetters((prev) => prev + 1)
      }, 150)
      return () => clearTimeout(timer)
    }

    // Transition to exit phase
    if (phase === "morph" && morphedLetters === letters.length) {
      const timer = setTimeout(() => {
        setPhase("exit")
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [phase, morphedLetters])

  useEffect(() => {
    // Phase 3: Exit and show landing page
    if (phase === "exit") {
      const timer = setTimeout(() => {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(INTRO_SHOWN_KEY, "true")
        }
        onComplete()
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [phase, onComplete])

  useEffect(() => {
    if (phase === "skip") {
      onComplete()
    }
  }, [phase, onComplete])

  if (phase === "skip") {
    return null
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              if (sessionStorage.getItem('${INTRO_SHOWN_KEY}')) {
                document.documentElement.classList.add('skip-intro-bg');
              } else {
                document.documentElement.classList.remove('skip-intro-bg');
              }
            } catch (e) {}
          `,
        }}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          .skip-intro-bg #intro-animation-container {
            display: none !important;
          }
        `
      }} />
      <div id="intro-animation-container" className="fixed inset-0 z-50 bg-[#F7E731]">
        {hydrated && (
        <AnimatePresence>
          {phase !== "exit" ? (
            <motion.div
              className="flex items-center justify-center w-full h-full"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex items-baseline gap-1">
                  {symbols.map((symbol, index) => (
                    <div key={index} className="relative h-12 w-10">
                      {/* Symbol */}
                      <motion.span
                        className="absolute inset-0 flex items-center justify-center text-3xl font-light text-foreground"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                          opacity: index < visibleSymbols && index >= morphedLetters ? 1 : 0,
                          scale: index < visibleSymbols ? 1 : 0.95,
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {symbol}
                      </motion.span>

                      {/* Letter */}
                      <motion.span
                        className={`${mondaFont.className} absolute inset-0 flex items-center justify-center text-4xl font-medium tracking-tight text-foreground`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                          opacity: index < morphedLetters ? 1 : 0,
                          scale: index < morphedLetters ? 1 : 0.95,
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        {letters[index]}
                      </motion.span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
      </div>
    </>
  )
}