import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  ChevronLeft,
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  package: 'basic' | 'standard' | 'premium';
  packagePrice: number;
  commission: number;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  startDate: string;
  sessionsCompleted: number;
  totalSessions: number;
  consultationType: 'chat' | 'call' | 'video';
  nextSession?: string;
}

interface ExpertClientsProps {
  onBack: () => void;
  onViewClient: (clientId: string) => void;
}

export default function ExpertClients({ onBack, onViewClient }: ExpertClientsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPackage, setFilterPackage] = useState<string>('all');

  // Mock data - trong thực tế sẽ lấy từ API
  const clients: Client[] = [
    {
      id: '1',
      name: 'Trần Văn Anh',
      email: 'tranvana@email.com',
      phone: '0912345671',
      package: 'premium',
      packagePrice: 1699000,
      commission: 679600,
      status: 'active',
      startDate: '2025-11-01',
      sessionsCompleted: 3,
      totalSessions: 8,
      consultationType: 'video',
      nextSession: '2025-11-27 09:00',
    },
    {
      id: '2',
      name: 'Nguyễn Thị Bình',
      email: 'nguyenthib@email.com',
      phone: '0912345672',
      package: 'standard',
      packagePrice: 1299000,
      commission: 519600,
      status: 'active',
      startDate: '2025-11-05',
      sessionsCompleted: 2,
      totalSessions: 6,
      consultationType: 'call',
      nextSession: '2025-11-27 14:00',
    },
    {
      id: '3',
      name: 'Lê Văn Cường',
      email: 'levanc@email.com',
      phone: '0912345673',
      package: 'basic',
      packagePrice: 499000,
      commission: 199600,
      status: 'active',
      startDate: '2025-11-10',
      sessionsCompleted: 1,
      totalSessions: 3,
      consultationType: 'chat',
      nextSession: '2025-11-28 10:00',
    },
    {
      id: '4',
      name: 'Phạm Thị Dung',
      email: 'phamthid@email.com',
      phone: '0912345674',
      package: 'premium',
      packagePrice: 1699000,
      commission: 679600,
      status: 'completed',
      startDate: '2025-10-01',
      sessionsCompleted: 8,
      totalSessions: 8,
      consultationType: 'video',
    },
    {
      id: '5',
      name: 'Hoàng Văn Em',
      email: 'hoangvane@email.com',
      phone: '0912345675',
      package: 'standard',
      packagePrice: 1299000,
      commission: 519600,
      status: 'pending',
      startDate: '2025-11-20',
      sessionsCompleted: 0,
      totalSessions: 6,
      consultationType: 'call',
      nextSession: '2025-11-29 15:00',
    },
    {
      id: '6',
      name: 'Đỗ Thị Phương',
      email: 'dothip@email.com',
      phone: '0912345676',
      package: 'premium',
      packagePrice: 1699000,
      commission: 679600,
      status: 'completed',
      startDate: '2025-09-15',
      sessionsCompleted: 8,
      totalSessions: 8,
      consultationType: 'video',
    },
    {
      id: '7',
      name: 'Vũ Văn Giang',
      email: 'vuvang@email.com',
      phone: '0912345677',
      package: 'basic',
      packagePrice: 499000,
      commission: 199600,
      status: 'active',
      startDate: '2025-11-15',
      sessionsCompleted: 1,
      totalSessions: 3,
      consultationType: 'chat',
      nextSession: '2025-11-30 11:00',
    },
    {
      id: '8',
      name: 'Bùi Thị Hoa',
      email: 'buithih@email.com',
      phone: '0912345678',
      package: 'standard',
      packagePrice: 1299000,
      commission: 519600,
      status: 'cancelled',
      startDate: '2025-10-20',
      sessionsCompleted: 2,
      totalSessions: 6,
      consultationType: 'call',
    },
  ];

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
  };

  const getPackageColor = (packageType: string) => {
    switch (packageType) {
      case 'premium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'standard':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'basic':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPackageLabel = (packageType: string) => {
    switch (packageType) {
      case 'premium':
        return 'Premium';
      case 'standard':
        return 'Tiêu chuẩn';
      case 'basic':
        return 'Cơ bản';
      default:
        return packageType;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-orange-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Đang tư vấn';
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Chờ xác nhận';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  // Filter clients
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery);

    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    const matchesPackage = filterPackage === 'all' || client.package === filterPackage;

    return matchesSearch && matchesStatus && matchesPackage;
  });

  // Stats
  const stats = {
    total: clients.length,
    active: clients.filter((c) => c.status === 'active').length,
    completed: clients.filter((c) => c.status === 'completed').length,
    pending: clients.filter((c) => c.status === 'pending').length,
    totalCommission: clients
      .filter((c) => c.status === 'completed')
      .reduce((sum, c) => sum + c.commission, 0),
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
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Quản Lý Khách Hàng</h1>
              <p className="text-white/80 text-sm">{stats.total} khách hàng</p>
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
              <Users className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-sm text-primary">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Tổng</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-3 text-center">
              <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
              <p className="text-sm text-green-600">{stats.active}</p>
              <p className="text-xs text-muted-foreground">Đang tư vấn</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-3 text-center">
              <CheckCircle className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-sm text-blue-600">{stats.completed}</p>
              <p className="text-xs text-muted-foreground">Hoàn thành</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-3 text-center">
              <AlertCircle className="h-5 w-5 text-orange-500 mx-auto mb-1" />
              <p className="text-sm text-orange-600">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Chờ</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm khách hàng..."
            className="pl-10 h-12 border-2 focus:border-primary"
          />
        </div>

        {/* Filters */}
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Trạng thái</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
                className={filterStatus === 'all' ? 'bg-primary text-white' : ''}
              >
                Tất cả
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('active')}
                className={filterStatus === 'active' ? 'bg-green-500 text-white' : ''}
              >
                Đang tư vấn
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('completed')}
                className={filterStatus === 'completed' ? 'bg-blue-500 text-white' : ''}
              >
                Hoàn thành
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('pending')}
                className={filterStatus === 'pending' ? 'bg-orange-500 text-white' : ''}
              >
                Chờ xác nhận
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Gói dịch vụ</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={filterPackage === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPackage('all')}
                className={filterPackage === 'all' ? 'bg-primary text-white' : ''}
              >
                Tất cả
              </Button>
              <Button
                variant={filterPackage === 'basic' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPackage('basic')}
                className={filterPackage === 'basic' ? 'bg-blue-500 text-white' : ''}
              >
                Cơ bản
              </Button>
              <Button
                variant={filterPackage === 'standard' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPackage('standard')}
                className={filterPackage === 'standard' ? 'bg-purple-500 text-white' : ''}
              >
                Tiêu chuẩn
              </Button>
              <Button
                variant={filterPackage === 'premium' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterPackage('premium')}
                className={filterPackage === 'premium' ? 'bg-yellow-500 text-white' : ''}
              >
                Premium
              </Button>
            </div>
          </div>
        </div>

        {/* Clients List */}
        <div className="mt-4 space-y-3">
          {filteredClients.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-muted-foreground">Không tìm thấy khách hàng</p>
              </CardContent>
            </Card>
          ) : (
            filteredClients.map((client) => (
              <Card
                key={client.id}
                className="border-0 shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => onViewClient(client.id)}
              >
                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-base">{client.name}</p>
                        <Badge
                          variant="outline"
                          className={`text-xs mt-1 ${getPackageColor(client.package)}`}
                        >
                          {getPackageLabel(client.package)}
                        </Badge>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${getStatusColor(client.status)} text-white flex items-center gap-1`}
                    >
                      {getStatusIcon(client.status)}
                      {getStatusLabel(client.status)}
                    </Badge>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{client.phone}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Tiến độ tư vấn</span>
                      <span className="text-sm">
                        {client.sessionsCompleted}/{client.totalSessions} buổi
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${(client.sessionsCompleted / client.totalSessions) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Next Session */}
                  {client.nextSession && client.status === 'active' && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">
                          Buổi tiếp: {client.nextSession}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Commission */}
                  <div className="border-t pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-muted-foreground">Hoa hồng 40%:</span>
                    </div>
                    <span className="text-primary">{formatCurrency(client.commission)}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Total Commission */}
        {filteredClients.length > 0 && (
          <Card className="mt-6 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-green-700">Tổng hoa hồng (hoàn thành)</p>
                    <p className="text-xl text-green-900">{formatCurrency(stats.totalCommission)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
