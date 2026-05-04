"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  SquaresFour, 
  ChartBar, 
  Users, 
  FolderOpen, 
  List 
} from "@phosphor-icons/react";

export function MobileNavigation() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';

  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      href: '/profile?tab=dashboard', 
      icon: SquaresFour, 
      isActive: activeTab === 'dashboard'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      href: '/profile?tab=analytics', 
      icon: ChartBar, 
      isActive: activeTab === 'analytics' || activeTab === 'history'
    },
    { 
      id: 'tasks', 
      label: 'Tasks', 
      href: '/profile?tab=tasks', 
      icon: Users, 
      isActive: activeTab === 'tasks'
    },
    { 
      id: 'suggestions', 
      label: 'Suggestions', 
      href: '/profile?tab=suggestions', 
      icon: FolderOpen, 
      isActive: activeTab === 'suggestions' || activeTab === 'projects'
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation */}
      <header className="md:hidden flex items-center justify-between px-6 py-5 bg-[#131316]/90 backdrop-blur-md sticky top-0 z-10 text-white border-b border-white/5">
        <div className="space-x-2.5">
          <h1 className="text-xl font-bold tracking-tight">SMILO<span className="text-[#4AC4E9]">.</span></h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1A1A1A] border border-white/5 text-zinc-400 hover:text-white transition-transform active:scale-95">
            <List className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 px-4 pointer-events-none">
        <nav className="bg-[#131316] rounded-[24px] flex items-center justify-between p-2 shadow-2xl border border-white/5 w-full max-w-[360px] mx-auto pointer-events-auto">
          {navItems.map((item) => (
            <Link 
              key={item.id}
              href={item.href} 
              className={`flex items-center justify-center rounded-[18px] transition-all duration-300 ease-in-out ${
                item.isActive 
                  ? 'bg-[#28282C] h-14 px-5' 
                  : 'h-14 w-14 hover:bg-white/5'
              }`}
            >
              <item.icon 
                className={`w-[22px] h-[22px] shrink-0 transition-colors duration-300 ${item.isActive ? 'text-[#A855F7]' : 'text-zinc-500'}`} 
                weight={item.isActive ? "fill" : "regular"} 
              />
              <span 
                className={`font-medium text-white whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ${
                  item.isActive ? 'max-w-[120px] ml-2.5 opacity-100 text-[15px]' : 'max-w-0 opacity-0 ml-0 text-[0px]'
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
