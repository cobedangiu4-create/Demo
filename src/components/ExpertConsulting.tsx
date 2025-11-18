import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  ChevronLeft,
  Star,
  Award,
  Clock,
  MessageCircle,
  Video,
  Phone,
  Calendar,
  TrendingUp,
  BookOpen,
  Users,
  Check,
  Zap,
  Crown,
  Shield,
} from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviews: number;
  experience: string;
  specialties: string[];
  packages: {
    basic: { duration: string; price: number };
    standard: { duration: string; price: number };
    premium: { duration: string; price: number };
  };
  availability: 'available' | 'busy' | 'offline';
  consultationTypes: ('chat' | 'call' | 'video')[];
}

interface ExpertConsultingProps {
  onBookExpert: () => void;
  onBack: () => void;
}

export default function ExpertConsulting({ onBookExpert, onBack }: ExpertConsultingProps) {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'standard' | 'premium'>('basic');
  
  const experts: Expert[] = [
    {
      id: '1',
      name: 'Nguyễn Minh Tuấn',
      title: 'Chuyên gia Tài chính Cá nhân',
      avatar: '👨‍💼',
      rating: 4.9,
      reviews: 248,
      experience: '12 năm',
      specialties: ['Lập kế hoạch tài chính', 'Đầu tư chứng khoán', 'Tiết kiệm'],
      packages: {
        basic: { duration: '30 phút', price: 499000 },
        standard: { duration: '1 giờ 30 phút', price: 1299000 },
        premium: { duration: '2 giờ', price: 1699000 },
      },
      availability: 'available',
      consultationTypes: ['chat', 'call', 'video'],
    },
    {
      id: '2',
      name: 'Trần Thị Hương',
      title: 'Chuyên gia Đầu tư & Bất động sản',
      avatar: '👩‍💼',
      rating: 4.8,
      reviews: 186,
      experience: '10 năm',
      specialties: ['Bất động sản', 'Đầu tư dài hạn', 'Quản lý tài sản'],
      packages: {
        basic: { duration: '30 phút', price: 499000 },
        standard: { duration: '1 giờ 30 phút', price: 1299000 },
        premium: { duration: '2 giờ', price: 1699000 },
      },
      availability: 'available',
      consultationTypes: ['chat', 'video'],
    },
    {
      id: '3',
      name: 'Lê Văn Hoàng',
      title: 'Cố vấn Nghỉ hưu & Bảo hiểm',
      avatar: '👨‍🏫',
      rating: 4.7,
      reviews: 142,
      experience: '8 năm',
      specialties: ['Kế hoạch nghỉ hưu', 'Bảo hiểm', 'Quỹ hưu trí'],
      packages: {
        basic: { duration: '30 phút', price: 499000 },
        standard: { duration: '1 giờ 30 phút', price: 1299000 },
        premium: { duration: '2 giờ', price: 1699000 },
      },
      availability: 'busy',
      consultationTypes: ['chat', 'call'],
    },
    {
      id: '4',
      name: 'Phạm Thu Hà',
      title: 'Chuyên gia Tiết kiệm & Chi tiêu',
      avatar: '👩‍🎓',
      rating: 4.9,
      reviews: 201,
      experience: '6 năm',
      specialties: ['Quản lý chi tiêu', 'Tiết kiệm thông minh', 'Ngân sách gia đình'],
      packages: {
        basic: { duration: '30 phút', price: 499000 },
        standard: { duration: '1 giờ 30 phút', price: 1299000 },
        premium: { duration: '2 giờ', price: 1699000 },
      },
      availability: 'available',
      consultationTypes: ['chat', 'call', 'video'],
    },
  ];

  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');

  const allSpecialties = Array.from(
    new Set(experts.flatMap((expert) => expert.specialties))
  );

  const filteredExperts =
    filterSpecialty === 'all'
      ? experts
      : experts.filter((expert) => expert.specialties.includes(filterSpecialty));

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' ₫';
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
              <h1 className="text-white text-xl">Tư Vấn Chuyên Gia</h1>
              <p className="text-white/80 text-sm">Kết nối với chuyên gia tài chính</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Info Banner */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-blue-900 mb-1">Tư vấn chuyên nghiệp</h3>
                <p className="text-sm text-blue-700">
                  Được kết nối với các chuyên gia tài chính có chứng chỉ CFA, CFP và kinh nghiệm thực tế.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter */}
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Lọc theo chuyên môn</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={filterSpecialty === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterSpecialty('all')}
              className={
                filterSpecialty === 'all'
                  ? 'bg-primary text-white'
                  : ''
              }
            >
              Tất cả
            </Button>
            {allSpecialties.map((specialty) => (
              <Button
                key={specialty}
                variant={filterSpecialty === specialty ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterSpecialty(specialty)}
                className={
                  filterSpecialty === specialty
                    ? 'bg-primary text-white whitespace-nowrap'
                    : 'whitespace-nowrap'
                }
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>

        {/* Expert Cards */}
        <div className="mt-4 space-y-4">
          {filteredExperts.map((expert) => (
            <Card
              key={expert.id}
              className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-0">
                {/* Expert Header */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 border-b">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-md">
                      {expert.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg text-gray-900">{expert.name}</h3>
                          <p className="text-sm text-muted-foreground">{expert.title}</p>
                        </div>
                        <Badge
                          variant={
                            expert.availability === 'available'
                              ? 'default'
                              : 'secondary'
                          }
                          className={
                            expert.availability === 'available'
                              ? 'bg-green-500'
                              : 'bg-orange-500'
                          }
                        >
                          {expert.availability === 'available'
                            ? 'Sẵn sàng'
                            : 'Bận'}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-[#FFDF20] fill-[#FFDF20]" />
                          <span className="text-sm">
                            {expert.rating} ({expert.reviews})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{expert.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expert Details */}
                <div className="p-4 space-y-3">
                  {/* Specialties */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Chuyên môn</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {expert.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="outline"
                          className="border-primary/30 text-primary"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Consultation Types */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Hình thức tư vấn</span>
                    </div>
                    <div className="flex gap-2">
                      {expert.consultationTypes.includes('chat') && (
                        <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          <MessageCircle className="h-3 w-3" />
                          Chat
                        </div>
                      )}
                      {expert.consultationTypes.includes('call') && (
                        <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          <Phone className="h-3 w-3" />
                          Gọi
                        </div>
                      )}
                      {expert.consultationTypes.includes('video') && (
                        <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          <Video className="h-3 w-3" />
                          Video
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing Packages */}
                  <div className="border-t pt-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Chọn gói tư vấn</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {/* Basic Package */}
                      <button
                        onClick={() => {
                          setSelectedExpert(expert.id);
                          setSelectedPackage('basic');
                        }}
                        className={`relative p-3 rounded-xl border-2 transition-all ${
                          selectedExpert === expert.id && selectedPackage === 'basic'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {selectedExpert === expert.id && selectedPackage === 'basic' && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <div className="text-center">
                          <Shield className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                          <div className="text-xs text-blue-700 mb-1">Cơ bản</div>
                          <div className="text-sm text-blue-900">{expert.packages.basic.duration}</div>
                          <div className="text-xs text-blue-600 mt-1">{formatCurrency(expert.packages.basic.price)}</div>
                        </div>
                      </button>

                      {/* Standard Package */}
                      <button
                        onClick={() => {
                          setSelectedExpert(expert.id);
                          setSelectedPackage('standard');
                        }}
                        className={`relative p-3 rounded-xl border-2 transition-all ${
                          selectedExpert === expert.id && selectedPackage === 'standard'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        {selectedExpert === expert.id && selectedPackage === 'standard' && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] px-2 py-0">
                          Phổ biến
                        </Badge>
                        <div className="text-center">
                          <Award className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                          <div className="text-xs text-purple-700 mb-1">Tiêu chuẩn</div>
                          <div className="text-sm text-purple-900">{expert.packages.standard.duration}</div>
                          <div className="text-xs text-purple-600 mt-1">{formatCurrency(expert.packages.standard.price)}</div>
                        </div>
                      </button>

                      {/* Premium Package */}
                      <button
                        onClick={() => {
                          setSelectedExpert(expert.id);
                          setSelectedPackage('premium');
                        }}
                        className={`relative p-3 rounded-xl border-2 transition-all ${
                          selectedExpert === expert.id && selectedPackage === 'premium'
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-gray-200 hover:border-yellow-300'
                        }`}
                      >
                        {selectedExpert === expert.id && selectedPackage === 'premium' && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                        <div className="text-center">
                          <Crown className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                          <div className="text-xs text-yellow-700 mb-1">Premium</div>
                          <div className="text-sm text-yellow-900">{expert.packages.premium.duration}</div>
                          <div className="text-xs text-yellow-600 mt-1">{formatCurrency(expert.packages.premium.price)}</div>
                        </div>
                      </button>
                    </div>

                    {/* Benefits based on selected package */}
                    {selectedExpert === expert.id && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <div className="text-xs text-gray-700">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">
                              {selectedPackage === 'basic' && 'Gói Cơ bản bao gồm:'}
                              {selectedPackage === 'standard' && 'Gói Tiêu chuẩn bao gồm:'}
                              {selectedPackage === 'premium' && 'Gói Premium bao gồm:'}
                            </span>
                          </div>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2">
                              <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Tư vấn 1-1 với chuyên gia</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>Phân tích tình hình tài chính</span>
                            </li>
                            {(selectedPackage === 'standard' || selectedPackage === 'premium') && (
                              <>
                                <li className="flex items-start gap-2">
                                  <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>Kế hoạch hành động chi tiết</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>Báo cáo phân tích chuyên sâu</span>
                                </li>
                              </>
                            )}
                            {selectedPackage === 'premium' && (
                              <>
                                <li className="flex items-start gap-2">
                                  <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>Hỗ trợ sau tư vấn 30 ngày</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>Tài liệu & template độc quyền</span>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={onBookExpert}
                      disabled={expert.availability === 'offline' || selectedExpert !== expert.id}
                      className="w-full h-12 bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90 disabled:opacity-50"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      {selectedExpert === expert.id ? 'Đặt lịch ngay' : 'Chọn gói để đặt lịch'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <Card className="mt-6 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-green-900 mb-1">Cam kết chất lượng</h3>
                <p className="text-sm text-green-700">
                  Hoàn tiền 100% nếu không hài lòng với buổi tư vấn đầu tiên.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}