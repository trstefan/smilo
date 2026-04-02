"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import {
  AuthBackground,
  AuthCard,
  LoginForm,
  RegisterForm,
} from "@/components/auth"

type AuthView = "login" | "register"

const BRAND_NAME = "smilo"
const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"

export default function AuthPage() {
  const [view, setView] = useState<AuthView>("login")

  const toggleView = () => {
    setView((prev) => (prev === "login" ? "register" : "login"))
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col md:items-center md:justify-center relative overflow-hidden font-sans">
      <AuthBackground imageUrl={BACKGROUND_IMAGE} brandName={BRAND_NAME} />

      <AnimatePresence mode="wait">
        <AuthCard animationKey={view}>
          {/* Logo - Desktop */}
          <div className="hidden md:block mb-6">
            <span className="text-foreground text-xl font-bold tracking-tighter">
              {BRAND_NAME}
            </span>
          </div>

          {view === "login" ? (
            <LoginForm onToggleView={toggleView} />
          ) : (
            <RegisterForm onToggleView={toggleView} />
          )}

          {/* Footer Links */}
          <div className="mt-8 flex gap-6 text-muted-foreground text-xs">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
          </div>
        </AuthCard>
      </AnimatePresence>
    </div>
  )
}
