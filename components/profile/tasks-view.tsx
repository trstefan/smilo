"use client"

import { useState, useEffect, useCallback } from "react"
import { Bookmark, X, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

// Mock Data & Config
const TASK_CATEGORIES = ["All", "Family", "Friends", "Strangers", "Environment"]
const ITEMS_PER_PAGE = 5

const CATEGORY_CONFIG: Record<string, { icon: string, color: string, badgeColor: string }> = {
  "Family": { 
    icon: "🏠", 
    color: "bg-emerald-100 text-emerald-700",
    badgeColor: "bg-emerald-100 text-emerald-700"
  },
  "Friends": { 
    icon: "🤝", 
    color: "bg-blue-100 text-blue-700",
    badgeColor: "bg-blue-100 text-blue-700"
  },
  "Strangers": { 
    icon: "🌍", 
    color: "bg-purple-100 text-purple-700",
    badgeColor: "bg-purple-700 text-white"
  },
  "Environment": { 
    icon: "🌱", 
    color: "bg-green-100 text-green-700",
    badgeColor: "bg-green-100 text-green-700"
  },
  "Default": {
    icon: "📋",
    color: "bg-zinc-100 text-zinc-700",
    badgeColor: "bg-zinc-100 text-zinc-700"
  }
}

interface Task {
  id: string
  task_name: string
  category: string
  description: string
  created_at: string
}

interface PriorityTask {
  id: string
  task_id: string
  saved_at: string
  global_tasks: {
    id: string
    task_name: string
    category: string
    description: string
  } | null
}

// Sidebar list remains static for now or can be linked to user saved tasks later
// MY_LIST removed and replaced with Supabase data

  const supabase = createClient()

export function TasksView() {
  const [activeTab, setActiveTab] = useState("Browse")
  const [activeCategory, setActiveCategory] = useState("All")
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  // Priority Tasks State
  const [priorityTasks, setPriorityTasks] = useState<PriorityTask[]>([])
  const [isPriorityLoading, setIsPriorityLoading] = useState(true)
  const [priorityPage, setPriorityPage] = useState(1)
  const [priorityTotalCount, setPriorityTotalCount] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)
  const [bookmarkedTaskIds, setBookmarkedTaskIds] = useState<Set<string>>(new Set())



  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    try {
      let query = supabase
        .from('global_tasks')
        .select('*', { count: 'exact' })

      if (activeCategory !== "All") {
        query = query.eq('category', activeCategory)
      }

      const from = (currentPage - 1) * ITEMS_PER_PAGE
      const to = from + ITEMS_PER_PAGE - 1

      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) throw error

      setTasks(data || [])
      setTotalCount(count || 0)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }, [activeCategory, currentPage, supabase])

  const fetchAllBookmarkedIds = useCallback(async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('priority_task_list')
        .select('task_id')
        .eq('user_id', uid)

      if (error) throw error
      
      const ids = new Set(data?.map(item => item.task_id) || [])
      setBookmarkedTaskIds(ids)
    } catch (error) {
      console.error("Error fetching bookmarked IDs:", error)
    }
  }, [supabase])

  const fetchPriorityTasks = useCallback(async (uid: string) => {
    setIsPriorityLoading(true)
    try {
      const from = (priorityPage - 1) * ITEMS_PER_PAGE
      const to = from + ITEMS_PER_PAGE - 1

      const { data, count, error } = await supabase
        .from('priority_task_list')
        .select('*, global_tasks(*)', { count: 'exact' })
        .eq('user_id', uid)
        .order('saved_at', { ascending: false })
        .range(from, to)

      if (error) throw error

      setPriorityTasks(data as unknown as PriorityTask[] || [])
      setPriorityTotalCount(count || 0)
    } catch (error) {
      console.error("Error fetching priority tasks:", error)
    } finally {
      setIsPriorityLoading(false)
    }
  }, [priorityPage, supabase])

  // Get User ID and Initial Fetch
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        fetchAllBookmarkedIds(user.id)
        fetchPriorityTasks(user.id)
      }
    }
    getUser()
  }, [supabase, fetchPriorityTasks, fetchAllBookmarkedIds])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Re-fetch priority tasks when page changes
  useEffect(() => {
    if (userId) {
      fetchPriorityTasks(userId)
    }
  }, [priorityPage, userId, fetchPriorityTasks])

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
  }

  // Priority Pagination Handlers
  const priorityTotalPages = Math.ceil(priorityTotalCount / ITEMS_PER_PAGE)
  const handlePrevPriorityPage = () => {
    if (priorityPage > 1) setPriorityPage(prev => prev - 1)
  }
  const handleNextPriorityPage = () => {
    if (priorityPage < priorityTotalPages) setPriorityPage(prev => prev + 1)
  }

  const toggleBookmark = async (taskId: string) => {
    if (!userId) return

    const isBookmarked = bookmarkedTaskIds.has(taskId)
    
    try {
      if (isBookmarked) {
        // Remove from priority list
        const { error } = await supabase
          .from('priority_task_list')
          .delete()
          .eq('user_id', userId)
          .eq('task_id', taskId)

        if (error) throw error
      } else {
        // Add to priority list
        const { error } = await supabase
          .from('priority_task_list')
          .insert({ user_id: userId, task_id: taskId })

        if (error) throw error
      }
      
      // Refresh data
      fetchAllBookmarkedIds(userId)
      fetchPriorityTasks(userId)
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    }
  }

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
                   {totalCount} Tasks Available
                 </span>
              </div>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden flex flex-col gap-4">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 text-[#006699] animate-spin" />
                </div>
              ) : tasks.length > 0 ? (
                tasks.map(task => {
                  const config = CATEGORY_CONFIG[task.category] || CATEGORY_CONFIG.Default;
                  return (
                    <div key={task.id} className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3 items-center">
                          <span className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-full ${config.badgeColor}`}>
                            {task.category}
                          </span>
                        </div>
                        <Bookmark 
                          onClick={() => toggleBookmark(task.id)}
                          className={`w-6 h-6 cursor-pointer transition-all active:scale-90 ${
                            bookmarkedTaskIds.has(task.id) 
                              ? "text-[#006699] fill-[#006699]" 
                              : "text-zinc-400 hover:text-zinc-600"
                          }`} 
                        />
                      </div>
                      <h3 className="text-[17px] font-bold text-zinc-900 mb-1 leading-tight">{task.task_name}</h3>
                      <p className="text-[14px] text-zinc-500 mb-6 line-clamp-2">{task.description}</p>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-zinc-500">No tasks found in this category.</div>
              )}
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[400px]">
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center py-24">
                  <Loader2 className="w-10 h-10 text-[#006699] animate-spin" />
                </div>
              ) : tasks.length > 0 ? (
                tasks.map((task, idx) => {
                  const config = CATEGORY_CONFIG[task.category] || CATEGORY_CONFIG.Default;
                  const isLarge = idx === 0 && currentPage === 1; // Make first item large on first page for variety
                  
                  return (
                    <div 
                      key={task.id} 
                      className={`bg-zinc-50/80 rounded-3xl p-6 md:p-8 flex flex-col transition-all hover:bg-zinc-100 ${
                        isLarge ? "lg:col-span-2 flex-row items-center gap-8" : ""
                      }`}
                    >
                      {isLarge ? (
                        <>
                          <div className="w-32 h-32 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm text-5xl">
                            {config.icon}
                          </div>
                          <div className="flex-1 flex flex-col relative w-full h-full">
                             <div className="absolute top-0 right-0">
                               <Bookmark 
                                 onClick={() => toggleBookmark(task.id)}
                                 className={`w-6 h-6 cursor-pointer transition-all active:scale-90 ${
                                   bookmarkedTaskIds.has(task.id) 
                                     ? "text-[#006699] fill-[#006699]" 
                                     : "text-zinc-400 hover:text-zinc-600"
                                 }`} 
                               />
                             </div>
                             <h3 className="text-xl font-bold text-zinc-900 mb-2 mt-2">{task.task_name}</h3>
                             <p className="text-sm text-zinc-600 mb-6 flex-1 max-w-sm">{task.description}</p>
                             <div className="flex gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>{task.category}</span>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-200 text-zinc-600">Daily Task</span>
                             </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">
                              {config.icon}
                            </div>
                            <Bookmark 
                              onClick={() => toggleBookmark(task.id)}
                              className={`w-6 h-6 cursor-pointer transition-all active:scale-90 ${
                                bookmarkedTaskIds.has(task.id) 
                                  ? "text-[#006699] fill-[#006699]" 
                                  : "text-zinc-400 hover:text-zinc-600"
                              }`} 
                            />
                          </div>
                          <h3 className="text-lg font-bold text-zinc-900 mb-2">{task.task_name}</h3>
                          <p className="text-sm text-zinc-600 mb-6 flex-1 line-clamp-3">{task.description}</p>
                          
                          <div className="flex gap-2 mt-auto">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${config.color}`}>
                              {task.category}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-24 text-zinc-500">No tasks found for this category.</div>
              )}
            </div>
            
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-6 mt-12">
               <button 
                 onClick={handlePrevPage}
                 disabled={currentPage === 1 || isLoading}
                 className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-[#006699] hover:border-[#006699] hover:bg-blue-50 transition-all bg-white shadow-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-zinc-200 disabled:hover:text-zinc-500"
               >
                  <ChevronLeft className="w-6 h-6" />
               </button>
               
               <div className="flex items-center gap-2">
                 <span className="text-sm font-bold text-zinc-900">Page {currentPage}</span>
                 <span className="text-sm text-zinc-400">of {totalPages || 1}</span>
               </div>

               <button 
                 onClick={handleNextPage}
                 disabled={currentPage >= totalPages || isLoading}
                 className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-[#006699] hover:border-[#006699] hover:bg-blue-50 transition-all bg-white shadow-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-zinc-200 disabled:hover:text-zinc-500"
               >
                  <ChevronRight className="w-6 h-6" />
               </button>
            </div>
          </div>

          {/* Sidebar / On my list (Hidden on Mobile unless tab is active, but keeping structure close to desktop) */}
          <div className={`w-full xl:w-80 shrink-0 flex flex-col ${activeTab === 'On my list' ? 'block' : 'hidden md:flex'}`}>
             <div className="bg-white md:bg-transparent rounded-3xl md:rounded-none h-full flex flex-col">
               <div className="flex justify-between items-center mb-6 pt-4 md:pt-0 pb-2 border-b border-zinc-100 md:border-none px-4 md:px-0">
                  <h2 className="text-xl font-bold text-zinc-900">On my list</h2>
               </div>

               <div className="space-y-4 px-4 md:px-0 min-h-[300px]">
                 {isPriorityLoading ? (
                   <div className="flex justify-center py-12">
                     <Loader2 className="w-6 h-6 text-[#006699] animate-spin" />
                   </div>
                 ) : priorityTasks.length > 0 ? (
                   priorityTasks.map(item => {
                     const task = item.global_tasks;
                     if (!task) return null;
                     const config = CATEGORY_CONFIG[task.category] || CATEGORY_CONFIG.Default;
                     
                     return (
                       <div key={item.id} className="bg-zinc-50 rounded-2xl p-4 flex items-center gap-4 group animate-in fade-in slide-in-from-right-2 duration-300">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl shrink-0">
                            {config.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-zinc-900 truncate">{task.task_name}</h4>
                            <p className="text-[11px] text-zinc-500 font-medium">{task.category} • Daily</p>
                          </div>
                          <button 
                            onClick={() => toggleBookmark(item.task_id)}
                            className="text-zinc-400 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-red-500"
                          >
                             <X className="w-4 h-4" />
                          </button>
                       </div>
                     );
                   })
                 ) : (
                   <div className="text-center py-12 text-zinc-400 text-sm">
                     Your list is empty. Save some tasks to see them here!
                   </div>
                 )}
               </div>

               {/* Sidebar Pagination Controls */}
               {priorityTotalCount > ITEMS_PER_PAGE && (
                 <div className="flex items-center justify-center gap-4 mt-6 pb-6 md:pb-0">
                    <button 
                      onClick={handlePrevPriorityPage}
                      disabled={priorityPage === 1 || isPriorityLoading}
                      className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-[#006699] hover:border-[#006699]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                    >
                       <ChevronUp className="w-5 h-5" />
                    </button>
                    
                    <span className="text-xs font-bold text-zinc-500">
                      {priorityPage} / {priorityTotalPages}
                    </span>

                    <button 
                      onClick={handleNextPriorityPage}
                      disabled={priorityPage >= priorityTotalPages || isPriorityLoading}
                      className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 hover:text-[#006699] hover:border-[#006699]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                    >
                       <ChevronDown className="w-5 h-5" />
                    </button>
                 </div>
               )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
