import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ChevronLeft, Mail, Phone, MessageCircle, Send, Clock, MapPin, CheckCircle } from 'lucide-react';

interface ContactSupportProps {
  onBack: () => void;
}

export default function ContactSupport({ onBack }: ContactSupportProps) {
  const [formData, setFormData] = useState({
    subject: '',
    category: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { value: 'general', label: 'Câu hỏi chung' },
    { value: 'technical', label: 'Vấn đề kỹ thuật' },
    { value: 'payment', label: 'Thanh toán' },
    { value: 'expert', label: 'Tư vấn chuyên gia' },
    { value: 'account', label: 'Tài khoản' },
    { value: 'other', label: 'Khác' },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@financeplanner.vn',
      description: 'Phản hồi trong 24h',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Hotline',
      value: '1900 xxxx',
      description: '8:00 - 22:00 hàng ngày',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      value: 'Chat ngay',
      description: 'Hỗ trợ trực tuyến',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to send support ticket
    setSubmitted(true);
    setTimeout(() => {
      onBack();
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white flex items-center justify-center p-4">
        <Card className="border-0 shadow-2xl max-w-sm">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl mb-2">Gửi thành công!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Chúng tôi đã nhận được yêu cầu hỗ trợ của bạn. Đội ngũ sẽ phản hồi trong vòng 24h qua email.
            </p>
            <p className="text-xs text-muted-foreground">
              Mã ticket: #SP{Date.now().toString().slice(-6)}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white pb-20">
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
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Liên Hệ Hỗ Trợ</h1>
              <p className="text-white/80 text-sm">Chúng tôi sẵn sàng giúp bạn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Contact Methods */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <button
                key={index}
                className="bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl mx-auto mb-2 flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs mb-1">{method.title}</p>
                <p className="text-[10px] text-muted-foreground">{method.description}</p>
              </button>
            );
          })}
        </div>

        {/* Office Info */}
        <Card className="mt-4 border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Văn phòng
            </h3>
          </div>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">Tầng 12, Tòa nhà Bitexco Financial Tower</p>
                <p className="text-xs text-muted-foreground">2 Hải Triều, Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">Giờ làm việc</p>
                <p className="text-xs text-muted-foreground">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                <p className="text-xs text-muted-foreground">Thứ 7: 8:00 - 12:00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Form */}
        <Card className="mt-4 border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 border-b">
            <h3>Gửi yêu cầu hỗ trợ</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Điền form bên dưới, chúng tôi sẽ phản hồi sớm nhất
            </p>
          </div>
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm">
                  Loại vấn đề
                </Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm">
                  Tiêu đề
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Nhập tiêu đề vấn đề..."
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm">
                  Nội dung chi tiết
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                  rows={6}
                  required
                  className="resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-[#00a896]"
              >
                <Send className="mr-2 h-5 w-5" />
                Gửi yêu cầu
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm text-green-900 mb-1">Thời gian phản hồi</h4>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>• Email: Trong vòng 24h</li>
                  <li>• Hotline: Ngay lập tức (giờ làm việc)</li>
                  <li>• Live Chat: 2-5 phút</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}