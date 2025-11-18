import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { ChevronLeft, Lock, Eye, EyeOff, CheckCircle, XCircle, Shield } from 'lucide-react';

interface ChangePasswordProps {
  onBack: () => void;
}

export default function ChangePassword({ onBack }: ChangePasswordProps) {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (value: string) => {
    setPasswords({ ...passwords, new: value });
    setPasswordStrength(checkPasswordStrength(value));
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return { text: 'Yếu', color: 'text-red-600' };
    if (passwordStrength <= 3) return { text: 'Trung bình', color: 'text-yellow-600' };
    return { text: 'Mạnh', color: 'text-green-600' };
  };

  const isPasswordValid = passwords.new.length >= 8;
  const isPasswordMatch = passwords.new === passwords.confirm && passwords.confirm.length > 0;

  const handleSubmit = () => {
    if (!passwords.current) {
      alert('Vui lòng nhập mật khẩu hiện tại!');
      return;
    }
    if (!isPasswordValid) {
      alert('Mật khẩu mới phải có ít nhất 8 ký tự!');
      return;
    }
    if (!isPasswordMatch) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    
    // TODO: Call API to change password
    alert('Đổi mật khẩu thành công!');
    onBack();
  };

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
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Đổi Mật Khẩu</h1>
              <p className="text-white/80 text-sm">Cập nhật mật khẩu bảo mật</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Security Notice */}
        <Alert className="mt-4 border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-xs text-blue-700">
            Để bảo vệ tài khoản, hãy sử dụng mật khẩu mạnh với ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
          </AlertDescription>
        </Alert>

        {/* Password Form */}
        <Card className="mt-4 border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3>Thay đổi mật khẩu</h3>
          </div>
          <CardContent className="p-4 space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-sm">
                Mật khẩu hiện tại
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm">
                Mật khẩu mới
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwords.new}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Nhập mật khẩu mới"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {/* Password Strength */}
              {passwords.new && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          level <= passwordStrength
                            ? passwordStrength <= 1
                              ? 'bg-red-500'
                              : passwordStrength <= 3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${getStrengthLabel().color}`}>
                    Độ mạnh: {getStrengthLabel().text}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm">
                Xác nhận mật khẩu mới
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="Nhập lại mật khẩu mới"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {passwords.confirm && (
                <div className="flex items-center gap-2">
                  {isPasswordMatch ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-green-600">Mật khẩu khớp</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span className="text-xs text-red-600">Mật khẩu không khớp</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Password Requirements */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gray-50">
          <CardContent className="p-4">
            <h4 className="text-sm mb-3">Yêu cầu mật khẩu:</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className={`h-4 w-4 flex-shrink-0 ${passwords.new.length >= 8 ? 'text-green-600' : 'text-gray-400'}`} />
                <span>Ít nhất 8 ký tự</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className={`h-4 w-4 flex-shrink-0 ${/[a-z]/.test(passwords.new) && /[A-Z]/.test(passwords.new) ? 'text-green-600' : 'text-gray-400'}`} />
                <span>Bao gồm chữ hoa và chữ thường</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className={`h-4 w-4 flex-shrink-0 ${/[0-9]/.test(passwords.new) ? 'text-green-600' : 'text-gray-400'}`} />
                <span>Có ít nhất một số</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className={`h-4 w-4 flex-shrink-0 ${/[^a-zA-Z0-9]/.test(passwords.new) ? 'text-green-600' : 'text-gray-400'}`} />
                <span>Có ít nhất một ký tự đặc biệt (@, #, $, v.v.)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!passwords.current || !isPasswordValid || !isPasswordMatch}
          className="w-full mt-4 h-12 bg-gradient-to-r from-primary to-[#00a896] disabled:opacity-50"
        >
          <Lock className="mr-2 h-5 w-5" />
          Đổi mật khẩu
        </Button>
      </div>
    </div>
  );
}
