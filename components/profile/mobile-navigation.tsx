"use client"

import { LayoutDashboard, BarChart2, Users, FolderKanban, Menu } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function MobileNavigation() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

  return (
    <>
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

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-zinc-100 flex items-center justify-around z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.02)] pt-2 pb-safe-offset-2 pb-4 px-2">
        <Link href="/profile?tab=dashboard" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${activeTab === 'dashboard' ? 'bg-[#111111] text-white' : 'text-zinc-400 hover:text-zinc-600'}`}>
          <LayoutDashboard className="w-[22px] h-[22px] mb-1" />
          <span className="text-[10px] font-semibold">Dashboard</span>
        </Link>

        <Link href="/profile?tab=analytics" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${activeTab === 'analytics' || activeTab === 'history' ? 'bg-[#111111] text-white' : 'text-zinc-400 hover:text-zinc-600'}`}>
          <BarChart2 className="w-[22px] h-[22px] mb-1" />
          <span className="text-[10px] font-semibold">Analytics</span>
        </Link>

        <Link href="/profile?tab=tasks" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${activeTab === 'tasks' ? 'bg-[#111111] text-white' : 'text-zinc-400 hover:text-zinc-600'}`}>
          <Users className="w-[22px] h-[22px] mb-1" />
          <span className="text-[10px] font-semibold">Tasks</span>
        </Link>
        
        <Link href="/profile?tab=suggestions" className={`flex flex-col items-center justify-center p-2 rounded-2xl w-16 h-14 transition-colors ${activeTab === 'suggestions' || activeTab === 'projects' ? 'bg-[#111111] text-white' : 'text-zinc-400 hover:text-zinc-600'}`}>
          <FolderKanban className="w-[22px] h-[22px] mb-1" />
          <span className="text-[10px] font-semibold">Suggestions</span>
        </Link>
      </nav>
    </>
  );
}
