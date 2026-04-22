import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardView } from "@/components/profile/dashboard-view";
import { AnalyticsView } from "@/components/profile/analytics-view";
import { SuggestionsView } from "@/components/profile/suggestions-view";
import { TasksView } from "@/components/profile/tasks-view";

export default async function ProfilePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const supabase = await createClient();
  const resolvedSearchParams = await searchParams;
  
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
  
  // Extract tab from search params
  const tabParam = resolvedSearchParams.tab;
  const activeTab = (tabParam === 'history') ? 'analytics' : (tabParam || 'dashboard');

  if (activeTab === 'analytics') {
    return <AnalyticsView />;
  }

  if (activeTab === 'suggestions') {
    return (
      <div className="w-full h-full">
        <SuggestionsView />
      </div>
    );
  }

  if (activeTab === 'tasks') {
    return <TasksView />;
  }

  // Dashboard Fallback
  return <DashboardView displayName={displayName} />;
}
