import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ChevronLeft,
  Calendar,
  Clock,
  Video,
  Phone,
  MessageCircle,
  User,
  CheckCircle,
  XCircle,
  ChevronRight,
  Plus,
  Filter,
} from 'lucide-react';

interface Session {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  duration: number;
  type: 'video' | 'call' | 'chat';
  package: 'basic' | 'standard' | 'premium';
  status: 'scheduled' | 'completed' | 'cancelled' | 'ongoing';
  notes?: string;
}

interface ExpertScheduleProps {
  onBack: () => void;
}

export default function ExpertSchedule({ onBack }: ExpertScheduleProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterType, setFilterType] = useState<string>('all');

  // Mock data - trong thực tế sẽ lấy từ API
  const sessions: Session[] = [
    {
      id: '1',
      clientId: '1',
      clientName: 'Trần Văn Anh',
      date: '2025-11-27',
      time: '09:00',
      duration: 60,
      type: 'video',
      package: 'premium',
      status: 'scheduled',
      notes: 'Tư vấn kế hoạch đầu tư dài hạn',
    },
    {
      id: '2',
      clientId: '2',
      clientName: 'Nguyễn Thị Bình',
      date: '2025-11-27',
      time: '14:00',
      duration: 45,
      type: 'call',
      package: 'standard',
      status: 'scheduled',
      notes: 'Review tiến độ tiết kiệm',
    },
    {
      id: '3',
      clientId: '3',
      clientName: 'Lê Văn Cường',
      date: '2025-11-28',
      time: '10:00',
      duration: 30,
      type: 'chat',
      package: 'basic',
      status: 'scheduled',
    },
    {
      id: '4',
      clientId: '4',
      clientName: 'Phạm Thị Dung',
      date: '2025-11-28',
      time: '15:00',
      duration: 60,
      type: 'video',
      package: 'premium',
      status: 'scheduled',
    },
    {
      id: '5',
      clientId: '5',
      clientName: 'Hoàng Văn Em',
      date: '2025-11-29',
      time: '15:00',
      duration: 45,
      type: 'call',
      package: 'standard',
      status: 'scheduled',
    },
    {
      id: '6',
      clientId: '1',
      clientName: 'Trần Văn Anh',
      date: '2025-11-20',
      time: '09:00',
      duration: 60,
      type: 'video',
      package: 'premium',
      status: 'completed',
      notes: 'Buổi tư vấn đầu tiên - Phân tích tình hình tài chính',
    },
    {
      id: '7',
      clientId: '2',
      clientName: 'Nguyễn Thị Bình',
      date: '2025-11-18',
      time: '14:00',
      duration: 45,
      type: 'call',
      package: 'standard',
      status: 'completed',
    },
    {
      id: '8',
      clientId: '3',
      clientName: 'Lê Văn Cường',
      date: '2025-11-15',
      time: '10:00',
      duration: 30,
      type: 'chat',
      package: 'basic',
      status: 'completed',
    },
    {
      id: '9',
      clientId: '7',
      clientName: 'Vũ Văn Giang',
      date: '2025-11-22',
      time: '11:00',
      duration: 30,
      type: 'chat',
      package: 'basic',
      status: 'cancelled',
      notes: 'Khách hàng hủy do bận đột xuất',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'chat':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'call':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'chat':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video Call';
      case 'call':
        return 'Gọi điện';
      case 'chat':
        return 'Chat';
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      case 'ongoing':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Đã lên lịch';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      case 'ongoing':
        return 'Đang diễn ra';
      default:
        return status;
    }
  };

  const getPackageColor = (packageType: string) => {
    switch (packageType) {
      case 'premium':
        return 'bg-yellow-100 text-yellow-700';
      case 'standard':
        return 'bg-purple-100 text-purple-700';
      case 'basic':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Filter sessions
  const upcomingSessions = sessions
    .filter((s) => s.status === 'scheduled')
    .filter((s) => filterType === 'all' || s.type === filterType)
    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime());

  const completedSessions = sessions
    .filter((s) => s.status === 'completed')
    .filter((s) => filterType === 'all' || s.type === filterType)
    .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());

  const cancelledSessions = sessions
    .filter((s) => s.status === 'cancelled')
    .filter((s) => filterType === 'all' || s.type === filterType)
    .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());

  // Stats
  const stats = {
    total: sessions.length,
    upcoming: upcomingSessions.length,
    completed: completedSessions.length,
    cancelled: cancelledSessions.length,
    today: sessions.filter((s) => s.date === new Date().toISOString().split('T')[0]).length,
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Empty days before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Days of month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split('T')[0];
      const daySessions = sessions.filter((s) => s.date === dateStr && s.status === 'scheduled');
      days.push({
        date: i,
        dateStr,
        sessionsCount: daySessions.length,
        isToday: dateStr === new Date().toISOString().split('T')[0],
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedDate(newDate);
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
              onClick={onBack}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Lịch Tư Vấn</h1>
              <p className="text-white/80 text-sm">{stats.upcoming} buổi sắp tới</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-3 text-center">
              <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-sm text-primary">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Tổng</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-3 text-center">
              <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-sm text-blue-600">{stats.upcoming}</p>
              <p className="text-xs text-muted-foreground">Sắp tới</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-3 text-center">
              <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
              <p className="text-sm text-green-600">{stats.completed}</p>
              <p className="text-xs text-muted-foreground">Hoàn thành</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-3 text-center">
              <XCircle className="h-5 w-5 text-red-500 mx-auto mb-1" />
              <p className="text-sm text-red-600">{stats.cancelled}</p>
              <p className="text-xs text-muted-foreground">Đã hủy</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar View */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => changeMonth(-1)}
                className="hover:bg-primary/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h3 className="text-primary">
                Tháng {selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => changeMonth(1)}
                className="hover:bg-primary/10"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
                <div key={day} className="text-center text-xs text-muted-foreground py-1">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div key={index} className="aspect-square">
                  {day ? (
                    <button
                      className={`w-full h-full rounded-lg border-2 transition-all relative ${
                        day.isToday
                          ? 'border-primary bg-primary text-white'
                          : day.sessionsCount > 0
                          ? 'border-blue-300 bg-blue-50 hover:bg-blue-100'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <span className="text-sm">{day.date}</span>
                      {day.sessionsCount > 0 && (
                        <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-blue-500 text-white rounded-full text-[10px] flex items-center justify-center">
                          {day.sessionsCount}
                        </span>
                      )}
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filter */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Lọc theo hình thức</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('all')}
              className={filterType === 'all' ? 'bg-primary text-white' : ''}
            >
              Tất cả
            </Button>
            <Button
              variant={filterType === 'video' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('video')}
              className={filterType === 'video' ? 'bg-blue-500 text-white' : ''}
            >
              📹 Video
            </Button>
            <Button
              variant={filterType === 'call' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('call')}
              className={filterType === 'call' ? 'bg-green-500 text-white' : ''}
            >
              📞 Gọi
            </Button>
            <Button
              variant={filterType === 'chat' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterType('chat')}
              className={filterType === 'chat' ? 'bg-purple-500 text-white' : ''}
            >
              💬 Chat
            </Button>
          </div>
        </div>

        {/* Sessions Tabs */}
        <Tabs defaultValue="upcoming" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
            <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
            <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
          </TabsList>

          {/* Upcoming Sessions */}
          <TabsContent value="upcoming" className="mt-4 space-y-3">
            {upcomingSessions.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-muted-foreground">Không có buổi tư vấn nào</p>
                </CardContent>
              </Card>
            ) : (
              upcomingSessions.map((session) => (
                <Card key={session.id} className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          {getTypeIcon(session.type)}
                        </div>
                        <div>
                          <p className="text-base">{session.clientName}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(session.date)}
                          </p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(session.status)} text-white`}>
                        {getStatusLabel(session.status)}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {session.time} • {session.duration} phút
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getTypeColor(session.type)}>
                          {getTypeLabel(session.type)}
                        </Badge>
                        <Badge variant="outline" className={getPackageColor(session.package)}>
                          {session.package === 'premium'
                            ? 'Premium'
                            : session.package === 'standard'
                            ? 'Tiêu chuẩn'
                            : 'Cơ bản'}
                        </Badge>
                      </div>
                    </div>

                    {session.notes && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{session.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Completed Sessions */}
          <TabsContent value="completed" className="mt-4 space-y-3">
            {completedSessions.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-muted-foreground">Chưa có buổi tư vấn nào hoàn thành</p>
                </CardContent>
              </Card>
            ) : (
              completedSessions.map((session) => (
                <Card key={session.id} className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-base">{session.clientName}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(session.date)}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        {getStatusLabel(session.status)}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {session.time} • {session.duration} phút
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getTypeColor(session.type)}>
                          {getTypeLabel(session.type)}
                        </Badge>
                        <Badge variant="outline" className={getPackageColor(session.package)}>
                          {session.package === 'premium'
                            ? 'Premium'
                            : session.package === 'standard'
                            ? 'Tiêu chuẩn'
                            : 'Cơ bản'}
                        </Badge>
                      </div>
                    </div>

                    {session.notes && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{session.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Cancelled Sessions */}
          <TabsContent value="cancelled" className="mt-4 space-y-3">
            {cancelledSessions.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <XCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-muted-foreground">Không có buổi tư vấn nào bị hủy</p>
                </CardContent>
              </Card>
            ) : (
              cancelledSessions.map((session) => (
                <Card key={session.id} className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <XCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <p className="text-base">{session.clientName}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(session.date)}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-red-500 text-white">
                        {getStatusLabel(session.status)}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {session.time} • {session.duration} phút
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getTypeColor(session.type)}>
                          {getTypeLabel(session.type)}
                        </Badge>
                        <Badge variant="outline" className={getPackageColor(session.package)}>
                          {session.package === 'premium'
                            ? 'Premium'
                            : session.package === 'standard'
                            ? 'Tiêu chuẩn'
                            : 'Cơ bản'}
                        </Badge>
                      </div>
                    </div>

                    {session.notes && (
                      <div className="bg-red-50 rounded-lg p-3">
                        <p className="text-sm text-red-700">{session.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
