import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  ChevronLeft,
  Clock,
  Calendar,
  User,
  MessageCircle,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Star,
  FileText,
  Download,
  BookText,
} from 'lucide-react';

interface HistoryProps {
  onBackHome: () => void;
  onViewDetail: (consultationId: string) => void;
}

interface Consultation {
  id: string;
  expertName: string;
  expertTitle: string;
  expertAvatar: string;
  date: string;
  time: string;
  duration: string;
  status: 'completed' | 'cancelled' | 'upcoming';
  topic: string;
  rating?: number;
  notes?: string;
  hasReport: boolean;
  conversation?: {
    messages: Array<{
      id: string;
      sender: 'user' | 'expert';
      message: string;
      timestamp: string;
    }>;
  };
}

export default function History({ onBackHome, onViewDetail }: HistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'cancelled' | 'upcoming'>('all');

  const consultations: Consultation[] = [
    {
      id: '1',
      expertName: 'TS. Nguyễn Văn An',
      expertTitle: 'Chuyên gia Đầu tư Chứng khoán',
      expertAvatar: 'NVA',
      date: '15/11/2024',
      time: '14:00',
      duration: '45 phút',
      status: 'completed',
      topic: 'Tư vấn danh mục đầu tư',
      rating: 5,
      notes: 'Đã nhận báo cáo phân tích chi tiết về danh mục đầu tư phù hợp',
      hasReport: true,
    },
    {
      id: '2',
      expertName: 'ThS. Trần Thị Bình',
      expertTitle: 'Chuyên gia Tài chính Cá nhân',
      expertAvatar: 'TTB',
      date: '10/11/2024',
      time: '10:00',
      duration: '60 phút',
      status: 'completed',
      topic: 'Lập kế hoạch tài chính gia đình',
      rating: 5,
      notes: 'Tư vấn về quy tắc 50/30/20 và quỹ khẩn cấp',
      hasReport: true,
    },
    {
      id: '3',
      expertName: 'Ông Lê Minh Châu',
      expertTitle: 'Chuyên gia Bất động sản',
      expertAvatar: 'LMC',
      date: '05/11/2024',
      time: '16:00',
      duration: '30 phút',
      status: 'cancelled',
      topic: 'Đầu tư bất động sản khu Đông',
      notes: 'Đã hủy do bận việc đột xuất',
      hasReport: false,
    },
    {
      id: '4',
      expertName: 'Bà Phạm Thu Hà',
      expertTitle: 'Chuyên gia Bảo hiểm',
      expertAvatar: 'PTH',
      date: '28/10/2024',
      time: '09:00',
      duration: '45 phút',
      status: 'completed',
      topic: 'Tư vấn bảo hiểm nhân thọ',
      rating: 4,
      notes: 'Tư vấn các gói bảo hiểm phù hợp với gia đình trẻ',
      hasReport: false,
    },
    {
      id: '5',
      expertName: 'TS. Nguyễn Văn An',
      expertTitle: 'Chuyên gia Đầu tư Chứng khoán',
      expertAvatar: 'NVA',
      date: '18/11/2024',
      time: '14:00',
      duration: '60 phút',
      status: 'upcoming',
      topic: 'Đánh giá lại danh mục sau 3 tháng',
      hasReport: false,
    },
  ];

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      searchQuery === '' ||
      consultation.expertName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.topic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterStatus === 'all' || consultation.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Hoàn thành
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <XCircle className="h-3 w-3 mr-1" />
            Đã hủy
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            Sắp tới
          </Badge>
        );
      default:
        return null;
    }
  };

  const stats = {
    total: consultations.length,
    completed: consultations.filter((c) => c.status === 'completed').length,
    upcoming: consultations.filter((c) => c.status === 'upcoming').length,
    cancelled: consultations.filter((c) => c.status === 'cancelled').length,
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
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Lịch Sử Tư Vấn</h1>
              <p className="text-white/80 text-sm">
                {stats.total} buổi tư vấn
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-3 text-center">
              <p className="text-2xl text-green-600">{stats.completed}</p>
              <p className="text-xs text-muted-foreground mt-1">Hoàn thành</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-3 text-center">
              <p className="text-2xl text-blue-600">{stats.upcoming}</p>
              <p className="text-xs text-muted-foreground mt-1">Sắp tới</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-3 text-center">
              <p className="text-2xl text-red-600">{stats.cancelled}</p>
              <p className="text-xs text-muted-foreground mt-1">Đã hủy</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm chuyên gia, chủ đề..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-2 focus:border-primary"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              filterStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              filterStatus === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Hoàn thành
          </button>
          <button
            onClick={() => setFilterStatus('upcoming')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              filterStatus === 'upcoming'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Sắp tới
          </button>
          <button
            onClick={() => setFilterStatus('cancelled')}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              filterStatus === 'cancelled'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Đã hủy
          </button>
        </div>

        {/* Consultations List */}
        <div className="mt-4 space-y-3">
          {filteredConsultations.length > 0 ? (
            filteredConsultations.map((consultation) => (
              <Card
                key={consultation.id}
                className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <span className="text-sm text-primary">
                          {consultation.expertAvatar}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm">{consultation.expertName}</h3>
                        <p className="text-xs text-muted-foreground">
                          {consultation.expertTitle}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(consultation.status)}
                  </div>

                  {/* Topic */}
                  <div className="p-3 bg-gray-50 rounded-lg mb-3">
                    <p className="text-sm">{consultation.topic}</p>
                  </div>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{consultation.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{consultation.time} ({consultation.duration})</span>
                    </div>
                  </div>

                  {/* Rating */}
                  {consultation.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < consultation.rating!
                              ? 'fill-[#FFDF20] text-[#FFDF20]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">
                        ({consultation.rating}/5)
                      </span>
                    </div>
                  )}

                  {/* Notes */}
                  {consultation.notes && (
                    <div className="p-2 bg-blue-50 rounded-lg mb-3">
                      <p className="text-xs text-blue-900">
                        <MessageCircle className="h-3 w-3 inline mr-1" />
                        {consultation.notes}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {consultation.status === 'completed' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => onViewDetail(consultation.id)}
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Xem chi tiết
                        </Button>
                        {consultation.hasReport && (
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Báo cáo
                          </Button>
                        )}
                      </>
                    )}
                    {consultation.status === 'upcoming' && (
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-500 hover:bg-blue-600"
                        onClick={() => onViewDetail(consultation.id)}
                      >
                        Xem chi tiết
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                    {consultation.status === 'cancelled' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => onViewDetail(consultation.id)}
                      >
                        Xem chi tiết
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">Không tìm thấy lịch sử tư vấn</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Info Card */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-blue-50 border-l-4 border-blue-500">
          <CardContent className="p-4">
            <h4 className="text-blue-900 mb-2 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              💡 Lưu ý
            </h4>
            <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
              <li>Báo cáo tư vấn sẽ được gửi sau 24h</li>
              <li>Bạn có thể đặt lịch tái khám với chuyên gia</li>
              <li>Đánh giá để giúp cải thiện dịch vụ</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}