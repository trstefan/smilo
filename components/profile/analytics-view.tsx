"use client"

import { useState } from "react"
import { Flame, Users as UsersIcon, Trophy, Target, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Calendar, { CalendarTask } from "@/components/calendar"

const MOCK_TASKS: CalendarTask[] = [
  { id: '1', title: 'Morning Jog with Dad', date: new Date(2026, 3, 12), tag: 'Family' },
  { id: '2', title: 'Coffee with Sarah', date: new Date(2026, 3, 13), tag: 'Friends' },
  { id: '3', title: 'Help Neighbor with Groceries', date: new Date(2026, 3, 13), tag: 'Strangers' },
  { id: '4', title: 'Team Sync Meeting', date: new Date(2026, 3, 14), tag: 'Colleagues' },
  { id: '5', title: 'Family Dinner', date: new Date(2026, 3, 16), tag: 'Family' },
  { id: '6', title: 'Gym Session', date: new Date(2026, 3, 18), tag: 'Friends' },
  { id: '7', title: 'Volunteer at Shelter', date: new Date(2026, 3, 18), tag: 'Strangers' },
  { id: '8', title: 'Submit Q2 Report', date: new Date(2026, 3, 20), tag: 'Colleagues' },
];

const TAG_COLOR_CLASSES: Record<string, string> = {
  Family: "bg-[#006699]",
  Friends: "bg-[#047857]",
  Strangers: "bg-[#A855F7]",
  Colleagues: "bg-[#059669]",
};

export function AnalyticsView() {
  const [mobileWeekStart, setMobileWeekStart] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const day = d.getDay(); // 0 is Sunday
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  });

  const [direction, setDirection] = useState(0);

  const nextWeek = () => {
    setDirection(1);
    const next = new Date(mobileWeekStart);
    next.setDate(next.getDate() + 7);
    setMobileWeekStart(next);
  };

  const prevWeek = () => {
    setDirection(-1);
    const prev = new Date(mobileWeekStart);
    prev.setDate(prev.getDate() - 7);
    setMobileWeekStart(prev);
  };

  const nextMonth = () => {
    setDirection(1);
    const next = new Date(mobileWeekStart);
    next.setMonth(next.getMonth() + 1);
    // Snap to nearest Sunday
    const day = next.getDay();
    next.setDate(next.getDate() - day);
    setMobileWeekStart(next);
  };

  const prevMonth = () => {
    setDirection(-1);
    const prev = new Date(mobileWeekStart);
    prev.setMonth(prev.getMonth() - 1);
    // Snap to nearest Sunday
    const day = prev.getDay();
    prev.setDate(prev.getDate() - day);
    setMobileWeekStart(prev);
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextWeek();
    } else if (info.offset.x > threshold) {
      prevWeek();
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
        {/* Desktop: Calendar View */}
        <div className="hidden md:block">
          <Calendar 
            className="shadow-sm border border-zinc-100 rounded-[2.5rem]" 
            maxWidth="max-w-none"
            showSelectedDateInfo={false}
            tasks={MOCK_TASKS}
          />
        </div>

        {/* Mobile: Daily Activity Strip */}
        <div className="md:hidden bg-white p-6 rounded-[2.5rem] shadow-sm border border-zinc-100 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-zinc-900">Activity</h3>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-zinc-100 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5 text-zinc-600" />
              </button>
              
              <span className="text-sm font-bold text-[#006699] min-w-[100px] text-center">
                {monthNames[mobileWeekStart.getMonth()]} {mobileWeekStart.getFullYear()}
              </span>

              <button 
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-zinc-100 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5 text-zinc-600" />
              </button>
            </div>
          </div>
          
          <div className="relative overflow-hidden h-24">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div 
                key={mobileWeekStart.toDateString()}
                custom={direction}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? '100%' : '-100%',
                    opacity: 0
                  }),
                  center: {
                    x: 0,
                    opacity: 1
                  },
                  exit: (direction: number) => ({
                    x: direction < 0 ? '100%' : '-100%',
                    opacity: 0
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="flex justify-between items-center px-2 absolute inset-0 cursor-grab active:cursor-grabbing select-none w-full"
              >
                {Array.from({ length: 7 }).map((_, idx) => {
                  const itemDate = new Date(mobileWeekStart);
                  itemDate.setDate(mobileWeekStart.getDate() + idx);
                  
                  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
                  const dayTasks = MOCK_TASKS.filter(t => t.date.toDateString() === itemDate.toDateString());
                  const isToday = itemDate.toDateString() === new Date().toDateString();

                  return (
                    <div key={idx} className="flex flex-col items-center flex-1 min-w-0">
                      <span className="text-[9px] font-bold text-zinc-400 mb-2">{dayNames[idx]}</span>
                      <div className={`w-9 h-11 rounded-2xl flex flex-col items-center justify-center relative transition-all ${isToday ? 'bg-[#006699] shadow-lg shadow-[#006699]/30 text-white' : 'bg-zinc-50 text-zinc-900 border border-zinc-100'}`}>
                        <span className="text-xs font-bold mt-0.5">{itemDate.getDate()}</span>
                        <div className="h-3 flex items-center space-x-0.5">
                          {dayTasks.slice(0, 3).map(task => (
                            <div key={task.id} className={`w-1 h-1 rounded-full ${isToday ? 'bg-white' : TAG_COLOR_CLASSES[task.tag]}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between text-xs font-medium">
             <span className="text-zinc-400">Week Overview</span>
             <span className="text-[#047857]">You are on track!</span>
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
