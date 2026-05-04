"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { 
  SquaresFour, 
  ChartBar, 
  Users, 
  FolderOpen, 
  SignOut,
  SidebarSimple
} from "@phosphor-icons/react";

interface SidebarProps {
  displayName: string;
  initials: string;
}

export function Sidebar({ displayName, initials }: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const activeTab = searchParams.get('tab') || 'dashboard';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      href: '/profile?tab=dashboard', 
      icon: SquaresFour, 
      isActive: activeTab === 'dashboard',
      color: 'text-[#4AC4E9]'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      href: '/profile?tab=analytics', 
      icon: ChartBar, 
      isActive: activeTab === 'analytics' || activeTab === 'history',
      color: 'text-[#10B981]' 
    },
    { 
      id: 'tasks', 
      label: 'Tasks', 
      href: '/profile?tab=tasks', 
      icon: Users, 
      isActive: activeTab === 'tasks',
      color: 'text-[#F97316]' 
    },
    { 
      id: 'suggestions', 
      label: 'Suggestions', 
      href: '/profile?tab=suggestions', 
      icon: FolderOpen, 
      isActive: activeTab === 'suggestions' || activeTab === 'projects',
      color: 'text-[#A855F7]'
    },
  ];

  return (
    <aside className={`hidden md:flex flex-col bg-[#131316] text-white h-screen shrink-0 sticky top-0 transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-[88px]' : 'w-[280px]'}`}>
      
      {/* Header */}
      <div className={`flex items-center pt-8 pb-6 ${isCollapsed ? 'justify-center px-0' : 'px-6 justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center space-x-1 mb-1">
            <h1 className="text-2xl font-bold tracking-tight">SMILO<span className="text-[#4AC4E9]">.</span></h1>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`text-zinc-400 hover:text-white transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
        >
          <SidebarSimple className="w-6 h-6" weight="regular" />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => (
          <Link 
            key={item.id}
            href={item.href} 
            className={`flex items-center justify-between px-3 py-3 rounded-2xl font-medium transition-all ${item.isActive ? 'bg-[#28282C] text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#28282C]/50'}`}
            title={isCollapsed ? item.label : undefined}
          >
            <div className={`flex items-center ${isCollapsed ? 'mx-auto' : 'space-x-4'}`}>
              <item.icon className={`w-6 h-6 ${item.isActive ? item.color : ''}`} weight={item.isActive ? "fill" : "regular"} />
              {!isCollapsed && <span className="text-[15px]">{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>

      {/* Bottom Profile Section */}
      <div className="p-4 mt-auto">
        <div className={`${isCollapsed ? 'bg-transparent px-0' : 'bg-[#28282C] p-2'} rounded-[24px] flex flex-col relative`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 p-2'}`}>
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#112A34] text-[#4AC4E9] flex items-center justify-center text-sm font-semibold overflow-hidden">
                {initials}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4AC4E9] border-2 border-[#28282C] rounded-full"></div>
            </div>
            
            {!isCollapsed && (
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white truncate">{displayName}</p>
                </div>
                <p className="text-xs text-zinc-400 truncate mt-0.5">12 quests active</p>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <button 
              onClick={handleLogout}
              className="w-full mt-2 py-2.5 bg-[#131316] hover:bg-black text-sm font-semibold text-zinc-300 hover:text-white rounded-xl transition-colors flex items-center justify-center space-x-2 border border-white/5"
            >
              <SignOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          )}
        </div>

        {/* Log Out button in collapsed mode */}
        {isCollapsed && (
          <button 
            onClick={handleLogout}
            className="w-12 h-12 mt-4 mx-auto bg-[#28282C] rounded-[16px] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            title="Log Out"
          >
            <SignOut className="w-5 h-5" weight="bold" />
          </button>
        )}
      </div>
    </aside>
  );
}
