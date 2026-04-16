import { ChevronDown, Send, ThumbsUp, ChevronUp } from "lucide-react"

export function SuggestionsView() {
  const suggestions = [
    {
      id: 1,
      title: "Advanced Dark Mode Themes",
      description: "Introduce custom HEX color overrides for the dark mode interface to match corporate branding guidelines.",
      badge: "PLANNED",
      badgeColor: "bg-emerald-100 text-emerald-600",
      votes: 124,
      mobileTitle: "Dark Mode Interface",
      mobileDesc: "A full native dark theme for low-light editorial work sessions.",
      mobileBadge: "NEW",
      mobileBadgeColor: "bg-purple-100 text-purple-600",
    },
    {
      id: 2,
      title: "Collaborative Real-time Editing",
      description: "Allow multiple editorial team members to collaborate on a single draft with presence indicators and cursor tracking.",
      badge: "UNDER REVIEW",
      badgeColor: "bg-indigo-100 text-indigo-600",
      votes: 86,
      mobileTitle: "Custom Export Formats",
      mobileDesc: "Add support for JSON, YAML, and direct Markdown export protocols.",
      mobileBadge: "PLANNED",
      mobileBadgeColor: "bg-emerald-100 text-emerald-600",
    },
    {
      id: 3,
      title: "API Integration for Headless CMS",
      description: "Full GraphQL API support for programmatic content delivery to external web and mobile applications.",
      badge: "COMING SOON",
      badgeColor: "bg-[#006699]/10 text-[#006699]",
      votes: 218,
      mobileTitle: "Collaborative Editing",
      mobileDesc: "Real-time multiplayer editing for teams working on drafts.",
      mobileBadge: null,
      mobileBadgeColor: "",
    },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 md:p-10 min-h-screen animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Mobile Header */}
      <div className="md:hidden mb-8">
        <h1 className="text-[2rem] font-bold tracking-tight text-zinc-900 mb-1">Suggestions</h1>
        <p className="text-zinc-500 text-sm">Help us shape the future of Smilo.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left Column (Main Feed) - Hidden on mobile temporarily based on flex order */}
        <div className="flex-1 order-2 md:order-1">
          {/* Desktop Only Header */}
          <div className="hidden md:block mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">Community Feedback</h2>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-zinc-500">Your votes shape what we build next</p>
          </div>

          {/* Mobile Only Header for Trending */}
          <div className="flex md:hidden justify-between items-end mb-4 px-1">
             <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-600">Trending Requests</h3>
             <span className="text-sm font-bold text-[#006699] cursor-pointer">View All</span>
          </div>

          <div className="space-y-4">
            {suggestions.map((item, idx) => (
              <>
                {/* Desktop Card */}
                <div key={`desktop-${item.id}`} className="hidden md:flex bg-white p-6 rounded-[2rem] shadow-sm border border-zinc-100 gap-6 transition-all hover:bg-zinc-50/50">
                  <div className="flex flex-col items-center justify-center shrink-0 w-16 h-16 bg-zinc-50 rounded-full border border-zinc-100 shadow-sm cursor-pointer hover:bg-zinc-100 transition-colors">
                    <ChevronUp className="w-5 h-5 text-zinc-600 mb-0.5" />
                    <span className="font-bold text-zinc-900 text-sm">{idx === 0 ? 124 : idx === 1 ? 86 : 218}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="text-base font-bold text-zinc-900">{item.title}</h3>
                       <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${item.badgeColor}`}>{item.badge}</span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-4 md:max-w-xl">{item.description}</p>
                    {idx === 0 ? (
                       <div className="flex items-center space-x-3">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-white relative z-20"></div>
                            <div className="w-6 h-6 rounded-full bg-zinc-600 border-2 border-white relative z-10"></div>
                            <div className="w-6 h-6 rounded-full bg-zinc-100 border-2 border-white relative z-0 flex items-center justify-center text-[8px] font-bold text-zinc-500">+12</div>
                          </div>
                          <span className="text-xs font-medium text-zinc-400">Last activity 2h ago</span>
                       </div>
                    ) : (
                       <span className="text-[10px] font-medium text-zinc-400">Requested by {idx === 1 ? '42 agencies' : 'Release scheduled for Q4'}</span>
                    )}
                  </div>
                </div>

                {/* Mobile Card */}
                <div key={`mobile-${item.id}`} className="md:hidden bg-[#FAFAFA] p-5 rounded-2xl border border-zinc-100/50 flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       {item.mobileBadge && <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${item.mobileBadgeColor}`}>{item.mobileBadge}</span>}
                       <h3 className="text-sm font-bold text-zinc-900">{item.mobileTitle}</h3>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">{item.mobileDesc}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center shrink-0 w-14 h-16 bg-white rounded-xl border border-zinc-100 shadow-sm cursor-pointer active:scale-95 transition-transform">
                    <ThumbsUp className="w-4 h-4 text-[#006699] mb-1.5 fill-[#006699]/10" />
                    <span className="font-bold text-[#006699] text-xs">{idx === 0 ? 128 : idx === 1 ? 84 : idx === 2 ? 215 : 56}</span>
                  </div>
                </div>
              </>
            ))}

            {/* Mobile-only 4th card */}
            <div className="md:hidden bg-[#FAFAFA] p-5 rounded-2xl border border-zinc-100/50 flex gap-4">
               <div className="flex-1">
                 <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-zinc-900">Voice-to-Text Drafts</h3>
                 </div>
                 <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px]">Dictate your initial thoughts and have them transcribed instantly.</p>
               </div>
               <div className="flex flex-col items-center justify-center shrink-0 w-14 h-16 bg-white rounded-xl border border-zinc-100 shadow-sm cursor-pointer active:scale-95 transition-transform">
                 <ThumbsUp className="w-4 h-4 text-zinc-500 mb-1.5" />
                 <span className="font-bold text-zinc-600 text-xs">56</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar form) - Show on top on mobile */}
        <div className="w-full md:w-[380px] shrink-0 order-1 md:order-2">
          {/* Desktop Form */}
          <div className="hidden md:flex flex-col bg-[#FAFAFA] p-8 rounded-[2.5rem] border border-zinc-50 shadow-sm sticky top-10">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">New Suggestion</h2>
            <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
              Have a vision for Smilo? We&apos;re listening. Describe your idea below and let the community vote on it.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.1em] text-[#006699] uppercase mb-2">Title</label>
                <input 
                  type="text" 
                  placeholder="Short, descriptive name" 
                  className="w-full px-5 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006699]/20 shadow-sm text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-[0.1em] text-[#006699] uppercase mb-2 leading-relaxed">What would make Smilo better for you?</label>
                <textarea 
                  placeholder="Describe the feature and the problem it solves..." 
                  className="w-full h-40 px-5 py-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006699]/20 shadow-sm text-sm resize-none"
                />
              </div>
              
              <button className="w-full font-bold bg-[#006699] hover:bg-[#005580] text-white py-4 rounded-full transition-colors flex items-center justify-center text-sm shadow-md">
                Submit Feedback <Send className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Mobile Form */}
          <div className="md:hidden flex flex-col bg-white rounded-3xl border border-zinc-100 shadow-sm p-6 relative">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-bold text-zinc-900">New Suggestion</h2>
               <ChevronDown className="w-5 h-5 text-[#006699]" />
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase mb-3">Your Idea</label>
              <textarea 
                placeholder="What would make Smilo better for you?" 
                className="w-full h-32 px-5 py-4 bg-[#F8F9FA] rounded-2xl border-none outline-none text-sm resize-none text-zinc-700 placeholder:text-zinc-400"
              />
            </div>
            
            <button className="w-full mt-6 font-bold bg-[#006699] hover:bg-[#005580] text-white py-4 rounded-full transition-colors flex items-center justify-center text-[15px] tracking-wide shadow-md shadow-[#006699]/20 active:scale-95">
              Submit Feedback <Send className="w-[18px] h-[18px] ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
