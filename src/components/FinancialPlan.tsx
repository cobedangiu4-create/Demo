import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp, AlertCircle, Edit } from 'lucide-react';
import { Goal } from '../types';
import { apply503020Rule, calculateEmergencyFund, formatCurrency, calculateMonthlyPayment } from '../utils/financial-calculations';

interface FinancialPlanProps {
  goal: Goal;
  onNext: (monthlyIncome: number) => void;
  onAdjust: (updatedGoal: Goal) => void;
}

export default function FinancialPlan({ goal, onNext, onAdjust }: FinancialPlanProps) {
  const [monthlyIncome, setMonthlyIncome] = useState('20000000');
  const [showAdjust, setShowAdjust] = useState(false);
  const [adjustedRate, setAdjustedRate] = useState(goal.interestRate.toString());
  const [adjustedTime, setAdjustedTime] = useState(goal.timeYears.toString());

  const budgetAllocation = apply503020Rule(parseFloat(monthlyIncome));
  const emergencyFund = calculateEmergencyFund(budgetAllocation.needs);

  const pieData = [
    { name: 'Nhu cầu thiết yếu (50%)', value: budgetAllocation.needs, color: '#2563eb' },
    { name: 'Mong muốn (30%)', value: budgetAllocation.wants, color: '#10b981' },
    { name: 'Tiết kiệm/Đầu tư (20%)', value: budgetAllocation.savings, color: '#f59e0b' },
  ];

  const handleAdjust = () => {
    const newMonthlySavings = calculateMonthlyPayment(
      goal.targetCost,
      parseFloat(adjustedRate),
      parseFloat(adjustedTime),
      goal.currentSavings
    );

    const updatedGoal = {
      ...goal,
      interestRate: parseFloat(adjustedRate),
      timeYears: parseFloat(adjustedTime),
      monthlySavings: newMonthlySavings,
    };

    onAdjust(updatedGoal);
    setShowAdjust(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <h2>Kế hoạch tài chính</h2>
        <p className="text-sm text-muted-foreground">
          Phân bổ ngân sách và tiết kiệm
        </p>
      </div>

      {/* Kết quả tính toán */}
      <Card className="border-primary">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            {goal.category}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-primary/5 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Tiết kiệm hàng tháng:</p>
            <p className="text-lg">{formatCurrency(goal.monthlySavings || 0)}</p>
          </div>
          <p className="text-xs">
            Trong {goal.timeYears} năm (lãi {goal.interestRate}%) để đạt{' '}
            {formatCurrency(goal.targetCost)}
          </p>
          
          <Button variant="outline" onClick={() => setShowAdjust(!showAdjust)} size="sm" className="w-full">
            <Edit className="mr-2 h-4 w-4" />
            Điều chỉnh
          </Button>

          {showAdjust && (
            <div className="space-y-3 p-3 border rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Lãi suất (%/năm)</Label>
                  <Input
                    type="number"
                    value={adjustedRate}
                    onChange={(e) => setAdjustedRate(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Thời gian (năm)</Label>
                  <Input
                    type="number"
                    value={adjustedTime}
                    onChange={(e) => setAdjustedTime(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleAdjust} size="sm" className="w-full">Áp dụng</Button>
              
              <Alert className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  VD: Lãi 10% → Tiết kiệm{' '}
                  {formatCurrency(
                    calculateMonthlyPayment(
                      goal.targetCost,
                      10,
                      parseFloat(adjustedTime),
                      goal.currentSavings
                    )
                  )}/tháng
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Thu nhập hàng tháng */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Thu nhập hàng tháng</CardTitle>
          <CardDescription className="text-xs">
            Xem phân bổ theo quy tắc 50/30/20
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="income" className="text-xs">Thu nhập (VND)</Label>
            <Input
              id="income"
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              placeholder="VD: 20000000"
            />
          </div>
        </CardContent>
      </Card>

      {/* Biểu đồ phân bổ ngân sách */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Quy tắc 50/30/20</CardTitle>
          <CardDescription className="text-xs">
            Cân bằng nhu cầu, mong muốn và tương lai
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ value }) => `${(value / 1000000).toFixed(1)}M`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="p-2 border rounded-lg">
              <p className="text-[10px] text-muted-foreground mb-0.5">Thiết yếu</p>
              <p className="text-xs">{(budgetAllocation.needs / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-2 border rounded-lg">
              <p className="text-[10px] text-muted-foreground mb-0.5">Mong muốn</p>
              <p className="text-xs">{(budgetAllocation.wants / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-2 border rounded-lg">
              <p className="text-[10px] text-muted-foreground mb-0.5">Tiết kiệm</p>
              <p className="text-xs">{(budgetAllocation.savings / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quỹ khẩn cấp */}
      <Alert className="py-2">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          <strong>Quỹ khẩn cấp:</strong> Nên có {(emergencyFund.min / 1000000).toFixed(0)}-{(emergencyFund.max / 1000000).toFixed(0)}M 
          (3-6 tháng chi phí) trước khi đầu tư.
        </AlertDescription>
      </Alert>

      <Button onClick={() => onNext(parseFloat(monthlyIncome))} className="w-full">
        Tiếp tục theo dõi tiến độ
      </Button>
    </div>
  );
}
