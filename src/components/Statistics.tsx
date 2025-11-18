import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Target,
  Download,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';

interface StatisticsProps {
  onBackHome: () => void;
}

export default function Statistics({ onBackHome }: StatisticsProps) {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  // Dữ liệu thu chi 6 tháng
  const monthlyData = [
    { month: 'T6', income: 25, expense: 18, savings: 7 },
    { month: 'T7', income: 28, expense: 20, savings: 8 },
    { month: 'T8', income: 30, expense: 22, savings: 8 },
    { month: 'T9', income: 27, expense: 19, savings: 8 },
    { month: 'T10', income: 32, expense: 24, savings: 8 },
    { month: 'T11', income: 35, expense: 25, savings: 10 },
  ];

  // Dữ liệu phân bổ chi tiêu
  const expenseCategories = [
    { name: 'Ăn uống', value: 35, amount: 8750000, color: '#009689' },
    { name: 'Nhà ở', value: 30, amount: 7500000, color: '#00a896' },
    { name: 'Di chuyển', value: 15, amount: 3750000, color: '#FFDF20' },
    { name: 'Giải trí', value: 10, amount: 2500000, color: '#5eead4' },
    { name: 'Khác', value: 10, amount: 2500000, color: '#94a3b8' },
  ];

  // Dữ liệu xu hướng tiết kiệm
  const savingsTrend = [
    { month: 'T6', amount: 7, target: 8 },
    { month: 'T7', amount: 8, target: 8 },
    { month: 'T8', amount: 8, target: 8 },
    { month: 'T9', amount: 8, target: 8 },
    { month: 'T10', amount: 8, target: 8 },
    { month: 'T11', amount: 10, target: 8 },
  ];

  const currentMonth = {
    income: 35000000,
    expense: 25000000,
    savings: 10000000,
    savingsRate: 28.6,
  };

  const comparison = {
    income: { change: 9.4, isIncrease: true },
    expense: { change: 4.2, isIncrease: true },
    savings: { change: 25, isIncrease: true },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-[#00a896] to-primary shadow-lg">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackHome}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 -mr-2"
            >
              <Download className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <PieChart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Thống Kê</h1>
              <p className="text-white/80 text-sm">Phân tích tài chính chi tiết</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Period Selector */}
        <div className="flex gap-2 mt-4 mb-4">
          <button
            onClick={() => setPeriod('month')}
            className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
              period === 'month'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tháng
          </button>
          <button
            onClick={() => setPeriod('quarter')}
            className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
              period === 'quarter'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Quý
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
              period === 'year'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Năm
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          {/* Income */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Thu nhập</p>
                    <p className="text-lg text-green-600">
                      {formatCurrency(currentMonth.income)}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${
                    comparison.income.isIncrease
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {comparison.income.isIncrease ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {comparison.income.change}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Expense */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Chi tiêu</p>
                    <p className="text-lg text-red-600">
                      {formatCurrency(currentMonth.expense)}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${
                    comparison.expense.isIncrease
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {comparison.expense.isIncrease ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {comparison.expense.change}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Savings */}
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Tiết kiệm</p>
                    <p className="text-lg text-primary">
                      {formatCurrency(currentMonth.savings)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tỷ lệ: {currentMonth.savingsRate}%
                    </p>
                  </div>
                </div>
                <Badge className="bg-primary text-white">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {comparison.savings.change}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Income vs Expense Chart */}
        <Card className="border-0 shadow-lg overflow-hidden mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm">Thu Chi 6 Tháng</h3>
              <Badge variant="outline" className="text-xs">
                Triệu VNĐ
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => `${value} triệu`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="income" name="Thu nhập" fill="#009689" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expense" name="Chi tiêu" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card className="border-0 shadow-lg overflow-hidden mb-4">
          <CardContent className="p-4">
            <h3 className="text-sm mb-4">Phân Bổ Chi Tiêu</h3>
            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={200}>
                <RechartsPieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `${value}%`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {expenseCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{formatCurrency(category.amount)}</p>
                    <p className="text-xs text-muted-foreground">{category.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Savings Trend */}
        <Card className="border-0 shadow-lg overflow-hidden mb-4">
          <CardContent className="p-4">
            <h3 className="text-sm mb-4">Xu Hướng Tiết Kiệm</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={savingsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => `${value} triệu`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  name="Thực tế"
                  stroke="#009689"
                  strokeWidth={3}
                  dot={{ fill: '#009689', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Mục tiêu"
                  stroke="#FFDF20"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#FFDF20', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="border-0 shadow-lg overflow-hidden bg-blue-50 border-l-4 border-blue-500">
          <CardContent className="p-4">
            <h4 className="text-blue-900 mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              💡 Nhận xét
            </h4>
            <ul className="text-sm text-blue-700 space-y-2 ml-4 list-disc">
              <li>
                Thu nhập tháng này tăng <strong>9.4%</strong> so với tháng trước
              </li>
              <li>
                Chi tiêu tăng <strong>4.2%</strong>, cần kiểm soát chi tiêu "Ăn uống"
              </li>
              <li>
                Tiết kiệm vượt mục tiêu <strong>25%</strong>! Xuất sắc! 🎉
              </li>
              <li>Duy trì xu hướng này để đạt mục tiêu sớm hơn 3 tháng</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
