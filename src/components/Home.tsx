import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  TrendingUp,
  Target,
  Calendar,
  Users,
  Calculator,
  PieChart,
  Sparkles,
  ArrowRight,
  Trophy,
  Zap,
  Clock,
  CheckCircle,
  Star,
  Gift,
  LineChart,
  MessageCircle,
  Bot,
  Bell,
  User,
  Settings,
  Wallet,
  BarChart3,
  Flame,
  ChevronRight,
  Award,
  TrendingDown,
  DollarSign,
  Percent,
  Activity,
} from 'lucide-react';

interface HomeProps {
  hasAnalysisData: boolean;
  currentSavings?: number;
  targetAmount?: number;
  monthlySavings?: number;
  goalLabel?: string;
  onStartAnalysis: () => void;
  onViewProgress: () => void;
  onViewTracking: () => void;
  onViewForecast: () => void;
  onConsultExpert: () => void;
  onDailyCheckIn: () => void;
  onForum: () => void;
  onAIChatbot: () => void;
  onHistory: () => void;
  onNotifications: () => void;
  onProfile: () => void;
  onStatistics: () => void;
  onBudget: () => void;
  onTools: () => void;
  onSettings: () => void;
}

export default function Home({
  hasAnalysisData,
  currentSavings = 0,
  targetAmount = 0,
  monthlySavings = 0,
  goalLabel = '',
  onStartAnalysis,
  onViewProgress,
  onViewTracking,
  onViewForecast,
  onConsultExpert,
  onDailyCheckIn,
  onForum,
  onAIChatbot,
  onHistory,
  onNotifications,
  onProfile,
  onStatistics,
  onBudget,
  onTools,
  onSettings,
}: HomeProps) {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dailyStreak, setDailyStreak] = useState(7); // Mock data

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Chào buổi sáng');
    else if (hour < 18) setGreeting('Chào buổi chiều');
    else setGreeting('Chào buổi tối');

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const progressPercent = targetAmount > 0 ? (currentSavings / targetAmount) * 100 : 0;
  const rewardPoints = 1250; // Mock data

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + ' triệu';
    }
    return amount.toLocaleString('vi-VN') + ' đ';
  };

  // Main featured actions - hiển thị lớn
  const featuredActions = [
    {
      id: 'analysis',
      icon: Calculator,
      title: hasAnalysisData ? 'Cập nhật phân tích' : 'Bắt đầu phân tích',
      description: hasAnalysisData 
        ? 'Đánh giá lại tình hình tài chính' 
        : 'Tạo kế hoạch tài chính thông minh',
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
      action: onStartAnalysis,
      priority: true,
    },
    {
      id: 'progress',
      icon: Target,
      title: 'Tiến độ mục tiêu',
      description: `Đã đạt ${progressPercent.toFixed(0)}% mục tiêu`,
      gradient: 'from-green-500 via-green-600 to-green-700',
      action: onViewProgress,
      disabled: !hasAnalysisData,
      priority: hasAnalysisData,
    },
    {
      id: 'expert',
      icon: Users,
      title: 'Tư vấn chuyên gia',
      description: 'Kết nối với chuyên gia CFA/CFP',
      gradient: 'from-purple-500 via-purple-600 to-purple-700',
      action: onConsultExpert,
      priority: true,
    },
  ];

  // Financial tools - nhóm công cụ tài chính
  const financialTools = [
    {
      icon: BarChart3,
      title: 'Thống kê',
      gradient: 'from-indigo-500 to-indigo-600',
      action: onStatistics,
    },
    {
      icon: Wallet,
      title: 'Ngân sách',
      gradient: 'from-emerald-500 to-emerald-600',
      action: onBudget,
    },
    {
      icon: LineChart,
      title: 'Dự báo',
      gradient: 'from-orange-500 to-orange-600',
      action: onViewForecast,
      disabled: !hasAnalysisData,
    },
    {
      icon: Sparkles,
      title: 'Công cụ',
      gradient: 'from-cyan-500 to-cyan-600',
      action: onTools,
    },
  ];

  // Community & Support - nhóm cộng đồng
  const communityActions = [
    {
      icon: Gift,
      title: 'Điểm danh',
      badge: 'Mới',
      gradient: 'from-yellow-500 to-amber-500',
      action: onDailyCheckIn,
    },
    {
      icon: MessageCircle,
      title: 'Diễn đàn',
      gradient: 'from-teal-500 to-teal-600',
      action: onForum,
    },
    {
      icon: Bot,
      title: 'AI Chatbot',
      gradient: 'from-pink-500 to-pink-600',
      action: onAIChatbot,
    },
    {
      icon: Calendar,
      title: 'Theo dõi',
      gradient: 'from-violet-500 to-violet-600',
      action: onViewTracking,
      disabled: !hasAnalysisData,
    },
  ];

  const insights = [
    {
      icon: TrendingUp,
      label: 'Thu nhập trung bình',
      value: '+15.2%',
      trend: 'up',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: DollarSign,
      label: 'Chi tiêu tháng này',
      value: '-8.3%',
      trend: 'down',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: Percent,
      label: 'Tỷ lệ tiết kiệm',
      value: '32%',
      trend: 'stable',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-br from-primary via-[#00a896] to-[#00b5a3] shadow-xl relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10 px-4 py-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={onProfile}
                className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all ring-2 ring-white/30"
              >
                <User className="h-5 w-5 text-white" />
              </button>
              <div>
                <h1 className="text-white text-xl">{greeting}! 👋</h1>
                <p className="text-white/80 text-xs">
                  {currentTime.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'short' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onHistory}
                className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <LineChart className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={onNotifications}
                className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all relative"
              >
                <Bell className="h-5 w-5 text-white" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FFDF20] rounded-full animate-pulse"></span>
              </button>
            </div>
          </div>

          {/* Daily Streak */}
          <Card className="border-0 bg-white/10 backdrop-blur-md shadow-xl mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                    <Flame className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm">Chuỗi ngày hoạt động</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-white text-2xl">{dailyStreak}</p>
                      <p className="text-white/70 text-xs">ngày 🔥</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-[#FFDF20] text-[#030213] border-0">
                    <Star className="h-3 w-3 mr-1" />
                    {rewardPoints}
                  </Badge>
                  <p className="text-white/70 text-xs mt-1">điểm</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          {hasAnalysisData && (
            <div className="grid grid-cols-3 gap-2">
              {insights.map((insight, idx) => {
                const Icon = insight.icon;
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
                    <Icon className="h-4 w-4 text-white/80 mx-auto mb-1" />
                    <p className="text-white text-xs mb-0.5">{insight.value}</p>
                    <p className="text-white/60 text-[10px] leading-tight">{insight.label}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-4 relative z-20">
        {/* Goal Progress Card */}
        {hasAnalysisData && targetAmount > 0 ? (
          <Card className="border-0 shadow-2xl mb-6 overflow-hidden">
            <div className="bg-gradient-to-br from-primary/5 to-blue-50 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Mục tiêu hiện tại</p>
                  <h3 className="text-base">{goalLabel}</h3>
                </div>
                <div className="text-right">
                  <Badge className="bg-primary text-white text-lg px-3 py-1">
                    {progressPercent.toFixed(0)}%
                  </Badge>
                </div>
              </div>

              <Progress value={progressPercent} className="h-3 mb-3" />

              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Đã tiết kiệm</p>
                  <p className="text-primary">{formatCurrency(currentSavings)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Mỗi tháng</p>
                  <p className="text-green-600">{formatCurrency(monthlySavings)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Mục tiêu</p>
                  <p className="">{formatCurrency(targetAmount)}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 flex items-center justify-between border-t">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-600" />
                <p className="text-xs text-green-700">
                  Còn {Math.ceil((targetAmount - currentSavings) / monthlySavings)} tháng nữa
                </p>
              </div>
              <Button size="sm" onClick={onViewProgress} className="bg-green-600 hover:bg-green-700 h-8">
                Chi tiết
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </Card>
        ) : (
          // Welcome card for new users
          <Card className="border-0 shadow-2xl mb-6 overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-[#00a896] rounded-3xl mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg mb-2">Bắt đầu hành trình tài chính</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto">
                  Phân tích tình hình tài chính và lập kế hoạch đầu tư thông minh với công thức SMART
                </p>
                <Button
                  onClick={onStartAnalysis}
                  className="bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90 h-11"
                  size="lg"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Phân tích ngay
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Featured Actions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base">Hành động chính</h2>
            <Badge variant="outline" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Nhanh
            </Badge>
          </div>

          <div className="space-y-3">
            {featuredActions.filter(a => a.priority).map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  disabled={action.disabled}
                  className={`w-full group ${
                    action.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                    <div className={`bg-gradient-to-r ${action.gradient} p-4 text-white relative`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-sm mb-1">{action.title}</h3>
                            <p className="text-xs text-white/80">{action.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>

        {/* Financial Tools */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base">Công cụ tài chính</h2>
            <Badge variant="outline" className="text-xs">
              <Calculator className="h-3 w-3 mr-1" />
              4 công cụ
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {financialTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <button
                  key={idx}
                  onClick={tool.action}
                  disabled={tool.disabled}
                  className={`group ${
                    tool.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all overflow-hidden">
                    <div className={`bg-gradient-to-br ${tool.gradient} p-4 text-white`}>
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm">{tool.title}</h4>
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>

        {/* Community & Support */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base">Cộng đồng & Hỗ trợ</h2>
            <Badge variant="outline" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Kết nối
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {communityActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  onClick={action.action}
                  disabled={action.disabled}
                  className={`group relative ${
                    action.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all overflow-hidden">
                    <div className={`bg-gradient-to-br ${action.gradient} p-4 text-white`}>
                      {action.badge && (
                        <Badge className="absolute top-2 right-2 bg-[#FFDF20] text-[#030213] border-0 text-[10px] px-2 py-0">
                          {action.badge}
                        </Badge>
                      )}
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm">{action.title}</h4>
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>

        {/* Financial Tips */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base">Mẹo tài chính hôm nay</h2>
            <Badge variant="outline" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Hữu ích
            </Badge>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm text-amber-900 mb-1">Quy tắc 50/30/20</h4>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Phân chia thu nhập: <strong>50%</strong> nhu cầu thiết yếu, <strong>30%</strong> mong muốn, <strong>20%</strong> tiết kiệm & đầu tư
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Settings */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            variant="outline"
            onClick={onSettings}
            className="h-12 border-2"
          >
            <Settings className="mr-2 h-4 w-4" />
            Cài đặt
          </Button>
          <Button
            variant="outline"
            onClick={onConsultExpert}
            className="h-12 border-2 border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Users className="mr-2 h-4 w-4" />
            Tư vấn
          </Button>
        </div>
      </div>
    </div>
  );
}
