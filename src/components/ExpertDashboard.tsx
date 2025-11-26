import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  ChevronLeft,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Award,
  Clock,
  ArrowRight,
  BarChart3,
  CheckCircle,
  Wallet,
  Target,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExpertDashboardProps {
  onBack: () => void;
  onViewClients: () => void;
  onViewSchedule: () => void;
  onViewEarnings: () => void;
  onViewProfile: () => void;
}

export default function ExpertDashboard({
  onBack,
  onViewClients,
  onViewSchedule,
  onViewEarnings,
  onViewProfile,
}: ExpertDashboardProps) {
  // Mock data - trong thực tế sẽ lấy từ API
  const expertData = {
    name: 'Nguyễn Minh Tuấn',
    title: 'Chuyên gia Tài chính Cá nhân',
    avatar: '👨‍💼',
    rating: 4.9,
    reviews: 248,
    totalClients: 47,
    activeClients: 23,
    totalSessions: 156,
    monthSessions: 18,
    // Hoa hồng 40% từ gói đăng ký
    earnings: {
      total: 124800000, // Tổng thu nhập
      thisMonth: 18600000, // Thu nhập tháng này
      today: 1200000, // Thu nhập hôm nay
      commission: 0.4, // 40% hoa hồng
    },
    recentClients: [
      { id: '1', name: 'Trần Văn A', package: 'premium', amount: 1699000, commission: 679600, status: 'completed' },
      { id: '2', name: 'Nguyễn Thị B', package: 'standard', amount: 1299000, commission: 519600, status: 'active' },
      { id: '3', name: 'Lê Văn C', package: 'basic', amount: 499000, commission: 199600, status: 'active' },
      { id: '4', name: 'Phạm Thị D', package: 'premium', amount: 1699000, commission: 679600, status: 'completed' },
      { id: '5', name: 'Hoàng Văn E', package: 'standard', amount: 1299000, commission: 519600, status: 'pending' },
    ],
    upcomingSessions: [
      { id: '1', client: 'Trần Văn A', date: '2025-11-27', time: '09:00', type: 'video' },
      { id: '2', client: 'Nguyễn Thị B', date: '2025-11-27', time: '14:00', type: 'call' },
      { id: '3', client: 'Lê Văn C', date: '2025-11-28', time: '10:00', type: 'chat' },
    ],
    // Dữ liệu biểu đồ thu nhập 7 ngày qua
    earningsChart: [
      { day: 'T2', amount: 2400000 },
      { day: 'T3', amount: 1800000 },
      { day: 'T4', amount: 3200000 },
      { day: 'T5', amount: 2800000 },
      { day: 'T6', amount: 4200000 },
      { day: 'T7', amount: 2600000 },
      { day: 'CN', amount: 1600000 },
    ],
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  const getPackageColor = (packageType: string) => {
    switch (packageType) {
      case 'premium':
        return 'bg-yellow-100 text-yellow-700';
      case 'standard':
        return 'bg-purple-100 text-purple-700';
      case 'basic':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPackageLabel = (packageType: string) => {
    switch (packageType) {
      case 'premium':
        return 'Premium';
      case 'standard':
        return 'Tiêu chuẩn';
      case 'basic':
        return 'Cơ bản';
      default:
        return packageType;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Đang tư vấn';
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Chờ xác nhận';
      default:
        return status;
    }
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
                {expertData.avatar}
              </div>
              <div>
                <h1 className="text-white text-xl">{expertData.name}</h1>
                <p className="text-white/80 text-sm">{expertData.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Award className="h-4 w-4 text-[#FFDF20]" />
                  <span className="text-white text-sm">
                    {expertData.rating} ⭐ ({expertData.reviews} đánh giá)
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewProfile}
              className="text-white hover:bg-white/20"
            >
              Hồ sơ
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {/* Total Earnings */}
          <Card
            className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-green-500 to-green-600 cursor-pointer"
            onClick={onViewEarnings}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-white/80" />
              </div>
              <p className="text-white/80 text-sm mb-1">Tổng thu nhập</p>
              <p className="text-white text-xl">{formatCurrency(expertData.earnings.total)}</p>
              <p className="text-white/70 text-xs mt-1">
                Hoa hồng 40%
              </p>
            </CardContent>
          </Card>

          {/* Month Earnings */}
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-white/80" />
              </div>
              <p className="text-white/80 text-sm mb-1">Thu nhập tháng này</p>
              <p className="text-white text-xl">{formatCurrency(expertData.earnings.thisMonth)}</p>
              <p className="text-white/70 text-xs mt-1">
                +{expertData.monthSessions} buổi tư vấn
              </p>
            </CardContent>
          </Card>

          {/* Total Clients */}
          <Card
            className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 cursor-pointer"
            onClick={onViewClients}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-white/80 text-sm mb-1">Khách hàng</p>
              <p className="text-white text-xl">{expertData.totalClients}</p>
              <p className="text-white/70 text-xs mt-1">
                {expertData.activeClients} đang hoạt động
              </p>
            </CardContent>
          </Card>

          {/* Total Sessions */}
          <Card
            className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 cursor-pointer"
            onClick={onViewSchedule}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-white/80 text-sm mb-1">Buổi tư vấn</p>
              <p className="text-white text-xl">{expertData.totalSessions}</p>
              <p className="text-white/70 text-xs mt-1">
                {expertData.monthSessions} tháng này
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="text-primary">Thu nhập 7 ngày qua</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onViewEarnings}
                className="text-primary hover:bg-primary/10"
              >
                Chi tiết
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={expertData.earningsChart}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#009689" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#009689" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#009689"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="text-primary">Lịch hẹn sắp tới</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onViewSchedule}
                className="text-primary hover:bg-primary/10"
              >
                Xem tất cả
              </Button>
            </div>
          </div>
          <CardContent className="p-0">
            {expertData.upcomingSessions.map((session, index) => (
              <div
                key={session.id}
                className={`p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  index !== expertData.upcomingSessions.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">{session.client}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.date} • {session.time}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {session.type === 'video' ? '📹 Video' : session.type === 'call' ? '📞 Gọi' : '💬 Chat'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Clients */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-primary">Khách hàng gần đây</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onViewClients}
                className="text-primary hover:bg-primary/10"
              >
                Xem tất cả
              </Button>
            </div>
          </div>
          <CardContent className="p-0">
            {expertData.recentClients.map((client, index) => (
              <div
                key={client.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  index !== expertData.recentClients.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm">{client.name}</p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getPackageColor(client.package)}`}
                      >
                        {getPackageLabel(client.package)}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="secondary" className={`${getStatusColor(client.status)} text-white`}>
                    {getStatusLabel(client.status)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between pl-13 text-sm">
                  <span className="text-muted-foreground">Hoa hồng 40%:</span>
                  <span className="text-primary">{formatCurrency(client.commission)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 space-y-3">
          <Button
            onClick={onViewClients}
            className="w-full h-14 bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5" />
              <span>Quản lý khách hàng</span>
            </div>
            <ArrowRight className="h-5 w-5" />
          </Button>

          <Button
            onClick={onViewSchedule}
            className="w-full h-14 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5" />
              <span>Lịch tư vấn</span>
            </div>
            <ArrowRight className="h-5 w-5" />
          </Button>

          <Button
            onClick={onViewEarnings}
            className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5" />
              <span>Thu nhập & Hoa hồng</span>
            </div>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Info Banner */}
        <Card className="mt-6 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-blue-900 mb-1">Hệ thống hoa hồng 40%</h3>
                <p className="text-sm text-blue-700">
                  Bạn nhận được 40% từ mỗi gói đăng ký của khách hàng. Thu nhập được cập nhật tự động sau mỗi buổi tư vấn hoàn thành.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
