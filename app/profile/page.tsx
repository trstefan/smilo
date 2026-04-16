"use client"

import { 
  Flame, Rocket, Palette, TrendingUp, Activity, 
  Zap, Users as UsersIcon, ShoppingCart, 
  ChevronLeft, ChevronRight, Bell, Search, Plus 
} from "lucide-react"
import { useEffect, useState, Suspense } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSearchParams, useRouter } from "next/navigation"
import { User } from "@supabase/supabase-js"

// ==========================================
// Dashboard View (Existing)
// ==========================================
function DashboardView({ displayName }: { displayName: string }) {
  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 md:p-10 min-h-screen">
      <div className="flex-1">
        <div className="hidden md:flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Welcome back, {displayName}</h2>
            <p className="text-zinc-500 mt-1">12 quests waiting</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm font-bold flex items-center shadow-sm text-zinc-800 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2.5"></span>
              12 DAY STREAK
            </span>
            <button className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors">
              <div className="w-4 h-4 bg-zinc-400 rounded-full" />
            </button>
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center mb-10 mt-4">
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Good morning, {displayName}</h2>
          <p className="text-zinc-500 mt-1">Ready for today&apos;s Skyline challenge?</p>
          <div className="mt-6 mb-8 px-5 py-2 rounded-full bg-[#6EE7B7] text-[#047857] text-sm font-bold flex items-center shadow-sm tracking-wide">
            <Flame className="w-4 h-4 mr-2" />
            14 DAY STREAK
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-black text-[#006699] tracking-tighter">842</span>
            <span className="text-[11px] font-bold tracking-[0.15em] text-zinc-600 mt-2 uppercase">Total Impact Points</span>
          </div>
        </div>
        
        <div className="flex justify-between items-end mb-6 md:hidden">
            <h3 className="text-lg font-bold text-zinc-900">Active Quests</h3>
            <span className="text-sm font-bold text-[#006699] cursor-pointer">View All</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="bg-[#111111] text-white rounded-3xl p-8 flex flex-col shadow-xl">
            <div className="flex justify-between items-start mb-12">
              <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                <Rocket className="w-5 h-5 text-orange-500" />
              </div>
              <div className="px-3 py-1.5 rounded-full bg-[#006699] text-xs font-bold tracking-wide">
                24H REMAINING
              </div>
            </div>
            
            <p className="text-[10px] tracking-[0.2em] font-bold text-zinc-400 mb-3 uppercase">Engineering</p>
            <h3 className="text-xl font-bold mb-4">Deploy Production V3</h3>
            <p className="text-sm text-zinc-400 mb-8 leading-relaxed flex-1">
              Finalize the CI/CD pipeline and execute the global deployment to Tokyo and London nodes.
            </p>
            
            <div className="w-full h-1.5 bg-zinc-800 rounded-full mb-6 overflow-hidden">
               <div className="h-full bg-[#006699] rounded-full w-[65%]" />
            </div>
            
            <button className="w-full bg-[#006699] hover:bg-[#005580] text-white font-bold py-4 rounded-2xl transition-colors text-sm">
              Complete Quest
            </button>
          </div>

          <div className="bg-white border text-zinc-900 rounded-3xl p-8 flex flex-col shadow-sm">
            <div className="flex justify-between items-start mb-12">
              <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-rose-500" />
              </div>
              <div className="px-3 py-1.5 rounded-full bg-rose-100 text-rose-600 text-xs font-bold tracking-wide">
                48H REMAINING
              </div>
            </div>
            
            <p className="text-[10px] tracking-[0.2em] font-bold text-zinc-500 mb-3 uppercase">Design</p>
            <h3 className="text-xl font-bold mb-4">Brand Audit 2024</h3>
            <p className="text-sm text-zinc-600 mb-8 leading-relaxed flex-1">
              Review all editorial assets and ensure typography consistency across the brand Monolith platform.
            </p>
            
            <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-6 overflow-hidden">
               <div className="h-full bg-rose-500 rounded-full w-[35%]" />
            </div>
            
            <button className="w-full bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-900 font-bold py-4 rounded-2xl transition-colors text-sm">
              View Details
            </button>
          </div>

          <div className="bg-white border text-zinc-900 rounded-3xl p-8 flex flex-col shadow-sm hidden md:flex">
             <div className="flex justify-between items-start mb-12">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wide">
                72H REMAINING
              </div>
            </div>
            
            <p className="text-[10px] tracking-[0.2em] font-bold text-zinc-500 mb-3 uppercase">Strategy</p>
            <h3 className="text-xl font-bold mb-4">Quarterly Review</h3>
            <p className="text-sm text-zinc-600 mb-8 leading-relaxed flex-1">
              Aggregate metric reports from the team and prepare the performance summary for the stakeholder meeting.
            </p>
            
            <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-6 overflow-hidden">
               <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
            </div>
            
            <button className="w-full bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-900 font-bold py-4 rounded-2xl transition-colors text-sm">
              View Details
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-20 text-center text-[13px] md:text-sm italic text-zinc-400 font-medium pb-8 md:pb-0">
          &quot;Small acts of kindness create ripples of change.&quot;
        </div>

        <div className="mt-8 md:mt-20 flex flex-col items-center text-center pb-10">
          <h1 className="text-4xl md:text-[3.5rem] font-bold tracking-tight text-zinc-900 leading-[1.1]">
            You&apos;ve made <span className="text-indigo-600">12 people smile</span><br className="hidden md:block"/> today.
          </h1>
          <p className="mt-6 text-sm md:text-base text-zinc-500 md:max-w-xl leading-relaxed">
            That&apos;s in addition to completing <span className="text-[#006699] font-bold">42 quests</span> this week. Keep going, {displayName}.
          </p>
        </div>
      </div>
      
      <div className="w-full lg:w-80 shrink-0 hidden lg:block">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 mb-8">Recent Activity</h3>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[7px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
          <div className="relative flex items-center gap-6">
            <div className="h-4 w-4 rounded-full bg-[#4AC4E9] ring-4 ring-white z-10"></div>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium text-zinc-900">Quest &quot;V3 Deploy&quot; started</span>
              <span className="text-xs text-zinc-400 mt-0.5">2m ago</span>
            </div>
          </div>
          
          <div className="relative flex items-center gap-6">
            <div className="h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-white z-10"></div>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium text-zinc-900">Team audit complete</span>
              <span className="text-xs text-zinc-400 mt-0.5">15m ago</span>
            </div>
          </div>
          
          <div className="relative flex items-center gap-6">
            <div className="h-4 w-4 rounded-full bg-indigo-500 ring-4 ring-white z-10"></div>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium text-zinc-900">New team member added</span>
              <span className="text-xs text-zinc-400 mt-0.5">1h ago</span>
            </div>
          </div>
          
          <div className="relative flex items-center gap-6">
            <div className="h-4 w-4 rounded-full bg-[#4AC4E9] ring-4 ring-white z-10"></div>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium text-zinc-900">Streak updated to 12 days</span>
              <span className="text-xs text-zinc-400 mt-0.5">3h ago</span>
            </div>
          </div>
          
          <div className="relative flex items-center gap-6">
            <div className="h-4 w-4 rounded-full bg-rose-500 ring-4 ring-white z-10"></div>
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium text-zinc-900">System maintenance notice</span>
              <span className="text-xs text-zinc-400 mt-0.5">5h ago</span>
            </div>
          </div>
        </div>
        
        <button className="w-full mt-12 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold py-4 rounded-2xl transition-colors text-xs tracking-wide">
          VIEW FULL HISTORY
        </button>
      </div>
    </div>
  )
}

