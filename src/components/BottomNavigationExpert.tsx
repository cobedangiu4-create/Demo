import { DollarSign, Calendar, Users, Clock, User } from 'lucide-react';

type ExpertScreen =
  | 'expertHome'
  | 'expertEarnings'
  | 'expertMonthlyEarnings'
  | 'expertClients'
  | 'expertSchedule'
  | 'expertProfile';

interface BottomNavigationExpertProps {
  currentScreen: string;
  setCurrentScreen: (screen: ExpertScreen) => void;
}

export default function BottomNavigationExpert({
  currentScreen,
  setCurrentScreen,
}: BottomNavigationExpertProps) {
  const navItems = [
    {
      id: 'expertEarnings' as ExpertScreen,
      icon: DollarSign,
      label: 'Thu nhập',
      activeScreens: ['expertEarnings', 'expertMonthlyEarnings']
    },
    {
      id: 'expertClients' as ExpertScreen,
      icon: Users,
      label: 'Khách hàng',
      activeScreens: ['expertClients']
    },
    {
      id: 'expertHome' as ExpertScreen,
      icon: Calendar,
      label: 'Trang chủ',
      activeScreens: ['expertHome'],
      isCenter: true
    },
    {
      id: 'expertSchedule' as ExpertScreen,
      icon: Clock,
      label: 'Buổi tư vấn',
      activeScreens: ['expertSchedule']
    },
    {
      id: 'expertProfile' as ExpertScreen,
      icon: User,
      label: 'Hồ sơ',
      activeScreens: ['expertProfile']
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-[393px] mx-auto">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.activeScreens.includes(currentScreen as ExpertScreen);

            if (item.isCenter) {
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className="relative -mt-8"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-purple-500 to-purple-600 scale-110'
                      : 'bg-gradient-to-br from-purple-400 to-purple-500'
                  }`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-600 rounded-full" />
                  )}
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
                  isActive ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                <Icon className={`w-6 h-6 transition-all ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px]">{item.label}</span>
                {isActive && (
                  <div className="w-1 h-1 bg-purple-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
