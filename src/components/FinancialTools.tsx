import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  ChevronLeft,
  Calculator,
  Home,
  TrendingUp,
  PiggyBank,
  DollarSign,
  Percent,
  Calendar,
  Target,
  Info,
} from 'lucide-react';

interface FinancialToolsProps {
  onBackHome: () => void;
}

type ToolType = 'compound' | 'mortgage' | 'retirement' | 'loan';

export default function FinancialTools({ onBackHome }: FinancialToolsProps) {
  const [selectedTool, setSelectedTool] = useState<ToolType | null>(null);

  // Compound Interest Calculator
  const [compoundInputs, setCompoundInputs] = useState({
    principal: '100000000',
    monthlyContribution: '5000000',
    annualRate: '8',
    years: '10',
  });
  const [compoundResult, setCompoundResult] = useState<number | null>(null);

  // Mortgage Calculator
  const [mortgageInputs, setMortgageInputs] = useState({
    loanAmount: '2000000000',
    annualRate: '10',
    years: '20',
  });
  const [mortgageResult, setMortgageResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  // Retirement Calculator
  const [retirementInputs, setRetirementInputs] = useState({
    currentAge: '30',
    retirementAge: '60',
    currentSavings: '100000000',
    monthlyContribution: '10000000',
    expectedReturn: '8',
    expectedExpense: '20000000',
  });
  const [retirementResult, setRetirementResult] = useState<{
    totalSavings: number;
    monthlyIncome: number;
    yearsOfRetirement: number;
  } | null>(null);

  // Loan Calculator
  const [loanInputs, setLoanInputs] = useState({
    loanAmount: '500000000',
    annualRate: '15',
    years: '5',
  });
  const [loanResult, setLoanResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateCompoundInterest = () => {
    const P = parseFloat(compoundInputs.principal);
    const PMT = parseFloat(compoundInputs.monthlyContribution);
    const r = parseFloat(compoundInputs.annualRate) / 100 / 12;
    const n = parseFloat(compoundInputs.years) * 12;

    // FV = P(1+r)^n + PMT * [((1+r)^n - 1) / r]
    const futureValuePrincipal = P * Math.pow(1 + r, n);
    const futureValueContributions = PMT * ((Math.pow(1 + r, n) - 1) / r);
    const total = futureValuePrincipal + futureValueContributions;

    setCompoundResult(total);
  };

  const calculateMortgage = () => {
    const P = parseFloat(mortgageInputs.loanAmount);
    const r = parseFloat(mortgageInputs.annualRate) / 100 / 12;
    const n = parseFloat(mortgageInputs.years) * 12;

    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    setMortgageResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  const calculateRetirement = () => {
    const currentAge = parseFloat(retirementInputs.currentAge);
    const retirementAge = parseFloat(retirementInputs.retirementAge);
    const yearsToRetirement = retirementAge - currentAge;
    const P = parseFloat(retirementInputs.currentSavings);
    const PMT = parseFloat(retirementInputs.monthlyContribution);
    const r = parseFloat(retirementInputs.expectedReturn) / 100 / 12;
    const n = yearsToRetirement * 12;

    const futureValuePrincipal = P * Math.pow(1 + r, n);
    const futureValueContributions = PMT * ((Math.pow(1 + r, n) - 1) / r);
    const totalSavings = futureValuePrincipal + futureValueContributions;

    const expectedExpense = parseFloat(retirementInputs.expectedExpense);
    const withdrawalRate = 0.04; // 4% rule
    const monthlyIncome = (totalSavings * withdrawalRate) / 12;
    const yearsOfRetirement = totalSavings / (expectedExpense * 12);

    setRetirementResult({
      totalSavings,
      monthlyIncome,
      yearsOfRetirement,
    });
  };

  const calculateLoan = () => {
    const P = parseFloat(loanInputs.loanAmount);
    const r = parseFloat(loanInputs.annualRate) / 100 / 12;
    const n = parseFloat(loanInputs.years) * 12;

    const monthlyPayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    setLoanResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  const tools = [
    {
      id: 'compound' as ToolType,
      name: 'Lãi Suất Kép',
      description: 'Tính lợi nhuận đầu tư dài hạn',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      id: 'mortgage' as ToolType,
      name: 'Vay Mua Nhà',
      description: 'Tính khoản trả hàng tháng',
      icon: Home,
      color: 'bg-blue-500',
    },
    {
      id: 'retirement' as ToolType,
      name: 'Nghỉ Hưu',
      description: 'Lập kế hoạch nghỉ hưu',
      icon: PiggyBank,
      color: 'bg-purple-500',
    },
    {
      id: 'loan' as ToolType,
      name: 'Vay Tiêu Dùng',
      description: 'Tính lãi vay cá nhân',
      icon: DollarSign,
      color: 'bg-orange-500',
    },
  ];

  if (!selectedTool) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-[#00a896] to-primary shadow-lg">
          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackHome}
                className="text-white hover:bg-white/20 -ml-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-white text-xl">Công Cụ Tài Chính</h1>
                <p className="text-white/80 text-sm">Tính toán thông minh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-6">
          <div className="grid grid-cols-2 gap-3 mt-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className="border-0 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <CardContent className="p-4">
                    <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-sm mb-1">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Info */}
          <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-blue-50 border-l-4 border-blue-500">
            <CardContent className="p-4">
              <h4 className="text-blue-900 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                💡 Lưu ý
              </h4>
              <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
                <li>Các công cụ tính toán chỉ mang tính chất tham khảo</li>
                <li>Kết quả thực tế có thể khác do nhiều yếu tố</li>
                <li>Nên tham khảo ý kiến chuyên gia trước khi quyết định</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Render selected tool
  const currentTool = tools.find((t) => t.id === selectedTool)!;
  const Icon = currentTool.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-[#00a896] to-primary shadow-lg">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTool(null)}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${currentTool.color} rounded-2xl flex items-center justify-center`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">{currentTool.name}</h1>
              <p className="text-white/80 text-sm">{currentTool.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {selectedTool === 'compound' && (
          <>
            <Card className="mt-4 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label htmlFor="principal">Số tiền ban đầu (VNĐ)</Label>
                  <Input
                    id="principal"
                    type="number"
                    value={compoundInputs.principal}
                    onChange={(e) =>
                      setCompoundInputs({ ...compoundInputs, principal: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyContribution">Đóng góp hàng tháng (VNĐ)</Label>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    value={compoundInputs.monthlyContribution}
                    onChange={(e) =>
                      setCompoundInputs({ ...compoundInputs, monthlyContribution: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="annualRate">Lãi suất hàng năm (%)</Label>
                  <Input
                    id="annualRate"
                    type="number"
                    value={compoundInputs.annualRate}
                    onChange={(e) =>
                      setCompoundInputs({ ...compoundInputs, annualRate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="years">Số năm đầu tư</Label>
                  <Input
                    id="years"
                    type="number"
                    value={compoundInputs.years}
                    onChange={(e) =>
                      setCompoundInputs({ ...compoundInputs, years: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={calculateCompoundInterest}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Tính toán
                </Button>
              </CardContent>
            </Card>

            {compoundResult && (
              <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5">
                <CardContent className="p-4">
                  <h3 className="text-sm mb-3">Kết quả</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tổng giá trị tương lai</span>
                      <span className="text-lg text-primary">{formatCurrency(compoundResult)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tổng đóng góp</span>
                      <span className="text-sm">
                        {formatCurrency(
                          parseFloat(compoundInputs.principal) +
                            parseFloat(compoundInputs.monthlyContribution) *
                              parseFloat(compoundInputs.years) *
                              12
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Lợi nhuận</span>
                      <span className="text-sm text-green-600">
                        {formatCurrency(
                          compoundResult -
                            (parseFloat(compoundInputs.principal) +
                              parseFloat(compoundInputs.monthlyContribution) *
                                parseFloat(compoundInputs.years) *
                                12)
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {selectedTool === 'mortgage' && (
          <>
            <Card className="mt-4 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label htmlFor="loanAmount">Số tiền vay (VNĐ)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={mortgageInputs.loanAmount}
                    onChange={(e) =>
                      setMortgageInputs({ ...mortgageInputs, loanAmount: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mortgageRate">Lãi suất hàng năm (%)</Label>
                  <Input
                    id="mortgageRate"
                    type="number"
                    value={mortgageInputs.annualRate}
                    onChange={(e) =>
                      setMortgageInputs({ ...mortgageInputs, annualRate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mortgageYears">Thời hạn vay (năm)</Label>
                  <Input
                    id="mortgageYears"
                    type="number"
                    value={mortgageInputs.years}
                    onChange={(e) =>
                      setMortgageInputs({ ...mortgageInputs, years: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={calculateMortgage}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Tính toán
                </Button>
              </CardContent>
            </Card>

            {mortgageResult && (
              <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100">
                <CardContent className="p-4">
                  <h3 className="text-sm mb-3">Kết quả</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Trả hàng tháng</span>
                      <span className="text-lg text-blue-600">
                        {formatCurrency(mortgageResult.monthlyPayment)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tổng thanh toán</span>
                      <span className="text-sm">{formatCurrency(mortgageResult.totalPayment)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tổng lãi</span>
                      <span className="text-sm text-red-600">
                        {formatCurrency(mortgageResult.totalInterest)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {selectedTool === 'retirement' && (
          <>
            <Card className="mt-4 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="currentAge">Tuổi hiện tại</Label>
                    <Input
                      id="currentAge"
                      type="number"
                      value={retirementInputs.currentAge}
                      onChange={(e) =>
                        setRetirementInputs({ ...retirementInputs, currentAge: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="retirementAge">Tuổi nghỉ hưu</Label>
                    <Input
                      id="retirementAge"
                      type="number"
                      value={retirementInputs.retirementAge}
                      onChange={(e) =>
                        setRetirementInputs({ ...retirementInputs, retirementAge: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="currentSavings">Tiết kiệm hiện tại (VNĐ)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={retirementInputs.currentSavings}
                    onChange={(e) =>
                      setRetirementInputs({ ...retirementInputs, currentSavings: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="retirementContribution">Đóng góp hàng tháng (VNĐ)</Label>
                  <Input
                    id="retirementContribution"
                    type="number"
                    value={retirementInputs.monthlyContribution}
                    onChange={(e) =>
                      setRetirementInputs({
                        ...retirementInputs,
                        monthlyContribution: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="expectedReturn">Lợi nhuận kỳ vọng (%/năm)</Label>
                  <Input
                    id="expectedReturn"
                    type="number"
                    value={retirementInputs.expectedReturn}
                    onChange={(e) =>
                      setRetirementInputs({ ...retirementInputs, expectedReturn: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="expectedExpense">Chi tiêu dự kiến (VNĐ/tháng)</Label>
                  <Input
                    id="expectedExpense"
                    type="number"
                    value={retirementInputs.expectedExpense}
                    onChange={(e) =>
                      setRetirementInputs({ ...retirementInputs, expectedExpense: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={calculateRetirement}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Tính toán
                </Button>
              </CardContent>
            </Card>

            {retirementResult && (
              <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gradient-to-r from-purple-50 to-purple-100">
                <CardContent className="p-4">
                  <h3 className="text-sm mb-3">Kết quả</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tổng tiết kiệm lúc nghỉ hưu</span>
                      <span className="text-lg text-purple-600">
                        {formatCurrency(retirementResult.totalSavings)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Thu nhập hàng tháng (4% rule)</span>
                      <span className="text-sm">{formatCurrency(retirementResult.monthlyIncome)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Đủ sống trong</span>
                      <span className="text-sm">{retirementResult.yearsOfRetirement.toFixed(1)} năm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {selectedTool === 'loan' && (
          <>
            <Card className="mt-4 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label htmlFor="loanAmountConsumer">Số tiền vay (VNĐ)</Label>
                  <Input
                    id="loanAmountConsumer"
                    type="number"
                    value={loanInputs.loanAmount}
                    onChange={(e) =>
                      setLoanInputs({ ...loanInputs, loanAmount: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="loanRate">Lãi suất hàng năm (%)</Label>
                  <Input
                    id="loanRate"
                    type="number"
                    value={loanInputs.annualRate}
                    onChange={(e) =>
                      setLoanInputs({ ...loanInputs, annualRate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="loanYears">Thời hạn vay (năm)</Label>
                  <Input
                    id="loanYears"
                    type="number"
                    value={loanInputs.years}
                    onChange={(e) =>
                      setLoanInputs({ ...loanInputs, years: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={calculateLoan}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Tính toán
                </Button>
              </CardContent>
            </Card>

            {loanResult && (
              <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gradient-to-r from-orange-50 to-orange-100">
                <CardContent className="p-4">
                  <h3 className="text-sm mb-3">Kết quả</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Trả hàng tháng</span>
                      <span className="text-lg text-orange-600">
                        {formatCurrency(loanResult.monthlyPayment)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tổng thanh toán</span>
                      <span className="text-sm">{formatCurrency(loanResult.totalPayment)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Tổng lãi</span>
                      <span className="text-sm text-red-600">
                        {formatCurrency(loanResult.totalInterest)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
