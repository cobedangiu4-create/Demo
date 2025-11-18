import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import RewardsExchange from './RewardsExchange';
import {
  ChevronLeft,
  Gift,
  Calendar,
  Star,
  Trophy,
  Flame,
  CheckCircle,
  Lock,
  Sparkles,
  TrendingUp,
  Target,
  MessageCircle,
  Bot,
  Users,
  Calculator,
  BarChart3,
  Wallet,
  Award,
  Zap,
  Gamepad2,
  Play,
} from 'lucide-react';

interface DailyCheckInProps {
  onBackHome: () => void;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  current: number;
  target: number;
  icon: any;
  color: string;
  completed: boolean;
  type: 'daily' | 'weekly' | 'special';
}

interface LeaderboardPlayer {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  badge?: string;
}

export default function DailyCheckIn({ onBackHome }: DailyCheckInProps) {
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(3);
  const [totalFlames, setTotalFlames] = useState(2450);
  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'checkin' | 'wheel' | 'game' | 'leaderboard' | 'rewards'>('checkin');
  const [selectedMissionTab, setSelectedMissionTab] = useState<'daily' | 'weekly' | 'special'>('daily');

  // Lucky Wheel Game State
  const [spinsLeft, setSpinsLeft] = useState(3);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [showWheelReward, setShowWheelReward] = useState(false);
  const [wheelReward, setWheelReward] = useState(0);

  // Memory Card Game State
  const [gameScore, setGameScore] = useState(1850);
  const [gameAttempts, setGameAttempts] = useState(0);
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Wheel prizes
  const wheelPrizes = [
    { id: 1, flames: 1000, label: 'JACKPOT!', color: '#ef4444', probability: 2 },
    { id: 2, flames: 10, label: '10🔥', color: '#94a3b8', probability: 25 },
    { id: 3, flames: 500, label: '500🔥', color: '#a855f7', probability: 5 },
    { id: 4, flames: 20, label: '20🔥', color: '#f97316', probability: 20 },
    { id: 5, flames: 100, label: '100🔥', color: '#3b82f6', probability: 15 },
    { id: 6, flames: 5, label: '5🔥', color: '#6b7280', probability: 30 },
    { id: 7, flames: 200, label: '200🔥', color: '#10b981', probability: 10 },
    { id: 8, flames: 50, label: '50🔥', color: '#eab308', probability: 15 },
  ];

  // Leaderboard data
  const [leaderboard] = useState<LeaderboardPlayer[]>([
    { id: '1', name: 'Bạn', avatar: '👤', score: 2450, rank: 1, badge: '👑' },
    { id: '2', name: 'Minh Tuấn', avatar: '👨‍💼', score: 2380, rank: 2, badge: '🥈' },
    { id: '3', name: 'Thu Hà', avatar: '👩‍💼', score: 2150, rank: 3, badge: '🥉' },
    { id: '4', name: 'Văn Hoàng', avatar: '👨‍🎓', score: 1920, rank: 4 },
    { id: '5', name: 'Thị Lan', avatar: '👩‍🎓', score: 1850, rank: 5 },
    { id: '6', name: 'Quốc Anh', avatar: '👨‍💻', score: 1720, rank: 6 },
    { id: '7', name: 'Mai Linh', avatar: '👩‍🏫', score: 1580, rank: 7 },
    { id: '8', name: 'Đức Thắng', avatar: '👨‍🔧', score: 1420, rank: 8 },
    { id: '9', name: 'Kim Ngân', avatar: '👩‍⚕️', score: 1280, rank: 9 },
    { id: '10', name: 'Hữu Đạt', avatar: '👨‍🎨', score: 1150, rank: 10 },
  ]);

  // Check-in history
  const [checkInHistory, setCheckInHistory] = useState([
    { day: 'T2', checked: true, flames: 10 },
    { day: 'T3', checked: true, flames: 10 },
    { day: 'T4', checked: true, flames: 10 },
    { day: 'T5', checked: false, flames: 10 },
    { day: 'T6', checked: false, flames: 20 },
    { day: 'T7', checked: false, flames: 30 },
    { day: 'CN', checked: false, flames: 50 },
  ]);

  // Missions system
  const [missions, setMissions] = useState<Mission[]>([
    // Daily Missions
    {
      id: 'daily-1',
      title: 'Điểm danh hàng ngày',
      description: 'Điểm danh hôm nay để nhận thưởng',
      reward: 10,
      current: 0,
      target: 1,
      icon: Gift,
      color: 'from-yellow-500 to-orange-500',
      completed: false,
      type: 'daily',
    },
    {
      id: 'daily-2',
      title: 'Cập nhật tiến độ',
      description: 'Cập nhật tiến độ tiết kiệm của bạn',
      reward: 20,
      current: 0,
      target: 1,
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      completed: false,
      type: 'daily',
    },
    {
      id: 'daily-3',
      title: 'Xem phân tích',
      description: 'Xem báo cáo phân tích tài chính',
      reward: 15,
      current: 0,
      target: 1,
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      completed: false,
      type: 'daily',
    },
    {
      id: 'daily-4',
      title: 'Sử dụng công cụ tài chính',
      description: 'Sử dụng 1 công cụ tính toán',
      reward: 15,
      current: 0,
      target: 1,
      icon: Calculator,
      color: 'from-purple-500 to-pink-500',
      completed: false,
      type: 'daily',
    },
    // Weekly Missions
    {
      id: 'weekly-1',
      title: 'Chuỗi điểm danh 7 ngày',
      description: 'Điểm danh liên tục 7 ngày',
      reward: 100,
      current: 3,
      target: 7,
      icon: Calendar,
      color: 'from-orange-500 to-red-500',
      completed: false,
      type: 'weekly',
    },
    {
      id: 'weekly-2',
      title: 'Chuyên gia tài chính',
      description: 'Sử dụng 5 công cụ tài chính khác nhau',
      reward: 150,
      current: 2,
      target: 5,
      icon: Calculator,
      color: 'from-blue-500 to-indigo-500',
      completed: false,
      type: 'weekly',
    },
    {
      id: 'weekly-3',
      title: 'Người theo dõi chặt chẽ',
      description: 'Cập nhật tiến độ 5 lần trong tuần',
      reward: 120,
      current: 1,
      target: 5,
      icon: Target,
      color: 'from-green-500 to-teal-500',
      completed: false,
      type: 'weekly',
    },
    {
      id: 'weekly-4',
      title: 'Người học hỏi',
      description: 'Đọc 10 bài viết trong diễn đàn',
      reward: 80,
      current: 3,
      target: 10,
      icon: MessageCircle,
      color: 'from-pink-500 to-rose-500',
      completed: false,
      type: 'weekly',
    },
    // Special Missions
    {
      id: 'special-1',
      title: 'Người tiên phong',
      description: 'Đặt lịch tư vấn với chuyên gia lần đầu',
      reward: 300,
      current: 0,
      target: 1,
      icon: Users,
      color: 'from-purple-600 to-pink-600',
      completed: false,
      type: 'special',
    },
    {
      id: 'special-2',
      title: 'Nhà đầu tư thông minh',
      description: 'Hoàn thành 3 kịch bản đầu tư',
      reward: 250,
      current: 1,
      target: 3,
      icon: TrendingUp,
      color: 'from-yellow-600 to-orange-600',
      completed: false,
      type: 'special',
    },
    {
      id: 'special-3',
      title: 'Người chia sẻ',
      description: 'Đăng 5 bài viết trong diễn đàn',
      reward: 200,
      current: 0,
      target: 5,
      icon: MessageCircle,
      color: 'from-blue-600 to-cyan-600',
      completed: false,
      type: 'special',
    },
    {
      id: 'special-4',
      title: 'Bậc thầy tài chính',
      description: 'Đạt chuỗi điểm danh 30 ngày',
      reward: 500,
      current: 3,
      target: 30,
      icon: Trophy,
      color: 'from-yellow-500 to-amber-500',
      completed: false,
      type: 'special',
    },
  ]);

  const handleCheckIn = () => {
    if (!checkedInToday) {
      setCheckedInToday(true);
      setCurrentStreak(currentStreak + 1);
      const todayReward = 10 + (currentStreak * 2);
      setTotalFlames(totalFlames + todayReward);
      setRewardAmount(todayReward);
      setShowReward(true);
      
      // Update check-in history
      const todayIndex = checkInHistory.findIndex(day => !day.checked);
      if (todayIndex !== -1) {
        const newHistory = [...checkInHistory];
        newHistory[todayIndex].checked = true;
        setCheckInHistory(newHistory);
      }

      // Complete daily check-in mission
      completeMission('daily-1');
      
      setTimeout(() => {
        setShowReward(false);
      }, 3000);
    }
  };

  const completeMission = (missionId: string) => {
    setMissions(missions.map(mission => {
      if (mission.id === missionId && !mission.completed) {
        setTotalFlames(prev => prev + mission.reward);
        return { ...mission, current: mission.target, completed: true };
      }
      return mission;
    }));
  };

  const claimMissionReward = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (mission && mission.current >= mission.target && !mission.completed) {
      setRewardAmount(mission.reward);
      completeMission(missionId);
      setShowReward(true);
      setTimeout(() => {
        setShowReward(false);
      }, 2000);
    }
  };

  // Lucky Wheel spin function
  const spinWheel = () => {
    if (spinsLeft <= 0 || isSpinning) return;
    
    setIsSpinning(true);
    setSpinsLeft(spinsLeft - 1);

    const random = Math.random() * 100;
    let cumulativeProbability = 0;
    let selectedPrize = wheelPrizes[5];

    for (const prize of wheelPrizes) {
      cumulativeProbability += prize.probability;
      if (random <= cumulativeProbability) {
        selectedPrize = prize;
        break;
      }
    }

    const prizeIndex = wheelPrizes.findIndex(p => p.id === selectedPrize.id);
    const segmentAngle = 360 / wheelPrizes.length;
    const targetAngle = (prizeIndex * segmentAngle) + (segmentAngle / 2);
    const spins = 8;
    const finalRotation = (360 * spins) + (360 - targetAngle);
    
    setWheelRotation(prev => prev + finalRotation);

    setTimeout(() => {
      setTotalFlames(prev => prev + selectedPrize.flames);
      setWheelReward(selectedPrize.flames);
      setShowWheelReward(true);
      setIsSpinning(false);
      
      setTimeout(() => {
        setShowWheelReward(false);
      }, 3000);
    }, 5000);
  };

  // Memory Card Game
  const cardEmojis = ['💰', '💎', '🏆', '⭐', '🎯', '🔥', '💸', '📈'];
  
  const initializeGame = () => {
    const shuffled = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setGameAttempts(0);
    setGameStarted(true);
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setGameAttempts(prev => prev + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        setMatchedCards([...matchedCards, first, second]);
        setFlippedCards([]);
        
        const matchReward = 20;
        setTotalFlames(prev => prev + matchReward);
        setGameScore(prev => prev + matchReward);
        
        if (matchedCards.length + 2 === cards.length) {
          const completionBonus = 100;
          setTotalFlames(prev => prev + completionBonus);
          setGameScore(prev => prev + completionBonus);
          setTimeout(() => {
            alert(`🎉 Chúc mừng! Bạn hoàn thành trong ${gameAttempts + 1} lần thử và nhận ${completionBonus} 🔥 bonus!`);
          }, 500);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const filteredMissions = missions.filter(m => m.type === selectedMissionTab);
  const dailyProgress = missions.filter(m => m.type === 'daily' && m.completed).length;
  const weeklyProgress = missions.filter(m => m.type === 'weekly' && m.completed).length;
  const specialProgress = missions.filter(m => m.type === 'special' && m.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 shadow-lg">
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
            <Badge className="bg-white text-orange-600 px-4 py-2 shadow-lg">
              <Flame className="h-4 w-4 mr-1 fill-orange-500 text-orange-500" />
              <span className="text-base">{totalFlames}</span>
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Trung Tâm Phần Thưởng</h1>
              <p className="text-white/90 text-sm">Điểm danh & nhận thưởng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-5 gap-2">
          <button
            onClick={() => setSelectedTab('checkin')}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
              selectedTab === 'checkin'
                ? 'bg-gradient-to-br from-primary to-[#00a896] text-white shadow-lg'
                : 'bg-white text-gray-600 border-2 border-gray-200'
            }`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Điểm danh</span>
          </button>
          <button
            onClick={() => setSelectedTab('wheel')}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
              selectedTab === 'wheel'
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-600 border-2 border-gray-200'
            }`}
          >
            <Target className="h-5 w-5" />
            <span className="text-xs">Vòng quay</span>
          </button>
          <button
            onClick={() => setSelectedTab('game')}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
              selectedTab === 'game'
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg'
                : 'bg-white text-gray-600 border-2 border-gray-200'
            }`}
          >
            <Gamepad2 className="h-5 w-5" />
            <span className="text-xs">Mini Game</span>
          </button>
          <button
            onClick={() => setSelectedTab('rewards')}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
              selectedTab === 'rewards'
                ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg'
                : 'bg-white text-gray-600 border-2 border-gray-200'
            }`}
          >
            <Gift className="h-5 w-5" />
            <span className="text-xs">Quy đổi</span>
          </button>
          <button
            onClick={() => setSelectedTab('leaderboard')}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
              selectedTab === 'leaderboard'
                ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-lg'
                : 'bg-white text-gray-600 border-2 border-gray-200'
            }`}
          >
            <Trophy className="h-5 w-5" />
            <span className="text-xs">Xếp hạng</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Check-in Tab */}
        {selectedTab === 'checkin' && (
          <>
            {/* Streak Card - Redesigned */}
            <Card className="mt-4 border-0 shadow-xl overflow-hidden bg-gradient-to-br from-orange-500 to-red-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Flame className="h-8 w-8 text-white fill-white" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Chuỗi liên tiếp</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-white text-3xl">{currentStreak}</span>
                        <span className="text-white/80 text-sm">ngày</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-xs mb-1">Phần thưởng hôm nay</p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white">+{10 + (currentStreak * 2)}🔥</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={handleCheckIn}
                  disabled={checkedInToday}
                  className="w-full h-12 bg-white text-orange-600 hover:bg-white/90 disabled:opacity-50 disabled:bg-white/50"
                >
                  {checkedInToday ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Đã điểm danh hôm nay
                    </>
                  ) : (
                    <>
                      <Gift className="mr-2 h-5 w-5" />
                      Điểm danh ngay
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Weekly Progress - Redesigned */}
            <Card className="mt-4 border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
                <h3 className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Lịch điểm danh tuần này
                </h3>
              </div>
              <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-2">
                  {checkInHistory.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                      <div
                        className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                          day.checked
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg'
                            : 'bg-gray-100 border-2 border-dashed border-gray-300'
                        }`}
                      >
                        {day.checked ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          <Lock className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="text-xs text-orange-600 mt-1">
                        {day.checked ? '✓' : `${day.flames}🔥`}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Missions Section */}
            <Card className="mt-4 border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Nhiệm vụ nhận lửa
                  </h3>
                  <Badge className="bg-blue-600 text-white">
                    {missions.filter(m => m.completed).length}/{missions.length}
                  </Badge>
                </div>
                
                {/* Mission Tabs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedMissionTab('daily')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs transition-all ${
                      selectedMissionTab === 'daily'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-blue-600 border border-blue-200'
                    }`}
                  >
                    Hàng ngày ({dailyProgress}/4)
                  </button>
                  <button
                    onClick={() => setSelectedMissionTab('weekly')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs transition-all ${
                      selectedMissionTab === 'weekly'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-white text-purple-600 border border-purple-200'
                    }`}
                  >
                    Hàng tuần ({weeklyProgress}/4)
                  </button>
                  <button
                    onClick={() => setSelectedMissionTab('special')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs transition-all ${
                      selectedMissionTab === 'special'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-white text-orange-600 border border-orange-200'
                    }`}
                  >
                    Đặc biệt ({specialProgress}/4)
                  </button>
                </div>
              </div>
              
              <CardContent className="p-4 space-y-3">
                {filteredMissions.map((mission) => {
                  const Icon = mission.icon;
                  const progressPercent = (mission.current / mission.target) * 100;
                  
                  return (
                    <div
                      key={mission.id}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        mission.completed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${mission.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm">{mission.title}</h4>
                            <div className="flex items-center gap-1 bg-orange-100 px-2 py-0.5 rounded-full flex-shrink-0">
                              <Flame className="h-3 w-3 text-orange-500 fill-orange-500" />
                              <span className="text-xs text-orange-600">{mission.reward}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{mission.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                Tiến độ: {mission.current}/{mission.target}
                              </span>
                              <span className="text-primary">{progressPercent.toFixed(0)}%</span>
                            </div>
                            <Progress value={progressPercent} className="h-2" />
                          </div>

                          {mission.current >= mission.target && !mission.completed && (
                            <Button
                              onClick={() => claimMissionReward(mission.id)}
                              size="sm"
                              className="w-full mt-3 h-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                            >
                              <Gift className="mr-1 h-3 w-3" />
                              Nhận thưởng
                            </Button>
                          )}
                          
                          {mission.completed && (
                            <div className="flex items-center gap-2 mt-3 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-xs">Đã hoàn thành</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </>
        )}

        {/* Lucky Wheel Tab */}
        {selectedTab === 'wheel' && (
          <Card className="mt-4 border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl mb-2">🎡 Vòng Quay May Mắn</h3>
                <p className="text-sm text-muted-foreground">
                  Còn <strong className="text-purple-600">{spinsLeft}</strong> lượt quay
                </p>
              </div>

              {/* Wheel */}
              <div className="relative w-full max-w-xs mx-auto mb-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-red-500 drop-shadow-xl" />
                </div>

                <div className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-full p-3 shadow-2xl">
                  <div
                    className="w-full h-full rounded-full overflow-hidden relative transition-transform duration-[5000ms] ease-out"
                    style={{ 
                      transform: `rotate(${wheelRotation}deg)`,
                      background: `conic-gradient(
                        ${wheelPrizes.map((prize, i) => {
                          const start = (i / wheelPrizes.length) * 360;
                          const end = ((i + 1) / wheelPrizes.length) * 360;
                          return `${prize.color} ${start}deg ${end}deg`;
                        }).join(', ')}
                      )`
                    }}
                  >
                    {wheelPrizes.map((prize, index) => {
                      const angle = (360 / wheelPrizes.length) * index + (360 / wheelPrizes.length / 2);
                      return (
                        <div
                          key={prize.id}
                          className="absolute top-1/2 left-1/2 origin-left flex items-center justify-center"
                          style={{
                            transform: `rotate(${angle}deg) translateX(45%)`,
                            width: '45%',
                          }}
                        >
                          <div className="text-white text-xs font-bold drop-shadow-lg whitespace-nowrap transform -rotate-90">
                            {prize.label}
                          </div>
                        </div>
                      );
                    })}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={spinWheel}
                disabled={spinsLeft === 0 || isSpinning}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-lg"
              >
                {isSpinning ? (
                  <>
                    <Zap className="mr-2 h-5 w-5 animate-spin" />
                    Đang quay...
                  </>
                ) : spinsLeft === 0 ? (
                  'Hết lượt quay'
                ) : (
                  <>
                    <Target className="mr-2 h-5 w-5" />
                    Quay ngay!
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-3">
                💡 Hoàn thành nhiệm vụ để nhận thêm lượt quay
              </p>
            </div>
          </Card>
        )}

        {/* Memory Game Tab */}
        {selectedTab === 'game' && (
          <Card className="mt-4 border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl mb-2 flex items-center justify-center gap-2">
                  <Gamepad2 className="h-6 w-6 text-blue-600" />
                  Lật Thẻ Ghi Nhớ
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Tìm các cặp thẻ giống nhau để nhận 🔥
                </p>
                {gameStarted && (
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <span>Số lần thử: <strong>{gameAttempts}</strong></span>
                    <span>Điểm: <strong className="text-blue-600">{gameScore}🔥</strong></span>
                  </div>
                )}
              </div>

              {!gameStarted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Gamepad2 className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-lg mb-2">Cách chơi:</h4>
                  <ul className="text-sm text-left max-w-xs mx-auto space-y-2 text-muted-foreground mb-6">
                    <li>• Lật 2 thẻ mỗi lượt</li>
                    <li>• Tìm các cặp thẻ giống nhau</li>
                    <li>• Mỗi cặp đúng nhận 20🔥</li>
                    <li>• Hoàn thành nhận thêm 100🔥 bonus!</li>
                  </ul>
                  <Button
                    onClick={initializeGame}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 h-12"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Bắt đầu chơi
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {cards.map((card, index) => {
                      const isFlipped = flippedCards.includes(index) || matchedCards.includes(index);
                      const isMatched = matchedCards.includes(index);
                      
                      return (
                        <button
                          key={card.id}
                          onClick={() => handleCardClick(index)}
                          disabled={isFlipped}
                          className="aspect-square rounded-xl transition-all duration-300"
                        >
                          <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
                            <div
                              className="relative w-full h-full transition-transform duration-300"
                              style={{
                                transformStyle: 'preserve-3d',
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                              }}
                            >
                              {/* Back of card */}
                              <div
                                className={`absolute inset-0 rounded-xl flex items-center justify-center ${
                                  isMatched
                                    ? 'bg-gradient-to-br from-green-400 to-emerald-400'
                                    : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                }`}
                                style={{ backfaceVisibility: 'hidden' }}
                              >
                                <Sparkles className="h-6 w-6 text-white" />
                              </div>
                              {/* Front of card */}
                              <div
                                className="absolute inset-0 bg-white rounded-xl flex items-center justify-center text-4xl shadow-lg"
                                style={{
                                  backfaceVisibility: 'hidden',
                                  transform: 'rotateY(180deg)',
                                }}
                              >
                                {card.emoji}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <Button
                    onClick={initializeGame}
                    variant="outline"
                    className="w-full"
                  >
                    Chơi lại
                  </Button>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Leaderboard Tab */}
        {selectedTab === 'leaderboard' && (
          <Card className="mt-4 border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-4 border-b">
              <h3 className="text-lg flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
                Bảng Xếp Hạng
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Top người chơi có điểm cao nhất
              </p>
            </div>
            <CardContent className="p-0">
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
                <h4 className="text-sm mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4 text-orange-600" />
                  Phần thưởng theo hạng
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white rounded-lg p-2 border-2 border-yellow-400">
                    <div className="text-2xl mb-1">🥇</div>
                    <div className="text-xs text-yellow-700">Hạng 1</div>
                    <div className="text-sm text-orange-600">500🔥</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 border-2 border-gray-400">
                    <div className="text-2xl mb-1">🥈</div>
                    <div className="text-xs text-gray-700">Hạng 2-3</div>
                    <div className="text-sm text-orange-600">300🔥</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 border-2 border-amber-600">
                    <div className="text-2xl mb-1">🥉</div>
                    <div className="text-xs text-amber-700">Hạng 4-10</div>
                    <div className="text-sm text-orange-600">100🔥</div>
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {leaderboard.map((player) => (
                  <div
                    key={player.id}
                    className={`p-4 flex items-center gap-3 ${
                      player.id === '1' ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 text-center">
                      {player.rank <= 3 ? (
                        <span className="text-2xl">{player.badge}</span>
                      ) : (
                        <span className="text-lg text-muted-foreground">#{player.rank}</span>
                      )}
                    </div>

                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-[#00a896] flex items-center justify-center text-2xl shadow-lg">
                      {player.avatar}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={player.id === '1' ? 'font-bold' : ''}>
                          {player.name}
                        </span>
                        {player.id === '1' && (
                          <Badge className="bg-primary text-white text-xs">Bạn</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {player.score.toLocaleString()} điểm
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full">
                        <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                        <span className="text-sm text-orange-600">{player.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 border-t">
                <p className="text-xs text-blue-700">
                  💡 <strong>Cách tăng điểm:</strong> Điểm danh hàng ngày, chơi game, quay vòng may mắn và hoàn thành nhiệm vụ!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rewards Tab */}
        {selectedTab === 'rewards' && (
          <RewardsExchange currentPoints={totalFlames} />
        )}
      </div>

      {/* Reward Popup */}
      {showReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in">
          <Card className="w-64 border-0 shadow-2xl">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                <Gift className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl mb-2">Chúc mừng!</h3>
              <p className="text-3xl text-orange-600 mb-2">+{rewardAmount}🔥</p>
              <p className="text-sm text-muted-foreground">Bạn đã nhận thưởng!</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Wheel Reward Popup */}
      {showWheelReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in">
          <Card className="w-64 border-0 shadow-2xl">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl mb-2">Chúc mừng!</h3>
              <p className="text-4xl text-purple-600 mb-2">+{wheelReward}🔥</p>
              <p className="text-sm text-muted-foreground">
                {wheelReward >= 1000 ? '🎉 JACKPOT!' : 'Phần thưởng từ vòng quay!'}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}