'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { CATEGORY_CONFIG, COLORS } from '@/lib/constats';

interface Task {
  id: string; // row id in user_active_tasks
  task_id: string; // global_task id
  title: string;
  description: string;
  category: string;
  resets_at: string;
  completed: boolean;
  completed_at?: string;
  slot: number;
}

interface TaskCardProps {
  task: Task;
  index: number;
  onComplete: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (!task.completed) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const resetTime = new Date(task.resets_at).getTime();
      const remaining = resetTime - now;

      if (remaining <= 0) {
        setTimeRemaining('Resetting...');
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [task.completed, task.resets_at]);

  const config = CATEGORY_CONFIG[task.category] || CATEGORY_CONFIG.Default;

  return (
    <Card className={`group flex flex-col h-full w-full transition-all duration-300 border-2 overflow-hidden ${
      task.completed 
        ? 'bg-zinc-50/80 border-zinc-100 shadow-sm opacity-90' 
        : 'bg-white border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1'
    }`}
    style={!task.completed ? {
      '--hover-border-color': COLORS[task.category as keyof typeof COLORS] || '#006699'
    } as React.CSSProperties : undefined}>
      <CardHeader className="pb-4 relative">
        <div className="absolute top-0 right-0 p-4 opacity-[0.08] text-7xl transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 pointer-events-none">
          {config.icon}
        </div>
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div className="flex flex-col gap-2">
            <Badge variant="outline" className={`w-fit font-bold uppercase tracking-wider text-[10px] ${config.badgeColor} border-none`}>
              {task.category}
            </Badge>
            <CardTitle className="text-xl font-bold text-zinc-900 leading-tight pr-4">
              {task.title}
            </CardTitle>
          </div>
          {task.completed && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ring-4 ring-white"
                 style={{ backgroundColor: `${COLORS[task.category as keyof typeof COLORS] || '#006699'}15` }}>
              <CheckCircle2 className="h-5 w-5" style={{ color: COLORS[task.category as keyof typeof COLORS] || '#006699' }} />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col relative z-10">
        <CardDescription className="text-sm text-zinc-600 leading-relaxed line-clamp-3">
          {task.description}
        </CardDescription>
        
        {task.completed && (
          <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide"
               style={{ color: COLORS[task.category as keyof typeof COLORS] || '#A1A1AA' }}>
             <Clock className="h-3.5 w-3.5" />
             Resets {new Date(task.resets_at) > new Date() ? `in ${timeRemaining}` : 'Soon'}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-zinc-100/80 mt-auto bg-zinc-50/50">
        {task.completed ? (
          <div className="w-full">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Resetting in</span>
              <span className="font-bold bg-white px-3 py-1 rounded-full shadow-sm border"
                    style={{ 
                      borderColor: `${COLORS[task.category as keyof typeof COLORS] || '#006699'}30`, 
                      color: COLORS[task.category as keyof typeof COLORS] || '#006699' 
                    }}>
                {timeRemaining}
              </span>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => onComplete(task)} 
            className="w-full text-white font-bold py-5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            style={{ 
              backgroundColor: COLORS[task.category as keyof typeof COLORS] || '#006699',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.filter = 'brightness(0.9)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = '';
            }}
          >
            Mark as done
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface TaskContainerProps {
  activeTasks?: Task[];
}

/**
 * Helper: compute the midnight-based reset time for a given slot.
 * Slot 1 → next midnight, Slot 2 → midnight + 24h, Slot 3 → midnight + 48h.
 */
function getResetTimeForSlot(slot: number): Date {
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const offsetDays = Math.max(0, slot - 1);
  return new Date(midnight.getTime() + offsetDays * 24 * 60 * 60 * 1000);
}

const TaskContainer: React.FC<TaskContainerProps> = ({ activeTasks: initialActiveTasks }) => {
  const [activeTasks, setActiveTasks] = useState<Task[]>(initialActiveTasks || []);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchActiveTasks = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('user_active_tasks')
      .select('*, global_tasks(*)')
      .eq('user_id', userId)
      .order('slot', { ascending: true });

    if (error) {
      console.error('Error fetching active tasks:', error);
      return;
    }

    if (data) {
      const mappedTasks: Task[] = data.map((row: any) => ({
        id: row.id,
        task_id: row.task_id,
        title: row.global_tasks?.task_name || 'Unknown Task',
        description: row.global_tasks?.description || '',
        category: row.global_tasks?.category || 'Other',
        resets_at: row.resets_at,
        completed: row.completed,
        completed_at: row.completed_at,
        slot: row.slot
      }));
      setActiveTasks(mappedTasks);
    }
  }, [supabase]);

  const initTasks = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // 1. Fetch current tasks from DB first
      const { data: existingTasks } = await supabase
        .from('user_active_tasks')
        .select('id, completed, resets_at')
        .eq('user_id', user.id);

      const now = new Date();

      // 2. Check if any completed tasks have expired (reset time has passed)
      const hasExpiredTasks = existingTasks?.some(
        t => t.completed && new Date(t.resets_at) <= now
      ) ?? false;

      // 3. Check if we have fewer than 3 slots filled
      const hasEmptySlots = !existingTasks || existingTasks.length < 3;

      // 4. ONLY call assign_tasks if slots are empty or tasks have actually expired
      if (hasEmptySlots || hasExpiredTasks) {
        await supabase.rpc('assign_tasks_to_user', { p_user_id: user.id });
      }
      
      // 5. Fetch the active tasks
      await fetchActiveTasks(user.id);
    }
    setLoading(false);
  }, [supabase, fetchActiveTasks]);

  useEffect(() => {
    initTasks();
  }, [initTasks]);

  const handleComplete = async (task: Task) => {
    const resetTime = getResetTimeForSlot(task.slot);

    // 1. Optimistic UI update — instant feedback
    setActiveTasks(prev => prev.map(t =>
      t.id === task.id
        ? { ...t, completed: true, completed_at: new Date().toISOString(), resets_at: resetTime.toISOString() }
        : t
    ));

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      // 2. Update in DB: mark completed AND set the correct resets_at so it persists across refreshes
      const { error: updateError } = await supabase
        .from('user_active_tasks')
        .update({ 
          completed: true, 
          completed_at: new Date().toISOString(),
          resets_at: resetTime.toISOString()
        })
        .eq('id', task.id);

      if (updateError) {
        console.error('Error updating task:', updateError);
        return;
      }

      // 3. Insert into completed_task_list
      const { error: insertError } = await supabase
        .from('completed_task_list')
        .insert({ 
          user_id: user.id, 
          task_id: task.task_id 
        });

      if (insertError) {
        console.error('Error recording completed task:', insertError);
      }

      // 4. Do NOT call assign_tasks_to_user here.
      //    The completed task stays in its slot until resets_at expires.
    } catch (err) {
      console.error('Error in handleComplete:', err);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#006699]" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {activeTasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} onComplete={handleComplete} />
        ))}
      </div>
    </div>
  );
};

export default TaskContainer;

