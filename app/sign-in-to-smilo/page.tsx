"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import {
  AuthBackground,
  AuthCard,
  LoginForm,
  RegisterForm,
} from "@/components/auth"
import Title from "@/components/Title"

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
          <div className="hidden md:block mb-8">
            <Title variant="black" />
          </div>

          {view === "login" ? (
            <LoginForm onToggleView={toggleView} />
          ) : (
            <RegisterForm onToggleView={toggleView} />
          )}

          <div className="mt-10 flex gap-8 text-foreground/40 text-[13px] font-medium border-t border-foreground/[0.03] pt-6">
            <a href="#" className="hover:text-foreground transition-all">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-all">
              Terms of Service
            </a>
          </div>
        </AuthCard>
      </AnimatePresence>
    </div>
  )
}
