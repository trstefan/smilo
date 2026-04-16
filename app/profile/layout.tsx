"use client"
import { ReactNode, useEffect, useState } from "react";
import { LayoutDashboard, BarChart2, Users, FolderKanban, Settings, Bell, Menu, Plus, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function ProfileLayout({ children }: { children: ReactNode }) {
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
            <h1 className="text-2xl font-bold tracking-tight">MONOLITH<span className="text-[#4AC4E9]">.</span></h1>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Editorial Admin</p>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 text-[15px]">
          <Link href="/profile" className="flex items-center space-x-3 bg-[#1A1A1A] text-white px-4 py-3 rounded-lg font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5 text-[#4AC4E9]" />
            <span>Dashboard</span>
          </Link>
          <Link href="#" className="flex items-center space-x-3 text-zinc-500 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
            <BarChart2 className="w-5 h-5" />
            <span>Analytics</span>
          </Link>
          <Link href="#" className="flex items-center space-x-3 text-zinc-500 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5" />
            <span>Team</span>
          </Link>
          <Link href="#" className="flex items-center space-x-3 text-zinc-500 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
            <FolderKanban className="w-5 h-5" />
            <span>Projects</span>
          </Link>
          <Link href="#" className="flex items-center space-x-3 text-zinc-500 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5" />
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
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2A2A2A] text-white flex flex-col items-center justify-center font-bold text-xs shrink-0">
             M.
            </div>
            <h1 className="text-xl font-bold tracking-tight">MONOLITH.</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-zinc-100 text-zinc-600 transition-transform active:scale-95">
              <Bell className="w-[18px] h-[18px]" />
            </button>
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
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-zinc-100 px-6 py-2 flex items-center justify-between z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.02)] pt-3 pb-5">
          <Link href="/profile" className="flex flex-col items-center p-2 text-[#006699] flex-1">
            <LayoutDashboard className="w-6 h-6 mb-1.5" />
            <span className="text-[10px] font-bold">Dashboard</span>
          </Link>
          <Link href="#" className="flex flex-col items-center p-2 text-zinc-400 hover:text-zinc-600 transition-colors flex-1">
             <BarChart2 className="w-6 h-6 mb-1.5" />
            <span className="text-[10px] font-semibold">Analytics</span>
          </Link>
          
          <div className="relative -top-8 flex-1 flex justify-center">
            <button className="w-[60px] h-[60px] flex items-center justify-center rounded-full bg-[#006699] text-white shadow-[0_8px_20px_rgba(0,102,153,0.3)] border-[6px] border-[#FAFAFA] transition-transform active:scale-95">
              <Plus className="w-7 h-7" />
            </button>
          </div>

          <Link href="#" className="flex flex-col items-center p-2 text-zinc-400 hover:text-zinc-600 transition-colors flex-1">
             <Users className="w-6 h-6 mb-1.5" />
            <span className="text-[10px] font-semibold">Team</span>
          </Link>
          <button onClick={handleLogout} className="flex flex-col items-center p-2 text-zinc-400 hover:text-zinc-600 transition-colors flex-1">
             <LogOut className="w-6 h-6 mb-1.5" />
            <span className="text-[10px] font-semibold">Log Out</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
