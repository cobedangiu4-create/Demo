import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  Award, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Star,
  TrendingUp,
  Users,
  Calendar,
  Edit,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface ExpertProfileProps {
  onBack: () => void;
  onSettings: () => void;
  onLogout: () => void;
  onEditProfile?: () => void;
}

export default function ExpertProfile({ onBack, onSettings, onLogout, onEditProfile }: ExpertProfileProps) {
  // Mock data - trong thực tế sẽ lấy từ API
  const expertData = {
    name: 'Nguyễn Văn Chuyên Gia',
    email: 'expert@monevo.com',
    phone: '0987654321',
    location: 'Hồ Chí Minh, Việt Nam',
    title: 'Chuyên gia Tư vấn Tài chính Cấp cao',
    experience: '8+ năm kinh nghiệm',
    education: 'Thạc sĩ Tài chính - Banking Academy',
    rating: 4.8,
    totalReviews: 156,
    specializations: [
      'Đầu tư chứng khoán',
      'Lập kế hoạch tài chính',
      'Quản lý rủi ro',
      'Bất động sản'
    ],
    stats: {
      totalClients: 24,
      totalSessions: 48,
      totalEarnings: 45680000,
      successRate: 94
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white px-6 pt-12 pb-24">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>
          <h1 className="text-xl absolute left-1/2 -translate-x-1/2">Hồ Sơ Chuyên Gia</h1>
          <button
            onClick={onSettings}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-16 mb-6">
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-6">
            {/* Avatar and Name */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Award className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl text-gray-900 mb-1 truncate">{expertData.name}</h2>
                <p className="text-sm text-purple-600 mb-2">{expertData.title}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-gray-900">{expertData.rating}</span>
                  <span className="text-sm text-gray-500">({expertData.totalReviews} đánh giá)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Briefcase className="w-3 h-3" />
                  <span>{expertData.experience}</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            {onEditProfile && (
              <Button
                onClick={onEditProfile}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa hồ sơ
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Khách hàng</p>
                  <p className="text-xl text-gray-900">{expertData.stats.totalClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Buổi tư vấn</p>
                  <p className="text-xl text-gray-900">{expertData.stats.totalSessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Tổng thu nhập</p>
                  <p className="text-sm text-gray-900">{(expertData.stats.totalEarnings / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Thành công</p>
                  <p className="text-xl text-gray-900">{expertData.stats.successRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Information Sections */}
      <div className="px-6 space-y-4">
        {/* Contact Info */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-sm text-gray-900 mb-4">Thông tin liên hệ</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-900 truncate">{expertData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Số điện thoại</p>
                  <p className="text-sm text-gray-900">{expertData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Địa điểm</p>
                  <p className="text-sm text-gray-900">{expertData.location}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Info */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-sm text-gray-900 mb-4">Thông tin chuyên môn</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-1">Học vấn</p>
                  <p className="text-sm text-gray-900">{expertData.education}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-2">Chuyên môn</p>
                  <div className="flex flex-wrap gap-2">
                    {expertData.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <Button
            onClick={onSettings}
            variant="outline"
            className="w-full justify-between h-14"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Cài đặt</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Button>

          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full justify-start h-14 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
}