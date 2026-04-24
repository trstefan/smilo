'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  resetHours: number;
  completed: boolean;
  completedAt?: number;
}

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (!task.completed || !task.completedAt) return;

    const updateTimer = () => {
      const now = Date.now();
      const resetTime = task.completedAt! + task.resetHours * 60 * 60 * 1000;
      const remaining = resetTime - now;

      if (remaining <= 0) {
        setTimeRemaining('Ready to reset');
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
  }, [task.completed, task.completedAt, task.resetHours]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Health': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Work': 'bg-blue-100 text-blue-700 border-blue-200',
      'Personal': 'bg-purple-100 text-purple-700 border-purple-200',
      'Learning': 'bg-orange-100 text-orange-700 border-orange-200',
      'Family': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Friends': 'bg-blue-100 text-blue-700 border-blue-200',
      'Strangers': 'bg-purple-100 text-purple-700 border-purple-200',
      'Environment': 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[category] || 'bg-zinc-100 text-zinc-700 border-zinc-200';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Health': '🏃‍♂️',
      'Work': '💼',
      'Personal': '🧘',
      'Learning': '📚',
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
        
        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wide">
           <Clock className="h-3.5 w-3.5" />
           Resets in {task.resetHours}h
        </div>
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
            onClick={() => onComplete(task.id)} 
            className="w-full bg-[#006699] hover:bg-[#005580] text-white font-bold py-5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Complete Quest
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

interface TaskContainerProps {
  tasks?: Task[];
}

const TaskContainer: React.FC<TaskContainerProps> = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks && initialTasks.length > 0 ? initialTasks : [
    {
      id: '1',
      title: 'Daily Exercise',
      description: 'Complete 30 minutes of cardio or strength training to maintain your fitness goals.',
      category: 'Health',
      resetHours: 24,
      completed: false,
    },
    {
      id: '2',
      title: 'Project Review',
      description: 'Review and update project documentation, check team progress, and plan next sprint.',
      category: 'Work',
      resetHours: 48,
      completed: false,
    },
    {
      id: '3',
      title: 'Learn New Skill',
      description: 'Dedicate time to learning a new programming language or framework through online courses.',
      category: 'Learning',
      resetHours: 72,
      completed: false,
    },
  ]);

  useEffect(() => {
    const checkResets = () => {
      setTasks(prevTasks =>
        prevTasks.map(task => {
          if (task.completed && task.completedAt) {
            const now = Date.now();
            const resetTime = task.completedAt + task.resetHours * 60 * 60 * 1000;
            if (now >= resetTime) {
              return { ...task, completed: false, completedAt: undefined };
            }
          }
          return task;
        })
      );
    };

    const interval = setInterval(checkResets, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleComplete = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, completed: true, completedAt: Date.now() }
          : task
      )
    );
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onComplete={handleComplete} />
        ))}
      </div>
    </div>
  );
};

export default TaskContainer;
