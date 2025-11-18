import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  ChevronLeft,
  User,
  Star,
  Trophy,
  Zap,
  Target,
  Calendar,
  Award,
  TrendingUp,
  Gift,
  Clock,
  CheckCircle,
  Crown,
  Settings,
  Edit,
  Camera,
  Share2,
  MessageCircle,
  Users,
} from 'lucide-react';

interface ProfileProps {
  onBackHome: () => void;
  onSettings: () => void;
}

export default function Profile({ onBackHome, onSettings }: ProfileProps) {
  const [user] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0912 345 678',
    joinDate: '15/08/2024',
    avatar: 'NVA',
    level: 'Gold',
    levelNumber: 3,
    points: 850,
    nextLevelPoints: 1000,
    checkInStreak: 7,
    longestStreak: 14,
    totalConsultations: 5,
    totalForumPosts: 23,
    savings: 45000000,
  });

  const achievements = [
    {
      id: '1',
      icon: Calendar,
      title: 'Điểm danh 7 ngày',
      description: 'Duy trì chuỗi điểm danh 7 ngày liên tiếp',
      points: 100,
      color: 'bg-yellow-500',
      unlocked: true,
      unlockedDate: '10/11/2024',
    },
    {
      id: '2',
      icon: Target,
      title: 'Mục tiêu đầu tiên',
      description: 'Hoàn thành thiết lập mục tiêu tài chính',
      points: 50,
      color: 'bg-green-500',
      unlocked: true,
      unlockedDate: '15/10/2024',
    },
    {
      id: '3',
      icon: MessageCircle,
      title: 'Người đóng góp',
      description: 'Đăng 10 bài viết trên diễn đàn',
      points: 150,
      color: 'bg-teal-500',
      unlocked: true,
      unlockedDate: '05/11/2024',
    },
    {
      id: '4',
      icon: Trophy,
      title: 'Tiết kiệm 50 triệu',
      description: 'Đạt mốc tiết kiệm 50 triệu đồng',
      points: 200,
      color: 'bg-blue-500',
      unlocked: false,
      progress: 90,
    },
    {
      id: '5',
      icon: Crown,
      title: 'Vua/Nữ hoàng tài chính',
      description: 'Đạt cấp độ Kim cương',
      points: 500,
      color: 'bg-purple-500',
      unlocked: false,
      progress: 42,
    },
    {
      id: '6',
      icon: Users,
      title: 'Chuyên gia tin cậy',
      description: 'Tư vấn với 10 chuyên gia',
      points: 300,
      color: 'bg-orange-500',
      unlocked: false,
      progress: 50,
    },
  ];

  const levels = [
    { name: 'Bronze', icon: '🥉', min: 0, max: 249, color: 'bg-orange-700' },
    { name: 'Silver', icon: '🥈', min: 250, max: 499, color: 'bg-gray-400' },
    { name: 'Gold', icon: '🥇', min: 500, max: 999, color: 'bg-yellow-500' },
    { name: 'Diamond', icon: '💎', min: 1000, max: Infinity, color: 'bg-purple-500' },
  ];

  const currentLevel = levels.find(
    (level) => user.points >= level.min && user.points <= level.max
  )!;
  const nextLevel = levels[levels.findIndex((l) => l.name === currentLevel.name) + 1];
  const progressToNextLevel = nextLevel
    ? ((user.points - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
    : 100;

  const stats = [
    {
      icon: Calendar,
      label: 'Chuỗi hiện tại',
      value: `${user.checkInStreak} ngày`,
      color: 'text-yellow-600',
    },
    {
      icon: Trophy,
      label: 'Chuỗi dài nhất',
      value: `${user.longestStreak} ngày`,
      color: 'text-orange-600',
    },
    {
      icon: MessageCircle,
      label: 'Bài viết',
      value: `${user.totalForumPosts}`,
      color: 'text-teal-600',
    },
    {
      icon: Users,
      label: 'Tư vấn',
      value: `${user.totalConsultations}`,
      color: 'text-blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-[#00a896] to-primary shadow-lg pb-20">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackHome}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettings}
              className="text-white hover:bg-white/20 -mr-2"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Card - Overlapping Header */}
      <div className="px-4 -mt-16 pb-6">
        <Card className="border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center -mt-20 mb-4">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-[#00a896] rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                  <span className="text-2xl text-white">{user.avatar}</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary">
                  <Camera className="h-4 w-4 text-primary" />
                </button>
              </div>

              {/* Name and Level */}
              <h2 className="text-xl mt-4 mb-1">{user.name}</h2>
              <p className="text-sm text-muted-foreground mb-3">{user.email}</p>

              {/* Level Badge */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`px-4 py-2 ${currentLevel.color} text-white rounded-full flex items-center gap-2 shadow-lg`}
                >
                  <span className="text-lg">{currentLevel.icon}</span>
                  <span className="text-sm">{currentLevel.name}</span>
                </div>
                <Badge className="bg-[#FFDF20] text-[#030213]">
                  <Star className="h-3 w-3 mr-1" />
                  {user.points} điểm
                </Badge>
              </div>

              {/* Progress to Next Level */}
              {nextLevel && (
                <div className="w-full">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>
                      {currentLevel.name} {currentLevel.icon}
                    </span>
                    <span>
                      {user.points}/{nextLevel.min}
                    </span>
                    <span>
                      {nextLevel.name} {nextLevel.icon}
                    </span>
                  </div>
                  <Progress value={progressToNextLevel} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Còn {nextLevel.min - user.points} điểm để lên cấp
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1" size="sm">
                <Edit className="h-3 w-3 mr-1" />
                Chỉnh sửa
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <Share2 className="h-3 w-3 mr-1" />
                Chia sẻ
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <Icon className={`h-5 w-5 ${stat.color} mb-2`} />
                  <p className="text-2xl mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Member Since */}
        <Card className="mt-4 border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm">Thành viên từ</p>
                  <p className="text-xs text-muted-foreground">{user.joinDate}</p>
                </div>
              </div>
              <Badge variant="outline">
                {Math.floor(
                  (new Date().getTime() - new Date('2024-08-15').getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{' '}
                ngày
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-[#FFDF20]" />
              Thành Tích
            </h3>
            <Badge variant="outline">
              {achievements.filter((a) => a.unlocked).length}/
              {achievements.length}
            </Badge>
          </div>

          <div className="space-y-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card
                  key={achievement.id}
                  className={`border-0 shadow-lg overflow-hidden ${
                    achievement.unlocked ? '' : 'opacity-50'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 ${achievement.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <h4 className="text-sm">{achievement.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                          <Badge
                            className={`${
                              achievement.unlocked
                                ? 'bg-[#FFDF20] text-[#030213]'
                                : 'bg-gray-200 text-gray-600'
                            } flex-shrink-0`}
                          >
                            +{achievement.points}
                          </Badge>
                        </div>

                        {achievement.unlocked ? (
                          <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                            <CheckCircle className="h-3 w-3" />
                            <span>Đạt được ngày {achievement.unlockedDate}</span>
                          </div>
                        ) : (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>Tiến độ</span>
                              <span>{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Rewards Info */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gradient-to-r from-[#FFDF20]/20 to-primary/10 border-l-4 border-[#FFDF20]">
          <CardContent className="p-4">
            <h4 className="text-primary mb-2 flex items-center gap-2">
              <Gift className="h-4 w-4" />
              💡 Ưu đãi theo cấp độ
            </h4>
            <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
              <li>
                <strong>Gold:</strong> Giảm 20% phí tư vấn chuyên gia
              </li>
              <li>
                <strong>Diamond:</strong> Miễn phí 1 buổi tư vấn/tháng
              </li>
              <li>Tích điểm đổi voucher và quà tặng</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}