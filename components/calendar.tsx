"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarTag = "Family" | "Friends" | "Strangers" | "Colleagues";

export interface CalendarTask {
  id: string;
  title: string;
  date: Date;
  tag: CalendarTag;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  tasks: CalendarTask[];
}

interface CalendarProps {
  initialDate?: Date;
  tasks?: CalendarTask[];
  onDateSelect?: (date: Date) => void;
  showSelectedDateInfo?: boolean;
  className?: string;
  maxWidth?: string;
}

const TAG_COLORS: Record<CalendarTag, string> = {
  Family: "#006699",
  Friends: "#047857",
  Strangers: "#A855F7",
  Colleagues: "#059669",
};

const Calendar: React.FC<CalendarProps> = ({
  initialDate = new Date(),
  tasks = [],
  onDateSelect,
  showSelectedDateInfo = true,
  className = "",
  maxWidth = "max-w-2xl",
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);

      // Simple date matching (ignoring time)
      const dayTasks = tasks.filter(
        (t) => t.date.toDateString() === d.toDateString()
      );

      days.push({
        date: d,
        isCurrentMonth: d.getMonth() === month,
        isToday: d.toDateString() === today.toDateString(),
        isSelected: selectedDate
          ? d.toDateString() === selectedDate.toDateString()
          : false,
        tasks: dayTasks,
      });
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <motion.div
      initial={{ scale: 0.9, y: 10, filter: "blur(10px)" }}
      animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-white rounded-2xl shadow-2xl p-8 w-full",
        maxWidth,
        className
      )}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -10, filter: "blur(5px)" }}
        animate={{ y: 0, filter: "blur(0px)" }}
        className="flex items-center justify-between mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.h1
          key={currentDate.getMonth()}
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          className="text-3xl font-bold text-gray-800"
        >
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, filter: "blur(3px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            className="p-3 text-center font-semibold text-gray-600"
          >
            {day}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        <AnimatePresence mode="wait">
          {days.map((day, index) => {
            const dayId = day.date.toDateString();
            const hasTasks = day.tasks.length > 0;

            return (
              <div key={`${dayId}-${index}`} className="relative group">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
                  transition={{ delay: index * 0.001 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDateClick(day.date)}
                  onMouseEnter={() => setHoveredDay(dayId)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={cn(
                    "p-4 rounded-lg text-center transition-all duration-200 w-full flex flex-col items-center justify-center min-h-[70px]",
                    day.isCurrentMonth
                      ? "text-gray-800 hover:bg-blue-50"
                      : "text-gray-400 hover:bg-gray-50",
                    day.isToday ? "bg-blue-500 !text-white hover:bg-blue-600" : "",
                    day.isSelected && !day.isToday
                      ? "bg-blue-200 text-blue-800 hover:bg-blue-200"
                      : ""
                  )}
                >
                  <span className="font-semibold">{day.date.getDate()}</span>
                  
                  {/* Dots Container */}
                  <div className="flex space-x-0.5 mt-1 h-1.5 justify-center">
                    {day.tasks.slice(0, 4).map((task) => (
                      <div
                        key={task.id}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: TAG_COLORS[task.tag] }}
                      />
                    ))}
                    {day.tasks.length > 4 && (
                      <div className="w-1 h-1 rounded-full bg-gray-400" />
                    )}
                  </div>
                </motion.button>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredDay === dayId && hasTasks && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(5px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 10, scale: 0.9, filter: "blur(5px)" }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 z-50 mb-2 w-48 bg-gray-900 text-white p-3 rounded-xl shadow-xl pointer-events-none"
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider mb-2 opacity-60">Tasks for {day.date.getDate()}</div>
                      <div className="space-y-2">
                        {day.tasks.map((task) => (
                          <div key={task.id} className="flex items-start space-x-2">
                            <div 
                              className="w-2 h-2 rounded-full mt-1 shrink-0" 
                              style={{ backgroundColor: TAG_COLORS[task.tag] }}
                            />
                            <div className="text-xs font-medium leading-tight">{task.title}</div>
                          </div>
                        ))}
                      </div>
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Selected Date Info */}
      {showSelectedDateInfo && selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          className="mt-8 p-4 bg-gray-50 rounded-lg"
        >
          <p className="text-gray-600">
            Selected:{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Calendar;
