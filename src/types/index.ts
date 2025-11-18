export interface Goal {
  id: string;
  category: string;
  type?: string; // Type of goal: asset, retire, house, wedding, education, other
  targetCost: number;
  targetAmount?: number; // Alternative name for targetCost
  timeYears: number;
  interestRate: number;
  currentSavings: number;
  currentAmount?: number; // Alternative name for currentSavings
  monthlySavings?: number;
  monthlyContribution?: number; // Alternative name for monthlySavings
  progress: number;
  deadline?: string; // ISO date string for deadline
  createdDate?: string; // ISO date string for creation date
}

export interface UserData {
  monthlyIncome: number;
  monthlyExpenses: number;
  goals: Goal[];
  points: number;
  badges: string[];
}

export interface InvestmentOption {
  id: string;
  name: string;
  returnRate: string;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}