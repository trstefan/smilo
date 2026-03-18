"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import localFont from "next/font/local"

const IconHeart = () => (
  <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] m-auto fill-current">
    <path d="M50 82.5 C35 72.5, 10 55, 10 34 A19 19 0 0 1 50 27.5 A19 19 0 0 1 90 34 C90 55, 65 72.5, 50 82.5 Z" />
  </svg>
);

const IconHouse = () => (
  <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] m-auto fill-current">
    <path d="M50 15 L85 45 V85 H15 V45 Z" />
  </svg>
);

const IconAsterisk = () => (
  <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] m-auto fill-current">
    <g transform="translate(50, 50)">
      <rect x="-10" y="-38" width="20" height="76" rx="10" />
      <rect x="-10" y="-38" width="20" height="76" rx="10" transform="rotate(45)" />
      <rect x="-10" y="-38" width="20" height="76" rx="10" transform="rotate(90)" />
      <rect x="-10" y="-38" width="20" height="76" rx="10" transform="rotate(135)" />
    </g>
  </svg>
);

const IconGift = () => (
  <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] m-auto fill-current">
    <rect x="17" y="52" width="66" height="40" rx="4" />
    <rect x="12" y="38" width="76" height="16" rx="4" />
    <rect x="44" y="38" width="12" height="54" rx="3" />
    <path d="M50 37 C50 37 35 25 32 17 C29 9 38 5 43 11 C47 16 50 25 50 25 C50 25 53 16 57 11 C62 5 71 9 68 17 C65 25 50 37 50 37 Z" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] m-auto fill-current">
    <path d="M50 10 L61 38 L92 38 L67 56 L76 84 L50 67 L24 84 L33 56 L8 38 L39 38 Z" />
  </svg>
);

const symbols = [
  <IconHeart key="1" />,
  <IconHouse key="2" />,
  <IconStar key="3" />,
  <IconGift key="4" />,
  <IconAsterisk key="5" />,
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