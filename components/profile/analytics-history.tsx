import { Flame, ChevronLeft, ChevronRight } from "lucide-react"

export function AnalyticsHistory() {
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
