"use client"

import { Flame, Bell, Search } from "lucide-react"
import { useEffect, useState, Suspense } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSearchParams, useRouter } from "next/navigation"

import { DashboardView } from "@/components/profile/dashboard-view"
import { AnalyticsOverview } from "@/components/profile/analytics-overview"
import { AnalyticsHistory } from "@/components/profile/analytics-history"
import { User } from "@supabase/supabase-js"

// ==========================================
// Main Switcher Component
// ==========================================
function ProfilePageContent() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const activeTab = searchParams.get('tab') || 'dashboard'

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const displayName = user?.user_metadata?.displayName || user?.email?.split('@')[0] || "User"

  if (activeTab === 'analytics' || activeTab === 'history') {
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
                <div className="flex items-center space-x-3">
                  <button className="text-zinc-500 hover:text-zinc-900"><Search className="w-5 h-5"/></button>
                  <button className="text-zinc-500 hover:text-zinc-900"><Bell className="w-5 h-5"/></button>
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-navigation Tabs */}
            <div className="flex items-center gap-6 mt-4 md:mt-1 px-1">
              <button 
                onClick={() => router.push('/profile?tab=analytics')} 
                className={`pb-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'analytics' ? 'border-[#006699] text-[#006699]' : 'border-transparent text-zinc-500 hover:text-zinc-900'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => router.push('/profile?tab=history')} 
                className={`pb-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'history' ? 'border-[#006699] text-[#006699]' : 'border-transparent text-zinc-500 hover:text-zinc-900'}`}
              >
                History
              </button>
            </div>
          </div>
          
          {/* Top Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
             <div className="flex items-center space-x-4 mr-4">
                <button className="text-zinc-400 hover:text-zinc-900"><Bell className="w-[18px] h-[18px]" /></button>
                <button className="text-zinc-400 hover:text-zinc-900"><Flame className="w-[18px] h-[18px]" /></button>
             </div>
             <button className="h-10 px-6 bg-[#006699] hover:bg-[#005580] text-white text-sm font-bold rounded-full transition-colors drop-shadow-md">
                Create New
             </button>
             <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center ml-2 border border-zinc-200 overflow-hidden relative">
              
             </div>
          </div>

        </div>

        {/* Tab Constraints */}
        {activeTab === 'analytics' ? <AnalyticsOverview /> : <AnalyticsHistory />}
      </div>
    )
  }

  // Dashboard Fallback for 'dashboard' or 'team' / 'projects' etc.
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
