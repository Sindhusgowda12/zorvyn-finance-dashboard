export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Food & Dining' 
  | 'Shopping' 
  | 'Entertainment' 
  | 'Transport' 
  | 'Bills & Utilities' 
  | 'Salary' 
  | 'Investments' 
  | 'Others';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export type Role = 'admin' | 'viewer';

export interface FinanceState {
  transactions: Transaction[];
  role: Role;
  isDarkMode: boolean;
}
