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

  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
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
                const isSelected = selectedDate.toDateString() === itemDate.toDateString();

                return (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedDate(itemDate)}
                    className="flex flex-col items-center flex-1 min-w-0 outline-none active:scale-95 transition-transform"
                  >
                    <span className="text-[9px] font-bold text-zinc-400 mb-2">{dayNames[idx]}</span>
                    <div className={`w-9 h-11 rounded-2xl flex flex-col items-center justify-center relative transition-all duration-200 ${
                      isSelected 
                        ? 'bg-[#006699] shadow-lg shadow-[#006699]/30 text-white scale-110' 
                        : 'bg-zinc-50 text-zinc-900 border border-zinc-100 hover:bg-zinc-100'
                    }`}>
                      <span className="text-xs font-bold mt-0.5">{itemDate.getDate()}</span>
                      <div className="h-3 flex items-center space-x-0.5">
                        {dayTasks.slice(0, 3).map(task => (
                          <div 
                            key={task.id} 
                            className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : (tagColorClasses[task.tag] || 'bg-zinc-400')}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Separator Line */}
        <div className="h-px bg-zinc-100 my-6" />

        {/* Selected Date Details */}
        <div className="flex flex-col gap-4 px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Day Number Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#006699] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#006699]/20">
                {selectedDate.getDate()}
              </div>
              
              <div>
                <h4 className="font-bold text-zinc-900 text-base leading-tight">
                  {selectedDate.toLocaleDateString("en-US", { weekday: 'long' })}
                </h4>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mt-0.5">
                  {tasks.filter(t => t.date.toDateString() === selectedDate.toDateString()).length} completed events
                </p>
              </div>
            </div>
          </div>

          {/* Completed Task Names List */}
          {(() => {
            const selectedTasks = tasks.filter(t => t.date.toDateString() === selectedDate.toDateString());
            return selectedTasks.length > 0 ? (
              <div className="mt-2 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {selectedTasks.map(task => (
                  <div 
                    key={task.id} 
                    className="flex items-start gap-3 p-3 bg-zinc-50 border border-zinc-100/50 rounded-2xl"
                  >
                    <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${tagColorClasses[task.tag] || 'bg-[#006699]'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-zinc-800 leading-snug">{task.title}</p>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1 block">
                        {task.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-zinc-400 text-xs font-semibold bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200 mt-2">
                No tasks completed on this day.
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
}
