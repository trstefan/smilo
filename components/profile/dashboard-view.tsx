import { Flame } from "lucide-react"
import TaskContainer from "../TaskContainer"
import { createClient } from "@/lib/supabase/server"
import { RecentActivity } from "./recent-activity"

export async function DashboardView({ displayName, currentStreak, userId }: { displayName: string, currentStreak?: number, userId?: string }) {
  let recentActivity = [];

  if (userId) {
    const supabase = await createClient();
    const { data: activityData } = await supabase
      .from('completed_task_list')
      .select('*, global_tasks(*)')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })
      .limit(5);

    recentActivity = (activityData || []) as any;
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 md:p-10 min-h-screen">
      <div className="flex-1">
        <div className="hidden md:flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Welcome back, {displayName}</h2>
          
          </div>
          <div className="flex items-center space-x-4">
            <div className="mt-6 mb-8 px-5 py-2 rounded-full bg-[#6EE7B7] text-[#047857] text-sm font-bold flex items-center shadow-sm tracking-wide">
            <Flame className="w-4 h-4 mr-2" />
            {currentStreak} DAY STREAK
          </div>
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center mb-10 mt-4">
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Good morning, {displayName}</h2>
          <p className="text-zinc-500 mt-1">Ready for today&apos;s Skyline challenge?</p>
          <div className="mt-6 mb-8 px-5 py-2 rounded-full bg-[#6EE7B7] text-[#047857] text-sm font-bold flex items-center shadow-sm tracking-wide">
            <Flame className="w-4 h-4 mr-2" />
            {currentStreak} DAY STREAK
          </div>
         
        </div>
        
        <div className="mb-6 md:hidden">
            <h3 className="text-lg font-bold text-zinc-900">Active Quests</h3>
        </div>

        <TaskContainer />



        {/* Quote */}
        <div className="mt-12 md:mt-20 text-center text-[13px] md:text-sm italic text-zinc-400 font-medium pb-8 md:pb-0">
          &quot;Small acts of kindness create ripples of change.&quot;
        </div>

      </div>
    

      <RecentActivity activity={recentActivity} />
    </div>
  )
}
