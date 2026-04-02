import { Transaction } from './types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2026-03-28',
    amount: 75000,
    category: 'Salary',
    type: 'income',
    description: 'Monthly Salary'
  },
  {
    id: '2',
    date: '2026-03-29',
    amount: 2500,
    category: 'Food & Dining',
    type: 'expense',
    description: 'Dinner at Fine Dine'
  },
  {
    id: '3',
    date: '2026-03-30',
    amount: 800,
    category: 'Transport',
    type: 'expense',
    description: 'Ola/Uber Ride'
  },
  {
    id: '4',
    date: '2026-03-31',
    amount: 4500,
    category: 'Shopping',
    type: 'expense',
    description: 'New Clothes'
  },
  {
    id: '5',
    date: '2026-04-01',
    amount: 1200,
    category: 'Entertainment',
    type: 'expense',
    description: 'Movie Tickets'
  },
  {
    id: '6',
    date: '2026-04-01',
    amount: 15000,
    category: 'Investments',
    type: 'income',
    description: 'Mutual Fund Dividends'
  },
  {
    id: '7',
    date: '2026-04-02',
    amount: 3500,
    category: 'Bills & Utilities',
    type: 'expense',
    description: 'Electricity & Wi-Fi'
  }
];
