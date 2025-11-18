import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  CreditCard, 
  Target,
  Sparkles,
  ChevronLeft,
  BarChart3,
  Percent,
  AlertCircle,
  Home,
  Heart,
  GraduationCap,
  Palmtree,
  Briefcase,
  MoreHorizontal,
  Shield,
  TrendingUpDown,
  Activity,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrency } from '../utils/financial-calculations';

interface FinancialAnalysisProps {
  onAIConsult?: () => void;
  onBack?: () => void;
  onAnalysisComplete?: (data: {
    monthlyIncome: number;
    monthlyExpense: number;
    currentSavings: number;
    currentDebt: number;
    debtInterestRate: number;
    goalType: string;
    goalLabel: string;
    targetAmount: number;
    interestRate: number;
    timeYears: number;
    riskProfile: string;
    riskScore: number;
  }) => void;
}

export default function FinancialAnalysis({ onAIConsult, onBack, onAnalysisComplete }: FinancialAnalysisProps) {
  // Bước 1: Thông tin tài chính
  const [step, setStep] = useState<1 | 2>(1);
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpense, setMonthlyExpense] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [currentDebt, setCurrentDebt] = useState('');
  const [debtInterestRate, setDebtInterestRate] = useState(''); // Lãi suất nợ hàng tháng
  const [financialGoal, setFinancialGoal] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [timeYears, setTimeYears] = useState('');

  // Bước 2: Đánh giá rủi ro
  const [age, setAge] = useState('');
  const [investmentExperience, setInvestmentExperience] = useState('');
  const [reactionToLoss, setReactionToLoss] = useState('');
  const [investmentGoal, setInvestmentGoal] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('');

  const goalLabels: { [key: string]: string } = {
    asset: 'Gia tăng tài sản',
    retire: 'Nghỉ hưu',
    house: 'Mua nhà',
    wedding: 'Kết hôn',
    education: 'Giáo dục',
    other: 'Khác',
  };

  const canProceedStep1 = () => {
    return (
      parseFloat(monthlyIncome) > 0 &&
      parseFloat(monthlyExpense) > 0 &&
      financialGoal &&
      parseFloat(targetAmount) > 0 &&
      parseFloat(timeYears) > 0
    );
  };

  const canProceedStep2 = () => {
    return age && investmentExperience && reactionToLoss && investmentGoal && timeHorizon;
  };

  const calculateRiskProfile = () => {
    let score = 0;

    // Điểm theo độ tuổi
    const ageNum = parseInt(age);
    if (ageNum < 30) score += 25;
    else if (ageNum < 40) score += 20;
    else if (ageNum < 50) score += 15;
    else if (ageNum < 60) score += 10;
    else score += 5;

    // Điểm theo kinh nghiệm
    if (investmentExperience === 'expert') score += 25;
    else if (investmentExperience === 'intermediate') score += 15;
    else if (investmentExperience === 'beginner') score += 10;
    else score += 5;

    // Điểm theo phản ứng với thua lỗ
    if (reactionToLoss === 'comfortable') score += 25;
    else if (reactionToLoss === 'accept') score += 15;
    else if (reactionToLoss === 'worry') score += 10;
    else score += 5;

    // Điểm theo mục tiêu đầu tư
    if (investmentGoal === 'growth') score += 15;
    else if (investmentGoal === 'balanced') score += 10;
    else score += 5;

    // Điểm theo thời gian đầu tư
    if (timeHorizon === 'long') score += 10;
    else if (timeHorizon === 'medium') score += 7;
    else score += 3;

    // Tổng điểm tối đa: 100
    return score;
  };

  const getRiskProfileFromScore = (score: number) => {
    if (score >= 75) return 'aggressive';
    if (score >= 50) return 'moderate';
    return 'conservative';
  };

  const getInterestRateFromRisk = (riskProfile: string) => {
    if (riskProfile === 'aggressive') return 8; // 8% - Cổ phiếu, quỹ tăng trưởng
    if (riskProfile === 'moderate') return 6; // 6% - Cân bằng
    return 4; // 4% - Tiết kiệm, trái phiếu
  };

  const handleNextStep = () => {
    if (canProceedStep1()) {
      setStep(2);
    }
  };

  const handleComplete = () => {
    const riskScore = calculateRiskProfile();
    const riskProfile = getRiskProfileFromScore(riskScore);
    const recommendedRate = getInterestRateFromRisk(riskProfile);

    onAnalysisComplete?.({
      monthlyIncome: parseFloat(monthlyIncome),
      monthlyExpense: parseFloat(monthlyExpense),
      currentSavings: parseFloat(currentSavings) || 0,
      currentDebt: parseFloat(currentDebt) || 0,
      debtInterestRate: parseFloat(debtInterestRate) || 0,
      goalType: financialGoal,
      goalLabel: goalLabels[financialGoal] || 'Mục tiêu tài chính',
      targetAmount: parseFloat(targetAmount),
      interestRate: recommendedRate,
      timeYears: parseFloat(timeYears),
      riskProfile: riskProfile,
      riskScore: riskScore,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-primary via-[#00a896] to-primary shadow-lg">
        <div className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={step === 1 ? onBack : () => setStep(1)}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1" />
            {onAIConsult && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAIConsult}
                className="text-white hover:bg-white/20 flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">Tư Vấn AI</span>
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              {step === 1 ? (
                <BarChart3 className="h-6 w-6 text-white" />
              ) : (
                <Shield className="h-6 w-6 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-white text-xl">
                {step === 1 ? 'Phân Tích Tài Chính' : 'Đánh Giá Rủi Ro'}
              </h1>
              <p className="text-white/80 text-sm">
                {step === 1 ? 'Bước 1 / 2: Thông tin tài chính' : 'Bước 2 / 2: Khẩu vị rủi ro'}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex gap-2">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {step === 1 ? (
          // BƯỚC 1: THÔNG TIN TÀI CHÍNH
          <Card className="mt-4 border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
              <h2 className="text-primary flex items-center gap-2">
                <Target className="h-5 w-5" />
                Thông tin tài chính
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Nhập đầy đủ thông tin để nhận phân tích chính xác
              </p>
            </div>
            
            <CardContent className="p-4 space-y-4">
              {/* Thu nhập */}
              <div className="space-y-2">
                <Label htmlFor="income" className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Thu nhập hàng tháng *
                </Label>
                <Input
                  id="income"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="15,000,000"
                  className="h-12 text-base border-2 focus:border-primary"
                />
              </div>

              {/* Chi tiêu */}
              <div className="space-y-2">
                <Label htmlFor="expense" className="text-sm flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-orange-600" />
                  Chi tiêu hàng tháng *
                </Label>
                <Input
                  id="expense"
                  type="number"
                  value={monthlyExpense}
                  onChange={(e) => setMonthlyExpense(e.target.value)}
                  placeholder="10,000,000"
                  className="h-12 text-base border-2 focus:border-primary"
                />
              </div>

              {/* Tiết kiệm */}
              <div className="space-y-2">
                <Label htmlFor="savings" className="text-sm flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-green-600" />
                  Tiết kiệm hiện tại
                </Label>
                <Input
                  id="savings"
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  placeholder="50,000,000"
                  className="h-12 text-base border-2 focus:border-primary"
                />
              </div>

              {/* Nợ */}
              <div className="space-y-2">
                <Label htmlFor="debt" className="text-sm flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-red-600" />
                  Nợ hiện tại
                </Label>
                <Input
                  id="debt"
                  type="number"
                  value={currentDebt}
                  onChange={(e) => setCurrentDebt(e.target.value)}
                  placeholder="20,000,000"
                  className="h-12 text-base border-2 focus:border-primary"
                />
              </div>

              {/* Lãi suất nợ */}
              <div className="space-y-2">
                <Label htmlFor="debtInterestRate" className="text-sm flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-red-600" />
                  Lãi suất nợ hàng tháng
                </Label>
                <Input
                  id="debtInterestRate"
                  type="number"
                  value={debtInterestRate}
                  onChange={(e) => setDebtInterestRate(e.target.value)}
                  placeholder="1.5%"
                  className="h-12 text-base border-2 focus:border-primary"
                />
              </div>

              {/* Mục tiêu */}
              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Mục tiêu tài chính *
                </Label>
                <RadioGroup value={financialGoal} onValueChange={setFinancialGoal}>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      htmlFor="goal-asset"
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        financialGoal === 'asset' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="asset" id="goal-asset" />
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span className="text-sm">Gia tăng tài sản</span>
                      </div>
                    </label>

                    <label
                      htmlFor="goal-retire"
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        financialGoal === 'retire' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="retire" id="goal-retire" />
                      <div className="flex items-center gap-2">
                        <Palmtree className="h-4 w-4 text-primary" />
                        <span className="text-sm">Nghỉ hưu</span>
                      </div>
                    </label>

                    <label
                      htmlFor="goal-house"
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        financialGoal === 'house' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="house" id="goal-house" />
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-primary" />
                        <span className="text-sm">Mua nhà</span>
                      </div>
                    </label>

                    <label
                      htmlFor="goal-wedding"
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        financialGoal === 'wedding' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="wedding" id="goal-wedding" />
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-primary" />
                        <span className="text-sm">Kết hôn</span>
                      </div>
                    </label>

                    <label
                      htmlFor="goal-education"
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        financialGoal === 'education' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="education" id="goal-education" />
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <span className="text-sm">Giáo dục</span>
                      </div>
                    </label>

                    <label
                      htmlFor="goal-other"
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        financialGoal === 'other' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="other" id="goal-other" />
                      <div className="flex items-center gap-2">
                        <MoreHorizontal className="h-4 w-4 text-primary" />
                        <span className="text-sm">Khác</span>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {/* Số tiền mục tiêu */}
              <div className="space-y-2">
                <Label htmlFor="targetAmount" className="text-sm flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  Số tiền mục tiêu *
                </Label>
                <Input
                  id="targetAmount"
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="500,000,000"
                  className="h-12 text-base border-2 focus:border-primary"
                />
              </div>

              {/* Thời gian */}
              <div className="space-y-2">
                <Label htmlFor="timeYears" className="text-sm flex items-center gap-2">
                  <Percent className="h-4 w-4 text-blue-600" />
                  Thời gian (năm) *
                </Label>
                <Input
                  id="timeYears"
                  type="number"
                  value={timeYears}
                  onChange={(e) => setTimeYears(e.target.value)}
                  placeholder="10"
                  className="h-12 text-base border-2 focus:border-primary"
                />
              </div>

              {/* Button */}
              <Button
                onClick={handleNextStep}
                disabled={!canProceedStep1()}
                className="w-full h-12 text-base bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90 shadow-lg disabled:opacity-50"
              >
                Tiếp theo: Đánh giá rủi ro
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          // BƯỚC 2: ĐÁNH GIÁ RỦI RO
          <>
            <Card className="mt-4 border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 border-b border-orange-200">
                <h2 className="text-orange-900 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Đánh giá khẩu vị rủi ro
                </h2>
                <p className="text-xs text-orange-700 mt-1">
                  Giúp chúng tôi hiểu mức độ rủi ro bạn có thể chấp nhận
                </p>
              </div>
              
              <CardContent className="p-4 space-y-5">
                {/* Độ tuổi */}
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    Độ tuổi của bạn *
                  </Label>
                  <RadioGroup value={age} onValueChange={setAge}>
                    <div className="space-y-2">
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        age === 'under30' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="under30" id="age-under30" />
                        <span className="text-sm">Dưới 30 tuổi</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        age === '30-40' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="30-40" id="age-30-40" />
                        <span className="text-sm">30-40 tuổi</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        age === '40-50' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="40-50" id="age-40-50" />
                        <span className="text-sm">40-50 tuổi</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        age === '50-60' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="50-60" id="age-50-60" />
                        <span className="text-sm">50-60 tuổi</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        age === 'over60' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="over60" id="age-over60" />
                        <span className="text-sm">Trên 60 tuổi</span>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Kinh nghiệm đầu tư */}
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <TrendingUpDown className="h-4 w-4 text-primary" />
                    Kinh nghiệm đầu tư *
                  </Label>
                  <RadioGroup value={investmentExperience} onValueChange={setInvestmentExperience}>
                    <div className="space-y-2">
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        investmentExperience === 'none' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="none" id="exp-none" />
                        <div>
                          <span className="text-sm block">Chưa có kinh nghiệm</span>
                          <span className="text-xs text-muted-foreground">Mới bắt đầu tìm hiểu</span>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        investmentExperience === 'beginner' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="beginner" id="exp-beginner" />
                        <div>
                          <span className="text-sm block">Mới bắt đầu</span>
                          <span className="text-xs text-muted-foreground">Dưới 2 năm</span>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        investmentExperience === 'intermediate' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="intermediate" id="exp-intermediate" />
                        <div>
                          <span className="text-sm block">Trung bình</span>
                          <span className="text-xs text-muted-foreground">2-5 năm</span>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        investmentExperience === 'expert' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="expert" id="exp-expert" />
                        <div>
                          <span className="text-sm block">Có kinh nghiệm</span>
                          <span className="text-xs text-muted-foreground">Trên 5 năm</span>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Phản ứng với thua lỗ */}
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    Nếu khoản đầu tư giảm 20% giá trị, bạn sẽ? *
                  </Label>
                  <RadioGroup value={reactionToLoss} onValueChange={setReactionToLoss}>
                    <div className="space-y-2">
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        reactionToLoss === 'panic' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="panic" id="reaction-panic" />
                        <span className="text-sm">Bán ngay để tránh thua lỗ thêm</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        reactionToLoss === 'worry' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="worry" id="reaction-worry" />
                        <span className="text-sm">Lo lắng và theo dõi thường xuyên</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        reactionToLoss === 'accept' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="accept" id="reaction-accept" />
                        <span className="text-sm">Chấp nhận và chờ phục hồi</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        reactionToLoss === 'comfortable' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="comfortable" id="reaction-comfortable" />
                        <span className="text-sm">Mua thêm khi giá giảm</span>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Mục tiêu đầu tư */}
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Mục tiêu đầu tư của bạn *
                  </Label>
                  <RadioGroup value={investmentGoal} onValueChange={setInvestmentGoal}>
                    <div className="space-y-2">
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        investmentGoal === 'preservation' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="preservation" id="goal-preservation" />
                        <div>
                          <span className="text-sm block">Bảo toàn vốn</span>
                          <span className="text-xs text-muted-foreground">Ưu tiên an toàn, chấp nhận lợi nhuận thấp</span>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        investmentGoal === 'balanced' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="balanced" id="goal-balanced" />
                        <div>
                          <span className="text-sm block">Cân bằng</span>
                          <span className="text-xs text-muted-foreground">Cân nhắc giữa rủi ro và lợi nhuận</span>
                        </div>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        investmentGoal === 'growth' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="growth" id="goal-growth" />
                        <div>
                          <span className="text-sm block">Tăng trưởng</span>
                          <span className="text-xs text-muted-foreground">Chấp nhận rủi ro để đạt lợi nhuận cao</span>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Thời gian đầu tư */}
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Percent className="h-4 w-4 text-primary" />
                    Thời gian dự kiến giữ khoản đầu tư *
                  </Label>
                  <RadioGroup value={timeHorizon} onValueChange={setTimeHorizon}>
                    <div className="space-y-2">
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        timeHorizon === 'short' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="short" id="time-short" />
                        <span className="text-sm">Ngắn hạn (Dưới 3 năm)</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        timeHorizon === 'medium' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="medium" id="time-medium" />
                        <span className="text-sm">Trung hạn (3-7 năm)</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        timeHorizon === 'long' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'
                      }`}>
                        <RadioGroupItem value="long" id="time-long" />
                        <span className="text-sm">Dài hạn (Trên 7 năm)</span>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Button */}
                <Button
                  onClick={handleComplete}
                  disabled={!canProceedStep2()}
                  className="w-full h-12 text-base bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90 shadow-lg disabled:opacity-50"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Hoàn tất & Xem kết quả
                </Button>
              </CardContent>
            </Card>

            {/* Thông tin tham khảo */}
            <Card className="mt-4 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-900 mb-2">
                      <strong>💡 Tại sao cần đánh giá rủi ro?</strong>
                    </p>
                    <ul className="text-xs text-blue-700 space-y-1 list-disc ml-4">
                      <li>Xác định mức lãi suất đầu tư phù hợp với bạn</li>
                      <li>Đề xuất danh mục đầu tư an toàn và hiệu quả</li>
                      <li>Giúp bạn đạt mục tiêu mà không vượt quá khả năng chịu rủi ro</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}