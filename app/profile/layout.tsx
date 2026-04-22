import { ReactNode, Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/profile/sidebar";
import { MobileNavigation } from "@/components/profile/mobile-navigation";

export default async function ProfileLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/sign-in-to-smilo");
  }

  // Fetch profile display name server-side
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', user.id)
    .single();

  const displayName = profile?.display_name || user.user_metadata?.displayName || user.email?.split('@')[0] || "User";
  const initials = displayName.substring(0, 2).toUpperCase();

  return (
    <div className="flex bg-[#FAFAFA] min-h-screen font-sans">
      <Suspense fallback={<div className="hidden md:flex w-64 bg-[#111111] h-screen" />}>
        <Sidebar displayName={displayName} initials={initials} />
      </Suspense>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col min-h-0 w-full overflow-hidden">
        <Suspense fallback={<div className="h-16 bg-[#FAFAFA]" />}>
          <MobileNavigation />
        </Suspense>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pb-28 md:pb-0 relative z-0">
          {/* Subtle gradient background for entire main content area, most visible on mobile */}
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-pink-100/40 via-[#FAFAFA] to-[#FAFAFA] -z-10 pointer-events-none" />
          {children}
        </main>
      </div>
    </div>
  );
}
