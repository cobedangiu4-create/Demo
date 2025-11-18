import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ChevronLeft, Mail, CheckCircle, ArrowRight } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

export default function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'input' | 'sent'>('input');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to send reset password email
    setStep('sent');
  };

  if (step === 'sent') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-[#00a896] to-primary flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl mb-3">Email đã được gửi!</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Chúng tôi đã gửi link đặt lại mật khẩu đến email <strong>{email}</strong>
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-xs text-blue-900 mb-2">📧 Kiểm tra hộp thư của bạn</p>
              <ul className="text-xs text-blue-700 space-y-1 text-left">
                <li>• Link có hiệu lực trong 1 giờ</li>
                <li>• Kiểm tra cả thư mục Spam nếu không thấy</li>
                <li>• Liên hệ hỗ trợ nếu không nhận được email</li>
              </ul>
            </div>
            <Button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-primary to-[#00a896] h-12"
            >
              Quay lại đăng nhập
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setStep('input')}
              className="w-full mt-3"
            >
              Gửi lại email
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-[#00a896] to-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white hover:bg-white/20 mb-4 -ml-2"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Quay lại
        </Button>

        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8">
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            {/* Title */}
            <h2 className="text-2xl text-center mb-2">Quên mật khẩu?</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Nhập email đăng ký để nhận link đặt lại mật khẩu
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">
                  Email đã đăng ký
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-primary to-[#00a896] text-white"
              >
                Gửi link đặt lại mật khẩu
              </Button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-900">
                <strong>💡 Lưu ý:</strong> Nếu email không tồn tại trong hệ thống, bạn sẽ không nhận được email. Vui lòng kiểm tra lại email hoặc đăng ký tài khoản mới.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/80">
            Cần hỗ trợ?{' '}
            <button className="underline hover:text-white transition-colors">
              Liên hệ chúng tôi
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
