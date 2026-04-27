"use client"

import { useEffect, useState } from "react"
import { Flame, Users as UsersIcon, Trophy, Target, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { CalendarTask } from "@/components/calendar"
import { StatCard } from "./analytics/stat-card"
import { ActivitySection } from "./analytics/activity-section"
import { GoalAchievement } from "./analytics/goal-achievement"
import { QuestDistribution } from "./analytics/quest-distribution"

const TAG_COLOR_CLASSES: Record<string, string> = {
  Family: "bg-[#006699]",
  Friends: "bg-[#047857]",
  Strangers: "bg-[#A855F7]",
  Colleagues: "bg-[#059669]",
  Environment: "bg-[#059669]",
};

export function AnalyticsView() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuests: 0,
    peopleImpacted: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalPossibleQuests: 0
  });
  const [tasks, setTasks] = useState<CalendarTask[]>([]);
  const [distribution, setDistribution] = useState<Record<string, { completed: number, total: number }>>({
    Family: { completed: 0, total: 10 },
    Friends: { completed: 0, total: 10 },
    Strangers: { completed: 0, total: 10 },
    Environment: { completed: 0, total: 10 }
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch completed tasks
        const { data: completedData, error: completedError } = await supabase
          .from('completed_task_list')
          .select(`
            id,
            completed_at,
            global_tasks (
              id,
              task_name,
              category
            )
          `)
          .eq('user_id', user.id);

        if (completedError) throw completedError;

        // Fetch profile for streaks
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('streak_current, streak_longest')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        // Transform data for calendar
        const calendarTasks: CalendarTask[] = (completedData || []).map((item: any) => ({
          id: item.id,
          title: item.global_tasks.task_name,
          date: new Date(item.completed_at),
          tag: item.global_tasks.category
        }));

        setTasks(calendarTasks);

        // Calculate streaks
        const completionDates = (completedData || []).map(item => {
          const d = new Date(item.completed_at);
          d.setHours(0, 0, 0, 0);
          return d.getTime();
        });
        
        // Unique dates sorted descending
        const uniqueDates = Array.from(new Set(completionDates)).sort((a, b) => b - a);
        
        let currentStreak = 0;
        
        if (uniqueDates.length > 0) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          
          const latestDate = uniqueDates[0];
          
          // Check if streak is still alive (completed today or yesterday)
          if (latestDate === today.getTime() || latestDate === yesterday.getTime()) {
            currentStreak = 1;
            for (let i = 0; i < uniqueDates.length - 1; i++) {
              const current = uniqueDates[i];
              const next = uniqueDates[i + 1];
              const diff = Math.round((current - next) / (1000 * 60 * 60 * 24));
              if (diff === 1) {
                currentStreak++;
              } else {
                break;
              }
            }
          }
        }
        
        // Calculate longest streak ever from historical data
        let maxStreak = 0;
        if (uniqueDates.length > 0) {
          let tempStreak = 1;
          for (let i = 0; i < uniqueDates.length - 1; i++) {
            const current = uniqueDates[i];
            const next = uniqueDates[i + 1];
            const diff = Math.round((current - next) / (1000 * 60 * 60 * 24));
            if (diff === 1) {
              tempStreak++;
            } else {
              maxStreak = Math.max(maxStreak, tempStreak);
              tempStreak = 1;
            }
          }
          maxStreak = Math.max(maxStreak, tempStreak);
        }

        const finalLongestStreak = Math.max(profileData.streak_longest || 0, maxStreak, currentStreak);

        // Update profile if values changed
        if (currentStreak !== profileData.streak_current || finalLongestStreak !== profileData.streak_longest) {
          await supabase
            .from('profiles')
            .update({ 
              streak_current: currentStreak, 
              streak_longest: finalLongestStreak 
            })
            .eq('id', user.id);
        }

        // Fetch all global tasks to calculate category totals
        const { data: globalTasksData, error: globalTasksError } = await supabase
          .from('global_tasks')
          .select('category');

        if (globalTasksError) throw globalTasksError;

        // Calculate distribution totals from global_tasks
        const dist: Record<string, { completed: number, total: number }> = {
          Family: { completed: 0, total: 0 },
          Friends: { completed: 0, total: 0 },
          Strangers: { completed: 0, total: 0 },
          Environment: { completed: 0, total: 0 }
        };

        (globalTasksData || []).forEach((item: any) => {
          const cat = item.category as string;
          if (dist[cat]) {
            dist[cat].total++;
          }
        });

        // Fill in completed counts
        (completedData || []).forEach((item: any) => {
          const cat = item.global_tasks.category as string;
          if (dist[cat]) {
            dist[cat].completed++;
          }
        });

        setDistribution(dist);

        // Calculate stats
        const totalQuests = completedData?.length || 0;
        const totalPossibleQuests = globalTasksData?.length || 0;
        
        setStats({
          totalQuests,
          peopleImpacted: totalQuests * 7, 
          currentStreak: currentStreak,
          longestStreak: finalLongestStreak,
          totalPossibleQuests
        });

      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#006699] animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 md:p-10 min-h-screen">
      <div className="flex items-center justify-between w-full md:w-auto mb-8 md:mb-12 gap-5 py-4 md:py-0">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 hidden md:block">Analytics</h2>

        <div className="md:hidden flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        </div>
      </div>

      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatCard 
            label="Total Quests Done" 
            value={stats.totalQuests} 
            icon={Target}
            iconColor="text-[#006699]"
          />
          <StatCard 
            label="Current Streak" 
            value={stats.currentStreak} 
            subtext="Days active"
            icon={Flame}
            iconColor="text-emerald-600"
          />
          <StatCard 
            label="Longest Streak" 
            value={stats.longestStreak} 
            subtext="Personal best"
            icon={Trophy}
            iconColor="text-[#006699]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 pb-20">
          <ActivitySection tasks={tasks} tagColorClasses={TAG_COLOR_CLASSES} />

          <div className="space-y-6">
            <GoalAchievement totalQuests={stats.totalQuests} targetQuests={stats.totalPossibleQuests || 1} />
            <QuestDistribution distribution={distribution} tagColorClasses={TAG_COLOR_CLASSES} />
          </div>
        </div>
      </div>
    </div>
  )
}
