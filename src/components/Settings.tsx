import React from 'react';
import { 
  User, Bell, Shield, Moon, Sun, Trash2, Download, 
  ChevronRight, Globe, CreditCard, Info, LogOut, Sparkles
} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const Settings: React.FC = () => {
  const { role, setRole, isDarkMode, toggleDarkMode } = useFinance();

  const sections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Personal Information', sub: 'Name, Email, Phone', action: 'Edit' },
        { label: 'Linked Accounts', sub: 'Bank, UPI, Credit Cards', action: 'Manage' },
      ]
    },
    {
      title: 'Preferences',
      icon: Globe,
      items: [
        { 
          label: 'Appearance', 
          sub: isDarkMode ? 'Dark Mode Active' : 'Light Mode Active', 
          component: (
            <button 
              onClick={toggleDarkMode}
              className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )
        },
        { label: 'Currency', sub: 'Indian Rupee (₹)', action: 'Change' },
        { label: 'Language', sub: 'English (India)', action: 'Change' },
      ]
    },
    {
      title: 'Security & Access',
      icon: Shield,
      items: [
        { 
          label: 'Current Role', 
          sub: `You are currently an ${role}`, 
          component: (
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="bg-slate-100 dark:bg-slate-700 border-none rounded-lg text-xs font-bold px-3 py-1.5 text-indigo-600 dark:text-indigo-400 outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          )
        },
        { label: 'Two-Factor Authentication', sub: 'Enhanced security for your account', action: 'Enable' },
      ]
    },
    {
      title: 'Data Management',
      icon: CreditCard,
      items: [
        { label: 'Export Data', sub: 'Download your transaction history', icon: Download, action: 'Export' },
        { 
          label: 'Clear All Data', 
          sub: 'Permanently delete all transactions and goals', 
          icon: Trash2, 
          danger: true,
          onClick: () => {
            if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
              localStorage.clear();
              window.location.reload();
            }
          }
        },
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto pb-20"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Settings</h2>
          <p className="text-slate-500 mt-1">Manage your account preferences and application settings.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
          <Sparkles size={18} />
          <span className="text-sm font-bold">Pro Member</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
          >
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-3">
              <section.icon size={20} className="text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-slate-900 dark:text-white">{section.title}</h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {section.items.map((item) => (
                <div key={item.label} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    {item.icon && <item.icon size={18} className={cn("text-slate-400", item.danger && "text-red-400")} />}
                    <div>
                      <p className={cn("text-sm font-semibold text-slate-900 dark:text-white", item.danger && "text-red-600 dark:text-red-400")}>
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                  
                  {item.component ? (
                    item.component
                  ) : (
                    <button 
                      onClick={item.onClick}
                      className={cn(
                        "flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all",
                        item.danger 
                          ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" 
                          : "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      )}
                    >
                      {item.action}
                      {!item.danger && <ChevronRight size={14} />}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* App Info */}
        <div className="mt-8 flex flex-col items-center gap-4 py-8 border-t border-slate-200 dark:border-slate-800">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-500/30">
            Z
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Zorvyn Finance Dashboard</p>
            <p className="text-xs text-slate-500">Version 2.4.0 (Stable)</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
              <Info size={14} /> Help Center
            </button>
            <button className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
              <Shield size={14} /> Privacy Policy
            </button>
            <button className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-1">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
