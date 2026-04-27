import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  subtextType?: 'positive' | 'neutral';
  icon: React.ElementType;
  iconColor: string;
}

export function StatCard({ label, value, subtext, subtextType = 'neutral', icon: Icon, iconColor }: StatCardProps) {
  return (
    <div className="bg-white p-5 md:p-6 rounded-3xl md:rounded-[2rem] shadow-sm border border-zinc-100 flex flex-col justify-center">
      <div className="flex justify-between items-start mb-4 md:mb-6">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        {subtextType === 'positive' && (
          <span className="bg-[#6EE7B7]/20 text-[#047857] text-[10px] font-bold px-2 py-0.5 rounded-full md:hidden">
            {subtext}
          </span>
        )}
      </div>
      <p className="text-xs md:text-[10px] font-semibold md:font-bold md:tracking-[0.1em] text-zinc-500 md:uppercase mb-1 md:mb-4">{label}</p>
      <h3 className="text-2xl md:text-[2.5rem] font-bold text-zinc-900 md:text-inherit leading-none mb-1 md:mb-3" style={{ color: value.toString().length > 3 ? undefined : 'inherit' }}>{value}</h3>
      <p className={`text-xs md:text-xs font-medium md:font-bold ${subtextType === 'positive' ? 'text-emerald-600 md:text-emerald-600' : 'text-zinc-400 md:text-zinc-400'} flex items-center`}>
        {subtext}
      </p>
    </div>
  );
}
