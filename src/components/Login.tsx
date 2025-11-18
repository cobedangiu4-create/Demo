import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { TrendingUp, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onRegister: () => void;
  onForgotPassword?: () => void;
}

export default function Login({ onLogin, onRegister, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!email.includes('@')) {
      setError('Email không hợp lệ');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] via-white to-[#f0fdfa] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#009689] to-[#00a896] rounded-3xl mb-4 shadow-2xl">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl text-gray-900 mb-2">Chào mừng trở lại</h1>
          <p className="text-gray-600">Đăng nhập để tiếp tục quản lý tài chính</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className="pl-10 pr-10 h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#009689] to-[#00a896] hover:from-[#00a896] hover:to-[#009689] text-white shadow-lg"
              >
                Đăng nhập
              </Button>

              {/* Forgot Password */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-[#009689] hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Chưa có tài khoản?{' '}
            <button
              onClick={onRegister}
              className="text-[#009689] hover:underline"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>

        {/* Quick Demo Access */}
        <Card className="mt-4 border border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800 text-center mb-2">
              <span className="inline-block mr-1">✨</span>
              Dùng thử nhanh với tài khoản demo
            </p>
            <div className="text-xs text-yellow-700 space-y-1">
              <p>Email: demo@financeplanner.com</p>
              <p>Mật khẩu: demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}