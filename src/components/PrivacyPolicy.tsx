import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, Shield, Lock, Eye, Database, Cookie, UserCheck } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Chính Sách Bảo Mật</h1>
              <p className="text-white/80 text-sm">Cập nhật: 15/11/2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Privacy Commitment */}
        <Card className="mt-4 border-0 shadow-xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-blue-900 mb-2">Cam kết bảo mật</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="mt-4 border-0 shadow-xl overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                1. Thông tin chúng tôi thu thập
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <h4 className="text-foreground mb-1">1.1. Thông tin cá nhân</h4>
                  <ul className="list-disc list-inside space-y-1 pl-4 leading-relaxed">
                    <li>Họ tên, email, số điện thoại</li>
                    <li>Ngày sinh, giới tính, địa chỉ</li>
                    <li>Thông tin tài khoản ngân hàng (nếu có)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-foreground mb-1">1.2. Thông tin tài chính</h4>
                  <ul className="list-disc list-inside space-y-1 pl-4 leading-relaxed">
                    <li>Thu nhập, chi tiêu hàng tháng</li>
                    <li>Mục tiêu tài chính, số tiền tiết kiệm</li>
                    <li>Lịch sử giao dịch với chuyên gia</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-foreground mb-1">1.3. Thông tin sử dụng</h4>
                  <ul className="list-disc list-inside space-y-1 pl-4 leading-relaxed">
                    <li>Lịch sử đăng nhập, hoạt động trong ứng dụng</li>
                    <li>Thiết bị sử dụng, địa chỉ IP</li>
                    <li>Cookies và công nghệ tracking</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                2. Cách chúng tôi sử dụng thông tin
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="leading-relaxed">
                  Thông tin của bạn được sử dụng để:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Cung cấp và cải thiện dịch vụ</li>
                  <li>Tạo kế hoạch tài chính cá nhân hóa</li>
                  <li>Kết nối bạn với chuyên gia phù hợp</li>
                  <li>Gửi thông báo, cập nhật quan trọng</li>
                  <li>Phân tích và cải thiện trải nghiệm người dùng</li>
                  <li>Phát hiện và ngăn chặn gian lận</li>
                  <li>Tuân thủ pháp luật và quy định</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                3. Bảo vệ thông tin
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="leading-relaxed">
                  Chúng tôi áp dụng các biện pháp bảo mật hàng đầu:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <Lock className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-foreground text-xs mb-1">Mã hóa dữ liệu</h5>
                      <p className="text-xs">Sử dụng chuẩn mã hóa AES-256 cho mọi dữ liệu nhạy cảm</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-foreground text-xs mb-1">HTTPS/SSL</h5>
                      <p className="text-xs">Tất cả kết nối được bảo mật bằng SSL/TLS</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-foreground text-xs mb-1">Backup định kỳ</h5>
                      <p className="text-xs">Sao lưu dữ liệu tự động hàng ngày</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <UserCheck className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-foreground text-xs mb-1">Kiểm soát truy cập</h5>
                      <p className="text-xs">Chỉ nhân viên được ủy quyền mới truy cập dữ liệu</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                4. Chia sẻ thông tin
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="leading-relaxed">
                  Chúng tôi KHÔNG bán thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ với:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li><strong>Chuyên gia tư vấn:</strong> Khi bạn đặt lịch tư vấn</li>
                  <li><strong>Nhà cung cấp dịch vụ:</strong> Thanh toán, email, analytics (đã ký NDA)</li>
                  <li><strong>Cơ quan pháp luật:</strong> Khi có yêu cầu hợp pháp</li>
                  <li><strong>Đối tác kinh doanh:</strong> Chỉ sau khi có sự đồng ý của bạn</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <Cookie className="h-5 w-5 text-primary" />
                5. Cookies và công nghệ tracking
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="leading-relaxed">
                  Chúng tôi sử dụng cookies để:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Ghi nhớ phiên đăng nhập</li>
                  <li>Cá nhân hóa trải nghiệm</li>
                  <li>Phân tích cách sử dụng ứng dụng</li>
                  <li>Cải thiện hiệu suất và bảo mật</li>
                </ul>
                <p className="leading-relaxed mt-2">
                  Bạn có thể quản lý cookies trong cài đặt trình duyệt, tuy nhiên việc vô hiệu hóa có thể ảnh hưởng đến một số tính năng.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                6. Quyền của bạn
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="leading-relaxed">
                  Bạn có quyền:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li><strong>Truy cập:</strong> Xem thông tin cá nhân chúng tôi lưu trữ</li>
                  <li><strong>Sửa đổi:</strong> Cập nhật thông tin không chính xác</li>
                  <li><strong>Xóa:</strong> Yêu cầu xóa dữ liệu cá nhân</li>
                  <li><strong>Xuất dữ liệu:</strong> Tải về bản sao dữ liệu của bạn</li>
                  <li><strong>Từ chối:</strong> Không đồng ý với một số hoạt động xử lý</li>
                  <li><strong>Rút lại đồng ý:</strong> Bất kỳ lúc nào</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Để thực hiện các quyền này, vui lòng liên hệ: privacy@financeplanner.vn
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                7. Lưu trữ dữ liệu
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dữ liệu của bạn được lưu trữ trên server tại Việt Nam và tuân thủ pháp luật Việt Nam về bảo vệ dữ liệu cá nhân. Chúng tôi chỉ lưu trữ dữ liệu trong thời gian cần thiết để cung cấp dịch vụ hoặc theo quy định pháp luật.
              </p>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                8. Trẻ em
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dịch vụ của chúng tôi không dành cho người dưới 18 tuổi. Chúng tôi không cố ý thu thập thông tin từ trẻ em. Nếu bạn là phụ huynh và phát hiện con bạn đã cung cấp thông tin, vui lòng liên hệ để chúng tôi xóa dữ liệu.
              </p>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                9. Thay đổi chính sách
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Chúng tôi có thể cập nhật chính sách này định kỳ. Thay đổi quan trọng sẽ được thông báo qua email hoặc thông báo trong ứng dụng ít nhất 30 ngày trước khi có hiệu lực.
              </p>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                10. Liên hệ
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:
              </p>
              <div className="bg-primary/5 rounded-lg p-4 space-y-2 text-sm">
                <p><strong>Bộ phận Bảo vệ Dữ liệu</strong></p>
                <p>📧 Email: privacy@financeplanner.vn</p>
                <p>📞 Hotline: 1900 xxxx (ext. 2)</p>
                <p>📍 Địa chỉ: Tầng 10, Tòa nhà ABC, 123 Phố Huế, Hà Nội</p>
              </div>
            </section>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-green-900 mb-1">
                  <strong>Tuân thủ pháp luật:</strong> Chính sách này tuân thủ Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân của Việt Nam.
                </p>
                <p className="text-xs text-green-700">
                  Có hiệu lực từ ngày 15/11/2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
