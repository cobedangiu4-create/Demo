import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, FileText, CheckCircle } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
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
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-xl">Điều Khoản Dịch Vụ</h1>
              <p className="text-white/80 text-sm">Cập nhật: 15/11/2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        <Card className="mt-4 border-0 shadow-xl overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                1. Giới thiệu
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Chào mừng bạn đến với ứng dụng Lập Kế Hoạch Tài Chính Cá Nhân. Bằng việc sử dụng ứng dụng, bạn đồng ý tuân thủ các điều khoản và điều kiện sau đây. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.
              </p>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                2. Sử dụng dịch vụ
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <h4 className="text-foreground mb-1">2.1. Điều kiện sử dụng</h4>
                  <p className="leading-relaxed">
                    Bạn phải từ 18 tuổi trở lên để sử dụng dịch vụ. Bạn cam kết cung cấp thông tin chính xác, đầy đủ khi đăng ký tài khoản và cập nhật thông tin khi có thay đổi.
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground mb-1">2.2. Tài khoản người dùng</h4>
                  <p className="leading-relaxed">
                    Bạn chịu trách nhiệm bảo mật thông tin tài khoản và mật khẩu. Mọi hoạt động thông qua tài khoản của bạn được xem là do bạn thực hiện. Vui lòng thông báo ngay cho chúng tôi nếu phát hiện bất kỳ vi phạm bảo mật nào.
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground mb-1">2.3. Quyền sử dụng</h4>
                  <p className="leading-relaxed">
                    Chúng tôi cấp cho bạn quyền sử dụng cá nhân, không độc quyền, không chuyển nhượng để truy cập và sử dụng ứng dụng. Bạn không được sao chép, sửa đổi, phân phối, bán hoặc cho thuê bất kỳ phần nào của ứng dụng.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                3. Dịch vụ tư vấn chuyên gia
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <h4 className="text-foreground mb-1">3.1. Bản chất tư vấn</h4>
                  <p className="leading-relaxed">
                    Dịch vụ tư vấn tài chính chỉ mang tính chất tham khảo, không phải lời khuyên pháp lý hoặc đầu tư chính thức. Bạn nên tìm hiểu kỹ và tự chịu trách nhiệm về quyết định tài chính của mình.
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground mb-1">3.2. Thanh toán và hoàn tiền</h4>
                  <p className="leading-relaxed">
                    Phí tư vấn được thanh toán trước qua các phương thức được chỉ định. Chính sách hoàn tiền áp dụng theo từng gói dịch vụ cụ thể. Hoàn tiền 100% cho buổi tư vấn đầu tiên nếu không hài lòng (trong vòng 24h).
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground mb-1">3.3. Hủy lịch</h4>
                  <p className="leading-relaxed">
                    Bạn có thể hủy lịch tư vấn miễn phí trước 48 giờ. Hủy trong vòng 48 giờ sẽ bị tính phí 50%. Không hoàn tiền nếu vắng mặt không báo trước.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                4. Nội dung người dùng
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="leading-relaxed">
                  Bạn giữ quyền sở hữu nội dung mà bạn tạo ra (như bài viết trong diễn đàn). Tuy nhiên, bằng việc đăng nội dung, bạn cấp cho chúng tôi quyền sử dụng, sao chép, phân phối nội dung đó trên nền tảng.
                </p>
                <p className="leading-relaxed">
                  Bạn không được đăng nội dung vi phạm pháp luật, xúc phạm, spam, hoặc vi phạm quyền của người khác. Chúng tôi có quyền xóa nội dung vi phạm mà không cần thông báo.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                5. Giới hạn trách nhiệm
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="leading-relaxed">
                  Ứng dụng được cung cấp "nguyên trạng". Chúng tôi không đảm bảo dịch vụ luôn hoạt động liên tục, an toàn hoặc không có lỗi. Chúng tôi không chịu trách nhiệm về:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Thiệt hại trực tiếp hoặc gián tiếp từ việc sử dụng ứng dụng</li>
                  <li>Mất mát dữ liệu do lỗi kỹ thuật</li>
                  <li>Quyết định tài chính dựa trên tư vấn của ứng dụng</li>
                  <li>Hành vi của bên thứ ba trên nền tảng</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                6. Thay đổi điều khoản
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Chúng tôi có quyền thay đổi các điều khoản này bất kỳ lúc nào. Thay đổi sẽ có hiệu lực ngay khi được đăng tải. Việc bạn tiếp tục sử dụng dịch vụ sau khi thay đổi có nghĩa là bạn chấp nhận các điều khoản mới.
              </p>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                7. Chấm dứt dịch vụ
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bạn có thể ngừng sử dụng dịch vụ bất kỳ lúc nào bằng cách xóa tài khoản. Chúng tôi có quyền đình chỉ hoặc chấm dứt tài khoản của bạn nếu vi phạm điều khoản mà không cần thông báo trước.
              </p>
            </section>

            <section>
              <h3 className="text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                8. Liên hệ
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nếu bạn có câu hỏi về các điều khoản này, vui lòng liên hệ:
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <p>📧 Email: support@financeplanner.vn</p>
                <p>📞 Hotline: 1900 xxxx</p>
                <p>📍 Địa chỉ: Tầng 10, Tòa nhà ABC, 123 Phố Huế, Hà Nội</p>
              </div>
            </section>
          </CardContent>
        </Card>

        {/* Last Updated */}
        <Card className="mt-4 border-0 shadow-lg overflow-hidden bg-gray-50">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">
              Điều khoản dịch vụ này có hiệu lực từ ngày 15/11/2024
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
