import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { TrendingUp, AlertTriangle, Shield, Zap, BookOpen } from 'lucide-react';
import { InvestmentOption } from '../types';

interface InvestmentRecommendationsProps {
  onNext: () => void;
}

const INVESTMENT_OPTIONS: InvestmentOption[] = [
  {
    id: 'savings',
    name: 'Tiết kiệm ngân hàng',
    returnRate: '5-6%',
    riskLevel: 'low',
    description: 'An toàn, ổn định, phù hợp với người muốn bảo toàn vốn. Lãi suất thấp nhưng không có rủi ro mất vốn.',
  },
  {
    id: 'bonds',
    name: 'Trái phiếu chính phủ',
    returnRate: '6-7%',
    riskLevel: 'low',
    description: 'Rất an toàn, được bảo đảm bởi chính phủ. Lợi nhuận ổn định, phù hợp đầu tư dài hạn.',
  },
  {
    id: 'etf',
    name: 'Quỹ ETF',
    returnRate: '7-10%',
    riskLevel: 'medium',
    description: 'An toàn hơn cổ phiếu, lợi suất trung bình 8%/năm. Đa dạng hóa tự động, phù hợp người mới.',
  },
  {
    id: 'mixed',
    name: 'Danh mục hỗn hợp',
    returnRate: '8-10%',
    riskLevel: 'medium',
    description: '60% quỹ, 30% trái phiếu, 10% tiết kiệm. Cân bằng giữa rủi ro và lợi nhuận.',
  },
  {
    id: 'stocks',
    name: 'Cổ phiếu',
    returnRate: '10-15%',
    riskLevel: 'high',
    description: 'Tiềm năng lợi nhuận cao nhưng có thể biến động ±30%/năm. Cần kiến thức và kinh nghiệm.',
  },
];

const RISK_QUESTIONS = [
  {
    id: 'q1',
    question: 'Bạn có sẵn sàng mất 20% vốn trong ngắn hạn để có cơ hội tăng trưởng cao hơn?',
    options: [
      { value: 'no', label: 'Không, tôi muốn bảo toàn vốn', risk: 'low' },
      { value: 'maybe', label: 'Có thể, nếu còn tài sản khác', risk: 'medium' },
      { value: 'yes', label: 'Có, tôi chấp nhận rủi ro', risk: 'high' },
    ],
  },
  {
    id: 'q2',
    question: 'Bạn đã có kinh nghiệm đầu tư chưa?',
    options: [
      { value: 'no', label: 'Chưa, tôi là người mới', risk: 'low' },
      { value: 'some', label: 'Một chút, đã mua quỹ/trái phiếu', risk: 'medium' },
      { value: 'yes', label: 'Có, tôi hiểu về cổ phiếu', risk: 'high' },
    ],
  },
];

