import React, { useState } from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import TransactionsTable from './components/TransactionsTable';
import Insights from './components/Insights';
import TransactionModal from './components/TransactionModal';
import AIAssistant from './components/AIAssistant';
import Goals from './components/Goals';
import SettingsComponent from './components/Settings';
import { Plus, LayoutDashboard, ReceiptText, PieChart, Settings, Sparkles, Target, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

const DashboardContent: React.FC = () => {
  const { role, transactions, isDarkMode } = useFinance();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SummaryCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <div className="lg:col-span-2">
                <Charts />
                <TransactionsTable />
              </div>
              <div className="space-y-6">
                <Goals />
                <Insights />
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Sparkles size={120} />
                  </div>
                  <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Sparkles size={20} />
                    Zorvyn Premium
                  </h4>
                  <p className="text-indigo-100 text-sm mb-4 leading-relaxed">
                    Unlock advanced AI insights and multi-currency support with our premium plan.
                  </p>
                  <button className="w-full py-2.5 bg-white text-indigo-600 font-bold rounded-xl text-sm hover:bg-indigo-50 transition-colors shadow-lg">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'transactions':
        return (
          <motion.div
            key="transactions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions History</h2>
              {role === 'admin' && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                >
                  <Plus size={20} />
                  <span>Add Transaction</span>
                </button>
              )}
            </div>
            <TransactionsTable />
          </motion.div>
        );
      case 'insights':
        return (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Insights />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Spending Habits</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Based on your activity over the last 30 days, your spending is most frequent on weekends. 
                  Consider setting a weekend budget to improve your savings rate.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Investment Opportunities</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  You have a consistent surplus of $1,200 each month. Have you considered diversifying your 
                  portfolio with low-cost index funds?
                </p>
              </div>
            </div>
            <Goals />
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SettingsComponent />
          </motion.div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-500">
            <Settings size={48} className="mb-4 opacity-20" />
            <p>Page not found!</p>
          </div>
        );
    }
  };

  return (
    <div className={cn("min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300", isDarkMode && "dark")}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
      
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>

        <footer className="p-8 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800">
          © 2026 Zorvyn FinTech Pvt. Ltd. All rights reserved.
        </footer>
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AIAssistant />
      
      {/* Quick Actions FAB */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 z-40">
        <AnimatePresence>
          {isQuickActionsOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex flex-col items-end gap-3 mb-2"
            >
              {role === 'admin' && (
                <button 
                  onClick={() => { setIsModalOpen(true); setIsQuickActionsOpen(false); }}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all group"
                >
                  <span className="text-xs font-bold">New Transaction</span>
                  <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg group-hover:scale-110 transition-transform">
                    <Plus size={16} />
                  </div>
                </button>
              )}
              <button 
                onClick={() => { setActiveTab('insights'); setIsQuickActionsOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all group"
              >
                <span className="text-xs font-bold">View Insights</span>
                <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg group-hover:scale-110 transition-transform">
                  <PieChart size={16} />
                </div>
              </button>
              <button 
                onClick={() => { /* Mock Export */ setIsQuickActionsOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all group"
              >
                <span className="text-xs font-bold">Export Report</span>
                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg group-hover:scale-110 transition-transform">
                  <Download size={16} />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-40 ${
            isQuickActionsOpen 
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rotate-45' 
              : 'bg-indigo-600 text-white'
          }`}
        >
          <Plus size={28} />
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <FinanceProvider>
      <DashboardContent />
    </FinanceProvider>
  );
}
