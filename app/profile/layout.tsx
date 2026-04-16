"use client"
import { ReactNode, useEffect, useState, Suspense } from "react";
import { LayoutDashboard, BarChart2, Users, FolderKanban, Settings, Bell, Menu, Plus, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"


function ProfileLayoutContent({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const activeTab = searchParams.get('tab') || 'dashboard'
  
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
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-zinc-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-zinc-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const displayName = user.user_metadata?.displayName || user.email?.split('@')[0] || "User"
  const initials = displayName.substring(0, 2).toUpperCase()

  return (
    <div className="flex bg-[#FAFAFA] min-h-screen font-sans">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#111111] text-white h-screen shrink-0 sticky top-0">
        <div className="p-8">
          <div className="flex items-center space-x-1 mb-1">
            <h1 className="text-2xl font-bold tracking-tight">SMILO<span className="text-[#4AC4E9]">.</span></h1>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 text-[15px]">
          <Link href="/profile?tab=dashboard" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-[#1A1A1A] text-white' : 'text-zinc-500 hover:text-white'}`}>
            <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'text-[#4AC4E9]' : ''}`} />
            <span>Dashboard</span>
          </Link>
          <Link href="/profile?tab=analytics" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'analytics' || activeTab === 'history' ? 'bg-[#1A1A1A] text-white' : 'text-zinc-500 hover:text-white'}`}>
            <BarChart2 className={`w-5 h-5 ${activeTab === 'analytics' || activeTab === 'history' ? 'text-[#4AC4E9]' : ''}`} />
            <span>Analytics</span>
          </Link>
          <Link href="/profile?tab=team" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'team' ? 'bg-[#1A1A1A] text-white' : 'text-zinc-500 hover:text-white'}`}>
            <Users className={`w-5 h-5 ${activeTab === 'team' ? 'text-[#4AC4E9]' : ''}`} />
            <span>Team</span>
          </Link>
          <Link href="/profile?tab=suggestions" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'projects' ? 'bg-[#1A1A1A] text-white' : 'text-zinc-500 hover:text-white'}`}>
            <FolderKanban className={`w-5 h-5 ${activeTab === 'projects' ? 'text-[#4AC4E9]' : ''}`} />
            <span>Suggestions</span>
          </Link>
          <Link href="/profile?tab=settings" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-[#1A1A1A] text-white' : 'text-zinc-500 hover:text-white'}`}>
            <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-[#4AC4E9]' : ''}`} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-800/50">
          <div className="flex items-center space-x-3 px-4 py-3 bg-[#1A1A1A] rounded-2xl mb-4">
            <div className="w-10 h-10 rounded-full bg-[#112A34] text-[#4AC4E9] flex items-center justify-center text-sm font-semibold shrink-0">
              {initials}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{displayName}</p>
              <p className="text-xs text-zinc-500 mt-0.5">12 quests active</p>
            </div>
          </div>
          <Link href="#" className="flex items-center space-x-3 text-zinc-500 hover:text-white px-4 py-2 text-sm font-medium transition-colors">
            <User className="w-[18px] h-[18px]" />
            <span>Profile</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 text-zinc-500 hover:text-white px-4 py-2 text-sm font-medium transition-colors">
            <LogOut className="w-[18px] h-[18px]" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col min-h-0 w-full overflow-hidden">
        {/* Mobile Top Navigation */}
        <header className="md:hidden flex items-center justify-between px-6 py-5 bg-[#FAFAFA]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="space-x-2.5">
            <h1 className="text-xl font-bold tracking-tight">SMILO.</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-zinc-100 text-zinc-600 transition-transform active:scale-95">
              <Menu className="w-[18px] h-[18px]" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-28 md:pb-0 relative z-0">
          {/* Subtle gradient background for entire main content area, most visible on mobile */}
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-pink-100/40 via-[#FAFAFA] to-[#FAFAFA] -z-10 pointer-events-none" />
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-zinc-100 flex items-center justify-around z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.02)] pt-2 pb-safe-offset-2 pb-4 px-2">
          {/* Dashboard */}
          <Link href="/profile?tab=dashboard" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${activeTab === 'dashboard' ? 'bg-[#111111] text-white' : 'text-zinc-400 hover:text-zinc-600'}`}>
            <LayoutDashboard className={`w-[22px] h-[22px] ${activeTab === 'dashboard' ? 'mb-1' : 'mb-1'}`} />
            <span className="text-[10px] font-semibold">Dashboard</span>
          </Link>

          {/* Analytics */}
          <Link href="/profile?tab=analytics" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${activeTab === 'analytics' || activeTab === 'history' ? 'bg-[#111111] text-white' : 'text-zinc-400 hover:text-zinc-600'}`}>
            <BarChart2 className="w-[22px] h-[22px] mb-1" />
            <span className="text-[10px] font-semibold">Analytics</span>
          </Link>

          {/* Team */}
          <Link href="/profile?tab=team" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${activeTab === 'team' ? 'bg-[#111111] text-white' : 'text-zinc-400 hover:text-zinc-600'}`}>
             <Users className="w-[22px] h-[22px] mb-1" />
            <span className="text-[10px] font-semibold">Team</span>
          </Link>
          
          {/* Projects */}
          <Link href="/profile?tab=projects" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${activeTab === 'projects' ? 'bg-[#111111] text-white' : 'text-zinc-400 hover:text-zinc-600'}`}>
             <FolderKanban className="w-[22px] h-[22px] mb-1" />
            <span className="text-[10px] font-semibold">Projects</span>
          </Link>

          {/* Settings */}
          <Link href="/profile?tab=settings" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${activeTab === 'settings' ? 'bg-[#111111] text-white' : 'text-zinc-400 hover:text-zinc-600'}`}>
             <Settings className="w-[22px] h-[22px] mb-1" />
            <span className="text-[10px] font-semibold">Settings</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]" />}>
      <ProfileLayoutContent>{children}</ProfileLayoutContent>
    </Suspense>
  )
}
