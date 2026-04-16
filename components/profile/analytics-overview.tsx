import { Activity, Zap, Users as UsersIcon, ShoppingCart, Plus } from "lucide-react"

export function AnalyticsOverview() {
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
