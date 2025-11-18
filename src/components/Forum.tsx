import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  ChevronLeft,
  MessageCircle,
  TrendingUp,
  Clock,
  Eye,
  ThumbsUp,
  Search,
  Plus,
  Award,
  DollarSign,
  TrendingDown,
  Home as HomeIcon,
  Bitcoin,
  Users,
  Pin,
  Star,
} from 'lucide-react';

interface ForumProps {
  onBackHome: () => void;
  onViewThread?: (forumId: string, threadId: string) => void;
  onCreatePost?: (forumId: string) => void;
}

export default function Forum({ onBackHome, onViewThread, onCreatePost }: ForumProps) {
  const [selectedForum, setSelectedForum] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const forums = [
    {
      id: 'gold',
      name: 'Vàng',
      icon: Award,
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-yellow-600',
      members: 12450,
      threads: 1230,
      description: 'Thảo luận về đầu tư vàng, giá vàng, xu hướng thị trường',
    },
    {
      id: 'stocks',
      name: 'Cổ phiếu',
      icon: TrendingUp,
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      members: 28900,
      threads: 3450,
      description: 'Phân tích cổ phiếu, tin tức thị trường chứng khoán',
    },
    {
      id: 'bonds',
      name: 'Trái phiếu',
      icon: DollarSign,
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      members: 8200,
      threads: 890,
      description: 'Trái phiếu chính phủ, doanh nghiệp, lãi suất',
    },
    {
      id: 'realestate',
      name: 'Nhà đất',
      icon: HomeIcon,
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      members: 19600,
      threads: 2100,
      description: 'Bất động sản, đầu tư nhà đất, thị trường căn hộ',
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin & Crypto',
      icon: Bitcoin,
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      members: 15300,
      threads: 1890,
      description: 'Bitcoin, cryptocurrency, blockchain, NFT',
    },
  ];

  const hotThreads = [
    // VÀNG - Gold Forum Posts
    {
      id: '1',
      forumId: 'gold',
      title: 'Giá vàng thế giới tăng mạnh, trong nước sẽ ra sao?',
      author: 'GoldMaster',
      authorLevel: 'Expert',
      replies: 234,
      views: 12560,
      likes: 89,
      time: '2 giờ trước',
      isPinned: true,
      tags: ['Vàng', 'Dự báo'],
    },
    {
      id: '2',
      forumId: 'gold',
      title: 'So sánh vàng SJC vs vàng PNJ - Nên mua loại nào?',
      author: 'VangViet',
      authorLevel: 'Pro',
      replies: 178,
      views: 9200,
      likes: 72,
      time: '4 giờ trước',
      isPinned: false,
      tags: ['SJC', 'PNJ'],
    },
    {
      id: '3',
      forumId: 'gold',
      title: 'Kinh nghiệm mua vàng miếng tránh bị lừa đảo',
      author: 'SafeInvestor',
      authorLevel: 'Advanced',
      replies: 145,
      views: 7800,
      likes: 98,
      time: '1 ngày trước',
      isPinned: false,
      tags: ['Kinh nghiệm', 'An toàn'],
    },
    {
      id: '4',
      forumId: 'gold',
      title: 'Vàng nhẫn tròn trơn có nên đầu tư không?',
      author: 'LongTermInvest',
      authorLevel: 'Member',
      replies: 89,
      views: 5600,
      likes: 45,
      time: '2 ngày trước',
      isPinned: false,
      tags: ['Vàng nhẫn', 'Đầu tư'],
    },
    {
      id: '5',
      forumId: 'gold',
      title: 'Dự báo giá vàng quý 2/2024 - Tăng hay giảm?',
      author: 'MarketAnalyst',
      authorLevel: 'Expert',
      replies: 201,
      views: 11200,
      likes: 156,
      time: '3 ngày trước',
      isPinned: false,
      tags: ['Dự báo', 'Q2 2024'],
    },

    // CỔ PHIẾU - Stocks Forum Posts
    {
      id: '6',
      forumId: 'stocks',
      title: 'VNIndex phá đỉnh 1,300 điểm - Cơ hội hay rủi ro?',
      author: 'TraderPro',
      authorLevel: 'Expert',
      replies: 312,
      views: 18900,
      likes: 234,
      time: '1 giờ trước',
      isPinned: true,
      tags: ['VNIndex', 'Phân tích'],
    },
    {
      id: '7',
      forumId: 'stocks',
      title: 'Top 5 cổ phiếu ngân hàng đáng chú ý tháng 11',
      author: 'BankingExpert',
      authorLevel: 'Pro',
      replies: 267,
      views: 15600,
      likes: 189,
      time: '3 giờ trước',
      isPinned: true,
      tags: ['Ngân hàng', 'Top picks'],
    },
    {
      id: '8',
      forumId: 'stocks',
      title: 'Phân tích kỹ thuật VNM - Tín hiệu mua mạnh',
      author: 'TechAnalyzer',
      authorLevel: 'Expert',
      replies: 198,
      views: 12300,
      likes: 142,
      time: '5 giờ trước',
      isPinned: false,
      tags: ['VNM', 'Technical'],
    },
    {
      id: '9',
      forumId: 'stocks',
      title: 'Cổ phiếu BĐS có còn hấp dẫn trong năm 2024?',
      author: 'PropertyStock',
      authorLevel: 'Advanced',
      replies: 156,
      views: 9800,
      likes: 98,
      time: '8 giờ trước',
      isPinned: false,
      tags: ['BĐS', 'Ngành'],
    },
    {
      id: '10',
      forumId: 'stocks',
      title: 'HPG vs HSG - So sánh 2 ông lớn ngành thép',
      author: 'SteelInvestor',
      authorLevel: 'Pro',
      replies: 223,
      views: 13400,
      likes: 167,
      time: '1 ngày trước',
      isPinned: false,
      tags: ['HPG', 'HSG', 'Thép'],
    },
    {
      id: '11',
      forumId: 'stocks',
      title: 'Chiến lược đầu tư cổ phiếu dài hạn cho F0',
      author: 'ValueInvestor',
      authorLevel: 'Expert',
      replies: 289,
      views: 16700,
      likes: 245,
      time: '2 ngày trước',
      isPinned: false,
      tags: ['F0', 'Dài hạn', 'Chiến lược'],
    },
    {
      id: '12',
      forumId: 'stocks',
      title: 'Cổ phiếu penny - Cơ hội x10 hay bẫy?',
      author: 'RiskyTrader',
      authorLevel: 'Member',
      replies: 178,
      views: 11200,
      likes: 89,
      time: '3 ngày trước',
      isPinned: false,
      tags: ['Penny', 'Rủi ro cao'],
    },

    // TRÁI PHIẾU - Bonds Forum Posts
    {
      id: '13',
      forumId: 'bonds',
      title: 'Trái phiếu chính phủ kỳ hạn 10 năm - Đáng đầu tư?',
      author: 'BondExpert',
      authorLevel: 'Expert',
      replies: 134,
      views: 8200,
      likes: 67,
      time: '4 giờ trước',
      isPinned: true,
      tags: ['TPCP', 'Đầu tư'],
    },
    {
      id: '14',
      forumId: 'bonds',
      title: 'Lãi suất trái phiếu doanh nghiệp tăng - Có nên mua?',
      author: 'CorporateBond',
      authorLevel: 'Pro',
      replies: 98,
      views: 6700,
      likes: 54,
      time: '1 ngày trước',
      isPinned: false,
      tags: ['TPDN', 'Lãi suất'],
    },
    {
      id: '15',
      forumId: 'bonds',
      title: 'So sánh TPCP vs Gửi tiết kiệm ngân hàng',
      author: 'SafeReturn',
      authorLevel: 'Advanced',
      replies: 167,
      views: 9800,
      likes: 123,
      time: '2 ngày trước',
      isPinned: false,
      tags: ['So sánh', 'Tiết kiệm'],
    },
    {
      id: '16',
      forumId: 'bonds',
      title: 'Rủi ro trái phiếu bất động sản - Cảnh báo',
      author: 'RiskManager',
      authorLevel: 'Expert',
      replies: 201,
      views: 12300,
      likes: 178,
      time: '3 ngày trước',
      isPinned: false,
      tags: ['Rủi ro', 'BĐS'],
    },
    {
      id: '17',
      forumId: 'bonds',
      title: 'Hướng dẫn đầu tư trái phiếu cho người mới',
      author: 'BondTeacher',
      authorLevel: 'Pro',
      replies: 145,
      views: 8900,
      likes: 134,
      time: '4 ngày trước',
      isPinned: false,
      tags: ['Newbie', 'Hướng dẫn'],
    },

    // NHÀ ĐẤT - Real Estate Forum Posts
    {
      id: '18',
      forumId: 'realestate',
      title: 'Có nên mua căn hộ tại khu vực Thủ Đức không?',
      author: 'BDSInvestor',
      authorLevel: 'Expert',
      replies: 234,
      views: 14500,
      likes: 189,
      time: '2 giờ trước',
      isPinned: true,
      tags: ['Thủ Đức', 'Căn hộ'],
    },
    {
      id: '19',
      forumId: 'realestate',
      title: 'Thị trường nhà đất Hà Nội 2024 - Xu hướng giảm?',
      author: 'HanoiProperty',
      authorLevel: 'Pro',
      replies: 198,
      views: 12100,
      likes: 156,
      time: '5 giờ trước',
      isPinned: true,
      tags: ['Hà Nội', 'Xu hướng'],
    },
    {
      id: '20',
      forumId: 'realestate',
      title: 'Kinh nghiệm mua đất nền tránh bị lừa đảo',
      author: 'LandExpert',
      authorLevel: 'Expert',
      replies: 289,
      views: 18700,
      likes: 267,
      time: '1 ngày trước',
      isPinned: false,
      tags: ['Đất nền', 'Kinh nghiệm'],
    },
    {
      id: '21',
      forumId: 'realestate',
      title: 'Căn hộ Studio - Đầu tư cho thuê có lời không?',
      author: 'RentalKing',
      authorLevel: 'Advanced',
      replies: 167,
      views: 10200,
      likes: 98,
      time: '2 ngày trước',
      isPinned: false,
      tags: ['Studio', 'Cho thuê'],
    },
    {
      id: '22',
      forumId: 'realestate',
      title: 'So sánh căn hộ chung cư vs nhà phố liền kề',
      author: 'PropertyCompare',
      authorLevel: 'Pro',
      replies: 145,
      views: 9100,
      likes: 112,
      time: '3 ngày trước',
      isPinned: false,
      tags: ['So sánh', 'Chung cư'],
    },
    {
      id: '23',
      forumId: 'realestate',
      title: 'Dự án Vinhomes Ocean Park 3 có đáng đầu tư?',
      author: 'VinhomesWatch',
      authorLevel: 'Member',
      replies: 178,
      views: 11500,
      likes: 134,
      time: '4 ngày trước',
      isPinned: false,
      tags: ['Vinhomes', 'Dự án'],
    },
    {
      id: '24',
      forumId: 'realestate',
      title: 'Đầu tư BĐS nghỉ dưỡng Phú Quốc - Cơ hội vàng?',
      author: 'ResortInvestor',
      authorLevel: 'Advanced',
      replies: 201,
      views: 13200,
      likes: 167,
      time: '5 ngày trước',
      isPinned: false,
      tags: ['Phú Quốc', 'Nghỉ dưỡng'],
    },

    // BITCOIN & CRYPTO - Cryptocurrency Forum Posts
    {
      id: '25',
      forumId: 'bitcoin',
      title: 'Bitcoin vượt $50K - Thời điểm tốt để mua thêm?',
      author: 'CryptoKing',
      authorLevel: 'Expert',
      replies: 345,
      views: 21200,
      likes: 289,
      time: '1 giờ trước',
      isPinned: true,
      tags: ['Bitcoin', 'Trading'],
    },
    {
      id: '26',
      forumId: 'bitcoin',
      title: 'Ethereum sau The Merge - Có nên hold dài hạn?',
      author: 'EthExpert',
      authorLevel: 'Pro',
      replies: 267,
      views: 16800,
      likes: 234,
      time: '3 giờ trước',
      isPinned: true,
      tags: ['Ethereum', 'The Merge'],
    },
    {
      id: '27',
      forumId: 'bitcoin',
      title: 'Top 10 altcoin tiềm năng cho mùa bull 2024',
      author: 'AltcoinHunter',
      authorLevel: 'Expert',
      replies: 312,
      views: 19500,
      likes: 278,
      time: '6 giờ trước',
      isPinned: false,
      tags: ['Altcoin', 'Bull run'],
    },
    {
      id: '28',
      forumId: 'bitcoin',
      title: 'Ví lạnh (Cold Wallet) nào tốt nhất 2024?',
      author: 'SecurityFirst',
      authorLevel: 'Advanced',
      replies: 189,
      views: 11200,
      likes: 156,
      time: '1 ngày trước',
      isPinned: false,
      tags: ['Security', 'Wallet'],
    },
    {
      id: '29',
      forumId: 'bitcoin',
      title: 'Binance vs Coinbase - Sàn nào tốt hơn cho người Việt?',
      author: 'ExchangeCompare',
      authorLevel: 'Pro',
      replies: 223,
      views: 14300,
      likes: 198,
      time: '2 ngày trước',
      isPinned: false,
      tags: ['Exchange', 'Binance'],
    },
    {
      id: '30',
      forumId: 'bitcoin',
      title: 'Staking ETH 2.0 - Lợi nhuận và rủi ro',
      author: 'StakingMaster',
      authorLevel: 'Expert',
      replies: 178,
      views: 12700,
      likes: 167,
      time: '3 ngày trước',
      isPinned: false,
      tags: ['Staking', 'ETH 2.0'],
    },
    {
      id: '31',
      forumId: 'bitcoin',
      title: 'NFT còn có giá trị đầu tư không?',
      author: 'NFTCollector',
      authorLevel: 'Member',
      replies: 201,
      views: 13900,
      likes: 134,
      time: '4 ngày trước',
      isPinned: false,
      tags: ['NFT', 'Art'],
    },
    {
      id: '32',
      forumId: 'bitcoin',
      title: 'DeFi vs CeFi - Ưu nhược điểm từng loại',
      author: 'DeFiGuru',
      authorLevel: 'Pro',
      replies: 156,
      views: 10800,
      likes: 145,
      time: '5 ngày trước',
      isPinned: false,
      tags: ['DeFi', 'CeFi'],
    },
    {
      id: '33',
      forumId: 'bitcoin',
      title: 'Cảnh báo: Dấu hiệu nhận biết dự án crypto lừa đảo',
      author: 'ScamAlert',
      authorLevel: 'Expert',
      replies: 234,
      views: 17200,
      likes: 312,
      time: '6 ngày trước',
      isPinned: false,
      tags: ['Cảnh báo', 'Scam'],
    },
  ];

  const trendingTopics = [
    { name: 'VNIndex', count: 234, trend: 'up' },
    { name: 'Bitcoin ETF', count: 189, trend: 'up' },
    { name: 'Lãi suất FED', count: 156, trend: 'down' },
    { name: 'Vàng SJC', count: 142, trend: 'up' },
    { name: 'Bất động sản 2024', count: 128, trend: 'up' },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (selectedForum) {
    const forum = forums.find((f) => f.id === selectedForum)!;
    const Icon = forum.icon;
    const forumThreads = hotThreads.filter((t) => t.forumId === selectedForum);

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white">
        {/* Forum Header */}
        <div className={`bg-gradient-to-r ${forum.gradient} shadow-lg`}>
          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedForum(null)}
                className="text-white hover:bg-white/20 -ml-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white"
                onClick={() => onCreatePost && onCreatePost(selectedForum)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Tạo bài
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-white text-xl">{forum.name}</h1>
                <p className="text-white/80 text-sm">
                  {formatNumber(forum.members)} thành viên
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm chủ đề..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-2 focus:border-primary"
            />
          </div>
        </div>

        {/* Threads */}
        <div className="px-4 pb-6 mt-4 space-y-3">
          {forumThreads.length > 0 ? (
            forumThreads.map((thread) => (
              <Card
                key={thread.id}
                className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => onViewThread && onViewThread(selectedForum, thread.id)}
              >
                <CardContent className="p-4">
                  {thread.isPinned && (
                    <div className="flex items-center gap-1 mb-2">
                      <Pin className="h-3 w-3 text-primary fill-primary" />
                      <Badge className="bg-primary text-white text-xs">
                        Ghim
                      </Badge>
                    </div>
                  )}
                  
                  <h3 className="text-base mb-2 line-clamp-2">
                    {thread.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    {thread.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-primary/30 text-primary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{thread.author}</span>
                        <Badge
                          variant="secondary"
                          className="text-xs h-4 px-1"
                        >
                          {thread.authorLevel}
                        </Badge>
                      </div>
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {thread.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageCircle className="h-3 w-3" />
                      <span>{thread.replies}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      <span>{formatNumber(thread.views)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{thread.likes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">Chưa có chủ đề nào</p>
                <Button
                  size="sm"
                  className="mt-3 bg-primary hover:bg-primary/90"
                >
                  Tạo chủ đề đầu tiên
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

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
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Diễn Đàn Tài Chính</h1>
              <p className="text-white/80 text-sm">Cộng đồng đầu tư Việt Nam</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm chủ đề, diễn đàn..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-2 focus:border-primary"
          />
        </div>

        {/* Forums Grid */}
        <div className="mt-6">
          <h2 className="text-lg text-gray-900 mb-3">Danh mục diễn đàn</h2>
          <div className="grid grid-cols-2 gap-3">
            {forums.map((forum) => {
              const Icon = forum.icon;
              return (
                <button
                  key={forum.id}
                  onClick={() => setSelectedForum(forum.id)}
                  className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  <div
                    className={`bg-gradient-to-br ${forum.gradient} p-4 text-white`}
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base mb-1">{forum.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{formatNumber(forum.members)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{formatNumber(forum.threads)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trending Topics */}
        <Card className="mt-6 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <h3 className="text-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Chủ đề xu hướng
            </h3>
          </div>
          <CardContent className="p-4">
            <div className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-4">
                      #{index + 1}
                    </span>
                    <p className="text-sm">{topic.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {topic.count}
                    </span>
                    {topic.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hot Threads */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg text-gray-900">Bài viết nổi bật</h2>
            <Badge variant="outline" className="text-xs">
              <Star className="h-3 w-3 mr-1 fill-[#FFDF20] text-[#FFDF20]" />
              Hot
            </Badge>
          </div>
          <div className="space-y-3">
            {hotThreads.slice(0, 3).map((thread) => {
              const forum = forums.find((f) => f.id === thread.forumId)!;
              const Icon = forum.icon;
              return (
                <Card
                  key={thread.id}
                  className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => onViewThread && onViewThread(thread.forumId, thread.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-6 h-6 ${forum.color} rounded flex items-center justify-center`}
                      >
                        <Icon className="h-3 w-3 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {forum.name}
                      </Badge>
                      {thread.isPinned && (
                        <Badge className="bg-primary text-white text-xs">
                          <Pin className="h-2 w-2 mr-1" />
                          Ghim
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-sm mb-2 line-clamp-2">
                      {thread.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{thread.replies}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{formatNumber(thread.views)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{thread.likes}</span>
                        </div>
                      </div>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {thread.time}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}