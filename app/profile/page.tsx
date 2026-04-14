"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/sign-in-to-smilo")
      } else {
        setUser(user)
      }
      setLoading(false)
    }

    getUser()
  }, [router, supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/sign-in-to-smilo")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-muted rounded mb-4"></div>
          <div className="h-4 w-48 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const displayName = user.user_metadata?.displayName || user.email

  return (
    <div className="min-h-screen bg-muted p-8 flex flex-col items-center md:items-center justify-center relative overflow-hidden font-sans">
      <div className="z-10 w-full max-w-md bg-background/80 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)] mx-4 md:mx-0">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Welcome, {displayName}!</h1>
        <p className="text-muted-foreground mb-8">
          You are successfully logged in as <span className="font-medium text-foreground">{user.email}</span>.
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-foreground text-background px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all active:scale-[0.98]"
        >
          Log out
        </button>
      </div>
    </div>
  )
}
