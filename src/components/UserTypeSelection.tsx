import { Card, CardContent } from './ui/card';
import { TrendingUp, Users, Award, ArrowRight } from 'lucide-react';

interface UserTypeSelectionProps {
  onSelectUserType: (userType: 'customer' | 'expert') => void;
}

export default function UserTypeSelection({ onSelectUserType }: UserTypeSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] via-white to-[#f0fdfa] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#009689] to-[#00a896] rounded-3xl mb-6 shadow-2xl">
            <TrendingUp className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl text-gray-900 mb-3">Chào mừng đến với</h1>
          <h2 className="text-3xl text-[#009689] mb-4">MONEVO</h2>
          <p className="text-gray-600">Bạn là khách hàng hay chuyên gia tư vấn?</p>
        </div>

        {/* User Type Options */}
        <div className="space-y-4">
          {/* Customer Option */}
          <Card 
            className="border-2 border-gray-200 hover:border-[#009689] transition-all cursor-pointer group overflow-hidden"
            onClick={() => onSelectUserType('customer')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#009689] to-[#00a896] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl text-gray-900 mb-1">Khách hàng</h3>
                  <p className="text-sm text-gray-600">
                    Quản lý tài chính cá nhân, đầu tư và tiết kiệm
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-6 h-6 text-[#009689] group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Features */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#009689]"></div>
                    <span>Lập kế hoạch tài chính</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#009689]"></div>
                    <span>Theo dõi tiến độ</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#009689]"></div>
                    <span>Tư vấn AI miễn phí</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#009689]"></div>
                    <span>Diễn đàn cộng đồng</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expert Option */}
          <Card 
            className="border-2 border-gray-200 hover:border-purple-500 transition-all cursor-pointer group overflow-hidden"
            onClick={() => onSelectUserType('expert')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl text-gray-900 mb-1">Chuyên gia</h3>
                  <p className="text-sm text-gray-600">
                    Tư vấn tài chính chuyên nghiệp và kiếm thu nhập
                  </p>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-6 h-6 text-purple-500 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Features */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span>Quản lý khách hàng</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span>Lịch tư vấn</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span>Hoa hồng 40%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span>Dashboard chuyên nghiệp</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Bạn có thể thay đổi loại tài khoản sau khi đăng ký
          </p>
        </div>
      </div>
    </div>
  );
}