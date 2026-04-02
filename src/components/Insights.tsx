import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { motion } from 'motion/react';

const Insights: React.FC = () => {
  const { transactions } = useFinance();

  const expenseByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const sortedCategories = Object.entries(expenseByCategory)
    .sort((a, b) => (b[1] as number) - (a[1] as number));
  
  const highestCategory = sortedCategories[0];

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const insights = [
    {
      title: 'Highest Spending',
      description: highestCategory 
        ? `You spent the most on ${highestCategory[0]} (₹${(highestCategory[1] as number).toLocaleString('en-IN')}) this period.`
        : 'No spending data available yet.',
      icon: Lightbulb,
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/10'
    },
    {
      title: 'Budget Health',
      description: savingsRate > 20 
        ? `Great job! Your savings rate is ${savingsRate.toFixed(1)}%, which is above the recommended 20%.`
        : `Your savings rate is ${savingsRate.toFixed(1)}%. Try to reduce non-essential expenses to reach 20%.`,
      icon: savingsRate > 20 ? CheckCircle2 : AlertTriangle,
      color: savingsRate > 20 ? 'text-emerald-500' : 'text-rose-500',
      bg: savingsRate > 20 ? 'bg-emerald-50 dark:bg-emerald-900/10' : 'bg-rose-50 dark:bg-rose-900/10'
    },
    {
      title: 'Monthly Comparison',
      description: 'Your expenses are 12% lower than last month. Keep up the good work!',
      icon: TrendingDown,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/10'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Financial Insights</h3>
      <div className="grid grid-cols-1 gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className={`p-4 rounded-xl border border-slate-100 dark:border-slate-700 ${insight.bg}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <insight.icon className={insight.color} size={20} />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{insight.title}</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {insight.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
