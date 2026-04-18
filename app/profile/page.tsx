"use client"

import { Flame, Bell, Search } from "lucide-react"
import { useEffect, useState, Suspense } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSearchParams, useRouter } from "next/navigation"

import { DashboardView } from "@/components/profile/dashboard-view"
import { AnalyticsView } from "@/components/profile/analytics-view"
import { SuggestionsView } from "@/components/profile/suggestions-view"
import { User } from "@supabase/supabase-js"

// ==========================================
// Main Switcher Component
// ==========================================
function ProfilePageContent() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  const searchParams = useSearchParams()
  
  const activeTab = (searchParams.get('tab') || 'dashboard') === 'history' ? 'analytics' : searchParams.get('tab') || 'dashboard'

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const displayName = user?.user_metadata?.displayName || user?.email?.split('@')[0] || "User"

  if (activeTab === 'analytics') {
    return <AnalyticsView />
  }

  if (activeTab === 'suggestions') {
    return (
      <div className="w-full h-full">
        {/* Mobile secondary header could go here, or handled inside component */}
        <SuggestionsView />
      </div>
    )
  }

  // Dashboard Fallback for 'dashboard' or 'requests' etc.
  return <DashboardView displayName={displayName} />
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
       <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
         <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-32 bg-zinc-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-zinc-200 rounded"></div>
         </div>
       </div>
    }>
      <ProfilePageContent />
    </Suspense>
  )
}
