"use client"

import { motion } from "framer-motion"
import { timeAgo } from "@/lib/utils"
import { History, Sparkles } from "lucide-react"

interface ActivityItem {
  id: string
  completed_at: string
  global_tasks: {
    task_name: string
    category: string
  } | null
}

export function RecentActivity({ activity }: { activity: ActivityItem[] }) {
  const CATEGORY_CONFIG: Record<string, { color: string, text: string, icon: string, bg: string }> = {
    Family: { color: "bg-[#006699]", text: "text-[#006699]", icon: "🏠", bg: "bg-blue-50/50" },
    Friends: { color: "bg-emerald-500", text: "text-emerald-600", icon: "🤝", bg: "bg-emerald-50/50" },
    Strangers: { color: "bg-indigo-500", text: "text-indigo-600", icon: "🌍", bg: "bg-indigo-50/50" },
    Environment: { color: "bg-green-500", text: "text-green-600", icon: "🌱", bg: "bg-green-50/50" },
    Default: { color: "bg-zinc-400", text: "text-zinc-500", icon: "📋", bg: "bg-zinc-50/50" },
  }

  // Group activity by date
  const groupedActivity = activity.reduce((groups: Record<string, ActivityItem[]>, item) => {
    const date = new Date(item.completed_at);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let groupName = "Earlier";
    if (date.toDateString() === today.toDateString()) {
      groupName = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      groupName = "Yesterday";
    }

    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(item);
    return groups;
  }, {});

  const groupOrder = ["Today", "Yesterday", "Earlier"];

  return (
    <div className="w-full lg:w-80 shrink-0 mt-12 lg:mt-0 px-2 lg:px-0">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
            <History className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-900">Recent Activity</h3>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Your Impact Log</p>
          </div>
        </div>
      </div>
      
      {!activity || activity.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-zinc-100 rounded-[2.5rem] p-12 text-center shadow-sm"
        >
          <div className="w-16 h-16 bg-zinc-50 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12">
             <Sparkles className="w-8 h-8 text-zinc-200" />
          </div>
          <p className="text-sm font-semibold text-zinc-500 italic leading-relaxed">
            No completed tasks yet.<br/>
            <span className="text-zinc-300 not-italic font-bold text-[9px] uppercase tracking-[0.2em] mt-3 block">Start your journey today</span>
          </p>
        </motion.div>
      ) : (
        <div className="space-y-10">
          {groupOrder.map((group) => {
            const groupTasks = groupedActivity[group];
            if (!groupTasks || groupTasks.length === 0) return null;

            return (
              <div key={group} className="space-y-5">
                <div className="flex items-center gap-4 px-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-400 whitespace-nowrap">
                    {group}
                  </span>
                  <div className="h-px w-full bg-zinc-100" />
                </div>

                <div className="space-y-4">
                  {groupTasks.map((item, index) => {
                    const category = item.global_tasks?.category || "Default"
                    const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.Default
                    
                    return (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="group relative"
                      >
                        <div className="bg-white hover:bg-zinc-50/50 border border-zinc-100 p-4 rounded-[2rem] transition-all duration-500 shadow-sm hover:shadow-md hover:border-zinc-200 flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl ${config.bg} flex items-center justify-center shrink-0 text-2xl shadow-inner transition-all duration-500`}>
                             {config.icon}
                          </div>
                          
                          <div className="flex flex-col flex-1 min-w-0">
                            <h4 className="text-[14px] font-bold text-zinc-900 line-clamp-2 leading-tight transition-colors duration-300 group-hover:text-[#006699]">
                              {item.global_tasks?.task_name || "Task Completed"}
                            </h4>
                            <div className="flex items-center gap-2.5 mt-2">
                              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                                {timeAgo(item.completed_at)}
                              </span>
                              <div className="w-1 h-1 rounded-full bg-zinc-200" />
                              <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${config.text}`}>
                                {category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
