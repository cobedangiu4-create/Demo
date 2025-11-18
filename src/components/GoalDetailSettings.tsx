import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Lightbulb, Save, Calculator } from 'lucide-react';
import { Goal } from '../types';
import { calculateMonthlyPayment } from '../utils/financial-calculations';

interface GoalDetailSettingsProps {
  onComplete: (goal: Goal) => void;
}

const CATEGORIES = [
  { id: 'house', name: 'Mua nhà', suggestion: 'Giá nhà trung bình tại TP.HCM là 2-4 tỷ VND' },
  { id: 'wedding', name: 'Đám cưới', suggestion: 'Chi phí đám cưới trung bình là 300-800 triệu VND' },
  { id: 'retirement', name: 'Nghỉ hưu', suggestion: 'Nên chuẩn bị ít nhất 3-5 tỷ VND cho nghỉ hưu' },
  { id: 'education', name: 'Học vấn', suggestion: 'Chi phí đại học 4 năm khoảng 200-500 triệu VND' },
  { id: 'travel', name: 'Du lịch', suggestion: 'Chuyến du lịch châu Âu tốn khoảng 100-150 triệu VND' },
  { id: 'other', name: 'Mục tiêu khác', suggestion: 'Đặt mục tiêu cụ thể và thực tế' },
];

export default function GoalDetailSettings({ onComplete }: GoalDetailSettingsProps) {
  const [selectedCategory, setSelectedCategory] = useState('house');
  const [targetCost, setTargetCost] = useState('1000000000');
  const [timeYears, setTimeYears] = useState('10');
  const [interestRate, setInterestRate] = useState('8');
  const [currentSavings, setCurrentSavings] = useState('0');
  const [calculated, setCalculated] = useState(false);
  const [monthlySavings, setMonthlySavings] = useState(0);

  const currentCategoryData = CATEGORIES.find(c => c.id === selectedCategory);

  const handleCalculate = () => {
    const monthly = calculateMonthlyPayment(
      parseFloat(targetCost),
      parseFloat(interestRate),
      parseFloat(timeYears),
      parseFloat(currentSavings)
    );
    setMonthlySavings(monthly);
    setCalculated(true);
  };

  const handleSave = () => {
    const goal: Goal = {
      id: Date.now().toString(),
      category: currentCategoryData?.name || 'Mục tiêu khác',
      targetCost: parseFloat(targetCost),
      timeYears: parseFloat(timeYears),
      interestRate: parseFloat(interestRate),
      currentSavings: parseFloat(currentSavings),
      monthlySavings,
      progress: 0,
    };
    onComplete(goal);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <h2>Cài đặt chi tiết mục tiêu</h2>
        <p className="text-sm text-muted-foreground">
          Nhập thông tin chi tiết để tính toán kế hoạch
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Thông tin mục tiêu</CardTitle>
          <CardDescription className="text-xs">
            Đặt mục tiêu SMART: Cụ thể, Đo lường, Khả thi, Thực tế
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Danh mục */}
          <div className="space-y-2">
            <Label htmlFor="category">Danh mục mục tiêu</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Gợi ý */}
          {currentCategoryData && (
            <Alert className="py-2">
              <Lightbulb className="h-4 w-4" />
              <AlertDescription className="text-xs">
                {currentCategoryData.suggestion}
              </AlertDescription>
            </Alert>
          )}

          {/* Chi phí mục tiêu */}
          <div className="space-y-2">
            <Label htmlFor="targetCost">Chi phí mục tiêu hiện tại (VND)</Label>
            <Input
              id="targetCost"
              type="number"
              value={targetCost}
              onChange={(e) => setTargetCost(e.target.value)}
              placeholder="VD: 1000000000"
            />
          </div>

          {/* Thời gian */}
          <div className="space-y-2">
            <Label htmlFor="timeYears">Thời gian đạt mục tiêu (năm)</Label>
            <Input
              id="timeYears"
              type="number"
              value={timeYears}
              onChange={(e) => setTimeYears(e.target.value)}
              placeholder="VD: 10"
            />
          </div>

          {/* Lãi suất */}
          <div className="space-y-2">
            <Label htmlFor="interestRate">Lãi suất đầu tư kỳ vọng (%/năm)</Label>
            <Select value={interestRate} onValueChange={setInterestRate}>
              <SelectTrigger id="interestRate">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5% - Tiết kiệm ngân hàng</SelectItem>
                <SelectItem value="6">6% - Tiết kiệm ngân hàng</SelectItem>
                <SelectItem value="8">8% - Quỹ ETF/Trái phiếu</SelectItem>
                <SelectItem value="10">10% - Quỹ ETF</SelectItem>
                <SelectItem value="12">12% - Cổ phiếu (cao rủi ro)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Số tiền hiện có */}
          <div className="space-y-2">
            <Label htmlFor="currentSavings">Số tiền tiết kiệm hiện có (VND)</Label>
            <Input
              id="currentSavings"
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="VD: 50000000"
            />
          </div>

          {/* Kết quả tính toán */}
          {calculated && (
            <Alert className="bg-primary/5 border-primary py-3">
              <Calculator className="h-4 w-4" />
              <AlertDescription>
                <p className="mb-1 text-sm">
                  <strong>Cần tiết kiệm: </strong>
                  {new Intl.NumberFormat('vi-VN').format(Math.round(monthlySavings))} VND/tháng
                </p>
                <p className="text-xs text-muted-foreground">
                  trong {timeYears} năm với lãi suất {interestRate}% để đạt mục tiêu{' '}
                  {currentCategoryData?.name.toLowerCase()}
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Buttons */}
          <div className="flex gap-2">
            <Button onClick={handleCalculate} variant="outline" className="flex-1" size="sm">
              <Calculator className="mr-2 h-4 w-4" />
              Tính toán
            </Button>
            <Button onClick={handleSave} disabled={!calculated} className="flex-1" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Lưu
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ví dụ thực tế */}
      <Card className="bg-muted/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Ví dụ thực tế</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs leading-relaxed">
            "Tiết kiệm 500tr cho đám cưới trong 3 năm (lãi 8%/năm).
            Đã có 50tr → Cần tiết kiệm ~11,5tr/tháng."
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
