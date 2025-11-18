import { Calendar, MessageCircle, Bot, Users, TrendingUp } from 'lucide-react';

type Screen =
  | 'home'
  | 'input'
  | 'result'
  | 'progress'
  | 'tracking'
  | 'update'
  | 'forecast'
  | 'consulting'
  | 'expertList'
  | 'bookExpert'
  | 'bookingConfirm'
  | 'checkin'
  | 'forum'
  | 'aichat'
  | 'history'
  | 'notifications'
  | 'profile'
  | 'statistics'
  | 'budget'
  | 'tools'
  | 'settings';

interface BottomNavigationProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
}

export default function BottomNavigation({ currentScreen, setCurrentScreen }: BottomNavigationProps) {
  const tabs = [
    {
      id: 'checkin' as Screen,
      label: 'Điểm danh',
      icon: Calendar,
      color: '#FF6B35', // Cam
    },
    {
      id: 'forum' as Screen,
      label: 'Diễn đàn',
      icon: MessageCircle,
      color: '#8B5CF6', // Tím
    },
    {
      id: 'aichat' as Screen,
      label: 'AI Bot',
      icon: Bot,
      color: '#3B82F6', // Xanh dương
    },
    {
      id: 'expertList' as Screen,
      label: 'Chuyên gia',
      icon: Users,
      color: '#009689', // Xanh lá (primary)
    },
    {
      id: 'progress' as Screen,
      label: 'Tiến độ',
      icon: TrendingUp,
      color: '#FFDF20', // Vàng (accent)
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="max-w-[393px] mx-auto">
        <div className="grid grid-cols-5 h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentScreen === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentScreen(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 transition-all ${
                  isActive 
                    ? '' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                style={isActive ? { color: tab.color } : {}}
              >
                <div className="relative">
                  <Icon 
                    className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} 
                  />
                  {isActive && (
                    <div 
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" 
                      style={{ backgroundColor: tab.color }}
                    />
                  )}
                </div>
                <span 
                  className="text-[10px] leading-none"
                  style={{ 
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}