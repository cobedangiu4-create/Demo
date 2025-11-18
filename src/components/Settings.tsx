import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import {
  ChevronLeft,
  ChevronRight,
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Globe,
  Moon,
  HelpCircle,
  FileText,
  Mail,
  Shield,
  Database,
  LogOut,
  Smartphone,
  Eye,
  Key,
  Trash2,
  AlertCircle,
} from 'lucide-react';

interface SettingsProps {
  onBackHome: () => void;
  onBack: () => void;
  onPersonalInfo?: () => void;
  onChangePassword?: () => void;
  onHelpCenter?: () => void;
  onContactSupport?: () => void;
  onTermsOfService?: () => void;
  onPrivacyPolicy?: () => void;
  onLogout?: () => void;
}

export default function Settings({ 
  onBackHome, 
  onBack,
  onPersonalInfo,
  onChangePassword,
  onHelpCenter,
  onContactSupport,
  onTermsOfService,
  onPrivacyPolicy,
  onLogout,
}: SettingsProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [settings, setSettings] = useState({
    // Thông báo
    pushNotifications: true,
    emailNotifications: false,
    checkInReminder: true,
    consultationReminder: true,
    forumUpdates: true,
    weeklyReport: true,

    // Bảo mật
    biometricLogin: true,
    twoFactorAuth: false,

    // Giao diện
    darkMode: false,
    language: 'vi',

    // Quyền riêng tư
    showProfile: true,
    showActivity: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settingsSections = [
    {
      title: 'Tài khoản',
      icon: User,
      items: [
        {
          icon: User,
          label: 'Thông tin cá nhân',
          description: 'Quản lý thông tin tài khoản',
          action: () => onPersonalInfo?.(),
          type: 'navigate',
        },
        {
          icon: Key,
          label: 'Đổi mật khẩu',
          description: 'Cập nhật mật khẩu bảo mật',
          action: () => onChangePassword?.(),
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Thông báo',
      icon: Bell,
      items: [
        {
          icon: Smartphone,
          label: 'Thông báo đẩy',
          description: 'Nhận thông báo trên thiết bị',
          setting: 'pushNotifications',
          type: 'toggle',
        },
        {
          icon: Mail,
          label: 'Thông báo email',
          description: 'Nhận thông báo qua email',
          setting: 'emailNotifications',
          type: 'toggle',
        },
        {
          icon: Bell,
          label: 'Nhắc điểm danh',
          description: 'Nhắc nhở điểm danh hàng ngày',
          setting: 'checkInReminder',
          type: 'toggle',
        },
        {
          icon: Bell,
          label: 'Nhắc buổi tư vấn',
          description: 'Nhắc trước 30 phút',
          setting: 'consultationReminder',
          type: 'toggle',
        },
        {
          icon: Bell,
          label: 'Cập nhật diễn đàn',
          description: 'Thông báo bài viết mới',
          setting: 'forumUpdates',
          type: 'toggle',
        },
        {
          icon: Mail,
          label: 'Báo cáo tuần',
          description: 'Tổng kết tài chính hàng tuần',
          setting: 'weeklyReport',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Bảo mật & Quyền riêng tư',
      icon: Lock,
      items: [
        {
          icon: Eye,
          label: 'Đăng nhập sinh học',
          description: 'Vân tay / Face ID',
          setting: 'biometricLogin',
          type: 'toggle',
        },
        {
          icon: Shield,
          label: 'Xác thực 2 bước',
          description: 'Tăng cường bảo mật',
          setting: 'twoFactorAuth',
          type: 'toggle',
        },
        {
          icon: Eye,
          label: 'Hiển thị hồ sơ',
          description: 'Cho phép người khác xem hồ sơ',
          setting: 'showProfile',
          type: 'toggle',
        },
        {
          icon: Database,
          label: 'Hiển thị hoạt động',
          description: 'Chia sẻ hoạt động với cộng đồng',
          setting: 'showActivity',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Giao diện',
      icon: Moon,
      items: [
        {
          icon: Moon,
          label: 'Chế độ tối',
          description: 'Giao diện tối dễ nhìn hơn',
          setting: 'darkMode',
          type: 'toggle',
        },
        {
          icon: Globe,
          label: 'Ngôn ngữ',
          description: 'Tiếng Việt',
          action: () => console.log('Change language'),
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Hỗ trợ',
      icon: HelpCircle,
      items: [
        {
          icon: HelpCircle,
          label: 'Trung tâm trợ giúp',
          description: 'Câu hỏi thường gặp và hướng dẫn',
          action: onHelpCenter,
          type: 'navigate',
        },
        {
          icon: Mail,
          label: 'Liên hệ hỗ trợ',
          description: 'support@financeplanner.vn',
          action: onContactSupport,
          type: 'navigate',
        },
        {
          icon: FileText,
          label: 'Điều khoản dịch vụ',
          description: 'Chính sách và điều khoản',
          action: onTermsOfService,
          type: 'navigate',
        },
        {
          icon: Shield,
          label: 'Chính sách bảo mật',
          description: 'Cách chúng tôi bảo vệ dữ liệu',
          action: onPrivacyPolicy,
          type: 'navigate',
        },
      ],
    },
    {
      title: 'Dữ liệu',
      icon: Database,
      items: [
        {
          icon: Database,
          label: 'Xuất dữ liệu',
          description: 'Tải xuống dữ liệu của bạn',
          action: () => console.log('Export data'),
          type: 'navigate',
        },
        {
          icon: Trash2,
          label: 'Xóa tài khoản',
          description: 'Xóa vĩnh viễn tài khoản',
          action: () => console.log('Delete account'),
          type: 'navigate',
          danger: true,
        },
      ],
    },
  ];

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
              <SettingsIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Cài Đặt</h1>
              <p className="text-white/80 text-sm">
                Tùy chỉnh ứng dụng theo ý muốn
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {settingsSections.map((section, sectionIndex) => {
          const SectionIcon = section.icon;
          return (
            <div key={sectionIndex} className="mt-4">
              <h3 className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <SectionIcon className="h-4 w-4" />
                {section.title}
              </h3>

              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  {section.items.map((item, itemIndex) => {
                    const ItemIcon = item.icon;
                    const isLast = itemIndex === section.items.length - 1;

                    return (
                      <div key={itemIndex}>
                        <div
                          className={`p-4 ${
                            item.type === 'navigate' ? 'cursor-pointer hover:bg-gray-50' : ''
                          } ${item.danger ? 'bg-red-50' : ''}`}
                          onClick={
                            item.type === 'navigate' && item.action
                              ? item.action
                              : undefined
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <div
                                className={`w-10 h-10 ${
                                  item.danger ? 'bg-red-100' : 'bg-gray-100'
                                } rounded-lg flex items-center justify-center`}
                              >
                                <ItemIcon
                                  className={`h-5 w-5 ${
                                    item.danger ? 'text-red-600' : 'text-gray-600'
                                  }`}
                                />
                              </div>
                              <div className="flex-1">
                                <p
                                  className={`text-sm mb-1 ${
                                    item.danger ? 'text-red-600' : ''
                                  }`}
                                >
                                  {item.label}
                                </p>
                                <p
                                  className={`text-xs ${
                                    item.danger ? 'text-red-500' : 'text-muted-foreground'
                                  }`}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </div>

                            {item.type === 'toggle' && item.setting && (
                              <Switch
                                checked={settings[item.setting as keyof typeof settings] as boolean}
                                onCheckedChange={() =>
                                  toggleSetting(item.setting as keyof typeof settings)
                                }
                              />
                            )}

                            {item.type === 'navigate' && (
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                        {!isLast && <div className="h-px bg-gray-100 mx-4"></div>}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          );
        })}

        {/* App Version */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Phiên bản ứng dụng</p>
            <p className="text-xs text-muted-foreground">v2.1.0 (Build 2024.11.15)</p>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full mt-4 text-red-600 border-red-300 hover:bg-red-50"
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Đăng Xuất
        </Button>

        {/* Logout Dialog */}
        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Đăng Xuất</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Không</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={onLogout}
              >
                Đăng Xuất
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}