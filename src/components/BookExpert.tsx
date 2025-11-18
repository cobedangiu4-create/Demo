import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
  ChevronLeft,
  Calendar,
  Clock,
  MessageCircle,
  Phone,
  Video,
  CheckCircle,
  User,
  Mail,
} from 'lucide-react';

interface BookExpertProps {
  onConfirm: () => void;
  onBack: () => void;
}

export default function BookExpert({ onConfirm, onBack }: BookExpertProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'chat' | 'call' | 'video'>('video');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Mock expert data - trong thực tế sẽ lấy từ database
  const expert = {
    name: 'Nguyễn Minh Tuấn',
    title: 'Chuyên gia Tài chính Cá nhân',
    avatar: '👨‍💼',
    hourlyRate: 500000,
  };

  // Available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date;
  });

  // Available time slots
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00',
  ];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    });
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime || !fullName || !email || !phone) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    onConfirm();
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
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Đặt Lịch Tư Vấn</h1>
              <p className="text-white/80 text-sm">Chọn thời gian phù hợp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Expert Info */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow-md">
                {expert.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-gray-900">{expert.name}</h3>
                <p className="text-sm text-muted-foreground">{expert.title}</p>
                <p className="text-sm text-primary mt-1">
                  {formatCurrency(expert.hourlyRate)}/giờ
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Consultation Type */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary">Hình thức tư vấn</h3>
          </div>
          <CardContent className="p-4">
            <RadioGroup value={consultationType} onValueChange={(value: any) => setConsultationType(value)}>
              <div className="space-y-3">
                <div
                  className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    consultationType === 'video'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => setConsultationType('video')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Video className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm">Video Call</p>
                      <p className="text-xs text-muted-foreground">Tư vấn trực tiếp qua video</p>
                    </div>
                  </div>
                  <RadioGroupItem value="video" />
                </div>

                <div
                  className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    consultationType === 'call'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => setConsultationType('call')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm">Gọi điện</p>
                      <p className="text-xs text-muted-foreground">Tư vấn qua điện thoại</p>
                    </div>
                  </div>
                  <RadioGroupItem value="call" />
                </div>

                <div
                  className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    consultationType === 'chat'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => setConsultationType('chat')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm">Chat</p>
                      <p className="text-xs text-muted-foreground">Tư vấn qua tin nhắn</p>
                    </div>
                  </div>
                  <RadioGroupItem value="chat" />
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Chọn ngày
            </h3>
          </div>
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-2">
              {availableDates.map((date, index) => {
                const dateStr = date.toISOString().split('T')[0];
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-2 rounded-lg border-2 text-center transition-all ${
                      selectedDate === dateStr
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <p className="text-xs">{formatDate(date)}</p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Time Selection */}
        {selectedDate && (
          <Card className="mt-4 border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
              <h3 className="text-primary flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Chọn giờ
              </h3>
            </div>
            <CardContent className="p-4">
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg border-2 text-sm transition-all ${
                      selectedTime === time
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        {selectedTime && (
          <Card className="mt-4 border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
              <h3 className="text-primary">Thông tin liên hệ</h3>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Họ và tên
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="border-2 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="border-2 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912345678"
                  className="border-2 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Nội dung cần tư vấn (tùy chọn)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mô tả ngắn gọn về vấn đề bạn muốn tư vấn..."
                  rows={4}
                  className="border-2 focus:border-primary"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirm Button */}
        {selectedDate && selectedTime && (
          <Button
            onClick={handleConfirm}
            className="w-full h-12 mt-6 bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90 text-base"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Xác nhận đặt lịch
          </Button>
        )}
      </div>
    </div>
  );
}