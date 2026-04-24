import { Flame } from "lucide-react"
import TaskContainer from "../TaskContainer"
import { createClient } from "@/lib/supabase/server"
import { RecentActivity } from "./recent-activity"

export async function DashboardView({ displayName, userId }: { displayName: string, userId?: string }) {
  let fetchedTasks = undefined;
  let recentActivity = [];

  if (userId) {
    const supabase = await createClient();
    const { data } = await supabase
      .from('priority_task_list')
      .select('*, global_tasks(*)')
      .eq('user_id', userId);
      
    if (data && data.length > 0) {
      // Pick 3 random
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      
      fetchedTasks = selected.map(item => {
         const t = item.global_tasks;
         return {
           id: item.task_id,
           title: t?.task_name || 'Unknown',
           description: t?.description || '',
           category: t?.category || 'Default',
           resetHours: 24,
           completed: false
         }
      });
    }

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
            <span className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm font-bold flex items-center shadow-sm text-zinc-800 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2.5"></span>
              12 DAY STREAK
            </span>
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center mb-10 mt-4">
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Good morning, {displayName}</h2>
          <p className="text-zinc-500 mt-1">Ready for today&apos;s Skyline challenge?</p>
          <div className="mt-6 mb-8 px-5 py-2 rounded-full bg-[#6EE7B7] text-[#047857] text-sm font-bold flex items-center shadow-sm tracking-wide">
            <Flame className="w-4 h-4 mr-2" />
            14 DAY STREAK
          </div>
         
        </div>
        
        <div className="mb-6 md:hidden">
            <h3 className="text-lg font-bold text-zinc-900">Active Quests</h3>
        </div>

        <TaskContainer tasks={fetchedTasks} />


        {/* Quote */}
        <div className="mt-12 md:mt-20 text-center text-[13px] md:text-sm italic text-zinc-400 font-medium pb-8 md:pb-0">
          &quot;Small acts of kindness create ripples of change.&quot;
        </div>

      </div>
    

      <RecentActivity activity={recentActivity} />
    </div>
  )
}
