import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import {
  ChevronLeft,
  Wallet,
  PieChart,
  Plus,
  Edit,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Home,
  ShoppingBag,
  Coffee,
  Car,
  Smartphone,
  Heart,
  DollarSign,
  Info,
  Sparkles,
} from 'lucide-react';

interface BudgetManagerProps {
  onBackHome: () => void;
}

interface BudgetCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  budget: number;
  spent: number;
  transactions: number;
}

export default function BudgetManager({ onBackHome }: BudgetManagerProps) {
  const [totalIncome] = useState(35000000);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const [categories, setCategories] = useState<BudgetCategory[]>([
    {
      id: '1',
      name: 'Nhà ở',
      icon: Home,
      color: 'bg-blue-500',
      budget: 10500000,
      spent: 9500000,
      transactions: 3,
    },
    {
      id: '2',
      name: 'Ăn uống',
      icon: Coffee,
      color: 'bg-green-500',
      budget: 7000000,
      spent: 8200000,
      transactions: 45,
    },
    {
      id: '3',
      name: 'Di chuyển',
      icon: Car,
      color: 'bg-yellow-500',
      budget: 3500000,
      spent: 2800000,
      transactions: 18,
    },
    {
      id: '4',
      name: 'Mua sắm',
      icon: ShoppingBag,
      color: 'bg-purple-500',
      budget: 3000000,
      spent: 1500000,
      transactions: 8,
    },
    {
      id: '5',
      name: 'Giải trí',
      icon: Smartphone,
      color: 'bg-pink-500',
      budget: 2500000,
      spent: 2100000,
      transactions: 12,
    },
    {
      id: '6',
      name: 'Sức khỏe',
      icon: Heart,
      color: 'bg-red-500',
      budget: 2000000,
      spent: 800000,
      transactions: 4,
    },
    {
      id: '7',
      name: 'Khác',
      icon: DollarSign,
      color: 'bg-gray-500',
      budget: 1500000,
      spent: 900000,
      transactions: 6,
    },
  ]);

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudget - totalSpent;
  const savingsTarget = totalIncome - totalBudget;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryStatus = (category: BudgetCategory) => {
    const percentage = (category.spent / category.budget) * 100;
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 80) return 'warning';
    return 'good';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeded':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'exceeded':
        return (
          <Badge className="bg-red-100 text-red-700">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Vượt
          </Badge>
        );
      case 'warning':
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Cảnh báo
          </Badge>
        );
      default:
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            OK
          </Badge>
        );
    }
  };

  // 50/30/20 Rule
  const rule502030 = {
    needs: totalIncome * 0.5, // 50% cho nhu cầu thiết yếu
    wants: totalIncome * 0.3, // 30% cho mong muốn
    savings: totalIncome * 0.2, // 20% cho tiết kiệm
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
              onClick={onBackHome}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddCategory(!showAddCategory)}
              className="text-white hover:bg-white/20 -mr-2"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Quản Lý Ngân Sách</h1>
              <p className="text-white/80 text-sm">
                {categories.length} danh mục
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Overview Card */}
        <Card className="border-0 shadow-lg overflow-hidden mt-4 bg-gradient-to-br from-primary to-[#00a896]">
          <CardContent className="p-4 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm opacity-90">Tổng quan tháng này</span>
              <Badge className="bg-white/20 text-white border-0">
                {new Date().toLocaleDateString('vi-VN', { month: 'long' })}
              </Badge>
            </div>

            <div className="space-y-3">
              {/* Income */}
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-90">Thu nhập</span>
                <span className="text-lg">{formatCurrency(totalIncome)}</span>
              </div>

              {/* Budget */}
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-90">Ngân sách</span>
                <span className="text-lg">{formatCurrency(totalBudget)}</span>
              </div>

              {/* Spent */}
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-90">Đã chi</span>
                <span className="text-lg">{formatCurrency(totalSpent)}</span>
              </div>

              <div className="h-px bg-white/20 my-2"></div>

              {/* Remaining */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Còn lại</span>
                <span className="text-xl">{formatCurrency(remaining)}</span>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span>Đã sử dụng</span>
                  <span>{((totalSpent / totalBudget) * 100).toFixed(1)}%</span>
                </div>
                <Progress
                  value={(totalSpent / totalBudget) * 100}
                  className="h-2 bg-white/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 50/30/20 Rule */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gradient-to-r from-[#FFDF20]/20 to-primary/10 border-l-4 border-[#FFDF20]">
          <CardContent className="p-4">
            <h4 className="text-primary mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Quy tắc 50/30/20
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>50% Nhu cầu thiết yếu</span>
                <span className="text-primary">{formatCurrency(rule502030.needs)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>30% Mong muốn</span>
                <span className="text-primary">{formatCurrency(rule502030.wants)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>20% Tiết kiệm</span>
                <span className="text-primary">{formatCurrency(rule502030.savings)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Danh Mục Chi Tiêu
            </h3>
          </div>

          <div className="space-y-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const status = getCategoryStatus(category);
              const percentage = (category.spent / category.budget) * 100;

              return (
                <Card key={category.id} className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-sm mb-1">{category.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {category.transactions} giao dịch
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(status)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className={getStatusColor(status)}>
                          {formatCurrency(category.spent)}
                        </span>
                        <span className="text-muted-foreground">
                          / {formatCurrency(category.budget)}
                        </span>
                      </div>

                      <Progress
                        value={Math.min(percentage, 100)}
                        className={`h-2 ${
                          status === 'exceeded'
                            ? '[&>div]:bg-red-500'
                            : status === 'warning'
                            ? '[&>div]:bg-yellow-500'
                            : '[&>div]:bg-green-500'
                        }`}
                      />

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{percentage.toFixed(1)}% đã sử dụng</span>
                        <span>Còn {formatCurrency(category.budget - category.spent)}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-3"
                      onClick={() => {}}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Điều chỉnh ngân sách
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Add Category Button */}
        <Button
          className="w-full mt-4 bg-primary hover:bg-primary/90"
          onClick={() => setShowAddCategory(!showAddCategory)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm Danh Mục Mới
        </Button>

        {/* Tips */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-blue-50 border-l-4 border-blue-500">
          <CardContent className="p-4">
            <h4 className="text-blue-900 mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              💡 Mẹo quản lý ngân sách
            </h4>
            <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
              <li>Ưu tiên chi tiêu cho nhu cầu thiết yếu trước</li>
              <li>Đặt cảnh báo khi chi tiêu đạt 80% ngân sách</li>
              <li>Xem xét lại ngân sách hàng tháng để điều chỉnh</li>
              <li>Tiết kiệm ít nhất 20% thu nhập</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
