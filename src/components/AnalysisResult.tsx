import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  CreditCard,
  Target,
  ArrowRight,
  Calendar,
  DollarSign,
  Shield,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUpIcon,
} from 'lucide-react';
import { formatCurrency } from '../utils/financial-calculations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalysisResultProps {
  monthlyIncome: number;
  monthlyExpense: number;
  currentSavings: number;
  currentDebt: number;
  debtInterestRate?: number;
  goalType: string;
  goalLabel: string;
  targetAmount: number;
  interestRate: number;
  timeYears: number;
  riskProfile?: string;
  riskScore?: number;
  onViewProgress: () => void;
  onBack: () => void;
}

const goalIcons: { [key: string]: any } = {
  asset: DollarSign,
  retire: Calendar,
  house: Target,
  wedding: TrendingUp,
  education: PiggyBank,
  other: Target,
};

export default function AnalysisResult({
  monthlyIncome,
  monthlyExpense,
  currentSavings,
  currentDebt,
  debtInterestRate,
  goalType,
  goalLabel,
  targetAmount,
  interestRate,
  timeYears,
  riskProfile,
  riskScore,
  onViewProgress,
  onBack,
}: AnalysisResultProps) {
  const INFLATION_RATE = 0.045; // 4.5% lạm phát hàng năm
  const SAFETY_BUFFER = 1.15; // Dự phóng thêm 15%

  // Tính toán phân bổ thu nhập theo quy tắc tài chính
  const monthlyDebtPayment = currentDebt > 0 
    ? Math.min(currentDebt * 0.05, monthlyIncome * 0.2) // Tối đa 20% thu nhập để trả nợ
    : 0;
  
  const emergencyFund = monthlyExpense * 3; // Quỹ dự phòng = 3 tháng chi tiêu
  const monthlyEmergencyContribution = emergencyFund > currentSavings
    ? Math.min((emergencyFund - currentSavings) / (timeYears * 12), monthlyIncome * 0.1)
    : 0;

  const monthlySavings = monthlyIncome - monthlyExpense;
  const actualMonthlySavingsForGoal = Math.max(0, monthlySavings - monthlyDebtPayment - monthlyEmergencyContribution);

  // Tính toán mục tiêu với lạm phát
  const realTargetAmount = targetAmount * Math.pow(1 + INFLATION_RATE, timeYears);
  const requiredAmount = realTargetAmount - currentSavings;

  // Công thức Future Value với lãi kép: FV = PV × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]
  const monthlyRate = interestRate / 12 / 100;
  const months = timeYears * 12;

  // FV từ tiền gốc hiện tại
  const futureValueOfPrincipal = currentSavings * Math.pow(1 + monthlyRate, months);

  // Tính PMT cần thiết (số tiền hàng tháng) để đạt mục tiêu
  let requiredMonthlySavings = 0;
  if (monthlyRate > 0 && months > 0) {
    // PMT = (FV - PV(1+r)^n) / [((1+r)^n - 1) / r]
    const futureValueFactor = Math.pow(1 + monthlyRate, months);
    const denominator = (futureValueFactor - 1) / monthlyRate;
    
    if (denominator > 0 && realTargetAmount > futureValueOfPrincipal) {
      requiredMonthlySavings = (realTargetAmount - futureValueOfPrincipal) / denominator;
    } else if (realTargetAmount > currentSavings) {
      requiredMonthlySavings = (realTargetAmount - currentSavings) / months;
    }
  } else {
    requiredMonthlySavings = Math.max(0, (realTargetAmount - currentSavings) / months);
  }

  // Áp dụng safety buffer (dự phóng thêm)
  const recommendedMonthlySavings = Math.max(0, requiredMonthlySavings * SAFETY_BUFFER);

  // Tính thời gian thực tế với tiết kiệm hiện tại
  let actualMonths = 0;
  let accumulated = currentSavings;
  const savingAmount = Math.max(actualMonthlySavingsForGoal, 0);

  if (savingAmount > 0 && realTargetAmount > currentSavings) {
    while (accumulated < realTargetAmount && actualMonths < 600) { // Max 50 năm
      accumulated = accumulated * (1 + monthlyRate) + savingAmount;
      actualMonths++;
    }
  } else if (realTargetAmount <= currentSavings) {
    actualMonths = 0; // Đã đạt mục tiêu
  } else {
    actualMonths = 600; // Không thể đạt được với tiết kiệm hiện tại
  }

  const actualYears = Math.floor(actualMonths / 12);
  const actualRemainingMonths = actualMonths % 12;

  // Tạo dữ liệu biểu đồ tích lũy dự kiến (động dựa trên input)
  const chartData = [];
  const maxYears = Math.min(Math.ceil(actualMonths / 12) + 2, 30);
  let chartAccumulated = currentSavings;
  
  for (let year = 0; year <= maxYears; year++) {
    chartData.push({
      year: year,
      amount: Math.round(chartAccumulated / 1000000), // Chuyển sang triệu
      target: Math.round(realTargetAmount / 1000000),
    });
    
    // Cập nhật cho năm tiếp theo
    for (let m = 0; m < 12; m++) {
      chartAccumulated = chartAccumulated * (1 + monthlyRate) + savingAmount;
    }
  }

  // Phân bổ thu nhập chi tiết
  const incomeAllocation = [
    {
      name: 'Chi tiêu',
      value: monthlyExpense,
      color: '#ef4444',
      percentage: ((monthlyExpense / monthlyIncome) * 100).toFixed(1),
    },
    {
      name: 'Tiết kiệm (Mục tiêu)',
      value: actualMonthlySavingsForGoal,
      color: '#10b981',
      percentage: ((actualMonthlySavingsForGoal / monthlyIncome) * 100).toFixed(1),
    },
    {
      name: 'Trả nợ',
      value: monthlyDebtPayment,
      color: '#f97316',
      percentage: ((monthlyDebtPayment / monthlyIncome) * 100).toFixed(1),
    },
    {
      name: 'Quỹ dự phòng',
      value: monthlyEmergencyContribution,
      color: '#3b82f6',
      percentage: ((monthlyEmergencyContribution / monthlyIncome) * 100).toFixed(1),
    },
  ].filter(item => item.value > 0);

  const GoalIcon = goalIcons[goalType] || Target;

  // Đánh giá khả năng đạt được mục tiêu
  const isFeasible = actualMonthlySavingsForGoal >= requiredMonthlySavings * 0.8;
  const needsAdjustment = actualMonthlySavingsForGoal < recommendedMonthlySavings;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-[#00a896] to-primary shadow-lg">
        <div className="px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Kết Quả Phân Tích</h1>
              <p className="text-white/80 text-sm">Tài chính của bạn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 -mt-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground">Thu nhập</p>
              </div>
              <p className="text-lg text-green-600">{formatCurrency(monthlyIncome)}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
                <p className="text-xs text-muted-foreground">Chi tiêu</p>
              </div>
              <p className="text-lg text-red-600">{formatCurrency(monthlyExpense)}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PiggyBank className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground">Tiết kiệm</p>
              </div>
              <p className="text-lg text-blue-600">{formatCurrency(currentSavings)}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-orange-600" />
                </div>
                <p className="text-xs text-muted-foreground">Nợ</p>
              </div>
              <p className="text-lg text-orange-600">{formatCurrency(currentDebt)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Goal Info */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary to-[#00a896] p-4 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <GoalIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-xs">Mục tiêu đã chọn</p>
                <p className="text-lg">{goalLabel}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <p className="text-white/80 text-xs mb-1">Mục tiêu hiện tại</p>
                <p className="text-base">{formatCurrency(targetAmount)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <p className="text-white/80 text-xs mb-1">Sau {timeYears} năm (+ lạm phát)</p>
                <p className="text-base">{formatCurrency(realTargetAmount)}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Risk Profile Card - if provided */}
        {riskProfile && riskScore !== undefined && (
          <Card className="mt-4 border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 border-b border-orange-200">
              <h3 className="text-orange-900 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Khẩu vị rủi ro của bạn
              </h3>
            </div>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Risk Profile Badge */}
                <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">Phân loại rủi ro</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      riskProfile === 'aggressive' ? 'bg-red-600' :
                      riskProfile === 'moderate' ? 'bg-yellow-600' : 
                      'bg-green-600'
                    }`}>
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-2xl">
                        {riskProfile === 'aggressive' ? 'Tích cực' :
                         riskProfile === 'moderate' ? 'Cân bằng' : 
                         'Bảo thủ'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Điểm rủi ro: {riskScore}/100
                      </p>
                    </div>
                  </div>
                </div>

                {/* Risk Info */}
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-orange-900 mb-2">
                        <strong>Đề xuất dựa trên khẩu vị rủi ro:</strong>
                      </p>
                      {riskProfile === 'aggressive' && (
                        <>
                          <p className="text-xs text-orange-700 mb-2">
                            Bạn có khẩu vị rủi ro <strong>tích cực</strong>, sẵn sàng chấp nhận biến động cao để đạt lợi nhuận tốt hơn.
                          </p>
                          <p className="text-xs text-orange-700">
                            <strong>Lãi suất đề xuất: {interestRate}%/năm</strong>
                          </p>
                          <ul className="text-xs text-orange-700 space-y-1 ml-4 list-disc mt-2">
                            <li>Cổ phiếu tăng trưởng (40-60%)</li>
                            <li>Quỹ đầu tư chứng khoán (20-30%)</li>
                            <li>Trái phiếu doanh nghiệp (10-20%)</li>
                            <li>Tiền mặt/Tiết kiệm (10-20%)</li>
                          </ul>
                        </>
                      )}
                      {riskProfile === 'moderate' && (
                        <>
                          <p className="text-xs text-orange-700 mb-2">
                            Bạn có khẩu vị rủi ro <strong>cân bằng</strong>, cân nhắc giữa an toàn và lợi nhuận.
                          </p>
                          <p className="text-xs text-orange-700">
                            <strong>Lãi suất đề xuất: {interestRate}%/năm</strong>
                          </p>
                          <ul className="text-xs text-orange-700 space-y-1 ml-4 list-disc mt-2">
                            <li>Quỹ cân bằng (30-40%)</li>
                            <li>Cổ phiếu ổn định (20-30%)</li>
                            <li>Trái phiếu chính phủ (20-30%)</li>
                            <li>Tiền mặt/Tiết kiệm (20-30%)</li>
                          </ul>
                        </>
                      )}
                      {riskProfile === 'conservative' && (
                        <>
                          <p className="text-xs text-orange-700 mb-2">
                            Bạn có khẩu vị rủi ro <strong>bảo thủ</strong>, ưu tiên bảo toàn vốn và an toàn.
                          </p>
                          <p className="text-xs text-orange-700">
                            <strong>Lãi suất đề xuất: {interestRate}%/năm</strong>
                          </p>
                          <ul className="text-xs text-orange-700 space-y-1 ml-4 list-disc mt-2">
                            <li>Tiết kiệm ngân hàng (40-50%)</li>
                            <li>Trái phiếu chính phủ (30-40%)</li>
                            <li>Quỹ bảo toàn vốn (10-20%)</li>
                            <li>Tiền mặt (10-20%)</li>
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-700">Bảo thủ</span>
                    <span className="text-yellow-700">Cân bằng</span>
                    <span className="text-red-700">Tích cực</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                      style={{ width: `${riskScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Required Monthly Savings */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary flex items-center gap-2">
              <PiggyBank className="h-5 w-5" />
              Số tiền cần tiết kiệm mỗi tháng
            </h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">Đề xuất (đã dự phóng +15%)</p>
                <p className="text-3xl text-primary">{formatCurrency(recommendedMonthlySavings)}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Để đạt {formatCurrency(realTargetAmount)} sau {timeYears} năm
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700 mb-1">Tối thiểu</p>
                  <p className="text-sm text-blue-600">{formatCurrency(requiredMonthlySavings)}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-700 mb-1">Khả năng hiện tại</p>
                  <p className="text-sm text-green-600">{formatCurrency(Math.max(actualMonthlySavingsForGoal, 0))}</p>
                </div>
              </div>

              {!isFeasible && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-900">Cần điều chỉnh!</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Khả năng tiết kiệm hiện tại thấp hơn yêu cầu. Hãy xem xét tăng thu nhập hoặc giảm chi tiêu.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Roadmap to Goal - Lộ trình đạt mục tiêu */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 border-b">
            <h3 className="text-purple-900 flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5" />
              Lộ Trình Đạt Mục Tiêu
            </h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Đánh giá tổng quan */}
              <div className={`text-center p-4 rounded-xl ${
                isFeasible ? 'bg-gradient-to-br from-green-100 to-green-50' :
                actualMonthlySavingsForGoal > requiredMonthlySavings * 0.5 ? 'bg-gradient-to-br from-yellow-100 to-yellow-50' :
                'bg-gradient-to-br from-red-100 to-red-50'
              }`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isFeasible ? (
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  ) : actualMonthlySavingsForGoal > requiredMonthlySavings * 0.5 ? (
                    <Clock className="h-8 w-8 text-yellow-600" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  )}
                  <p className={`text-2xl ${
                    isFeasible ? 'text-green-700' :
                    actualMonthlySavingsForGoal > requiredMonthlySavings * 0.5 ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>
                    {isFeasible ? 'Có Thể Đạt Được!' :
                     actualMonthlySavingsForGoal > requiredMonthlySavings * 0.5 ? 'Cần Điều Chỉnh' :
                     'Khó Khăn'}
                  </p>
                </div>
                <p className={`text-sm ${
                  isFeasible ? 'text-green-700' :
                  actualMonthlySavingsForGoal > requiredMonthlySavings * 0.5 ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {isFeasible ? 
                    'Kế hoạch tài chính của bạn khả thi và có thể đạt được mục tiêu!' :
                   actualMonthlySavingsForGoal > requiredMonthlySavings * 0.5 ?
                    'Bạn cần tăng tiết kiệm hoặc kéo dài thời gian để đạt mục tiêu.' :
                    'Khả năng tiết kiệm hiện tại quá thấp, cần điều chỉnh lớn về thu nhập hoặc chi tiêu.'}
                </p>
              </div>

              {/* Timeline Milestones */}
              <div className="space-y-3">
                <p className="text-sm text-center text-muted-foreground">Các mốc quan trọng trên lộ trình</p>
                
                {[
                  { percent: 25, label: '25%', icon: '🎯' },
                  { percent: 50, label: '50%', icon: '⭐' },
                  { percent: 75, label: '75%', icon: '🚀' },
                  { percent: 100, label: '100%', icon: '🏆' }
                ].map((milestone) => {
                  const milestoneAmount = (realTargetAmount * milestone.percent) / 100;
                  let milestoneMonths = 0;
                  let acc = currentSavings;
                  
                  if (savingAmount > 0 && milestoneAmount > currentSavings) {
                    while (acc < milestoneAmount && milestoneMonths < 600) {
                      acc = acc * (1 + monthlyRate) + savingAmount;
                      milestoneMonths++;
                    }
                  }
                  
                  const milestoneYears = Math.floor(milestoneMonths / 12);
                  const milestoneRemainMonths = milestoneMonths % 12;
                  const isReached = currentSavings >= milestoneAmount;
                  
                  return (
                    <div key={milestone.percent} className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                        isReached ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {milestone.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm">
                            <strong>{milestone.label}</strong> - {formatCurrency(milestoneAmount)}
                          </p>
                          {isReached && (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              isReached ? 'bg-green-500' : 'bg-primary'
                            }`}
                            style={{ 
                              width: isReached ? '100%' : `${Math.min((currentSavings / milestoneAmount) * 100, 100)}%` 
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {isReached ? '✅ Đã đạt!' : 
                           milestoneMonths === 0 ? 'Đã đạt!' :
                           milestoneMonths >= 600 ? 'Cần điều chỉnh kế hoạch' :
                           `Dự kiến: ${milestoneYears > 0 ? `${milestoneYears} năm ` : ''}${milestoneRemainMonths > 0 ? `${milestoneRemainMonths} tháng` : ''}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recommendation */}
              <div className={`p-3 border rounded-lg ${
                isFeasible ? 'bg-green-50 border-green-200' :
                actualMonthlySavingsForGoal > requiredMonthlySavings * 0.5 ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}>
                <p className={`text-xs mb-1 ${
                  isFeasible ? 'text-green-900' :
                  actualMonthlySavingsForGoal > requiredMonthlySavings * 0.5 ? 'text-yellow-900' :
                  'text-red-900'
                }`}>
                  <strong>💡 Đề xuất hành động:</strong>
                </p>
                <ul className={`text-xs space-y-1 ml-4 list-disc ${
                  isFeasible ? 'text-green-700' :
                  actualMonthlySavingsForGoal > requiredMonthlySavings * 0.5 ? 'text-yellow-700' :
                  'text-red-700'
                }`}>
                  {isFeasible ? (
                    <>
                      <li>Duy trì kế hoạch tiết kiệm đều đặn mỗi tháng</li>
                      <li>Xem xét tăng lãi suất bằng đầu tư thông minh</li>
                      <li>Theo dõi tiến độ hàng tháng và điều chỉnh khi cần</li>
                    </>
                  ) : actualMonthlySavingsForGoal > requiredMonthlySavings * 0.5 ? (
                    <>
                      <li>Tăng thu nhập thêm {formatCurrency(recommendedMonthlySavings - actualMonthlySavingsForGoal)}/tháng</li>
                      <li>Hoặc giảm chi tiêu không cần thiết</li>
                      <li>Cân nhắc kéo dài thời gian mục tiêu thêm {Math.ceil((actualMonths - months) / 12)} năm</li>
                    </>
                  ) : (
                    <>
                      <li>Ưu tiên trả hết nợ trước khi tiết kiệm lớn</li>
                      <li>Tìm nguồn thu nhập thêm hoặc tăng lương</li>
                      <li>Xem xét điều chỉnh mục tiêu cho phù hợp hơn</li>
                      <li>Tư vấn với chuyên gia tài chính</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Income Allocation - Phân bổ chi tiết */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary flex items-center gap-2">
              <Target className="h-5 w-5" />
              Phân bổ thu nhập chi tiết
            </h3>
          </div>
          <CardContent className="p-4">
            <div className="space-y-3">
              {incomeAllocation.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{formatCurrency(item.value)}</p>
                      <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {monthlyEmergencyContribution > 0 && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-blue-900">
                      <strong>Quỹ dự phòng khẩn cấp</strong>
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Mục tiêu: {formatCurrency(emergencyFund)} (3 tháng chi tiêu)
                    </p>
                    <p className="text-xs text-blue-700">
                      Còn thiếu: {formatCurrency(Math.max(emergencyFund - currentSavings, 0))}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Projected Savings Chart - Động theo input */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Biểu đồ tích lũy dự kiến
            </h3>
          </div>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="year" 
                  stroke="#6b7280"
                  label={{ value: 'Năm', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  label={{ value: 'Triệu VND', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(1)}M`, '']}
                  labelFormatter={(label) => `Năm ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#009689" 
                  strokeWidth={3}
                  name="Tích lũy"
                  dot={{ fill: '#009689', r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Mục tiêu"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-xs text-muted-foreground">Tích lũy thực tế</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-red-500" style={{ width: '20px' }} />
                <span className="text-xs text-muted-foreground">Mục tiêu</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="flex gap-3 mt-6 mb-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 h-12 border-2"
          >
            Phân tích lại
          </Button>
          <Button
            onClick={onViewProgress}
            className="flex-1 h-12 bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90"
          >
            Xem tiến độ chi tiết
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}