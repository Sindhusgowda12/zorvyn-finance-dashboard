import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Role } from '../types';
import { INITIAL_TRANSACTIONS } from '../data';

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  isDarkMode: boolean;
  setRole: (role: Role) => void;
  toggleDarkMode: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('zorvyn_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('zorvyn_role');
    return (saved as Role) || 'admin';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('zorvyn_theme');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('zorvyn_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('zorvyn_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('zorvyn_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    if (role !== 'admin') return;
    const newTransaction = { ...t, id: crypto.randomUUID() };
    setTransactions([newTransaction, ...transactions]);
  };

  const editTransaction = (id: string, updates: Partial<Transaction>) => {
    if (role !== 'admin') return;
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTransaction = (id: string) => {
    if (role !== 'admin') return;
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      role,
      isDarkMode,
      setRole,
      toggleDarkMode,
      addTransaction,
      editTransaction,
      deleteTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
