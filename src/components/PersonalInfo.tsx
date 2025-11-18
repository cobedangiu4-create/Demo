import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ChevronLeft, User, Mail, Phone, MapPin, Calendar, Save, Camera } from 'lucide-react';

interface PersonalInfoProps {
  onBack: () => void;
}

export default function PersonalInfo({ onBack }: PersonalInfoProps) {
  const [userInfo, setUserInfo] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0912345678',
    birthDate: '1990-01-01',
    address: 'Hà Nội, Việt Nam',
    gender: 'male',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Call API to update user info
    alert('Cập nhật thông tin thành công!');
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
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-white hover:bg-white/20"
              >
                Chỉnh sửa
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Thông Tin Cá Nhân</h1>
              <p className="text-white/80 text-sm">Quản lý thông tin tài khoản</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Avatar Section */}
        <Card className="mt-4 border-0 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-[#00a896] rounded-full flex items-center justify-center text-4xl text-white">
                  👤
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-primary">
                    <Camera className="h-4 w-4 text-primary" />
                  </button>
                )}
              </div>
              <h3 className="mt-4 text-lg">{userInfo.fullName}</h3>
              <p className="text-sm text-muted-foreground">{userInfo.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Info Form */}
        <Card className="mt-4 border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3>Thông tin chi tiết</h3>
          </div>
          <CardContent className="p-4 space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-primary" />
                Họ và tên
              </Label>
              <Input
                id="fullName"
                value={userInfo.fullName}
                onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                disabled={!isEditing}
                className="disabled:opacity-100 disabled:cursor-default"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                disabled={!isEditing}
                className="disabled:opacity-100 disabled:cursor-default"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                Số điện thoại
              </Label>
              <Input
                id="phone"
                type="tel"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                disabled={!isEditing}
                className="disabled:opacity-100 disabled:cursor-default"
              />
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                Ngày sinh
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={userInfo.birthDate}
                onChange={(e) => setUserInfo({ ...userInfo, birthDate: e.target.value })}
                disabled={!isEditing}
                className="disabled:opacity-100 disabled:cursor-default"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-primary" />
                Giới tính
              </Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={userInfo.gender === 'male'}
                    onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                    disabled={!isEditing}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm">Nam</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={userInfo.gender === 'female'}
                    onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                    disabled={!isEditing}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm">Nữ</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={userInfo.gender === 'other'}
                    onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                    disabled={!isEditing}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm">Khác</span>
                </label>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                Địa chỉ
              </Label>
              <Input
                id="address"
                value={userInfo.address}
                onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                disabled={!isEditing}
                className="disabled:opacity-100 disabled:cursor-default"
              />
            </div>

            {/* Save/Cancel Buttons */}
            {isEditing && (
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsEditing(false)}
                >
                  Hủy
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-[#00a896]"
                  onClick={handleSave}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Lưu thay đổi
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Note */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-blue-50">
          <CardContent className="p-4">
            <p className="text-xs text-blue-700">
              💡 <strong>Lưu ý:</strong> Một số thông tin như email cần xác thực lại khi thay đổi để đảm bảo bảo mật.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
