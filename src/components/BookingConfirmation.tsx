import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import {
  CheckCircle,
  Calendar,
  Clock,
  Video,
  Phone,
  MessageCircle,
  User,
  Mail,
  MapPin,
  Download,
  Share2,
  Home,
} from 'lucide-react';

interface BookingConfirmationProps {
  onBackHome: () => void;
}

export default function BookingConfirmation({ onBackHome }: BookingConfirmationProps) {
  // Mock booking data
  const booking = {
    expertName: 'Nguyễn Minh Tuấn',
    expertTitle: 'Chuyên gia Tài chính Cá nhân',
    expertAvatar: '👨‍💼',
    date: '15/11/2024',
    time: '14:00',
    duration: '60 phút',
    type: 'video' as 'video' | 'call' | 'chat',
    price: 500000,
    bookingId: 'BK-2024-001234',
    customerName: 'Nguyễn Văn A',
    customerEmail: 'example@email.com',
    customerPhone: '0912345678',
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  const getTypeIcon = () => {
    switch (booking.type) {
      case 'video':
        return <Video className="h-5 w-5 text-blue-600" />;
      case 'call':
        return <Phone className="h-5 w-5 text-green-600" />;
      case 'chat':
        return <MessageCircle className="h-5 w-5 text-purple-600" />;
    }
  };

  const getTypeName = () => {
    switch (booking.type) {
      case 'video':
        return 'Video Call';
      case 'call':
        return 'Gọi điện';
      case 'chat':
        return 'Chat';
    }
  };

  const handleDownload = () => {
    alert('Tải xuống lịch hẹn...');
  };

  const handleShare = () => {
    alert('Chia sẻ lịch hẹn...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-[393px]">
        {/* Success Animation */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-4 animate-bounce">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl text-gray-900 mb-2">Đặt lịch thành công!</h1>
          <p className="text-muted-foreground">
            Chúng tôi đã gửi xác nhận đến email của bạn
          </p>
        </div>

        {/* Booking Details */}
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-[#00a896] p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl">
                {booking.expertAvatar}
              </div>
              <div>
                <h2 className="text-xl">{booking.expertName}</h2>
                <p className="text-white/80 text-sm">{booking.expertTitle}</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-white/70 text-xs mb-1">Mã đặt lịch</p>
              <p className="text-lg">{booking.bookingId}</p>
            </div>
          </div>

          <CardContent className="p-0">
            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-px bg-gray-200">
              <div className="bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Ngày</p>
                </div>
                <p className="text-lg">{booking.date}</p>
              </div>
              <div className="bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Giờ</p>
                </div>
                <p className="text-lg">{booking.time}</p>
              </div>
            </div>

            {/* Type & Duration */}
            <div className="grid grid-cols-2 gap-px bg-gray-200">
              <div className="bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  {getTypeIcon()}
                  <p className="text-xs text-muted-foreground">Hình thức</p>
                </div>
                <p className="text-base">{getTypeName()}</p>
              </div>
              <div className="bg-white p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Thời gian</p>
                </div>
                <p className="text-base">{booking.duration}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-gray-50 p-4 space-y-3">
              <h3 className="text-sm text-gray-900 mb-3">Thông tin khách hàng</h3>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Họ tên</p>
                  <p className="text-sm">{booking.customerName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm">{booking.customerEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Số điện thoại</p>
                  <p className="text-sm">{booking.customerPhone}</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-t-2 border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tổng chi phí</span>
                <span className="text-2xl text-primary">{formatCurrency(booking.price)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-blue-50 border-l-4 border-blue-500">
          <CardContent className="p-4">
            <h4 className="text-blue-900 mb-2">📌 Lưu ý quan trọng</h4>
            <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
              <li>Vui lòng có mặt đúng giờ để buổi tư vấn diễn ra hiệu quả</li>
              <li>Link tham gia sẽ được gửi qua email trước 30 phút</li>
              <li>Chuẩn bị trước các câu hỏi bạn muốn tư vấn</li>
              <li>Có thể hủy hoặc đổi lịch trước 24 giờ</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Button
            variant="outline"
            onClick={handleDownload}
            className="h-12 border-2"
          >
            <Download className="mr-2 h-4 w-4" />
            Tải xuống
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            className="h-12 border-2"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Chia sẻ
          </Button>
        </div>

        <Button
          onClick={onBackHome}
          className="w-full h-12 mt-3 bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90"
        >
          <Home className="mr-2 h-5 w-5" />
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}