import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ChevronLeft, HelpCircle, ChevronDown, ChevronUp, Search, Book, CreditCard, Shield, Settings, Users, Lightbulb } from 'lucide-react';

interface HelpCenterProps {
  onBack: () => void;
}

export default function HelpCenter({ onBack }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const faqCategories = [
    {
      icon: Book,
      title: 'Bắt đầu',
      color: 'from-blue-500 to-cyan-500',
      faqs: [
        {
          id: 'start-1',
          question: 'Làm thế nào để tạo mục tiêu tài chính?',
          answer: 'Từ màn hình chính, chạm vào "Tạo mục tiêu mới", nhập thông tin mục tiêu (tên, số tiền, thời gian), sau đó điền thu nhập và chi tiêu hàng tháng. Ứng dụng sẽ tự động phân tích và đưa ra kế hoạch phù hợp.',
        },
        {
          id: 'start-2',
          question: 'Ứng dụng hoạt động như thế nào?',
          answer: 'Ứng dụng sử dụng công thức tài chính FV = PV × (1 + r)^n để tính toán kế hoạch tiết kiệm. Bạn nhập mục tiêu, thu nhập, chi tiêu → ứng dụng phân tích → đưa ra lộ trình cụ thể với các milestone.',
        },
        {
          id: 'start-3',
          question: 'Tôi có thể tạo bao nhiêu mục tiêu?',
          answer: 'Bạn có thể tạo không giới hạn số lượng mục tiêu. Tuy nhiên, nên tập trung vào 2-3 mục tiêu chính để dễ quản lý và đạt hiệu quả cao nhất.',
        },
      ],
    },
    {
      icon: CreditCard,
      title: 'Tài chính & Thanh toán',
      color: 'from-green-500 to-emerald-500',
      faqs: [
        {
          id: 'payment-1',
          question: 'Gói tư vấn chuyên gia có giá như thế nào?',
          answer: 'Có 3 gói: Cơ bản (499.000đ/30p), Tiêu chuẩn (1.299.000đ/1.5h), Premium (1.699.000đ/2h). Mỗi gói có các lợi ích khác nhau, gói cao hơn bao gồm hỗ trợ sau tư vấn và tài liệu độc quyền.',
        },
        {
          id: 'payment-2',
          question: 'Làm sao để thanh toán phí tư vấn?',
          answer: 'Sau khi đặt lịch, bạn có thể thanh toán qua Ví điện tử (MoMo, ZaloPay), Thẻ ngân hàng, hoặc Chuyển khoản. Hóa đơn sẽ được gửi qua email ngay sau khi thanh toán thành công.',
        },
        {
          id: 'payment-3',
          question: 'Có chính sách hoàn tiền không?',
          answer: 'Có. Nếu bạn không hài lòng với buổi tư vấn đầu tiên, chúng tôi hoàn 100% phí trong vòng 24h. Với các buổi tư vấn tiếp theo, bạn có thể hủy miễn phí trước 48h.',
        },
      ],
    },
    {
      icon: Shield,
      title: 'Bảo mật & Quyền riêng tư',
      color: 'from-purple-500 to-pink-500',
      faqs: [
        {
          id: 'security-1',
          question: 'Dữ liệu của tôi có an toàn không?',
          answer: 'Có. Chúng tôi mã hóa toàn bộ dữ liệu bằng chuẩn AES-256, lưu trữ trên server bảo mật cao. Không có bên thứ ba nào có thể truy cập thông tin cá nhân của bạn.',
        },
        {
          id: 'security-2',
          question: 'Làm thế nào để bật xác thực 2 bước?',
          answer: 'Vào Cài đặt → Bảo mật & Quyền riêng tư → Bật "Xác thực 2 bước". Bạn sẽ cần nhập mã OTP từ email hoặc SMS mỗi lần đăng nhập từ thiết bị mới.',
        },
        {
          id: 'security-3',
          question: 'Tôi quên mật khẩu, phải làm sao?',
          answer: 'Tại màn hình đăng nhập, chọn "Quên mật khẩu", nhập email đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu. Link có hiệu lực 1 giờ.',
        },
      ],
    },
    {
      icon: Settings,
      title: 'Tính năng',
      color: 'from-orange-500 to-red-500',
      faqs: [
        {
          id: 'feature-1',
          question: 'Hệ thống điểm và lửa 🔥 hoạt động như thế nào?',
          answer: 'Bạn nhận lửa khi hoàn thành nhiệm vụ: Điểm danh hàng ngày (+10🔥), Cập nhật tiến độ (+20🔥), Chơi game (+20🔥/cặp). Lửa có thể đổi phần thưởng như giảm giá tư vấn, báo cáo Pro.',
        },
        {
          id: 'feature-2',
          question: 'Các công cụ tài chính có chính xác không?',
          answer: 'Công cụ tính toán dựa trên công thức tài chính chuẩn quốc tế. Tuy nhiên, kết quả chỉ mang tính tham khảo vì thực tế còn phụ thuộc nhiều yếu tố khác.',
        },
        {
          id: 'feature-3',
          question: 'Tôi có thể sử dụng ứng dụng offline không?',
          answer: 'Một số tính năng cơ bản như xem dữ liệu đã lưu, sử dụng công cụ tính toán có thể dùng offline. Tuy nhiên, để đồng bộ dữ liệu, tư vấn AI và chuyên gia cần kết nối internet.',
        },
      ],
    },
    {
      icon: Users,
      title: 'Tư vấn chuyên gia',
      color: 'from-pink-500 to-rose-500',
      faqs: [
        {
          id: 'expert-1',
          question: 'Làm thế nào để đặt lịch tư vấn?',
          answer: 'Vào "Tư vấn chuyên gia", chọn chuyên gia phù hợp, chọn gói tư vấn, chọn ngày giờ, sau đó thanh toán. Bạn sẽ nhận email xác nhận với link join meeting.',
        },
        {
          id: 'expert-2',
          question: 'Chuyên gia có chứng chỉ gì?',
          answer: 'Tất cả chuyên gia đều có chứng chỉ CFA (Chartered Financial Analyst) hoặc CFP (Certified Financial Planner) và ít nhất 5 năm kinh nghiệm thực tế trong lĩnh vực tài chính.',
        },
        {
          id: 'expert-3',
          question: 'Tôi có nhận báo cáo sau buổi tư vấn không?',
          answer: 'Có. Với gói Tiêu chuẩn và Premium, bạn sẽ nhận báo cáo phân tích chi tiết trong vòng 24h. Báo cáo bao gồm kế hoạch hành động, khuyến nghị và tài liệu tham khảo.',
        },
      ],
    },
  ];

  const quickGuides = [
    {
      icon: Lightbulb,
      title: 'Bắt đầu nhanh',
      description: 'Hướng dẫn sử dụng cơ bản',
      color: 'bg-yellow-500',
    },
    {
      icon: Book,
      title: 'Video hướng dẫn',
      description: 'Xem video chi tiết',
      color: 'bg-blue-500',
    },
    {
      icon: Users,
      title: 'Cộng đồng',
      description: 'Tham gia diễn đàn',
      color: 'bg-green-500',
    },
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white pb-20">
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
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Trung Tâm Trợ Giúp</h1>
              <p className="text-white/80 text-sm">Câu hỏi thường gặp & hướng dẫn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm câu hỏi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 shadow-lg border-0"
          />
        </div>

        {/* Quick Guides */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {quickGuides.map((guide, index) => {
            const Icon = guide.icon;
            return (
              <button
                key={index}
                className="bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className={`w-10 h-10 ${guide.color} rounded-xl mx-auto mb-2 flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs mb-1">{guide.title}</p>
                <p className="text-[10px] text-muted-foreground">{guide.description}</p>
              </button>
            );
          })}
        </div>

        {/* FAQ Categories */}
        {filteredFaqs.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;
          return (
            <Card key={categoryIndex} className="mt-4 border-0 shadow-xl overflow-hidden">
              <div className={`bg-gradient-to-br ${category.color} p-4 border-b`}>
                <h3 className="text-white flex items-center gap-2">
                  <CategoryIcon className="h-5 w-5" />
                  {category.title}
                </h3>
              </div>
              <CardContent className="p-0">
                {category.faqs.map((faq, faqIndex) => (
                  <div key={faq.id}>
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm flex-1">{faq.question}</p>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                      {expandedFaq === faq.id && (
                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                          {faq.answer}
                        </p>
                      )}
                    </button>
                    {faqIndex < category.faqs.length - 1 && (
                      <div className="h-px bg-gray-100 mx-4"></div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}

        {/* No Results */}
        {searchQuery && filteredFaqs.length === 0 && (
          <Card className="mt-4 border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8 text-center">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg mb-2">Không tìm thấy kết quả</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Không tìm thấy câu hỏi nào phù hợp với "{searchQuery}"
              </p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery('')}
              >
                Xóa tìm kiếm
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Still Need Help */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-4 text-center">
            <h4 className="text-sm mb-2">Vẫn cần hỗ trợ?</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Liên hệ đội ngũ hỗ trợ của chúng tôi
            </p>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-[#00a896]"
            >
              Liên hệ hỗ trợ
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
