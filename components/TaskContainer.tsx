'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

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
  onComplete: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
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
  }, [task.resets_at]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Family': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Friends': 'bg-blue-100 text-blue-700 border-blue-200',
      'Strangers': 'bg-purple-100 text-purple-700 border-purple-200',
      'Environment': 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[category] || 'bg-zinc-100 text-zinc-700 border-zinc-200';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Family': '🏠',
      'Friends': '🤝',
      'Strangers': '🌍',
      'Environment': '🌱'
    };
    return icons[category] || '📋';
  };

  return (
    <Card className={`group flex flex-col h-full w-full transition-all duration-300 border-2 overflow-hidden ${
      task.completed 
        ? 'bg-zinc-50/80 border-zinc-100 shadow-sm opacity-90' 
        : 'bg-white border-zinc-100 shadow-sm hover:shadow-xl hover:border-blue-100 hover:-translate-y-1'
    }`}>
      <CardHeader className="pb-4 relative">
        <div className="absolute top-0 right-0 p-4 opacity-[0.08] text-7xl transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 pointer-events-none">
          {getCategoryIcon(task.category)}
        </div>
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div className="flex flex-col gap-2">
            <Badge variant="outline" className={`w-fit font-bold uppercase tracking-wider text-[10px] ${getCategoryColor(task.category)}`}>
              {task.category}
            </Badge>
            <CardTitle className="text-xl font-bold text-zinc-900 leading-tight pr-4">
              {task.title}
            </CardTitle>
          </div>
          {task.completed && (
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 shadow-sm ring-4 ring-white">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col relative z-10">
        <CardDescription className="text-sm text-zinc-600 leading-relaxed line-clamp-3">
          {task.description}
        </CardDescription>
        
        {task.completed && (
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wide">
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
              <span className="font-bold text-zinc-900 bg-white px-3 py-1 rounded-full shadow-sm border border-zinc-200">{timeRemaining}</span>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => onComplete(task)} 
            className="w-full bg-[#006699] hover:bg-[#005580] text-white font-bold py-5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
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
      // 1. Assign tasks if needed
      await supabase.rpc('assign_tasks_to_user', { p_user_id: user.id });
      
      // 2. Fetch the 3 active tasks
      await fetchActiveTasks(user.id);
    }
    setLoading(false);
  }, [supabase, fetchActiveTasks]);

  useEffect(() => {
    initTasks();
  }, [initTasks]);

  const handleComplete = async (task: Task) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // 1. Update user_active_tasks setting completed = true and completed_at = now()
    const { error: updateError } = await supabase
      .from('user_active_tasks')
      .update({ 
        completed: true, 
        completed_at: new Date().toISOString() 
      })
      .eq('id', task.id);

    if (updateError) {
      console.error('Error updating task:', updateError);
      return;
    }

    // 2. Insert into completed_task_list
    const { error: insertError } = await supabase
      .from('completed_task_list')
      .insert({ 
        user_id: user.id, 
        task_id: task.task_id 
      });

    if (insertError) {
      console.error('Error recording completed task:', insertError);
    }

    // 3. Re-call assign_tasks_to_user to refill any eligible slots
    await supabase.rpc('assign_tasks_to_user', { p_user_id: user.id });

    // 4. Refresh the active tasks
    await fetchActiveTasks(user.id);
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
        {activeTasks.map(task => (
          <TaskCard key={task.id} task={task} onComplete={handleComplete} />
        ))}
      </div>
    </div>
  );
};


export default TaskContainer;

