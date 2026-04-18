import { Flame, Users as UsersIcon, Trophy, Target } from "lucide-react"

export function AnalyticsView() {
  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 md:p-10 min-h-screen">
      <div className="flex items-center justify-between w-full md:w-auto mb-8 md:mb-12 gap-5 py-4 md:py-0">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 hidden md:block">Analytics</h2>

        <div className="md:hidden flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
       
        </div>
      </div>

      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* ======================= */}
      {/* DESKTOP 4 CARDS (md+)   */}
      {/* ======================= */}
      <div className="hidden md:grid grid-cols-4 gap-6">
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

      {/* ======================= */}
      {/* MOBILE 4 CARDS (<md)    */}
      {/* ======================= */}
      <div className="grid md:hidden grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100">
          <div className="flex justify-between items-start mb-6">
            <Target className="w-5 h-5 text-[#006699]" />
            <span className="bg-[#6EE7B7]/20 text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded-full">+12%</span>
          </div>
          <p className="text-xs font-semibold text-zinc-500 mb-1">Total Quests</p>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">124</h3>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100">
          <div className="flex justify-between items-start mb-6">
            <UsersIcon className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-xs font-semibold text-zinc-500 mb-1">People Impacted</p>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">842</h3>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100">
          <div className="mb-6">
            <Flame className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-xs font-semibold text-zinc-500 mb-1">Current Streak</p>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">18</h3>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100">
          <div className="mb-6">
            <Trophy className="w-5 h-5 text-[#006699]" />
          </div>
          <p className="text-xs font-semibold text-zinc-500 mb-1">Longest Streak</p>
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">42</h3>
        </div>
      </div>

      {/* ======================= */}
      {/* MAIN CONTENT GRID       */}
      {/* ======================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 pb-20">
        
        {/* Left: Daily Activity Strip (Overview's Design, adapted for all views) */}
        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-zinc-100 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-8 md:mb-10">
            <h3 className="text-lg font-bold text-zinc-900">Daily Activity</h3>
            <span className="text-sm font-semibold text-[#006699] cursor-pointer">September</span>
          </div>
          
          <div className="flex justify-between items-center px-1 md:px-4 relative z-0">
            {[
              { day: 'MON', date: '12', active: false, dot: 'bg-emerald-500' },
              { day: 'TUE', date: '13', active: false, dot: 'bg-indigo-500', dot2: 'bg-purple-400' },
              { day: 'WED', date: '14', active: true, dot: 'bg-white' },
              { day: 'THU', date: '15', active: false, dot: null },
              { day: 'FRI', date: '16', active: false, dot: 'bg-emerald-500' },
              { day: 'SAT', date: '17', active: false, dot: null },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-[10px] md:text-xs font-bold text-zinc-400 mb-3 md:mb-4">{item.day}</span>
                <div className={`w-12 h-14 md:w-16 md:h-20 rounded-full flex flex-col items-center justify-center relative cursor-pointer transition-transform hover:-translate-y-1 ${item.active ? 'bg-[#006699] shadow-lg shadow-[#006699]/30 drop-shadow-xl text-white' : 'bg-zinc-100 text-zinc-900'}`}>
                  <span className="text-sm md:text-lg font-bold mt-1 md:mt-2">{item.date}</span>
                  <div className="h-4 flex items-center space-x-0.5 md:space-x-1">
                    {item.dot && <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${item.dot}`} />}
                    {item.dot2 && <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${item.dot2}`} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-zinc-50 flex items-center justify-between text-sm">
             <span className="text-zinc-500">Weekly Completion</span>
             <span className="font-bold text-[#047857]">85%</span>
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
    </div>
  )
}
