import { Card, CardContent } from './ui/card';
import { Award, DollarSign, Users, Calendar, TrendingUp, ArrowRight, Clock } from 'lucide-react';

interface ExpertHomeProps {
  onViewTotalEarnings: () => void;
  onViewMonthlyEarnings: () => void;
  onViewClients: () => void;
  onViewSessions: () => void;
  onViewProfile: () => void;
}

export default function ExpertHome({
  onViewTotalEarnings,
  onViewMonthlyEarnings,
  onViewClients,
  onViewSessions,
  onViewProfile,
}: ExpertHomeProps) {
  // Mock data - trong thực tế sẽ lấy từ API
  const totalEarnings = 45680000; // 45,680,000đ
  const monthlyEarnings = 8920000; // 8,920,000đ
  const totalClients = 24;
  const totalSessions = 48;
  const upcomingSessions = 3;
  const completedThisMonth = 12;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-purple-100 text-sm mb-1">Chào mừng trở lại</p>
            <h1 className="text-2xl">Chuyên gia Tài chính</h1>
          </div>
          <button
            onClick={onViewProfile}
            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <Award className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-purple-100 text-xs mb-1">Buổi hôm nay</p>
            <p className="text-2xl">{upcomingSessions}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-purple-100 text-xs mb-1">Hoàn thành tháng này</p>
            <p className="text-2xl">{completedThisMonth}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-4">
        {/* Tổng Thu Nhập */}
        <Card 
          className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          onClick={onViewTotalEarnings}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tổng Thu Nhập</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-3xl text-gray-900 mb-1">
                    {totalEarnings.toLocaleString('vi-VN')}₫
                  </p>
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12% so với tháng trước</span>
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>

        {/* Thu Nhập Tháng Này */}
        <Card 
          className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          onClick={onViewMonthlyEarnings}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Thu Nhập Tháng Này</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-3xl text-gray-900 mb-1">
                    {monthlyEarnings.toLocaleString('vi-VN')}₫
                  </p>
                  <p className="text-xs text-gray-500">
                    Từ {completedThisMonth} buổi tư vấn hoàn thành
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>

        {/* Tổng Số Khách Hàng */}
        <Card 
          className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          onClick={onViewClients}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tổng Số Khách Hàng</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-3xl text-gray-900 mb-1">
                    {totalClients}
                  </p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-green-600">18 Đang hoạt động</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">6 Hoàn thành</span>
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>

        {/* Tổng Số Buổi Tư Vấn */}
        <Card 
          className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          onClick={onViewSessions}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tổng Số Buổi Tư Vấn</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-3xl text-gray-900 mb-1">
                    {totalSessions}
                  </p>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-blue-600">{upcomingSessions} Sắp tới</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-green-600">{completedThisMonth} Tháng này</span>
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart Preview */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg text-gray-900 mb-4">Hiệu suất tuần này</h3>
            <div className="space-y-3">
              {[
                { day: 'T2', sessions: 2, earnings: 1480000 },
                { day: 'T3', sessions: 3, earnings: 2220000 },
                { day: 'T4', sessions: 1, earnings: 740000 },
                { day: 'T5', sessions: 2, earnings: 1480000 },
                { day: 'T6', sessions: 4, earnings: 2960000 },
              ].map((day) => (
                <div key={day.day} className="flex items-center gap-3">
                  <div className="w-8 text-sm text-gray-600">{day.day}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                          style={{ width: `${(day.sessions / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 w-16">
                        {day.sessions} buổi
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-900 w-24 text-right">
                    {day.earnings.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Card 
            className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={onViewSessions}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Xem lịch</p>
                  <p className="text-sm text-gray-900">Tư vấn</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-0 shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={onViewClients}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Quản lý</p>
                  <p className="text-sm text-gray-900">Khách hàng</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
