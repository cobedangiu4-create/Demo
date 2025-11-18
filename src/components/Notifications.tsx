import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  ChevronLeft,
  Bell,
  Gift,
  Calendar,
  MessageCircle,
  TrendingUp,
  Users,
  CheckCircle,
  Trash2,
  Clock,
  Sparkles,
  Star,
  AlertCircle,
  Info,
} from 'lucide-react';

interface NotificationsProps {
  onBackHome: () => void;
}

interface Notification {
  id: string;
  type: 'checkin' | 'booking' | 'forum' | 'expert' | 'system' | 'achievement';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: any;
  color: string;
  action?: {
    label: string;
    handler: () => void;
  };
}

export default function Notifications({ onBackHome }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'checkin',
      title: 'Nhắc nhở điểm danh',
      message: 'Bạn chưa điểm danh hôm nay! Điểm danh ngay để nhận 10 điểm và duy trì chuỗi 4 ngày.',
      time: '2 phút trước',
      isRead: false,
      icon: Gift,
      color: 'bg-yellow-500',
    },
    {
      id: '2',
      type: 'booking',
      title: 'Đặt lịch thành công',
      message: 'Buổi tư vấn với TS. Nguyễn Văn An đã được xác nhận. Thời gian: 18/11/2024 lúc 14:00.',
      time: '1 giờ trước',
      isRead: false,
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      id: '3',
      type: 'forum',
      title: 'Bài viết mới: Cổ phiếu',
      message: 'TraderPro vừa đăng: "VNIndex phá đỉnh 1,300 điểm - Cơ hội hay rủi ro?" tại diễn đàn Cổ phiếu.',
      time: '3 giờ trước',
      isRead: false,
      icon: MessageCircle,
      color: 'bg-teal-500',
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Thành tích mới',
      message: 'Chúc mừng! Bạn đã đạt chuỗi điểm danh 7 ngày liên tiếp và nhận được 100 điểm thưởng.',
      time: '1 ngày trước',
      isRead: true,
      icon: Star,
      color: 'bg-purple-500',
    },
    {
      id: '5',
      type: 'expert',
      title: 'Nhắc nhở buổi tư vấn',
      message: 'Buổi tư vấn với ThS. Trần Thị Bình sẽ bắt đầu trong 1 giờ nữa. Vui lòng chuẩn bị tài liệu.',
      time: '1 ngày trước',
      isRead: true,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      id: '6',
      type: 'forum',
      title: 'Ai đó đã trả lời bình luận của bạn',
      message: 'GoldMaster đã trả lời bình luận của bạn trong chủ đề "Giá vàng thế giới tăng mạnh".',
      time: '2 ngày trước',
      isRead: true,
      icon: MessageCircle,
      color: 'bg-teal-500',
    },
    {
      id: '7',
      type: 'system',
      title: 'Cập nhật hệ thống',
      message: 'Phiên bản mới v2.1 đã có mặt với tính năng Chatbot AI và cải thiện hiệu suất.',
      time: '3 ngày trước',
      isRead: true,
      icon: Sparkles,
      color: 'bg-primary',
    },
    {
      id: '8',
      type: 'booking',
      title: 'Báo cáo tư vấn đã sẵn sàng',
      message: 'Báo cáo tư vấn từ TS. Nguyễn Văn An đã sẵn sàng. Nhấn để tải xuống.',
      time: '3 ngày trước',
      isRead: true,
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      id: '9',
      type: 'forum',
      title: 'Chủ đề đang trending',
      message: '"Bitcoin vượt $50K" đang là chủ đề hot nhất với 312 bình luận.',
      time: '4 ngày trước',
      isRead: true,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
    {
      id: '10',
      type: 'achievement',
      title: 'Cấp độ mới',
      message: 'Bạn đã đạt 500 điểm và lên cấp "Nhà đầu tư bạc". Nhận ưu đãi giảm 20% phí tư vấn.',
      time: '5 ngày trước',
      isRead: true,
      icon: Star,
      color: 'bg-purple-500',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'unread') return !notification.isRead;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const deleteAllRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.isRead));
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
              onClick={onBackHome}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            {unreadCount > 0 && (
              <Badge className="bg-[#FFDF20] text-[#030213]">
                {unreadCount} mới
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center relative">
              <Bell className="h-6 w-6 text-white" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFDF20] rounded-full flex items-center justify-center">
                  <span className="text-xs text-[#030213]">{unreadCount}</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-white text-xl">Thông Báo</h1>
              <p className="text-white/80 text-sm">
                {notifications.length} thông báo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Actions */}
        <div className="flex items-center justify-between mt-4 mb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'unread'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Chưa đọc ({unreadCount})
            </button>
          </div>

          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={markAllAsRead}
              className="text-xs"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Đọc tất cả
            </Button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-2 text-center">
              <Gift className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">
                {notifications.filter((n) => n.type === 'checkin').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-2 text-center">
              <Calendar className="h-5 w-5 text-green-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">
                {notifications.filter((n) => n.type === 'booking').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-2 text-center">
              <MessageCircle className="h-5 w-5 text-teal-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">
                {notifications.filter((n) => n.type === 'forum').length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-2 text-center">
              <Star className="h-5 w-5 text-purple-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">
                {notifications.filter((n) => n.type === 'achievement').length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`border-0 shadow-lg overflow-hidden transition-all ${
                    !notification.isRead
                      ? 'bg-gradient-to-r from-primary/5 to-white border-l-4 border-primary'
                      : 'bg-white'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 ${notification.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3
                            className={`text-sm ${
                              !notification.isRead ? '' : 'text-gray-600'
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>

                        <p
                          className={`text-xs mb-2 ${
                            !notification.isRead
                              ? 'text-gray-700'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{notification.time}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-primary hover:underline"
                              >
                                Đánh dấu đã đọc
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-muted-foreground hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Action Button */}
                        {notification.action && (
                          <Button
                            size="sm"
                            className="w-full mt-3 bg-primary hover:bg-primary/90"
                            onClick={notification.action.handler}
                          >
                            {notification.action.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">
                  {filter === 'unread'
                    ? 'Không có thông báo chưa đọc'
                    : 'Chưa có thông báo nào'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Clear All Read */}
        {notifications.filter((n) => n.isRead).length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4 text-red-600 border-red-300 hover:bg-red-50"
            onClick={deleteAllRead}
          >
            <Trash2 className="h-3 w-3 mr-2" />
            Xóa tất cả thông báo đã đọc
          </Button>
        )}

        {/* Info Card */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-blue-50 border-l-4 border-blue-500">
          <CardContent className="p-4">
            <h4 className="text-blue-900 mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              💡 Cài đặt thông báo
            </h4>
            <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
              <li>Bật thông báo để không bỏ lỡ điểm danh hàng ngày</li>
              <li>Nhận nhắc nhở trước 30 phút khi có buổi tư vấn</li>
              <li>Cập nhật bài viết mới từ diễn đàn yêu thích</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
