import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import {
  Target,
  TrendingUp,
  Calendar,
  ArrowUp,
  ArrowDown,
  Edit,
  BarChart3,
  AlertCircle,
  Lightbulb,
  ChevronLeft,
} from 'lucide-react';
import { formatCurrency } from '../utils/financial-calculations';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface MonthlyTrackingProps {
  goalLabel: string;
  targetAmount: number;
  currentSavings: number;
  monthlySavings: number;
  onUpdateIncomeExpense: () => void;
  onViewForecast: () => void;
  onBack: () => void;
}

export default function MonthlyTracking({
  goalLabel,
  targetAmount,
  currentSavings,
  monthlySavings,
  onUpdateIncomeExpense,
  onViewForecast,
  onBack,
}: MonthlyTrackingProps) {
  const currentMonth = new Date().toLocaleDateString('vi-VN', {
    month: 'long',
    year: 'numeric',
  });

  // Mock data - trong thực tế sẽ lấy từ database
  const thisMonthSavings = 5000000;
  const totalAccumulated = currentSavings + thisMonthSavings;
  const progressPercentage = ((totalAccumulated / targetAmount) * 100).toFixed(1);
  const progressChange = 0.5; // % thay đổi

  // Dữ liệu biểu đồ 6 tháng gần nhất
  const chartData = [
    { month: 'T11', actual: 4800000, planned: 5000000 },
    { month: 'T12', actual: 5200000, planned: 5000000 },
    { month: 'T1', actual: 4500000, planned: 5000000 },
    { month: 'T2', actual: 5100000, planned: 5000000 },
    { month: 'T3', actual: 4900000, planned: 5000000 },
    { month: 'T4', actual: 5000000, planned: 5000000 },
  ];

  // Giao dịch gần đây
  const recentTransactions = [
    { date: '05/04', description: 'Chuyển khoản tiết kiệm', amount: 5000000, type: 'income' },
    { date: '01/04', description: 'Trả nợ ngân hàng', amount: -2000000, type: 'expense' },
    { date: '28/03', description: 'Thưởng dự án', amount: 3000000, type: 'income' },
    { date: '15/03', description: 'Chi phí sửa xe', amount: -800000, type: 'expense' },
  ];

  // Cảnh báo
  const shortfall = monthlySavings - thisMonthSavings;
  const isOnTrack = thisMonthSavings >= monthlySavings;

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
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Theo Dõi Tiến Độ</h1>
              <p className="text-white/80 text-sm">{currentMonth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Main Card */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary to-[#00a896] p-5 text-white">
            <p className="text-white/80 text-xs mb-1">Mục tiêu: {goalLabel}</p>
            <h2 className="text-xl mb-4">Cập nhật tiến độ tháng này</h2>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-white/70 text-xs mb-1">Tích lũy tháng này</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg">+{(thisMonthSavings / 1000000).toFixed(1)}M</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-white/70 text-xs mb-1">Tổng tích lũy</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg">{(totalAccumulated / 1000000).toFixed(0)}M</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-white/70 text-xs mb-1">% hoàn thành</p>
                <div className="flex items-center gap-1">
                  <span className="text-lg">{progressPercentage}%</span>
                  <ArrowUp className="h-3 w-3 text-[#FFDF20]" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Bar Chart */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              6 tháng gần nhất
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Thực tế vs Kế hoạch
            </p>
          </div>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  tickFormatter={(value) => `${value / 1000000}M`}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px' }}
                  iconType="rect"
                />
                <Bar
                  dataKey="actual"
                  fill="#009689"
                  name="Thực tế"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="planned"
                  fill="#f59e0b"
                  name="Kế hoạch"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alert */}
        {!isOnTrack && shortfall > 0 && (
          <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-orange-50 border-l-4 border-orange-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-orange-900 mb-2">Cảnh báo thông minh</h4>
                  <p className="text-sm text-orange-800 mb-3">
                    Bạn đang thiếu <strong>{formatCurrency(shortfall)}</strong> so với kế hoạch tháng này.
                  </p>
                  <div className="bg-white rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-[#FFDF20]" />
                      <span className="text-xs text-orange-900">Gợi ý:</span>
                    </div>
                    <ul className="text-xs text-orange-800 space-y-1 ml-6 list-disc">
                      <li>Giảm chi tiêu ăn uống ngoài (-800k)</li>
                      <li>Tăng thu nhập phụ (freelance, bán hàng online)</li>
                      <li>Hoãn các chi tiêu không cần thiết</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isOnTrack && (
          <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-green-50 border-l-4 border-green-500">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-green-900 mb-1">Xuất sắc!</h4>
                  <p className="text-sm text-green-800">
                    Bạn đang đạt đúng kế hoạch tiết kiệm tháng này. Tiếp tục duy trì!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Transactions */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary">Giao dịch gần đây</h3>
          </div>
          <CardContent className="p-0">
            {recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income'
                        ? 'bg-green-100'
                        : 'bg-red-100'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <ArrowUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <span
                  className={`font-medium ${
                    transaction.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3 mt-6">
          <Button
            onClick={onUpdateIncomeExpense}
            className="w-full h-12 bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90 text-base"
          >
            <Edit className="mr-2 h-5 w-5" />
            Cập nhật thu chi tháng này
          </Button>
          <Button
            variant="outline"
            onClick={onViewForecast}
            className="w-full h-12 border-2 text-base"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Xem dự báo dài hạn
          </Button>
        </div>
      </div>
    </div>
  );
}
