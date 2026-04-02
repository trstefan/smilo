"use client"

import { FormEvent, useState } from "react"
import { FormInput } from "./form-input"

interface LoginFormProps {
  onToggleView: () => void
}

interface LoginErrors {
  email?: string
  password?: string
}

function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "Email is required"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return "Please enter a valid email address"
  return undefined
}

function validatePassword(password: string): string | undefined {
  if (!password) return "Password is required"
  if (password.length < 8) return "Password must be at least 8 characters"
  return undefined
}

export function LoginForm({ onToggleView }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<LoginErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    }
    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleBlur = (field: keyof LoginErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }))
    } else if (field === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (validateForm()) {
      console.log("Login submitted:", { email, password })
    }
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl leading-tight font-medium text-foreground mb-2 tracking-tight">
        Welcome back
      </h1>

      <p className="text-muted-foreground text-base mb-6">
        {"Don't have an account? "}
        <button
          onClick={onToggleView}
          className="text-orange-500 transition-all hover:cursor-pointer"
        >
          Create an account
        </button>
      </p>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Email"
          id="login-email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          error={touched.email ? errors.email : undefined}
        />

        <FormInput
          label="Password"
          id="login-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur("password")}
          error={touched.password ? errors.password : undefined}
        />

        <button
          type="submit"
          className="w-full bg-foreground text-background py-3 rounded-xl font-medium hover:opacity-90 transition-all active:scale-[0.98] mt-2"
        >
          Login
        </button>
      </form>
    </div>
  )
}
