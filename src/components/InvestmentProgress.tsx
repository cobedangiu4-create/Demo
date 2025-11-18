import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  Target,
  TrendingUp,
  Calendar,
  PiggyBank,
  Edit,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';
import { formatCurrency } from '../utils/financial-calculations';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface InvestmentProgressProps {
  goalLabel: string;
  targetAmount: number;
  currentSavings: number;
  monthlySavings: number;
  interestRate?: number;
  onStartTracking: () => void;
  onEditGoal: () => void;
  onBack: () => void;
}

export default function InvestmentProgress({
  goalLabel,
  targetAmount,
  currentSavings,
  monthlySavings,
  interestRate = 6,
  onStartTracking,
  onEditGoal,
  onBack,
}: InvestmentProgressProps) {
  // Tính toán
  const progressPercentage = (currentSavings / targetAmount) * 100;
  const remainingAmount = targetAmount - currentSavings;
  const annualSavings = monthlySavings * 12;
  
  // Tính thời gian hoàn thành với lãi kép
  const monthlyRate = interestRate / 100 / 12;
  let months = 0;
  let accumulated = currentSavings;
  
  while (accumulated < targetAmount && months < 240) { // Max 20 năm
    accumulated = accumulated * (1 + monthlyRate) + monthlySavings;
    months++;
  }
  
  const completionDate = new Date();
  completionDate.setMonth(completionDate.getMonth() + months);
  const completionDateStr = `Tháng ${completionDate.getMonth() + 1}/${completionDate.getFullYear()}`;

  // Tạo dữ liệu biểu đồ (20 năm, mỗi năm 1 điểm)
  const chartData = [];
  let currentAmount = currentSavings;
  const currentYear = new Date().getFullYear();
  
  for (let year = 0; year <= 20; year++) {
    const yearLabel = currentYear + year;
    const targetValue = currentSavings + (monthlySavings * 12 * year);
    
    chartData.push({
      year: yearLabel,
      actual: year === 0 ? currentSavings : null,
      target: Math.min(targetValue, targetAmount),
    });
    
    // Tính số tiền tích lũy thực tế với lãi kép
    if (year > 0) {
      for (let m = 0; m < 12; m++) {
        currentAmount = currentAmount * (1 + monthlyRate) + monthlySavings;
        if (currentAmount >= targetAmount) {
          break;
        }
      }
    }
  }

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
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Tiến Độ Đầu Tư</h1>
              <p className="text-white/80 text-sm">Tổng quan mục tiêu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Goal Title */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary to-[#00a896] p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-xs mb-1">Tiến độ đạt mục tiêu</p>
                <h2 className="text-xl">{goalLabel}</h2>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </Card>

        {/* Progress Bar */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-sm text-muted-foreground">Hiện tại</span>
                <span className="text-sm text-muted-foreground">Mục tiêu</span>
              </div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-lg text-primary">{formatCurrency(currentSavings)}</span>
                <span className="text-lg text-gray-600">{formatCurrency(targetAmount)}</span>
              </div>
              <Progress value={progressPercentage} className="h-4 mb-2" />
              <div className="flex items-center justify-between">
                <span className="text-2xl text-primary">{progressPercentage.toFixed(1)}%</span>
                <span className="text-sm text-muted-foreground">hoàn thành</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-blue-600" />
                <p className="text-xs text-blue-700">Dự kiến hoàn thành</p>
              </div>
              <p className="text-lg text-blue-600">{completionDateStr}</p>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Biểu đồ tích lũy dự kiến
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Theo dõi tiến độ từ hiện tại đến mục tiêu
            </p>
          </div>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 11 }}
                  stroke="#6b7280"
                  interval={2}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="#6b7280"
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
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
                  iconType="line"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#009689"
                  strokeWidth={3}
                  dot={{ fill: '#009689', r: 4 }}
                  name="Mục tiêu"
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  name="Thực tế"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary">Thông tin bổ sung</h3>
          </div>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-700">Đã tiết kiệm</span>
              </div>
              <span className="text-green-600">{formatCurrency(currentSavings)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-gray-700">Cần tiết kiệm thêm/năm</span>
              </div>
              <span className="text-orange-600">{formatCurrency(annualSavings)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-700">Lãi suất dự kiến</span>
              </div>
              <span className="text-blue-600">{interestRate}%/năm</span>
            </div>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3 mt-6">
          <Button
            onClick={onStartTracking}
            className="w-full h-12 bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90 text-base"
          >
            Bắt đầu theo dõi
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            onClick={onEditGoal}
            className="w-full h-12 border-2 text-base"
          >
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa mục tiêu
          </Button>
        </div>
      </div>
    </div>
  );
}