// ==========================================
// Analytics Views
// ==========================================
function AnalyticsOverview() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl">
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100">
          <div className="flex justify-between items-start mb-6">
            <Activity className="w-5 h-5 text-[#006699]" />
            <span className="bg-[#6EE7B7]/20 text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded-full">+12%</span>
          </div>
          <p className="text-xs font-semibold text-zinc-500 mb-1">Total Reach</p>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">84.2k</h3>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100">
          <div className="flex justify-between items-start mb-6">
            <Zap className="w-5 h-5 text-purple-600" />
            <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">New</span>
          </div>
          <p className="text-xs font-semibold text-zinc-500 mb-1">Velocity</p>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">2.4s</h3>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100">
          <div className="mb-6">
            <UsersIcon className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-xs font-semibold text-zinc-500 mb-1">Sessions</p>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">12,402</h3>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100">
          <div className="mb-6">
            <ShoppingCart className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-xs font-semibold text-zinc-500 mb-1">Conversion</p>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">3.8%</h3>
        </div>
      </div>

      {/* Daily Activity Strip */}
      <div className="pt-4">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-lg font-bold text-zinc-900">Daily Activity</h3>
          <span className="text-sm font-semibold text-[#006699] cursor-pointer">September</span>
        </div>
        <div className="flex justify-between items-center px-2 relative z-0">
          {[
            { day: 'MON', date: '12', active: false, dot: 'bg-emerald-500' },
            { day: 'TUE', date: '13', active: false, dot: 'bg-indigo-500', dot2: 'bg-purple-400' },
            { day: 'WED', date: '14', active: true, dot: 'bg-white' },
            { day: 'THU', date: '15', active: false, dot: null },
            { day: 'FRI', date: '16', active: false, dot: 'bg-emerald-500' },
            { day: 'SAT', date: '17', active: false, dot: null },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-zinc-400 mb-3">{item.day}</span>
              <div className={`w-12 h-14 md:w-14 md:h-16 rounded-full flex flex-col items-center justify-center relative cursor-pointer transition-transform hover:scale-105 ${item.active ? 'bg-[#006699] shadow-lg shadow-[#006699]/30 drop-shadow-xl text-white' : 'bg-zinc-100 text-zinc-900'}`}>
                <span className="text-sm font-bold mt-1">{item.date}</span>
                <div className="h-4 flex items-center space-x-0.5">
                  {item.dot && <div className={`w-1 h-1 rounded-full ${item.dot}`} />}
                  {item.dot2 && <div className={`w-1 h-1 rounded-full ${item.dot2}`} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Efficiency Circular Chart */}
      <div className="flex justify-center items-center py-12">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#F4F4F5" strokeWidth="8" />
            {/* Middle Green ring */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#047857" strokeWidth="8" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.85)} />
            {/* Outer Blue ring */}
            <circle cx="50" cy="50" r="46" fill="none" stroke="#006699" strokeWidth="6" strokeLinecap="round" strokeDasharray="289" strokeDashoffset={289 * (1 - 0.72)} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-zinc-900 tracking-tighter">72%</span>
            <span className="text-[9px] font-bold tracking-[0.15em] text-zinc-400 uppercase mt-1">Efficiency</span>
          </div>
        </div>
      </div>

      {/* Demographics / Distribution */}
      <div className="pb-10">
        <h3 className="text-lg font-bold text-zinc-900 mb-8">Demographics</h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-zinc-900">Family</span>
              <span className="text-zinc-500">45%</span>
            </div>
            <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#006699] rounded-full w-[45%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-zinc-900">Friends</span>
              <span className="text-zinc-500">30%</span>
            </div>
            <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#047857] rounded-full w-[30%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-zinc-900">Strangers</span>
              <span className="text-zinc-500">15%</span>
            </div>
            <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full w-[15%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-zinc-900">Colleagues</span>
            </div>
            <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden relative">
              {/* Note: The image shows the active tab as selected so we do 10% */}
              <div className="absolute top-0 left-0 h-full w-[10%] bg-zinc-500 rounded-full" />
              {/* Render an interactive 'Plus' bubble right above it to match design exactly */}
              <div className="absolute right-0 -top-6 w-12 h-12 bg-[#006699] shadow-xl text-white flex items-center justify-center rounded-full z-10 cursor-pointer hover:scale-105 transition-transform drop-shadow-xl border-4 border-[#FAFAFA]">
                <Plus className="w-5 h-5"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsHistory() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* 4 Cards Stats header (Desktop matches Image 2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-zinc-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold tracking-[0.1em] text-zinc-500 uppercase mb-4">Total Quests</p>
          <h3 className="text-[2.5rem] font-bold text-[#006699] leading-none mb-3">124</h3>
          <p className="text-xs font-bold text-emerald-600">+12% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-zinc-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold tracking-[0.1em] text-zinc-500 uppercase mb-4">People Impacted</p>
          <h3 className="text-[2.5rem] font-bold text-purple-600 leading-none mb-3">842</h3>
          <p className="text-xs font-medium text-zinc-400">Community reach</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-zinc-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold tracking-[0.1em] text-zinc-500 uppercase mb-4">Current Streak</p>
          <h3 className="text-[2.5rem] font-bold text-emerald-600 leading-none mb-3">18</h3>
          <p className="text-xs font-bold text-emerald-700 flex items-center"><Flame className="w-3.5 h-3.5 mr-1"/> Days active</p>
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-zinc-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold tracking-[0.1em] text-zinc-500 uppercase mb-4">Longest Streak</p>
          <h3 className="text-[2.5rem] font-bold text-[#006699] leading-none mb-3">42</h3>
          <p className="text-[11px] font-medium text-zinc-400">Personal best reached June</p>
        </div>
      </div>

      {/* Main Grid: Calendar left, Side stats right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 pb-20">
        
        {/* Left: Activity Calendar */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-zinc-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold text-zinc-900">Activity Calendar</h3>
            <div className="flex items-center space-x-4">
              <button className="text-zinc-400 hover:text-zinc-900"><ChevronLeft className="w-5 h-5"/></button>
              <span className="text-sm font-bold text-zinc-900">October 2023</span>
              <button className="text-zinc-400 hover:text-zinc-900"><ChevronRight className="w-5 h-5"/></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-6 text-center">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
              <div key={day} className="text-[10px] font-bold tracking-widest text-zinc-400 mb-2">{day}</div>
            ))}
            
            {/* Calendar Days */}
            {Array.from({length: 31}).map((_, i) => {
              const day = i + 1;
              const isInactive = day < 1 || day > 26; // Grey out some past/future days for visual
              const isActive = day === 8;
              const hasDot = [2, 3, 7, 9, 10, 12, 13, 14, 15, 18, 19].includes(day);
              
              if (isInactive) {
                 return <div key={`grey-${i}`} className="flex justify-center"><div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-sm font-semibold text-zinc-300">2{i}</div></div>
              }

              return (
                <div key={day} className="flex justify-center">
                  <div className={`w-10 h-10 md:w-12 md:h-12 flex flex-col items-center justify-center rounded-full relative ${isActive ? 'border-2 border-[#006699] text-[#006699]' : 'bg-zinc-100 text-zinc-800'}`}>
                    <span className="text-xs md:text-sm font-bold">{day}</span>
                    {hasDot && <div className="absolute bottom-2 md:bottom-2.5 w-1 h-1 rounded-full bg-[#006699]" />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Goal Achievement & Distribution */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 flex flex-col items-center">
            <h3 className="text-[10px] uppercase tracking-[0.1em] font-bold text-zinc-500 w-full text-left mb-8">Goal Achievement</h3>
            
            {/* Semi-donut / full donut */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F4F4F5" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#006699" strokeWidth="8" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.75)} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-zinc-900 tracking-tighter">75%</span>
                <span className="text-[8px] font-bold tracking-[0.1em] text-zinc-400 mt-1 uppercase">124 / 165 Quests</span>
              </div>
            </div>

            <p className="text-xs text-center text-zinc-500 leading-relaxed px-2">
              You are <span className="font-bold text-emerald-600">ahead of schedule</span>. 41 quests left to reach your monthly milestone.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100">
             <h3 className="text-[10px] uppercase tracking-[0.1em] font-bold text-zinc-500 mb-8">Quest Distribution</h3>
             <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-zinc-900">Family</span>
                    <span className="text-[#006699]">34 / 50</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#006699] rounded-full w-[68%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-zinc-900">Friends</span>
                    <span className="text-[#047857]">28 / 40</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#047857] rounded-full w-[70%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-zinc-900">Strangers</span>
                    <span className="text-purple-600">42 / 50</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full w-[84%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-zinc-900">Colleagues</span>
                    <span className="text-emerald-600">20 / 25</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full w-[80%]" />
                  </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}

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
