import React, { useState, useEffect } from 'react';
import { Target, Plus, Trash2, CheckCircle2, ChevronRight, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  color: string;
}

const COLORS = ['bg-indigo-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500', 'bg-purple-500'];

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('zorvyn_goals');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Emergency Fund', target: 500000, current: 150000, deadline: '2026-12-31', color: 'bg-indigo-500' },
      { id: '2', title: 'New Laptop', target: 150000, current: 45000, deadline: '2026-06-30', color: 'bg-emerald-500' }
    ];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', target: '', deadline: '' });

  useEffect(() => {
    localStorage.setItem('zorvyn_goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const goal: Goal = {
      id: crypto.randomUUID(),
      title: newGoal.title,
      target: parseFloat(newGoal.target),
      current: 0,
      deadline: newGoal.deadline,
      color: COLORS[goals.length % COLORS.length]
    };
    setGoals([...goals, goal]);
    setNewGoal({ title: '', target: '', deadline: '' });
    setIsAdding(false);
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Target size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Financial Goals</h3>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-500"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 group relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{goal.title}</h4>
                    <p className="text-xs text-slate-500">Target: ₹{goal.target.toLocaleString('en-IN')}</p>
                  </div>
                  <button 
                    onClick={() => deleteGoal(goal.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600 dark:text-slate-400">₹{goal.current.toLocaleString('en-IN')} saved</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn("h-full rounded-full", goal.color)}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Deadline: {goal.deadline}
                  </span>
                  <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
                    Add Funds <ChevronRight size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col justify-center"
          >
            <form onSubmit={addGoal} className="space-y-3">
              <input 
                autoFocus
                required
                type="text" 
                placeholder="Goal Title"
                value={newGoal.title}
                onChange={e => setNewGoal({...newGoal, title: e.target.value})}
                className="w-full px-3 py-2 text-sm bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <div className="grid grid-cols-2 gap-2">
                <input 
                  required
                  type="number" 
                  placeholder="Target Amount"
                  value={newGoal.target}
                  onChange={e => setNewGoal({...newGoal, target: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <input 
                  required
                  type="date" 
                  value={newGoal.deadline}
                  onChange={e => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700">
                  Save Goal
                </button>
                <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg">
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Goals;
