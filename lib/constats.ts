export const COLORS = {
  Family: "#E07A30",
  Strangers: "#D81159",
  Friends: "#aa3e98",
  Environment: "#25a244",
  Completed: "#1a7431"
} as const;

export interface CategoryStyle {
  icon: string;
  color: string;
  badgeColor: string;
  textClass: string;
  bgClass: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryStyle> = {
  "Family": { 
    icon: "🏠", 
    color: "bg-[#E07A30]/10 text-[#E07A30]",
    badgeColor: "bg-[#E07A30]/10 text-[#E07A30]",
    textClass: "text-[#E07A30]",
    bgClass: "bg-[#E07A30]/10"
  },
  "Friends": { 
    icon: "🤝", 
    color: "bg-[#aa3e98]/10 text-[#aa3e98]",
    badgeColor: "bg-[#aa3e98]/10 text-[#aa3e98]",
    textClass: "text-[#aa3e98]",
    bgClass: "bg-[#aa3e98]/10"
  },
  "Strangers": { 
    icon: "🌍", 
    color: "bg-[#D81159]/10 text-[#D81159]",
    badgeColor: "bg-[#D81159] text-white",
    textClass: "text-[#D81159]",
    bgClass: "bg-[#D81159]/10"
  },
  "Environment": { 
    icon: "🌱", 
    color: "bg-[#25a244]/10 text-[#25a244]",
    badgeColor: "bg-[#25a244]/10 text-[#25a244]",
    textClass: "text-[#25a244]",
    bgClass: "bg-[#25a244]/10"
  },
  "Default": {
    icon: "📋",
    color: "bg-zinc-100 text-zinc-700",
    badgeColor: "bg-zinc-100 text-zinc-700",
    textClass: "text-zinc-500",
    bgClass: "bg-zinc-50/50"
  }
};
