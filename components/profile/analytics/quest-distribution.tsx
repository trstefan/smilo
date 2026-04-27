import React from "react";

interface QuestDistributionProps {
  distribution: Record<string, { completed: number; total: number }>;
  tagColorClasses: Record<string, string>;
}

export function QuestDistribution({ distribution, tagColorClasses }: QuestDistributionProps) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100">
      <h3 className="text-[10px] uppercase tracking-[0.1em] font-bold text-zinc-500 mb-8">Quest Distribution</h3>
      <div className="space-y-6">
        {Object.entries(distribution).map(([cat, { completed, total }]) => (
          <div key={cat}>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-zinc-900">{cat}</span>
              <span className="text-zinc-600 font-medium">{completed} / {total}</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${tagColorClasses[cat] || "bg-zinc-400"}`} 
                style={{ width: `${Math.min((completed / (total || 1)) * 100, 100)}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
