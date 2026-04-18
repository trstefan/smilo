import { useState } from "react"
import {  Bookmark, X, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, } from "lucide-react"

// Mock Data
const TASK_CATEGORIES = ["All", "Family", "Friends", "Strangers", "Colleagues"]
const TASK_DURATIONS = ["Quick", "Medium", "Deep"]

const TASKS = [
  {
    id: 1,
    title: "Editorial Coffee Mix",
    description: "Connect with colleagues over a quick caffeine break to discuss the upcoming...",
    category: "Colleagues",
    duration: "Quick",
    icon: "☕",
    categoryColor: "bg-emerald-100 text-emerald-700",
    durationColor: "bg-blue-500 text-white",
  },
  {
    id: 2,
    title: "Park Walk Session",
    description: "A deep-focus strategy walk for planning the spring editorial calendar in the fres...",
    category: "Family",
    duration: "Deep",
    icon: "🏞️",
    categoryColor: "bg-purple-100 text-purple-700",
    durationColor: "bg-transparent text-zinc-500", // no bg in desktop image
  },
  {
    id: 3,
    title: "System Audit Strategy",
    description: "An intensive review of the current task management hierarchy to identify friction points and optimization paths.",
    category: "Colleagues",
    duration: "Deep",
    icon: "📓", // Replace with image or better icon
    categoryColor: "bg-emerald-100 text-emerald-700",
    durationColor: "bg-zinc-200 text-zinc-700",
    isLarge: true,
  },
  {
    id: 4,
    title: "Networking Lunch",
    description: "Casual catch-up with industry strangers to broaden the workspace perspective.",
    category: "Strangers",
    duration: "Medium",
    icon: "🍔",
    categoryColor: "bg-emerald-700 text-white",
    durationColor: "bg-blue-600 text-white",
  },
  {
    id: 5,
    title: "Remote Check-in",
    description: "Weekly sync with remote team members to maintain cultural alignment.",
    category: "Colleagues",
    duration: "Quick",
    icon: "🏠",
    categoryColor: "bg-emerald-100 text-emerald-700",
    durationColor: "bg-blue-500 text-white",
  }
]

const MY_LIST = [
  {
    id: 101,
    title: "Park Walk Session",
    meta: "Family • Deep",
    icon: "🏞️"
  },
  {
    id: 102,
    title: "Project Sync Up",
    meta: "Colleagues • Medium",
    icon: "📋"
  },
  {
    id: 103,
    title: "Ideation Sprint",
    meta: "Colleagues • Deep",
    icon: "💡"
  }
]

// Mobile Task Card Data
const MOBILE_TASKS = [
  {
    id: 201,
    badge: "PROJECT X",
    badgeColor: "bg-purple-100 text-purple-700",
    time: "Due in 2h",
    title: "Finalize UI Brand Anchors",
    description: "Sync with the editorial team on the sky blue...",
    progress: 75,
    avatars: ["/placeholder-user.jpg", "/placeholder-user.jpg"]
  },
  {
    id: 202,
    badge: "EDITORIAL",
    badgeColor: "bg-emerald-100 text-emerald-700",
    time: "Today",
    title: "Weekly Content Audit",
    description: "Reviewing the task list for high-end UI...",
    progress: 30,
    avatars: ["/placeholder-user.jpg"]
  },
  {
    id: 203,
    badge: "INTERNAL",
    badgeColor: "bg-blue-100 text-blue-700",
    time: "Tomorrow",
    title: "Monolith Infrastructure Update",
    description: "Revisiting the 3-column grid logic for mobile...",
    progress: 50,
    avatars: ["/placeholder-user.jpg", "/placeholder-user.jpg"]
  }
]

