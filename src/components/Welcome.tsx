import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, Target, TrendingUp, Gift, Users, Calendar, ArrowRight, Check } from 'lucide-react';

interface WelcomeProps {
  onComplete: () => void;
  userName?: string;
}

export default function Welcome({ onComplete, userName = 'bạn' }: WelcomeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Target,
      title: 'Đặt mục tiêu tài chính',
      description: 'Tạo kế hoạch tiết kiệm thông minh với công thức SMART',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: 'Theo dõi tiến độ',
      description: 'Cập nhật thu chi và xem tiến độ đạt mục tiêu real-time',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Users,
      title: 'Tư vấn chuyên gia',
      description: 'Kết nối với chuyên gia tài chính có chứng chỉ CFA/CFP',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Gift,
      title: 'Nhận thưởng hấp dẫn',
      description: 'Điểm danh hàng ngày, hoàn thành nhiệm vụ để đổi quà',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const benefits = [
    'Phân tích tài chính tự động với AI',
    'Biểu đồ trực quan dễ hiểu',
    'Công cụ tính toán đa dạng',
    'Diễn đàn cộng đồng năng động',
    'Bảo mật thông tin tuyệt đối',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-[#00a896] to-primary relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '2s',
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Welcome Message */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-6 flex items-center justify-center">
              <Sparkles className="h-12 w-12 text-[#FFDF20] animate-pulse" />
            </div>
            <h1 className="text-3xl text-white mb-3">
              Chào mừng {userName}! 🎉
            </h1>
            <p className="text-white/90 text-lg">
              Bắt đầu hành trình tài chính thông minh
            </p>
          </div>

          {/* Features Cards */}
          <div className="space-y-3 mb-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-xl transform transition-all duration-500 hover:scale-105"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    opacity: currentStep >= index ? 1 : 0.5,
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm mb-1">{feature.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                      {currentStep >= index && (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Benefits */}
          <Card className="border-0 shadow-xl mb-6 bg-white/95 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-[#FFDF20]/20 to-[#FFDF20]/10 p-4 border-b">
              <h3 className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Những gì bạn nhận được
              </h3>
            </div>
            <CardContent className="p-4">
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onComplete}
              className="w-full h-14 bg-white text-primary hover:bg-white/90 shadow-xl text-lg"
            >
              Bắt đầu ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-center text-white/80 text-sm">
              Đã có {Math.floor(Math.random() * 5000 + 10000).toLocaleString()} người tin tưởng ✨
            </p>
          </div>

          {/* Auto advance steps */}
          <div className="mt-6 flex justify-center gap-2">
            {features.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentStep >= index ? 'w-8 bg-[#FFDF20]' : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Auto-advance effect */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>

      {/* Auto step progression */}
      {currentStep < features.length && (
        <div className="hidden">
          {setTimeout(() => {
            setCurrentStep(prev => Math.min(prev + 1, features.length));
          }, 800)}
        </div>
      )}
    </div>
  );
}
