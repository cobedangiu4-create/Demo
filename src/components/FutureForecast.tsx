import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import {
  TrendingUp,
  Calendar,
  Target,
  ChevronLeft,
  CheckCircle,
  Users,
  Zap,
  Home,
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

interface FutureForecastProps {
  goalLabel: string;
  targetAmount: number;
  currentSavings: number;
  currentMonthlySavings: number;
  onApplyScenario: (newMonthlySavings: number, interestRate: number) => void;
  onConsultExpert: () => void;
  onBack: () => void;
  onBackHome?: () => void;
}

export default function FutureForecast({
  goalLabel,
  targetAmount,
  currentSavings,
  currentMonthlySavings,
  onApplyScenario,
  onConsultExpert,
  onBack,
  onBackHome,
}: FutureForecastProps) {
  const [monthlySavings, setMonthlySavings] = useState(currentMonthlySavings);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

  // Tính toán cho các kịch bản
  const calculateTimeToGoal = (monthly: number, interestRate: number = 6) => {
    const monthlyRate = interestRate / 100 / 12;
    let accumulated = currentSavings;
    let months = 0;
    
    while (accumulated < targetAmount && months < 360) { // Max 30 năm
      accumulated = accumulated * (1 + monthlyRate) + monthly;
      months++;
    }
    
    return months;
  };

  const scenarios = [
    {
      id: 1,
      title: 'Tiếp tục hiện tại',
      monthlySavings: currentMonthlySavings,
      interestRate: 6,
      months: calculateTimeToGoal(currentMonthlySavings, 6),
      color: '#f59e0b',
    },
    {
      id: 2,
      title: 'Tăng 1M/tháng',
      monthlySavings: currentMonthlySavings + 1000000,
      interestRate: 6,
      months: calculateTimeToGoal(currentMonthlySavings + 1000000, 6),
      color: '#3b82f6',
    },
    {
      id: 3,
      title: 'Tăng 2M + lãi 8%',
      monthlySavings: currentMonthlySavings + 2000000,
      interestRate: 8,
      months: calculateTimeToGoal(currentMonthlySavings + 2000000, 8),
      color: '#10b981',
    },
  ];

  // Tính thời gian với slider hiện tại
  const currentMonths = calculateTimeToGoal(monthlySavings, 6);
  const currentYears = Math.floor(currentMonths / 12);
  const currentRemainMonths = currentMonths % 12;

  // Tạo dữ liệu biểu đồ
  const generateChartData = () => {
    const data = [];
    const years = 20;
    
    for (let year = 0; year <= years; year++) {
      const dataPoint: any = {
        year: new Date().getFullYear() + year,
      };
      
      scenarios.forEach((scenario) => {
        const monthlyRate = scenario.interestRate / 100 / 12;
        let accumulated = currentSavings;
        
        for (let m = 0; m < year * 12; m++) {
          accumulated = accumulated * (1 + monthlyRate) + scenario.monthlySavings;
          if (accumulated >= targetAmount) break;
        }
        
        dataPoint[`scenario${scenario.id}`] = Math.min(accumulated, targetAmount);
      });
      
      data.push(dataPoint);
    }
    
    return data;
  };

  const chartData = generateChartData();

  const handleApply = () => {
    const scenario = scenarios.find(s => s.id === selectedScenario);
    if (scenario) {
      onApplyScenario(scenario.monthlySavings, scenario.interestRate);
    }
  };

  const handleShare = () => {
    // Mock share functionality
    alert('Chức năng chia sẻ sẽ được phát triển trong phiên bản tiếp theo!');
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
              <h1 className="text-white text-xl">Dự Báo Tương Lai</h1>
              <p className="text-white/80 text-sm">Kịch bản & tối ưu hóa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Goal Info */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Mục tiêu: {goalLabel}</span>
            </div>
            <p className="text-2xl text-primary">{formatCurrency(targetAmount)}</p>
          </div>
        </Card>

        {/* Scenarios */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary">3 kịch bản đề xuất</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Chọn kịch bản phù hợp với khả năng của bạn
            </p>
          </div>
          <CardContent className="p-4 space-y-3">
            {scenarios.map((scenario) => {
              const years = Math.floor(scenario.months / 12);
              const months = scenario.months % 12;
              const timeSaved = scenarios[0].months - scenario.months;
              const yearsSaved = Math.floor(timeSaved / 12);
              const monthsSaved = timeSaved % 12;
              
              return (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedScenario === scenario.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base">{scenario.title}</h4>
                        {selectedScenario === scenario.id && (
                          <CheckCircle className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Tiết kiệm: {formatCurrency(scenario.monthlySavings)}/tháng • Lãi: {scenario.interestRate}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-primary">
                      {years} năm {months} tháng
                    </span>
                  </div>
                  
                  {scenario.id > 1 && timeSaved > 0 && (
                    <div className="bg-green-50 rounded-lg p-2">
                      <p className="text-xs text-green-700">
                        ✨ Tiết kiệm được {yearsSaved > 0 ? `${yearsSaved} năm ` : ''}{monthsSaved} tháng
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Interactive Chart */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Biểu đồ so sánh kịch bản
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Tích lũy theo thời gian
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
                  wrapperStyle={{ fontSize: '11px' }}
                  iconType="line"
                />
                {scenarios.map((scenario) => (
                  <Line
                    key={scenario.id}
                    type="monotone"
                    dataKey={`scenario${scenario.id}`}
                    stroke={scenario.color}
                    strokeWidth={2}
                    dot={false}
                    name={scenario.title}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3 mt-6">
          <Button
            onClick={handleApply}
            disabled={!selectedScenario}
            className="w-full h-12 bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90 text-base disabled:opacity-50"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Áp dụng kịch bản mới
          </Button>
          <Button
            variant="outline"
            onClick={onConsultExpert}
            className="w-full h-12 border-2 text-base"
          >
            <Users className="mr-2 h-4 w-4" />
            Tư vấn cùng chuyên gia
          </Button>
          {onBackHome && (
            <Button
              variant="outline"
              onClick={onBackHome}
              className="w-full h-12 border-2 border-primary text-primary hover:bg-primary/5 text-base"
            >
              <Home className="mr-2 h-5 w-5" />
              Về Trang Chủ
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}