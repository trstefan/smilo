"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { FormInput } from "./form-input"

interface RegisterFormProps {
  onToggleView: () => void
}

interface RegisterErrors {
  displayName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

function validateDisplayName(name: string): string | undefined {
  if (!name.trim()) return "Display name is required"
  if (name.trim().length < 2) return "Display name must be at least 2 characters"
  return undefined
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
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter"
  if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter"
  if (!/[0-9]/.test(password)) return "Password must contain a number"
  return undefined
}

function validateConfirmPassword(password: string, confirmPassword: string): string | undefined {
  if (!confirmPassword) return "Please confirm your password"
  if (password !== confirmPassword) return "Passwords do not match"
  return undefined
}

export function RegisterForm({ onToggleView }: RegisterFormProps) {
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {
      displayName: validateDisplayName(displayName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleBlur = (field: keyof RegisterErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const newErrors = { ...errors }
    
    switch (field) {
      case "displayName":
        newErrors.displayName = validateDisplayName(displayName)
        break
      case "email":
        newErrors.email = validateEmail(email)
        break
      case "password":
        newErrors.password = validatePassword(password)
        if (touched.confirmPassword) {
          newErrors.confirmPassword = validateConfirmPassword(password, confirmPassword)
        }
        break
      case "confirmPassword":
        newErrors.confirmPassword = validateConfirmPassword(password, confirmPassword)
        break
    }
    
    setErrors(newErrors)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched({ displayName: true, email: true, password: true, confirmPassword: true })
    setSubmitError(null)

    if (validateForm()) {
      setIsSubmitting(true)
      const supabase = createClient()
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            displayName,
          },
        },
      })

      if (error) {
        // If it's a rate limit error or invalid email, this will catch it
        setSubmitError(error.message)
        setIsSubmitting(false)
      } else if (data.user && data.session === null) {
        // Email confirmation is required
        if (data.user.identities && data.user.identities.length === 0) {
          setSubmitError("An account with this email already exists.")
        } else {
          setSubmitError("Success! Please check your email inbox to confirm your account.")
        }
        setIsSubmitting(false)
      } else {
        // If email confirmation is disabled or they're automatically logged in
        router.push("/profile")
      }
    }
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl leading-tight font-medium text-foreground mb-2 tracking-tight">
        Create account
      </h1>

      <p className="text-muted-foreground text-base mb-6">
        Already have an account?{" "}
        <button
          onClick={onToggleView}
          className="text-orange-500 transition-all hover:cursor-pointer"
        >
          Sign in
        </button>
      </p>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Display Name"
          id="register-displayName"
          type="text"
          placeholder="Your name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          onBlur={() => handleBlur("displayName")}
          error={touched.displayName ? errors.displayName : undefined}
        />

        <FormInput
          label="Email"
          id="register-email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          error={touched.email ? errors.email : undefined}
        />

        <FormInput
          label="Password"
          id="register-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleBlur("password")}
          error={touched.password ? errors.password : undefined}
        />

        <FormInput
          label="Confirm Password"
          id="register-confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => handleBlur("confirmPassword")}
          error={touched.confirmPassword ? errors.confirmPassword : undefined}
        />

        {submitError && (
          <div className="text-red-500 text-sm mt-2 font-medium">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-foreground text-background py-3 rounded-xl font-medium hover:opacity-90 transition-all active:scale-[0.98] mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>
    </div>
  )
}
