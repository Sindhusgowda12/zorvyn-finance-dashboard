import React from 'react';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { motion } from 'motion/react';

const SummaryCards: React.FC = () => {
  const { transactions } = useFinance();

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const cards = [
    {
      title: 'Total Balance',
      value: balance,
      icon: Wallet,
      color: 'bg-indigo-500',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'Total Income',
      value: income,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      trend: '+12.3%',
      trendUp: true
    },
    {
      title: 'Total Expenses',
      value: expenses,
      icon: TrendingDown,
      color: 'bg-rose-500',
      trend: '-4.1%',
      trendUp: false
    },
    {
      title: 'Savings Rate',
      value: savingsRate,
      icon: PiggyBank,
      color: 'bg-amber-500',
      isPercent: true,
      trend: '+1.2%',
      trendUp: true
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${card.color} text-white shadow-lg shadow-${card.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
              <card.icon size={24} />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              card.trendUp ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'
            }`}>
              {card.trend}
            </span>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{card.title}</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {card.isPercent ? `${card.value.toFixed(1)}%` : formatCurrency(card.value)}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;
