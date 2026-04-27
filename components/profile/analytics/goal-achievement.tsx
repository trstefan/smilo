import React from "react";

interface GoalAchievementProps {
  totalQuests: number;
  targetQuests: number;
}

export function GoalAchievement({ totalQuests, targetQuests }: GoalAchievementProps) {
  const percentage = Math.min(totalQuests / targetQuests, 1);
  const roundedPercentage = Math.round(percentage * 100);

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 flex flex-col items-center">
      <h3 className="text-[10px] uppercase tracking-[0.1em] font-bold text-zinc-500 w-full text-left mb-8">Goal Achievement</h3>
      
      <div className="relative w-40 h-40 flex items-center justify-center mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#F4F4F5" strokeWidth="8" />
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="#006699" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeDasharray="251.2" 
            strokeDashoffset={251.2 * (1 - percentage)} 
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-zinc-900 tracking-tighter">
            {roundedPercentage}%
          </span>
          <span className="text-[8px] font-bold tracking-[0.1em] text-zinc-400 mt-1 uppercase">
            {totalQuests} / {targetQuests} Quests
          </span>
        </div>
      </div>
    </div>
  );
}