export function TasksView() {
  const [activeTab, setActiveTab] = useState("Browse")
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 md:p-10 min-h-screen pb-24 md:pb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="md:hidden w-full mb-8">
        <div className="flex flex-col justify-between items-start mb-6">
          <h1 className="text-[2rem] font-bold tracking-tight text-zinc-900 mb-1">Tasks</h1>
            <p className="text-zinc-600">Browse and save activities for your editorial schedule.</p>
         
        </div>

        {/* Mobile Tabs */}
        <div className="flex gap-6 border-b border-zinc-200">
          {["Browse", "On my list"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 font-semibold text-lg transition-colors relative ${
                activeTab === tab ? "text-[#006699]" : "text-zinc-500"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006699]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col h-full">
        
        {/* Desktop Header */}
        <div className="hidden md:block mb-10">
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-2">Your Tasks</h1>
          <p className="text-zinc-600">Browse and save activities for your editorial schedule.</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
          
          {/* Main Task Feed (Desktop: grid, Mobile: list of mobile cards) */}
          <div className={`flex-1 ${activeTab === 'Browse' ? 'block' : 'hidden md:block'}`}>
            {/* Filters - Premium Mobile Carousel & Desktop layout */}
            <div className="relative mb-8 -mx-6 md:mx-0">
              <div className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 px-6 md:px-0 no-scrollbar scroll-smooth snap-x snap-mandatory w-full">
                {TASK_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-5 py-2 rounded-full text-[13px] md:text-sm font-bold whitespace-nowrap transition-all duration-300 snap-center shrink-0 active:scale-95 flex items-center gap-2 ${
                      activeCategory === cat 
                        ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 md:bg-[#006699] md:shadow-[#006699]/30" 
                        : "bg-white border border-zinc-200/80 text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 shadow-sm md:bg-zinc-100/80 md:border-transparent md:shadow-none"
                    }`}
                  >
                    {activeCategory === cat && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse md:bg-white" />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
              
              {/* Optional: Edge gradients for mobile to indicate scroll limits */}
              <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#FAFAFA] to-transparent pointer-events-none md:hidden" />
              <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none md:hidden" />
            </div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-3 items-center">
                 <h2 className="text-xl font-bold text-zinc-900 hidden md:block">Task Library</h2>
                 <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-[#006699] rounded-full hidden md:inline-block">
                   24 Tasks Available
                 </span>
              </div>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden flex flex-col gap-4">
               {MOBILE_TASKS.map(task => (
                 <div key={task.id} className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-3 items-center">
                        <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full ${task.badgeColor}`}>
                          {task.badge}
                        </span>
                       
                      </div>
                      <Bookmark className="w-5 h-5 text-zinc-400" />
                    </div>
                    <h3 className="text-[17px] font-bold text-zinc-900 mb-1 leading-tight">{task.title}</h3>
                    <p className="text-[14px] text-zinc-500 mb-6 line-clamp-2">{task.description}</p>
                 </div>
               ))}
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
              {TASKS.map(task => (
                <div 
                  key={task.id} 
                  className={`bg-zinc-50/80 rounded-3xl p-6 md:p-8 flex flex-col transition-all hover:bg-zinc-100 ${
                    task.isLarge ? "lg:col-span-2 flex-row items-center gap-8" : ""
                  }`}
                >
                  {task.isLarge ? (
                    // Large Card Layout
                    <>
                      <div className="w-32 h-32 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm text-5xl">
                        {task.icon}
                      </div>
                      <div className="flex-1 flex flex-col relative w-full h-full">
                         <div className="absolute top-0 right-0">
                           <Bookmark className="w-5 h-5 text-zinc-400" />
                         </div>
                         <h3 className="text-xl font-bold text-zinc-900 mb-2 mt-2">{task.title}</h3>
                         <p className="text-sm text-zinc-600 mb-6 flex-1 max-w-sm">{task.description}</p>
                         <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${task.categoryColor}`}>{task.category}</span>
                            {task.duration && (
                               <span className={`px-3 py-1 rounded-full text-xs font-bold ${task.durationColor}`}>{task.duration}</span>
                            )}
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-200 text-zinc-600">Priority</span>
                         </div>
                      </div>
                    </>
                  ) : (
                    // Regular Card Layout
                    <>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">
                          {task.icon}
                        </div>
                        <Bookmark className="w-5 h-5 text-zinc-400 cursor-pointer hover:text-zinc-600" />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 mb-2">{task.title}</h3>
                      <p className="text-sm text-zinc-600 mb-6 flex-1 line-clamp-3">{task.description}</p>
                      
                      <div className="flex gap-2 mt-auto">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${task.categoryColor}`}>
                          {task.category}
                        </span>
                        {task.duration && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${task.durationColor}`}>
                            {task.duration}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            <div className="flex justify-center gap-3 mt-8">
               <button className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 transition-colors bg-white shadow-sm">
                  <ChevronLeft className="w-5 h-5" />
               </button>
               <button className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 transition-colors bg-white shadow-sm">
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
          </div>

          {/* Sidebar / On my list (Hidden on Mobile unless tab is active, but keeping structure close to desktop) */}
          <div className={`w-full xl:w-80 shrink-0 flex flex-col ${activeTab === 'On my list' ? 'block' : 'hidden md:flex'}`}>
             <div className="bg-white md:bg-transparent rounded-3xl md:rounded-none h-full flex flex-col">
               <div className="flex justify-between items-center mb-6 pt-4 md:pt-0 pb-2 border-b border-zinc-100 md:border-none px-4 md:px-0">
                  <h2 className="text-xl font-bold text-zinc-900">On my list</h2>
               </div>

               <div className="space-y-4 px-4 md:px-0">
                 {MY_LIST.map(item => (
                   <div key={item.id} className="bg-zinc-50 rounded-2xl p-4 flex items-center gap-4 group">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-zinc-900 truncate">{item.title}</h4>
                        <p className="text-[11px] text-zinc-500 font-medium">{item.meta}</p>
                      </div>
                      <button className="text-zinc-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity p-2">
                         <X className="w-4 h-4" />
                      </button>
                   </div>
                 ))}
               </div>

               {/* Sorting Controls */}
               <div className="flex justify-center gap-2 mt-6 pb-6 md:pb-0">
                  <button className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-colors">
                     <ChevronUp className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-colors">
                     <ChevronDown className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
