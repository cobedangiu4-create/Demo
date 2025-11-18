import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Trophy, TrendingUp, Save, Sparkles } from 'lucide-react';
import { Goal } from '../types';
import { formatCurrency, calculatePoints, checkBadges } from '../utils/financial-calculations';

interface ProgressTrackingProps {
  goal: Goal;
  onNext: () => void;
  onUpdateProgress: (currentAmount: number) => void;
}

export default function ProgressTracking({ goal, onNext, onUpdateProgress }: ProgressTrackingProps) {
  const [updateAmount, setUpdateAmount] = useState('');
  const [savingsHistory, setSavingsHistory] = useState([
    { month: 'Tháng 1', saved: 0, target: goal.monthlySavings || 0 },
    { month: 'Tháng 2', saved: 0, target: goal.monthlySavings || 0 },
    { month: 'Tháng 3', saved: 0, target: goal.monthlySavings || 0 },
    { month: 'Tháng 4', saved: 0, target: goal.monthlySavings || 0 },
    { month: 'Tháng 5', saved: 0, target: goal.monthlySavings || 0 },
    { month: 'Tháng 6', saved: 0, target: goal.monthlySavings || 0 },
  ]);

  // Tính toán hợp lý hơn: Dùng currentSavings thực tế thay vì dựa vào progress %
  const currentSaved = goal.currentSavings || 0;
  const progressPercent = Math.min(100, (currentSaved / goal.targetCost) * 100);
  const points = calculatePoints(currentSaved);
  const badges = checkBadges(progressPercent);

  const handleUpdate = () => {
    const amount = parseFloat(updateAmount);
    if (amount > 0) {
      onUpdateProgress(amount);
      setUpdateAmount('');
      
      // Cập nhật lịch sử (giả lập)
      const newHistory = [...savingsHistory];
      const lastIndex = newHistory.findIndex(h => h.saved === 0);
      if (lastIndex !== -1) {
        newHistory[lastIndex] = { ...newHistory[lastIndex], saved: amount };
        setSavingsHistory(newHistory);
      }
    }
  };

  const getMotivationalMessage = () => {
    if (progressPercent >= 75) return "Xuất sắc! Bạn sắp đạt mục tiêu rồi! 🎉";
    if (progressPercent >= 50) return "Tuyệt vời! Bạn đã đi được nửa chặng đường! 💪";
    if (progressPercent >= 25) return "Khởi đầu tốt! Hãy tiếp tục phấn đấu! 🚀";
    return "Mỗi bước nhỏ đều quan trọng! Hãy bắt đầu hành trình! 🌟";
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <h2>Theo dõi tiến độ</h2>
        <p className="text-sm text-muted-foreground">
          Cập nhật tiến độ tiết kiệm
        </p>
      </div>

      {/* Thông báo động lực */}
      <Alert className="border-primary bg-primary/5 py-2">
        <Sparkles className="h-4 w-4" />
        <AlertDescription>
          <p className="text-xs mb-2">{getMotivationalMessage()}</p>
          <div className="flex flex-wrap gap-1">
            {badges.slice(0, 2).map((badge, index) => (
              <Badge key={index} variant="secondary" className="gap-1 text-[10px] px-2 py-0">
                <Trophy className="h-3 w-3" />
                {badge}
              </Badge>
            ))}
          </div>
        </AlertDescription>
      </Alert>

      {/* Tổng quan tiến độ */}
      <div className="grid grid-cols-3 gap-2">
        <Card>
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="text-xs">Mục tiêu</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <p className="text-sm leading-tight">{goal.category}</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {(goal.targetCost / 1000000).toFixed(0)}M
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="text-xs">Đã tiết kiệm</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <p className="text-sm">{(currentSaved / 1000000).toFixed(1)}M</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {progressPercent.toFixed(0)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 px-3 pt-3">
            <CardTitle className="text-xs">Điểm</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3">
            <p className="text-sm flex items-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              {points}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              +100/1M
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Thanh tiến độ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Tiến độ: {goal.category}</CardTitle>
          <CardDescription className="text-xs">
            {(currentSaved / 1000000).toFixed(1)}M / {(goal.targetCost / 1000000).toFixed(0)}M
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={progressPercent} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span className="text-primary">{progressPercent.toFixed(0)}%</span>
            <span>100%</span>
          </div>
        </CardContent>
      </Card>

      {/* Biểu đồ tiến độ theo thời gian */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Lịch sử tiết kiệm</CardTitle>
          <CardDescription className="text-xs">
            So sánh thực tế với mục tiêu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={savingsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.replace('Tháng ', 'T')}
                />
                <YAxis 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} 
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value as number)}
                  contentStyle={{ fontSize: 12 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="saved" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  name="Thực tế"
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10b981" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  name="Mục tiêu"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cập nhật tiến độ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Cập nhật tiết kiệm</CardTitle>
          <CardDescription className="text-xs">
            Số tiền tiết kiệm thêm tháng này
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="updateAmount" className="text-xs">Số tiền (VND)</Label>
            <Input
              id="updateAmount"
              type="number"
              value={updateAmount}
              onChange={(e) => setUpdateAmount(e.target.value)}
              placeholder={`VD: ${goal.monthlySavings?.toFixed(0)}`}
            />
          </div>
          <Button onClick={handleUpdate} className="w-full" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Lưu cập nhật
          </Button>
        </CardContent>
      </Card>

      {/* Mẹo tiết kiệm */}
      <Card className="bg-muted/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            Mẹo tiết kiệm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1.5 text-xs">
            <li>• Giảm ăn ngoài → Tăng 500k/tháng</li>
            <li>• Tự động chuyển tiền đầu tháng</li>
            <li>• Cập nhật hàng tuần</li>
            <li>• Tìm nguồn thu nhập phụ</li>
          </ul>
        </CardContent>
      </Card>

      <Button onClick={onNext} className="w-full">
        Xem đề xuất đầu tư
      </Button>
    </div>
  );
}