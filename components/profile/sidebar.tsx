"use client"

import { LayoutDashboard, BarChart2, Users, FolderKanban, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface SidebarProps {
  displayName: string;
  initials: string;
}

export function Sidebar({ displayName, initials }: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const activeTab = searchParams.get('tab') || 'dashboard';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
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
        <Link href="/profile?tab=tasks" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'tasks' ? 'bg-[#1A1A1A] text-white' : 'text-zinc-500 hover:text-white'}`}>
          <Users className={`w-5 h-5 ${activeTab === 'tasks' ? 'text-[#4AC4E9]' : ''}`} />
          <span>Tasks</span>
        </Link>
        <Link href="/profile?tab=suggestions" className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'suggestions' || activeTab === 'projects' ? 'bg-[#1A1A1A] text-white' : 'text-zinc-500 hover:text-white'}`}>
          <FolderKanban className={`w-5 h-5 ${activeTab === 'suggestions' || activeTab === 'projects' ? 'text-[#4AC4E9]' : ''}`} />
          <span>Suggestions</span>
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
        <button onClick={handleLogout} className="w-full flex items-center space-x-3 text-zinc-500 hover:text-white px-4 py-2 text-sm font-medium transition-colors">
          <LogOut className="w-[18px] h-[18px]" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
