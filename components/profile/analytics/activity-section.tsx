import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Calendar, { CalendarTask } from "@/components/calendar";

interface ActivitySectionProps {
  tasks: CalendarTask[];
  tagColorClasses: Record<string, string>;
}

export function ActivitySection({ tasks, tagColorClasses }: ActivitySectionProps) {
  const [mobileWeekStart, setMobileWeekStart] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  });

  const [direction, setDirection] = useState(0);

  const nextMonth = () => {
    setDirection(1);
    const next = new Date(mobileWeekStart);
    next.setMonth(next.getMonth() + 1);
    const day = next.getDay();
    next.setDate(next.getDate() - day);
    setMobileWeekStart(next);
  };

  const prevMonth = () => {
    setDirection(-1);
    const prev = new Date(mobileWeekStart);
    prev.setMonth(prev.getMonth() - 1);
    const day = prev.getDay();
    prev.setDate(prev.getDate() - day);
    setMobileWeekStart(prev);
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      const next = new Date(mobileWeekStart);
      next.setDate(next.getDate() + 7);
      setMobileWeekStart(next);
      setDirection(1);
    } else if (info.offset.x > threshold) {
      const prev = new Date(mobileWeekStart);
      prev.setDate(prev.getDate() - 7);
      setMobileWeekStart(prev);
      setDirection(-1);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <>
      {/* Desktop: Calendar View */}
      <div className="hidden md:block">
        <Calendar 
          className="shadow-sm border border-zinc-100 rounded-[2.5rem]" 
          maxWidth="max-w-none"
          showSelectedDateInfo={false}
          tasks={tasks}
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
                const dayTasks = tasks.filter(t => t.date.toDateString() === itemDate.toDateString());
                const isToday = itemDate.toDateString() === new Date().toDateString();

                return (
                  <div key={idx} className="flex flex-col items-center flex-1 min-w-0">
                    <span className="text-[9px] font-bold text-zinc-400 mb-2">{dayNames[idx]}</span>
                    <div className={`w-9 h-11 rounded-2xl flex flex-col items-center justify-center relative transition-all ${isToday ? 'bg-[#006699] shadow-lg shadow-[#006699]/30 text-white' : 'bg-zinc-50 text-zinc-900 border border-zinc-100'}`}>
                      <span className="text-xs font-bold mt-0.5">{itemDate.getDate()}</span>
                      <div className="h-3 flex items-center space-x-0.5">
                        {dayTasks.slice(0, 3).map(task => (
                          <div key={task.id} className={`w-1 h-1 rounded-full ${isToday ? 'bg-white' : tagColorClasses[task.tag]}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