export default function InvestmentRecommendations({ onNext }: InvestmentRecommendationsProps) {
  const [showAssessment, setShowAssessment] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [riskProfile, setRiskProfile] = useState<'low' | 'medium' | 'high' | null>(null);

  const handleAssessment = () => {
    // Tính toán mức độ rủi ro dựa trên câu trả lời
    const risks = Object.values(answers).map(answer => {
      for (const q of RISK_QUESTIONS) {
        const option = q.options.find(o => o.value === answer);
        if (option) return option.risk;
      }
      return 'low';
    });

    const highCount = risks.filter(r => r === 'high').length;
    const mediumCount = risks.filter(r => r === 'medium').length;

    if (highCount >= 2) setRiskProfile('high');
    else if (highCount + mediumCount >= 2) setRiskProfile('medium');
    else setRiskProfile('low');
  };

  const getRecommendedOptions = () => {
    if (!riskProfile) return INVESTMENT_OPTIONS;
    return INVESTMENT_OPTIONS.filter(opt => opt.riskLevel === riskProfile);
  };

  const getRiskBadge = (risk: 'low' | 'medium' | 'high') => {
    const config = {
      low: { label: 'Rủi ro thấp', icon: Shield, className: 'bg-green-100 text-green-800 border-green-200' },
      medium: { label: 'Rủi ro trung bình', icon: AlertTriangle, className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      high: { label: 'Rủi ro cao', icon: Zap, className: 'bg-red-100 text-red-800 border-red-200' },
    };
    const { label, icon: Icon, className } = config[risk];
    return (
      <Badge variant="outline" className={className}>
        <Icon className="h-3 w-3 mr-1" />
        {label}
      </Badge>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <h2>Đề xuất đầu tư</h2>
        <p className="text-sm text-muted-foreground">
          Kênh phù hợp với rủi ro và mục tiêu
        </p>
      </div>

      {/* Đánh giá rủi ro */}
      <Card className="border-primary">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Đánh giá rủi ro</CardTitle>
          <CardDescription className="text-xs">
            Trả lời để nhận đề xuất phù hợp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!showAssessment ? (
            <Button onClick={() => setShowAssessment(true)} className="w-full" size="sm">
              Bắt đầu đánh giá
            </Button>
          ) : (
            <>
              {RISK_QUESTIONS.map((question) => (
                <div key={question.id} className="space-y-2 p-3 border rounded-lg">
                  <Label className="text-xs leading-tight">{question.question}</Label>
                  <RadioGroup
                    value={answers[question.id]}
                    onValueChange={(value) => setAnswers({ ...answers, [question.id]: value })}
                  >
                    {question.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                        <Label htmlFor={`${question.id}-${option.value}`} className="cursor-pointer text-xs">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              
              <Button 
                onClick={handleAssessment} 
                disabled={Object.keys(answers).length < RISK_QUESTIONS.length}
                className="w-full"
                size="sm"
              >
                Xem kết quả
              </Button>

              {riskProfile && (
                <Alert className="bg-primary/5 border-primary py-2">
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    <strong>Kết quả:</strong> Phù hợp với{' '}
                    <strong>rủi ro {riskProfile === 'low' ? 'thấp' : riskProfile === 'medium' ? 'trung bình' : 'cao'}</strong>
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Danh sách lựa chọn đầu tư */}
      <div className="space-y-2">
        <h3 className="text-sm">Kênh {riskProfile ? 'đề xuất' : 'phổ biến'}</h3>
        {getRecommendedOptions().map((option) => (
          <Card key={option.id} className="hover:border-primary transition-colors">
            <CardHeader className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{option.name}</CardTitle>
                  <p className="text-sm text-primary">{option.returnRate}</p>
                </div>
                {getRiskBadge(option.riskLevel)}
                <CardDescription className="text-xs">{option.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <Button variant="outline" size="sm" className="w-full">
                <BookOpen className="mr-2 h-3 w-3" />
                Tìm hiểu
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cảnh báo rủi ro */}
      <Alert variant="destructive" className="py-2">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          <strong>Cảnh báo:</strong> Kênh cao rủi ro có thể biến động ±30%/năm.
          Chỉ đầu tư số tiền có thể chấp nhận mất.
        </AlertDescription>
      </Alert>

      {/* Khuyến nghị đa dạng hóa */}
      <Card className="bg-muted/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Danh mục cân bằng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs">
            Đừng đặt tất cả trứng vào một giỏ:
          </p>
          <div className="grid gap-2">
            <div className="flex items-center justify-between p-2 border rounded-lg">
              <span className="text-xs">Quỹ ETF/Cổ phiếu</span>
              <span className="text-xs">60%</span>
            </div>
            <div className="flex items-center justify-between p-2 border rounded-lg">
              <span className="text-xs">Trái phiếu</span>
              <span className="text-xs">30%</span>
            </div>
            <div className="flex items-center justify-between p-2 border rounded-lg">
              <span className="text-xs">Tiết kiệm ngân hàng</span>
              <span className="text-xs">10%</span>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground">
            Tỷ lệ có thể điều chỉnh theo độ tuổi và mục tiêu.
          </p>
        </CardContent>
      </Card>

      <Button onClick={onNext} className="w-full">
        Tiếp tục tư vấn
      </Button>
    </div>
  );
}
