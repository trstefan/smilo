import { Flame, Rocket, Palette, TrendingUp } from "lucide-react"

export function DashboardView({ displayName }: { displayName: string }) {
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
