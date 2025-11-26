import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ChevronLeft,
  TrendingUp,
  DollarSign,
  Download,
  Calendar,
  CheckCircle,
  Wallet,
  Award,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Transaction {
  id: string;
  clientName: string;
  package: 'basic' | 'standard' | 'premium';
  packagePrice: number;
  commission: number;
  commissionRate: number;
  date: string;
  status: 'paid' | 'pending' | 'processing';
}

interface ExpertEarningsProps {
  onBack: () => void;
}

export default function ExpertEarnings({ onBack }: ExpertEarningsProps) {
  // Mock data - trong thực tế sẽ lấy từ API
  const transactions: Transaction[] = [
    {
      id: '1',
      clientName: 'Trần Văn Anh',
      package: 'premium',
      packagePrice: 1699000,
      commission: 679600,
      commissionRate: 0.4,
      date: '2025-11-20',
      status: 'paid',
    },
    {
      id: '2',
      clientName: 'Nguyễn Thị Bình',
      package: 'standard',
      packagePrice: 1299000,
      commission: 519600,
      commissionRate: 0.4,
      date: '2025-11-18',
      status: 'paid',
    },
    {
      id: '3',
      clientName: 'Lê Văn Cường',
      package: 'basic',
      packagePrice: 499000,
      commission: 199600,
      commissionRate: 0.4,
      date: '2025-11-15',
      status: 'paid',
    },
    {
      id: '4',
      clientName: 'Phạm Thị Dung',
      package: 'premium',
      packagePrice: 1699000,
      commission: 679600,
      commissionRate: 0.4,
      date: '2025-11-12',
      status: 'paid',
    },
    {
      id: '5',
      clientName: 'Hoàng Văn Em',
      package: 'standard',
      packagePrice: 1299000,
      commission: 519600,
      commissionRate: 0.4,
      date: '2025-11-22',
      status: 'pending',
    },
    {
      id: '6',
      clientName: 'Đỗ Thị Phương',
      package: 'premium',
      packagePrice: 1699000,
      commission: 679600,
      commissionRate: 0.4,
      date: '2025-10-28',
      status: 'paid',
    },
    {
      id: '7',
      clientName: 'Vũ Văn Giang',
      package: 'basic',
      packagePrice: 499000,
      commission: 199600,
      commissionRate: 0.4,
      date: '2025-10-25',
      status: 'paid',
    },
    {
      id: '8',
      clientName: 'Bùi Thị Hoa',
      package: 'standard',
      packagePrice: 1299000,
      commission: 519600,
      commissionRate: 0.4,
      date: '2025-10-20',
      status: 'paid',
    },
  ];

  // Biểu đồ thu nhập theo tháng (6 tháng gần nhất)
  const monthlyEarnings = [
    { month: 'T6', total: 12500000, commission: 5000000, sessions: 15 },
    { month: 'T7', total: 15800000, commission: 6320000, sessions: 18 },
    { month: 'T8', total: 18200000, commission: 7280000, sessions: 21 },
    { month: 'T9', total: 21500000, commission: 8600000, sessions: 24 },
    { month: 'T10', total: 19800000, commission: 7920000, sessions: 22 },
    { month: 'T11', total: 23400000, commission: 9360000, sessions: 26 },
  ];

  // Phân bố thu nhập theo gói
  const packageDistribution = [
    { name: 'Cơ bản', value: 3992000, count: 20, color: '#3B82F6' },
    { name: 'Tiêu chuẩn', value: 10392000, count: 20, color: '#A855F7' },
    { name: 'Premium', value: 13592000, count: 20, color: '#EAB308' },
  ];

  // Biểu đồ xu hướng tuần (7 ngày gần nhất)
  const weeklyTrend = [
    { day: 'T2', earnings: 0 },
    { day: 'T3', earnings: 519600 },
    { day: 'T4', earnings: 0 },
    { day: 'T5', earnings: 679600 },
    { day: 'T6', earnings: 199600 },
    { day: 'T7', earnings: 519600 },
    { day: 'CN', earnings: 0 },
  ];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getPackageColor = (packageType: string) => {
    switch (packageType) {
      case 'premium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'standard':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'basic':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
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
      case 'paid':
        return 'bg-green-500';
      case 'pending':
        return 'bg-orange-500';
      case 'processing':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán';
      case 'pending':
        return 'Chờ xử lý';
      case 'processing':
        return 'Đang xử lý';
      default:
        return status;
    }
  };

  // Tính toán stats
  const totalEarnings = transactions.filter((t) => t.status === 'paid').reduce((sum, t) => sum + t.commission, 0);
  const pendingEarnings = transactions.filter((t) => t.status === 'pending').reduce((sum, t) => sum + t.commission, 0);
  const thisMonthEarnings = transactions
    .filter((t) => t.status === 'paid' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.commission, 0);
  const lastMonthEarnings = transactions
    .filter((t) => {
      const date = new Date(t.date);
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return t.status === 'paid' && date.getMonth() === lastMonth.getMonth();
    })
    .reduce((sum, t) => sum + t.commission, 0);

  const monthGrowth = lastMonthEarnings > 0 ? ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100 : 0;

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
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Download className="h-5 w-5 mr-2" />
              Xuất báo cáo
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Thu Nhập & Hoa Hồng</h1>
              <p className="text-white/80 text-sm">Hoa hồng 40% từ mỗi gói đăng ký</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {/* Total Earnings */}
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-green-500 to-green-600">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-white/80" />
              </div>
              <p className="text-white/80 text-sm mb-1">Tổng thu nhập</p>
              <p className="text-white text-xl">{formatCurrency(totalEarnings)}</p>
              <p className="text-white/70 text-xs mt-1">Đã thanh toán</p>
            </CardContent>
          </Card>

          {/* Month Earnings */}
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                {monthGrowth >= 0 ? (
                  <ArrowUpRight className="h-5 w-5 text-white/80" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-white/80" />
                )}
              </div>
              <p className="text-white/80 text-sm mb-1">Thu nhập tháng này</p>
              <p className="text-white text-xl">{formatCurrency(thisMonthEarnings)}</p>
              <p className="text-white/70 text-xs mt-1">
                {monthGrowth >= 0 ? '+' : ''}{monthGrowth.toFixed(1)}% so với tháng trước
              </p>
            </CardContent>
          </Card>

          {/* Pending Earnings */}
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-white/80 text-sm mb-1">Đang chờ xử lý</p>
              <p className="text-white text-xl">{formatCurrency(pendingEarnings)}</p>
              <p className="text-white/70 text-xs mt-1">Sẽ thanh toán sau 7 ngày</p>
            </CardContent>
          </Card>

          {/* Commission Rate */}
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
              </div>
              <p className="text-white/80 text-sm mb-1">Tỷ lệ hoa hồng</p>
              <p className="text-white text-xl">40%</p>
              <p className="text-white/70 text-xs mt-1">Cố định cho mọi gói</p>
            </CardContent>
          </Card>
        </div>

        {/* Commission Info Banner */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-blue-900 mb-1">Cơ chế hoa hồng 40%</h3>
                <p className="text-sm text-blue-700 mb-2">
                  Bạn nhận được 40% từ mỗi gói đăng ký:
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Gói Cơ bản (499,000₫): {formatCurrency(499000 * 0.4)}</li>
                  <li>• Gói Tiêu chuẩn (1,299,000₫): {formatCurrency(1299000 * 0.4)}</li>
                  <li>• Gói Premium (1,699,000₫): {formatCurrency(1699000 * 0.4)}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <Tabs defaultValue="monthly" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Theo tháng</TabsTrigger>
            <TabsTrigger value="weekly">Theo tuần</TabsTrigger>
            <TabsTrigger value="packages">Theo gói</TabsTrigger>
          </TabsList>

          {/* Monthly Chart */}
          <TabsContent value="monthly" className="mt-4">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
                <h3 className="text-primary">Thu nhập 6 tháng gần nhất</h3>
              </div>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Bar dataKey="commission" fill="#009689" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Trung bình/tháng</p>
                    <p className="text-sm text-primary">
                      {formatCurrency(
                        monthlyEarnings.reduce((sum, m) => sum + m.commission, 0) / monthlyEarnings.length
                      )}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Cao nhất</p>
                    <p className="text-sm text-green-600">
                      {formatCurrency(Math.max(...monthlyEarnings.map((m) => m.commission)))}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground mb-1">Tổng buổi tư vấn</p>
                    <p className="text-sm text-blue-600">
                      {monthlyEarnings.reduce((sum, m) => sum + m.sessions, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Weekly Chart */}
          <TabsContent value="weekly" className="mt-4">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
                <h3 className="text-primary">Thu nhập tuần này</h3>
              </div>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyTrend}>
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
                    <Line
                      type="monotone"
                      dataKey="earnings"
                      stroke="#009689"
                      strokeWidth={3}
                      dot={{ fill: '#009689', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Tổng thu nhập tuần này</p>
                  <p className="text-xl text-primary">
                    {formatCurrency(weeklyTrend.reduce((sum, d) => sum + d.earnings, 0))}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Package Distribution */}
          <TabsContent value="packages" className="mt-4">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
                <h3 className="text-primary">Phân bố thu nhập theo gói</h3>
              </div>
              <CardContent className="p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={packageDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {packageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {packageDistribution.map((pkg, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: pkg.color }} />
                        <span className="text-sm">{pkg.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {pkg.count} khách hàng
                        </Badge>
                      </div>
                      <span className="text-sm">{formatCurrency(pkg.value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Transactions History */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary">Lịch sử giao dịch</h3>
          </div>
          <CardContent className="p-0">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  index !== transactions.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm">{transaction.clientName}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                  </div>
                  <Badge className={`${getStatusColor(transaction.status)} text-white`}>
                    {getStatusLabel(transaction.status)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getPackageColor(transaction.package)}>
                    {getPackageLabel(transaction.package)}
                  </Badge>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Hoa hồng 40%</p>
                    <p className="text-sm text-primary">{formatCurrency(transaction.commission)}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
