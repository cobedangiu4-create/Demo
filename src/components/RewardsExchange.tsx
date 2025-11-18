import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Gift,
  Flame,
  Star,
  Trophy,
  Ticket,
  CreditCard,
  ShoppingBag,
  BookOpen,
  Zap,
  Crown,
  CheckCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: any;
  color: string;
  category: 'voucher' | 'feature' | 'premium' | 'special';
  available: number;
  badge?: string;
}

export default function RewardsExchange({ currentPoints }: { currentPoints: number }) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'voucher' | 'feature' | 'premium' | 'special'>('all');
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  const rewards: Reward[] = [
    {
      id: 'voucher1',
      title: 'Giảm 10% gói tư vấn',
      description: 'Áp dụng cho gói Cơ bản và Tiêu chuẩn',
      cost: 500,
      icon: Ticket,
      color: 'from-blue-500 to-cyan-500',
      category: 'voucher',
      available: 50,
    },
    {
      id: 'voucher2',
      title: 'Giảm 20% gói tư vấn',
      description: 'Áp dụng cho gói Premium',
      cost: 1000,
      icon: Ticket,
      color: 'from-purple-500 to-pink-500',
      category: 'voucher',
      available: 30,
      badge: 'HOT',
    },
    {
      id: 'voucher3',
      title: 'Miễn phí 1 buổi tư vấn',
      description: 'Gói Cơ bản 30 phút',
      cost: 2500,
      icon: Gift,
      color: 'from-orange-500 to-red-500',
      category: 'voucher',
      available: 10,
      badge: 'LIMITED',
    },
    {
      id: 'feature1',
      title: 'Báo cáo Pro 1 tháng',
      description: 'Truy cập báo cáo chi tiết và insights',
      cost: 800,
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      category: 'feature',
      available: 100,
    },
    {
      id: 'feature2',
      title: 'AI Chat Premium 1 tuần',
      description: 'Không giới hạn số lượng câu hỏi',
      cost: 600,
      icon: Zap,
      color: 'from-yellow-500 to-amber-500',
      category: 'feature',
      available: 200,
    },
    {
      id: 'premium1',
      title: 'VIP Member 1 tháng',
      description: 'Ưu tiên hỗ trợ + tính năng độc quyền',
      cost: 3000,
      icon: Crown,
      color: 'from-amber-500 to-orange-500',
      category: 'premium',
      available: 20,
      badge: 'VIP',
    },
    {
      id: 'premium2',
      title: 'Tư vấn cá nhân hóa',
      description: 'Kế hoạch tài chính riêng từ chuyên gia',
      cost: 4000,
      icon: Star,
      color: 'from-pink-500 to-rose-500',
      category: 'premium',
      available: 15,
      badge: 'PREMIUM',
    },
    {
      id: 'special1',
      title: 'Thẻ quà tặng 500k',
      description: 'Sử dụng cho mọi dịch vụ',
      cost: 6000,
      icon: CreditCard,
      color: 'from-indigo-500 to-purple-500',
      category: 'special',
      available: 5,
      badge: 'RARE',
    },
    {
      id: 'special2',
      title: 'Gặp mặt chuyên gia',
      description: 'Coffee talk 1-1 với financial advisor',
      cost: 8000,
      icon: Trophy,
      color: 'from-red-500 to-pink-500',
      category: 'special',
      available: 3,
      badge: 'EXCLUSIVE',
    },
  ];

  const categories = [
    { value: 'all' as const, label: 'Tất cả', icon: Sparkles },
    { value: 'voucher' as const, label: 'Voucher', icon: Ticket },
    { value: 'feature' as const, label: 'Tính năng', icon: Zap },
    { value: 'premium' as const, label: 'Premium', icon: Crown },
    { value: 'special' as const, label: 'Đặc biệt', icon: Trophy },
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(r => r.category === selectedCategory);

  const handleRedeem = (reward: Reward) => {
    if (currentPoints >= reward.cost && !redeemedRewards.includes(reward.id)) {
      setRedeemedRewards([...redeemedRewards, reward.id]);
      alert(`🎉 Đổi thành công "${reward.title}"!\n\nMã quà tặng sẽ được gửi qua email trong vòng 5 phút.`);
    } else if (currentPoints < reward.cost) {
      alert(`❌ Không đủ điểm!\n\nBạn cần ${reward.cost - currentPoints} 🔥 nữa để đổi phần thưởng này.`);
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'HOT': return 'bg-red-500';
      case 'LIMITED': return 'bg-orange-500';
      case 'VIP': return 'bg-amber-500';
      case 'PREMIUM': return 'bg-purple-500';
      case 'RARE': return 'bg-indigo-500';
      case 'EXCLUSIVE': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* Points Balance */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-[#FFDF20]/20 to-[#FFDF20]/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Điểm hiện tại</p>
              <div className="flex items-center gap-2">
                <Flame className="h-8 w-8 text-orange-500" />
                <h2 className="text-4xl">{currentPoints}</h2>
              </div>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Gift className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Đã đổi {redeemedRewards.length} phần thưởng</span>
              <span>{filteredRewards.length} phần thưởng có sẵn</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-gradient-to-r from-primary to-[#00a896] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Rewards Grid */}
      <div className="space-y-3">
        {filteredRewards.map((reward) => {
          const Icon = reward.icon;
          const isRedeemed = redeemedRewards.includes(reward.id);
          const canAfford = currentPoints >= reward.cost;

          return (
            <Card
              key={reward.id}
              className={`border-0 shadow-lg overflow-hidden transition-all ${
                isRedeemed ? 'opacity-60' : 'hover:shadow-xl'
              }`}
            >
              <CardContent className="p-0">
                <div className="flex items-center gap-4 p-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${reward.color} rounded-2xl flex items-center justify-center flex-shrink-0 relative`}>
                    <Icon className="h-8 w-8 text-white" />
                    {reward.badge && (
                      <div className={`absolute -top-1 -right-1 ${getBadgeColor(reward.badge)} text-white text-[10px] px-2 py-0.5 rounded-full`}>
                        {reward.badge}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm mb-1 flex items-center gap-2">
                      {reward.title}
                      {isRedeemed && (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">{reward.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">{reward.cost}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Còn {reward.available}
                        </Badge>
                      </div>

                      <Button
                        size="sm"
                        disabled={!canAfford || isRedeemed}
                        onClick={() => handleRedeem(reward)}
                        className={`${
                          canAfford && !isRedeemed
                            ? 'bg-gradient-to-r from-primary to-[#00a896]'
                            : ''
                        }`}
                      >
                        {isRedeemed ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Đã đổi
                          </>
                        ) : (
                          <>
                            Đổi ngay
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Progress bar if close to affording */}
                {!canAfford && !isRedeemed && currentPoints > reward.cost * 0.5 && (
                  <div className="px-4 pb-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Tiến độ đổi thưởng</span>
                        <span>{Math.round((currentPoints / reward.cost) * 100)}%</span>
                      </div>
                      <Progress value={(currentPoints / reward.cost) * 100} className="h-1.5" />
                      <p className="text-xs text-muted-foreground">
                        Còn thiếu {reward.cost - currentPoints} 🔥
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardContent className="p-4">
          <h4 className="text-sm text-blue-900 mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            💡 Mẹo tích điểm nhanh
          </h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Điểm danh hàng ngày: +10🔥/ngày</li>
            <li>• Hoàn thành nhiệm vụ tuần: +100🔥/tuần</li>
            <li>• Chơi mini game: +20🔥/cặp</li>
            <li>• Tham gia diễn đàn: +5🔥/bài viết</li>
            <li>• Cập nhật tiến độ: +20🔥/lần</li>
          </ul>
        </CardContent>
      </Card>

      {/* No Results */}
      {filteredRewards.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">Không có phần thưởng trong danh mục này</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}