"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Play } from "lucide-react"
import Image from "next/image"
import localFont from "next/font/local"

const mondaFont = localFont({
  src: "../public/fonts/monda-font/monda.otf",
  display: "swap",
})

const navLinks = [
  { label: "Technology", href: "/technology" },
  { label: "Company", href: "/company" },
  { label: "Careers", href: "/careers" },
  { label: "Journal", href: "/journal" },
  { label: "Beta", href: "/beta" },
]

const EASING: [number, number, number, number] = [0.32, 0.72, 0, 1]
const DURATION = 0.4

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          
          if (isOpen || currentScrollY < 100) {
            setIsVisible(true)
          } else if (currentScrollY < lastScrollY.current) {
            setIsVisible(true)
          } else if (currentScrollY > lastScrollY.current + 10) {
            setIsVisible(false)
          }
          
          lastScrollY.current = currentScrollY
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navbar Container */}
      <motion.div
        className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="overflow-hidden rounded-2xl border border-border bg-[#FFFFFF] shadow-lg"
          initial={false}
          animate={{
            width: isOpen ? "min(600px, 90vw)" : 220,
          }}
          transition={{
            duration: DURATION,
            ease: EASING,
          }}
        >
          {/* Header - Always visible */}
          <div className="flex items-center justify-center px-5 py-3">
            <div className="flex items-center gap-8">
              <RobotIcon />
              <span className={`text-2xl font-semibold tracking-widest text-foreground ${mondaFont.className}`}>
                smilo
              </span>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-muted"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-5 w-5 text-foreground" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="h-5 w-5 text-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Expandable Content */}
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? "auto" : 0,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{
              height: { duration: DURATION, ease: EASING },
              opacity: { duration: isOpen ? 0.25 : 0.15, delay: isOpen ? 0.1 : 0 },
            }}
            className="overflow-hidden"
          >
            {/* Content */}
            <div className="flex flex-col gap-6 px-5 pb-5 md:flex-row md:gap-8">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium text-foreground transition-colors hover:text-muted-foreground"
                    initial={false}
                    animate={{
                      opacity: isOpen ? 1 : 0,
                      x: isOpen ? 0 : -20,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: isOpen ? 0.1 + index * 0.04 : 0,
                      ease: EASING,
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Image / Video Thumbnail */}
              <motion.div
                className="relative aspect-video flex-1 overflow-hidden rounded-xl md:aspect-[4/3]"
                initial={false}
                animate={{
                  opacity: isOpen ? 1 : 0,
                  scale: isOpen ? 1 : 0.95,
                }}
                transition={{
                  duration: 0.35,
                  delay: isOpen ? 0.15 : 0,
                  ease: EASING,
                }}
              >
                <Image
                  src="/images/our-story.jpg"
                  alt="Our story"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/70">
                    <Play className="h-4 w-4 fill-current" />
                    Our story
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-5 py-4"
              initial={false}
              animate={{
                opacity: isOpen ? 1 : 0,
              }}
              transition={{
                duration: 0.25,
                delay: isOpen ? 0.2 : 0,
              }}
            >
              <span className="hidden text-sm text-muted-foreground md:inline">
                The helpful robotics company
              </span>
              <div className="flex items-center gap-6">
                <span className="text-sm text-muted-foreground">
                  Launching 2026
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  Beta Application
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

function RobotIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground"
    >
      <rect
        x="4"
        y="6"
        width="16"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="9" cy="12" r="1.5" fill="currentColor" />
      <circle cx="15" cy="12" r="1.5" fill="currentColor" />
      <path
        d="M12 2V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="2" r="1" fill="currentColor" />
    </svg>
  )
}
