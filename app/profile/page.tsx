"use client"

import { Flame, Bell, Search } from "lucide-react"
import { useEffect, useState, Suspense } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSearchParams, useRouter } from "next/navigation"

import { DashboardView } from "@/components/profile/dashboard-view"
import { AnalyticsHistory } from "@/components/profile/analytics-history"
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
    return (
      <div className="w-full max-w-[1400px] mx-auto p-6 md:p-10 min-h-screen">
        {/* Global Analytics Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-5 py-4 md:py-0">
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
            {/* Contextual Desktop Title / Mobile App Title */}
            <div className="flex items-center justify-between w-full md:w-auto">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 hidden md:block">Analytics</h2>
              {/* Mobile native-like title area */}
              <div className="md:hidden flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
              </div>
            </div>

            {/* Sub-navigation Tabs */}
            <div className="flex items-center gap-6 mt-4 md:mt-1 px-1">
               {/* Content moved to unified responsive layout */}
            </div>
          </div>

        </div>

        {/* Tab Constraints */}
        {activeTab === 'analytics' && <AnalyticsHistory />}
      </div>
    )
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
