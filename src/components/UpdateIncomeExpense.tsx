import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ChevronLeft,
  Save,
  ArrowUp,
  Coffee,
  Car,
  Smile,
} from 'lucide-react';
import { formatCurrency } from '../utils/financial-calculations';

interface UpdateIncomeExpenseProps {
  previousIncome?: number;
  previousExpense?: number;
  onSave: (income: number, expense: number) => void;
  onBack: () => void;
}

export default function UpdateIncomeExpense({
  previousIncome = 15000000,
  previousExpense = 10000000,
  onSave,
  onBack,
}: UpdateIncomeExpenseProps) {
  const [monthlyIncome, setMonthlyIncome] = useState(previousIncome.toString());
  const [monthlyExpense, setMonthlyExpense] = useState(previousExpense.toString());

  // Mock data - phân loại chi tiêu
  const [expenseBreakdown, setExpenseBreakdown] = useState({
    food: 3200000,
    transport: 1100000,
    entertainment: 1500000,
    other: 4200000,
  });

  const income = parseFloat(monthlyIncome) || 0;
  const expense = parseFloat(monthlyExpense) || 0;
  const autoSavings = income - expense;
  
  // Tính sự thay đổi so với tháng trước
  const incomeChange = income - previousIncome;
  const expenseChange = expense - previousExpense;
  const savingsChange = autoSavings - (previousIncome - previousExpense);

  // Tính khả năng tăng tiết kiệm từ việc giảm chi tiêu không cần thiết
  const potentialSavings = expenseBreakdown.entertainment * 0.2; // Giả định có thể giảm 20% chi giải trí

  const handleSave = () => {
    if (income > 0 && expense >= 0) {
      onSave(income, expense);
    }
  };

  const currentMonth = new Date().toLocaleDateString('vi-VN', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-[#00a896] to-primary shadow-lg">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <PiggyBank className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Cập Nhật Thu Chi</h1>
              <p className="text-white/80 text-sm">{currentMonth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Quick Form */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary">Form nhập nhanh</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Cập nhật thu nhập và chi tiêu tháng này
            </p>
          </div>
          <CardContent className="p-4 space-y-4">
            {/* Thu nhập */}
            <div className="space-y-2">
              <Label htmlFor="income" className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                Thu nhập tháng này
              </Label>
              <Input
                id="income"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                placeholder="15,000,000"
                className="h-12 text-base border-2 focus:border-primary"
              />
              {incomeChange !== 0 && (
                <div className={`flex items-center gap-1 text-xs ${incomeChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {incomeChange > 0 ? <ArrowUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>{incomeChange > 0 ? '+' : ''}{formatCurrency(incomeChange)} so với tháng trước</span>
                </div>
              )}
            </div>

            {/* Chi tiêu */}
            <div className="space-y-2">
              <Label htmlFor="expense" className="text-sm flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-orange-600" />
                Chi tiêu tháng này
              </Label>
              <Input
                id="expense"
                type="number"
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(e.target.value)}
                placeholder="9,800,000"
                className="h-12 text-base border-2 focus:border-primary"
              />
              {expenseChange !== 0 && (
                <div className={`flex items-center gap-1 text-xs ${expenseChange < 0 ? 'text-green-600' : 'text-orange-600'}`}>
                  {expenseChange < 0 ? <TrendingDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
                  <span>{expenseChange > 0 ? '+' : ''}{formatCurrency(expenseChange)} so với tháng trước</span>
                </div>
              )}
            </div>

            {/* Auto Savings Display */}
            <div className="bg-gradient-to-br from-primary to-[#00a896] rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5" />
                  <span className="text-sm">Tiết kiệm tự động</span>
                </div>
                {savingsChange > 0 && (
                  <div className="flex items-center gap-1 text-[#FFDF20] text-xs">
                    <ArrowUp className="h-3 w-3" />
                    <span>+{formatCurrency(savingsChange)}</span>
                  </div>
                )}
              </div>
              <p className="text-3xl">{formatCurrency(autoSavings)}</p>
              <p className="text-white/70 text-xs mt-1">Thu nhập - Chi tiêu</p>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary">Phân loại chi tiêu</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Dự kiến dựa trên thói quen chi tiêu
            </p>
          </div>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Coffee className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Ăn uống</p>
                  <p className="text-xs text-muted-foreground">32% chi tiêu</p>
                </div>
              </div>
              <span className="text-orange-600">{formatCurrency(expenseBreakdown.food)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Car className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Đi lại</p>
                  <p className="text-xs text-muted-foreground">11% chi tiêu</p>
                </div>
              </div>
              <span className="text-blue-600">{formatCurrency(expenseBreakdown.transport)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Smile className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Giải trí</p>
                  <p className="text-xs text-muted-foreground">15% chi tiêu</p>
                </div>
              </div>
              <span className="text-purple-600">{formatCurrency(expenseBreakdown.entertainment)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Khác</p>
                  <p className="text-xs text-muted-foreground">42% chi tiêu</p>
                </div>
              </div>
              <span className="text-gray-600">{formatCurrency(expenseBreakdown.other)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Savings Potential */}
        {potentialSavings > 0 && (
          <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-green-50 border-l-4 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ArrowUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-green-900 mb-1">Khả năng tăng tiết kiệm</h4>
                  <p className="text-sm text-green-800 mb-2">
                    Bạn có thể tiết kiệm thêm <strong>{formatCurrency(potentialSavings)}</strong> nếu giảm 20% chi tiêu giải trí.
                  </p>
                  <div className="text-xs text-green-700">
                    <p>• Hạn chế ăn uống ngoài (-800k)</p>
                    <p>• Giảm chi phí giải trí không cần thiết</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={!income || expense < 0}
          className="w-full h-12 mt-6 bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90 text-base"
        >
          <Save className="mr-2 h-5 w-5" />
          Lưu & Cập nhật tiến độ
        </Button>
      </div>
    </div>
  );
}
