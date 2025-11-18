import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import {
  Target,
  TrendingUp,
  Calendar,
  PiggyBank,
  ChevronLeft,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  Briefcase,
  Palmtree,
  Home,
  Heart,
  GraduationCap,
  MoreHorizontal,
  Zap,
  Award,
  ArrowUp,
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
  Area,
  AreaChart,
} from 'recharts';
import { Goal } from '../types';

interface GoalProgressProps {
  goal: Goal;
  onBack?: () => void;
  onNext?: () => void;
  onUpdateProgress?: (amount: number) => void;
}

const goalIcons: { [key: string]: any } = {
  asset: Briefcase,
  retire: Palmtree,
  house: Home,
  wedding: Heart,
  education: GraduationCap,
  other: MoreHorizontal,
};

const goalLabels: { [key: string]: string } = {
  asset: 'Gia tăng tài sản',
  retire: 'Nghỉ hưu',
  house: 'Mua nhà',
  wedding: 'Kết hôn',
  education: 'Giáo dục',
  other: 'Khác',
};

export default function GoalProgress({ goal, onBack, onNext, onUpdateProgress }: GoalProgressProps) {
  const [addAmount, setAddAmount] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Use fallbacks for different field names
  const targetAmount = goal.targetAmount || goal.targetCost;
  const currentAmount = goal.currentAmount || goal.currentSavings;
  const monthlyContribution = goal.monthlyContribution || goal.monthlySavings || 0;
  const goalType = goal.type || goal.category || 'other';
  const deadline = goal.deadline || new Date(Date.now() + goal.timeYears * 365 * 24 * 60 * 60 * 1000).toISOString();

  // Tính toán các chỉ số
  const progressPercentage = (currentAmount / targetAmount) * 100;
  const remainingAmount = targetAmount - currentAmount;
  const monthsToDeadline = Math.ceil(
    (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)
  );
  const requiredMonthlyAmount = remainingAmount / monthsToDeadline;
  const onTrack = monthlyContribution >= requiredMonthlyAmount;

  // Dữ liệu cho biểu đồ (mock data)
  const chartData = [
    { month: 'T1', amount: 50000000, target: 83333333 },
    { month: 'T2', amount: 80000000, target: 166666666 },
    { month: 'T3', amount: 120000000, target: 250000000 },
    { month: 'T4', amount: 165000000, target: 333333333 },
    { month: 'T5', amount: 210000000, target: 416666666 },
    { month: 'T6', amount: 250000000, target: 500000000 },
  ];

  // Tính điểm thưởng (100 điểm/1 triệu)
  const rewardPoints = Math.floor(currentAmount / 1000000) * 100;

  const handleAddAmount = () => {
    const amount = parseFloat(addAmount);
    if (amount > 0) {
      if (onUpdateProgress) {
        onUpdateProgress(amount);
      }
      setAddAmount('');
      setShowAddForm(false);
    }
  };

  const GoalIcon = goalIcons[goalType] || Target;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-primary via-[#00a896] to-primary shadow-lg">
        <div className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-white/20 -ml-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={onNext}
              className="text-white hover:bg-white/20 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Tiếp Theo</span>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Tiến Độ Mục Tiêu</h1>
              <p className="text-white/80 text-sm">Theo dõi và cập nhật tiến trình</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Goal Info Card */}
        <Card className="mt-4 border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary to-[#00a896] p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <GoalIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-xs">Mục tiêu của bạn</p>
                  <p className="text-lg">{goalLabels[goalType]}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-white/80 text-sm mb-1">Tiến độ hiện tại</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl">{progressPercentage.toFixed(1)}%</span>
                  <span className="text-sm text-white/80">hoàn thành</span>
                </div>
                <Progress value={progressPercentage} className="h-3 bg-white/20" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/70 text-xs mb-1">Đã tiết kiệm</p>
                  <p className="text-lg">{formatCurrency(currentAmount)}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Mục tiêu</p>
                  <p className="text-lg">{formatCurrency(targetAmount)}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Còn lại</p>
              <p className="text-orange-600">{monthsToDeadline} tháng</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <PiggyBank className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Thiếu</p>
              <p className="text-green-600 text-xs">{formatCurrency(remainingAmount)}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-3 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Cần/tháng</p>
              <p className="text-blue-600 text-xs">{formatCurrency(requiredMonthlyAmount)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Card */}
        <Card className={`mt-4 border-0 shadow-lg overflow-hidden ${onTrack ? 'bg-green-50' : 'bg-orange-50'}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                onTrack ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                {onTrack ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Clock className="h-5 w-5 text-orange-600" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`mb-1 ${onTrack ? 'text-green-900' : 'text-orange-900'}`}>
                  {onTrack ? 'Bạn đang đi đúng hướng!' : 'Cần tăng tốc độ tiết kiệm'}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {onTrack
                    ? `Với tốc độ tiết kiệm ${formatCurrency(monthlyContribution)}/tháng, bạn sẽ đạt mục tiêu đúng hạn. Hãy tiếp tục duy trì!`
                    : `Bạn cần tiết kiệm thêm ${formatCurrency(requiredMonthlyAmount - monthlyContribution)}/tháng để đạt mục tiêu đúng hạn.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Card */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Biểu đồ tiến độ
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              So sánh thực tế với kế hoạch
            </p>
          </div>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#009689" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#009689" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#6b7280"
                  tickFormatter={(value) => `${value / 1000000}Tr`}
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
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#009689"
                  strokeWidth={3}
                  fill="url(#colorAmount)"
                  name="Thực tế"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Kế hoạch"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Reward Points Card */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFDF20] to-yellow-500 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-yellow-900" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Điểm thưởng của bạn</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl text-yellow-900">{rewardPoints.toLocaleString()}</span>
                    <span className="text-sm text-gray-600">điểm</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-yellow-700 mb-1">
                  <Zap className="h-4 w-4" />
                  <span className="text-xs">100đ/1Tr</span>
                </div>
                <p className="text-xs text-gray-600">tiết kiệm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Money Button */}
        {!showAddForm ? (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full h-12 mt-4 bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90 shadow-lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Cập nhật tiến độ
          </Button>
        ) : (
          <Card className="mt-4 border-0 shadow-lg">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
              <h3 className="text-primary flex items-center gap-2">
                <ArrowUp className="h-5 w-5" />
                Thêm số tiền tiết kiệm
              </h3>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="addAmount" className="text-sm">
                  Số tiền (VNĐ)
                </Label>
                <Input
                  id="addAmount"
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="5,000,000"
                  className="h-12 text-base border-2 focus:border-primary"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setAddAmount('');
                  }}
                  className="flex-1 h-11"
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleAddAmount}
                  className="flex-1 h-11 bg-primary hover:bg-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            className="flex-1 h-11 border-2"
            onClick={onBack}
          >
            Quay lại
          </Button>
          <Button
            className="flex-1 h-11 bg-primary hover:bg-primary/90"
            onClick={onNext}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Tiếp Theo
          </Button>
        </div>
      </div>
    </div>
  );
}