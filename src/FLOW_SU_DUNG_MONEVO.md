# FLOW SỬ DỤNG ỨNG DỤNG MONEVO
## Ứng Dụng Lập Kế Hoạch Tài Chính Cá Nhân

---

## 📱 TỔNG QUAN

MONEVO là ứng dụng lập kế hoạch tài chính cá nhân được tối ưu cho iPhone 16 Pro Max với 2 loại người dùng chính:
- **Khách hàng**: Người dùng cần lập kế hoạch tài chính và tư vấn
- **Chuyên gia**: Chuyên gia tài chính cung cấp dịch vụ tư vấn

---

## 🎯 FLOW CHÍNH CHO KHÁCH HÀNG

### GIAI ĐOẠN 1: AUTHENTICATION (Xác Thực)

#### 1.1. Chọn Loại Người Dùng
**Màn hình**: `userTypeSelection`

**Mô tả giao diện:**
- Logo MONEVO ở trung tâm với theme màu teal/green (#009689)
- Tiêu đề "Chào mừng đến với MONEVO"
- 2 Card lựa chọn lớn:
  - 👤 **Khách Hàng**: "Tôi muốn quản lý tài chính cá nhân"
  - 👨‍💼 **Chuyên Gia**: "Tôi là chuyên gia tài chính"

**Hành động:**
1. Người dùng mở app lần đầu tiên
2. Đọc mô tả ngắn gọn về từng vai trò
3. Tap vào card để chọn vai trò
4. Hệ thống lưu lựa chọn vào state `userType`
5. Tự động chuyển đến màn hình `login`

**Lưu ý:**
- Có thể quay lại thay đổi lựa chọn từ màn hình đăng nhập
- Lựa chọn này sẽ quyết định toàn bộ UX và các tính năng được hiển thị

---

#### 1.2. Đăng Nhập
**Màn hình**: `login`

**Mô tả giao diện:**
- Header hiển thị vai trò đã chọn (Khách hàng/Chuyên gia)
- Logo MONEVO nhỏ ở phía trên
- Form đăng nhập với validation

**Form đăng nhập bao gồm:**
1. **Email field**
   - Label: "Email"
   - Placeholder: "example@email.com"
   - Validation: Định dạng email hợp lệ
   - Error message: "Email không hợp lệ"

2. **Password field**
   - Label: "Mật khẩu"
   - Placeholder: "••••••••"
   - Icon mắt để show/hide password
   - Validation: Tối thiểu 6 ký tự
   - Error message: "Mật khẩu phải có ít nhất 6 ký tự"

3. **Nút "Quên mật khẩu?"**
   - Link text nhỏ bên dưới password field
   - Tap → Chuyển đến `forgotPassword`

4. **Nút "Đăng nhập"**
   - Button primary (màu #009689)
   - Full width
   - Loading state khi đang xử lý

5. **Divider**: "hoặc"

6. **Nút "Đăng ký tài khoản mới"**
   - Button outline
   - Tap → Chuyển đến `register`

7. **Nút quay lại**
   - Icon arrow left ở góc trên bên trái
   - Tap → Quay lại `userTypeSelection`

**Flow đăng nhập:**
1. Nhập email và mật khẩu
2. Tap nút "Đăng nhập"
3. Hiển thị loading spinner
4. Validation:
   - ✅ Nếu thành công: 
     - Lưu token authentication
     - Set `isAuthenticated = true`
     - Chuyển đến `home` (khách hàng) hoặc `expertHome` (chuyên gia)
   - ❌ Nếu thất bại:
     - Hiển thị error toast: "Email hoặc mật khẩu không đúng"
     - Focus vào email field
     - Cho phép thử lại

**Trường hợp đặc biệt:**
- **Email chưa xác thực**: Hiển thị thông báo "Vui lòng kiểm tra email để xác thực tài khoản"
- **Tài khoản bị khóa**: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ hỗ trợ"
- **Quá nhiều lần thử sai**: "Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau 5 phút"

**Tips cho người dùng:**
- 💡 Sử dụng email đã đăng ký
- 🔐 Mật khẩu phân biệt chữ hoa/thường
- 📧 Kiểm tra spam nếu không nhận được email xác thực

---

#### 1.3. Đăng Ký (Nếu Chưa Có Tài Khoản)
**Màn hình**: `register`

**Mô tả giao diện:**
- Header: "Tạo tài khoản mới"
- Sub-header hiển thị vai trò đã chọn
- Form đăng ký với 4 bước validation

**Form đăng ký chi tiết:**

1. **Họ và Tên**
   - Label: "Họ và tên đầy đủ"
   - Placeholder: "Nguyễn Văn A"
   - Validation: 
     - Bắt buộc nhập
     - Tối thiểu 3 ký tự
     - Chỉ chứa chữ cái và khoảng trắng
   - Error: "Vui lòng nhập họ tên hợp lệ (ít nhất 3 ký tự)"

2. **Email**
   - Label: "Email"
   - Placeholder: "example@email.com"
   - Validation:
     - Bắt buộc nhập
     - Định dạng email chuẩn
     - Kiểm tra email đã tồn tại chưa (realtime)
   - Success indicator: ✅ "Email có thể sử dụng"
   - Error: "Email đã được sử dụng" hoặc "Email không hợp lệ"

3. **Số điện thoại**
   - Label: "Số điện thoại"
   - Placeholder: "0912345678"
   - Format: Tự động format khi nhập (09XX XXX XXX)
   - Validation:
     - Bắt buộc nhập
     - 10 số
     - Bắt đầu bằng 0
   - Error: "Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)"

4. **Mật khẩu**
   - Label: "Mật khẩu"
   - Placeholder: "••••••••"
   - Icon show/hide password
   - Password strength indicator:
     - 🔴 Yếu (< 6 ký tự)
     - 🟡 Trung bình (6-8 ký tự)
     - 🟢 Mạnh (> 8 ký tự, có số và ký tự đặc biệt)
   - Validation:
     - Tối thiểu 6 ký tự
     - Khuyến nghị có chữ hoa, chữ thường, số
   - Error: "Mật khẩu phải có ít nhất 6 ký tự"

5. **Xác nhận mật khẩu**
   - Label: "Xác nhận mật khẩu"
   - Placeholder: "••••••••"
   - Validation:
     - Phải trùng khớp với mật khẩu
   - Real-time check: ✅ hoặc ❌
   - Error: "Mật khẩu xác nhận không khớp"

6. **Checkbox điều khoản**
   - ☑️ "Tôi đồng ý với [Điều khoản dịch vụ] và [Chính sách bảo mật]"
   - Links màu xanh có thể tap
   - Bắt buộc check mới được đăng ký

7. **Nút "Đăng ký"**
   - Button primary, full width
   - Disabled cho đến khi tất cả validation pass
   - Loading state khi đang xử lý

8. **Divider**: "hoặc"

9. **Link "Đã có tài khoản? Đăng nhập"**
   - Text link
   - Tap → Chuyển đến `login`

**Flow đăng ký:**
```
1. Người dùng nhập thông tin từng field
   ↓
2. Realtime validation cho từng field khi blur
   ↓
3. Tap nút "Đăng ký" (nếu tất cả validation pass)
   ↓
4. Hiển thị loading
   ↓
5. Gửi request đến server
   ↓
6. Xử lý response:
   ├─ ✅ Thành công:
   │   ├─ Tạo tài khoản
   │   ├─ Gửi email xác thực
   │   ├─ Tự động đăng nhập
   │   ├─ Set isAuthenticated = true
   │   ├─ Chuyển đến `welcome`
   │   └─ Hiển thị toast: "Chào mừng bạn đến với MONEVO!"
   │
   └─ ❌ Thất bại:
       ├─ Email đã tồn tại → "Email này đã được đăng ký"
       ├─ Server error → "Có lỗi xảy ra, vui lòng thử lại"
       └─ Network error → "Không có kết nối mạng"
```

**Sau khi đăng ký thành công:**
- Tự động chuyển đến màn hình `welcome`
- Màn hình chào mừng hiển thị:
  - Animation chào mừng
  - Tên người dùng
  - Giới thiệu ngắn gọn về MONEVO
  - Nút "Bắt đầu" → Chuyển đến `home`

**Best Practices:**
- ✅ Nhập thông tin chính xác để dễ dàng khôi phục tài khoản
- 📧 Sử dụng email thường xuyên kiểm tra
- 🔐 Đặt mật khẩu mạnh, dễ nhớ
- 📱 Số điện thoại để nhận OTP và thông báo quan trọng

---

#### 1.4. Quên Mật Khẩu
**Màn hình**: `forgotPassword`

**Mô tả giao diện:**
- Header: "Quên mật khẩu"
- Icon khóa lớn ở trung tâm
- Mô tả: "Nhập email đã đăng ký, chúng tôi sẽ gửi link đặt lại mật khẩu"

**Form khôi phục:**

1. **Email field**
   - Label: "Email đã đăng ký"
   - Placeholder: "example@email.com"
   - Validation: Email hợp lệ
   - Icon email bên trái

2. **Nút "Gửi link khôi phục"**
   - Button primary, full width
   - Disabled nếu email chưa hợp lệ
   - Loading state khi đang gửi

3. **Nút quay lại**
   - Text link "Quay lại đăng nhập"
   - Tap → Quay lại `login`

**Flow khôi phục mật khẩu:**
```
1. Nhập email đã đăng ký
   ↓
2. Tap "Gửi link khôi phục"
   ↓
3. Kiểm tra email có tồn tại trong hệ thống
   ↓
4. Xử lý:
   ├─ ✅ Email tồn tại:
   │   ├─ Tạo token reset password
   │   ├─ Gửi email với link reset
   │   ├─ Hiển thị màn hình xác nhận:
   │   │   - Icon email với checkmark
   │   │   - "Email đã được gửi!"
   │   │   - "Vui lòng kiểm tra hộp thư của bạn"
   │   │   - Link có hiệu lực trong 15 phút
   │   ├─ Timer đếm ngược để gửi lại
   │   └─ Nút "Quay lại đăng nhập"
   │
   └─ ❌ Email không tồn tại:
       ├─ Vẫn hiển thị success (bảo mật)
       └─ Không tiết lộ email có trong hệ thống hay không
```

**Email khôi phục chứa:**
- Link reset password
- Thời gian hết hạn (15 phút)
- Cảnh báo bảo mật: "Nếu bạn không yêu cầu, hãy bỏ qua email này"

**Sau khi click link trong email:**
- Mở app/web với token
- Hiển thị form đặt mật khẩu mới:
  - Mật khẩu mới
  - Xác nhận mật khẩu mới
  - Nút "Đặt lại mật khẩu"
- Thành công → Tự động đăng nhập → Chuyển đến `home`

**Troubleshooting:**
- ❌ "Không nhận được email?":
  - Kiểm tra thư mục Spam/Junk
  - Đợi 1-2 phút
  - Tap "Gửi lại" (sau 60 giây)
  - Liên hệ hỗ trợ

---

### GIAI ĐOẠN 2: TRANG CHỦ & ĐIỀU HƯỚNG

#### 2.1. Trang Chủ Khách Hàng
**Màn hình**: `home`

**Layout tổng quan:**
```
┌─────────────────────────────────┐
│ Header (Fixed)                  │
│ ├─ Logo MONEVO                  │
│ ├─ Thông báo (icon + badge)     │
│ └─ Avatar người dùng            │
├─────────────────────────────────┤
│ Scrollable Content              │
│ ├─ Welcome Section              │
│ ├─ Quick Actions (4 cards)      │
│ ├─ Financial Overview           │
│ ├─ 10 Features Grid             │
│ └─ Tips & News                  │
├─────────────────────────────────┤
│ Bottom Navigation (Fixed)       │
│ 🏠 📊 💰 🔧 ⚙️                   │
└─────────────────────────────────┘
```

**Chi tiết từng phần:**

**1. Header Section**
- **Logo MONEVO**: Góc trên trái
- **Icon thông báo**: 
  - Góc trên phải
  - Badge đỏ hiển thị số thông báo chưa đọc
  - Tap → Chuyển đến `notifications`
- **Avatar người dùng**:
  - Bên cạnh icon thông báo
  - Tap → Chuyển đến `profile`

**2. Welcome Section**
```
┌─────────────────────────────────┐
│ 👋 Xin chào, [Tên người dùng]!  │
│ Hôm nay là [Thứ 3, 2/12/2025]   │
│ "Mỗi đồng tiết kiệm là một bước │
│  đến tương lai tươi sáng"       │
└─────────────────────────────────┘
```
- Hiển thị tên người dùng (từ profile)
- Ngày hiện tại
- Quote tài chính ngẫu nhiên mỗi ngày

**3. Quick Actions (4 Cards chính)**

Card được hiển thị khác nhau tùy trạng thái:

**A. Nếu chưa có dữ liệu phân tích (`analysisData === null`):**

```
┌──────────────────┬──────────────────┐
│ 📊 Bắt Đầu       │ 🎯 Đặt Mục Tiêu  │
│    Phân Tích     │    Tài Chính     │
│                  │                  │
│ "Phân tích tài   │ "Tạo kế hoạch    │
│  chính của bạn"  │  SMART"          │
└──────────────────┴──────────────────┘
┌──────────────────┬──────────────────┐
│ 👨‍💼 Tư Vấn       │ 💬 Diễn Đàn      │
│    Chuyên Gia    │    Cộng Đồng     │
│                  │                  │
│ "Đặt lịch với    │ "Chia sẻ kinh    │
│  chuyên gia"     │  nghiệm"         │
└──────────────────┴──────────────────┘
```

**Hành động:**
- Tap "Bắt Đầu Phân Tích" → `input`
- Tap "Đặt Mục Tiêu" → `input` (same)
- Tap "Tư Vấn Chuyên Gia" → `expertList`
- Tap "Diễn Đàn" → `forum`

**B. Nếu đã có dữ liệu phân tích:**

```
┌──────────────────┬──────────────────┐
│ 📈 Xem Tiến Độ   │ 📅 Theo Dõi      │
│                  │    Hàng Tháng    │
│ [Progress Bar]   │                  │
│ "68% hoàn thành" │ "Cập nhật thu    │
│                  │  chi tháng này"  │
└──────────────────┴──────────────────┘
┌──────────────────┬──────────────────┐
│ 🔮 Dự Báo        │ 👨‍💼 Tư Vấn       │
│    Tương Lai     │    Chuyên Gia    │
│                  │                  │
│ "Kịch bản đầu    │ "Nhận tư vấn     │
│  tư 5-10-20 năm" │  chuyên sâu"     │
└──────────────────┴──────────────────┘
```

**Hành động:**
- Tap "Xem Tiến Độ" → `progress`
- Tap "Theo Dõi Hàng Tháng" → `tracking`
- Tap "Dự Báo Tương Lai" → `forecast`
- Tap "Tư Vấn Chuyên Gia" → `expertList`

**4. Financial Overview (Nếu có dữ liệu)**

```
┌─────────────────────────────────┐
│ 💰 Tổng Quan Tài Chính          │
├─────────────────────────────────┤
│ Mục tiêu: [Tên mục tiêu]        │
│ ┌───────────────────────────┐   │
│ │ ▓▓▓▓▓▓▓▓░░░░░░ 68%        │   │
│ └───────────────────────────┘   │
│                                 │
│ 💵 Đã tiết kiệm: 150.000.000đ   │
│ 🎯 Mục tiêu: 220.000.000đ       │
│ 📊 Còn lại: 70.000.000đ         │
│ 📅 Tiết kiệm/tháng: 5.000.000đ  │
│                                 │
│ 🔥 Streak: 15 ngày liên tục!    │
└─────────────────────────────────┘
```

**Hiển thị:**
- Tên mục tiêu (goalLabel)
- Progress bar động
- Số tiền đã tiết kiệm (currentSavings)
- Số tiền mục tiêu (targetAmount)
- Số tiền còn thiếu
- Tiết kiệm hàng tháng (monthlySavings)
- Streak điểm danh (nếu có)

**5. 10 Tính Năng Chính (Grid Layout)**

```
┌──────────────────────────────────┐
│ 🌟 Khám Phá Thêm                 │
├────────┬────────┬────────┬───────┤
│ ✅     │ 💬     │ 🤖     │ 📜    │
│ Điểm   │ Diễn   │ AI     │ Lịch  │
│ Danh   │ Đàn    │ Chat   │ Sử    │
├────────┼────────┼────────┼───────┤
│ 🔔     │ 👤     │ 📊     │ 💰    │
│ Thông  │ Hồ     │ Thống  │ Ngân  │
│ Báo    │ Sơ     │ Kê     │ Sách  │
├────────┼────────┼────────┼───────┤
│ 🔧     │ ⚙️     │        │       │
│ Công   │ Cài    │        │       │
│ Cụ     │ Đặt    │        │       │
└────────┴────────┴────────┴───────┘
```

**Chi tiết từng tính năng:**

**A. ✅ Điểm Danh Hàng Ngày**
- Icon: Checkmark trong hình tròn
- Badge: "Hôm nay chưa điểm danh" (nếu chưa)
- Tap → `checkin`
- **Mục đích**: Tạo thói quen kiểm tra tài chính hàng ngày
- **Reward**: Tích điểm, streak bonus

**B. 💬 Diễn Đàn Tài Chính**
- Icon: Chat bubbles
- Badge: Số bài viết mới (nếu có)
- Tap → `forum`
- **5 sub-forums**:
  - 🥇 Vàng
  - 📈 Cổ phiếu
  - 📜 Trái phiếu
  - 🏠 Nhà đất
  - ₿ Bitcoin & Crypto

**C. 🤖 Chatbot AI**
- Icon: Robot
- Tap → `aichat`
- **Use cases**:
  - Hỏi đáp tài chính
  - Tư vấn nhanh
  - Giải thích thuật ngữ
  - Tips tiết kiệm

**D. 📜 Lịch Sử**
- Icon: Document scroll
- Tap → `history`
- **Hiển thị**:
  - Lịch sử tư vấn AI
  - Lịch sử tư vấn chuyên gia
  - Lịch sử phân tích
  - Lịch sử cập nhật thu chi

**E. 🔔 Thông Báo**
- Icon: Bell
- Badge đỏ: Số thông báo chưa đọc
- Tap → `notifications`
- **Loại thông báo**:
  - Lịch hẹn chuyên gia
  - Nhắc nhở cập nhật thu chi
  - Milestone đạt được
  - Điểm thưởng mới
  - Bài viết forum mới

**F. 👤 Hồ Sơ**
- Icon: User avatar
- Tap → `profile`
- **Hiển thị**:
  - Thông tin cá nhân
  - Điểm tích lũy
  - Thành tích
  - Mục tiêu hiện tại

**G. 📊 Thống Kê**
- Icon: Chart bars
- Tap → `statistics`
- **Charts**:
  - Thu chi theo tháng
  - Chi tiêu theo danh mục
  - Xu hướng tiết kiệm
  - So sánh các kỳ

**H. 💰 Quản Lý Ngân Sách**
- Icon: Money bag
- Tap → `budget`
- **Chức năng**:
  - Thiết lập ngân sách
  - Theo dõi chi tiêu
  - Cảnh báo vượt ngân sách
  - Đề xuất tiết kiệm

**I. 🔧 Công Cụ Tài Chính**
- Icon: Wrench/Tools
- Tap → `tools`
- **Các công cụ**:
  - Máy tính lãi suất kép
  - Máy tính trả nợ
  - Máy tính vay mua nhà
  - ROI calculator
  - Chuyển đổi tiền tệ

**J. ⚙️ Cài Đặt**
- Icon: Gear
- Tap → `settings`
- **Menu**:
  - Thông tin cá nhân
  - Đổi mật khẩu
  - Trợ giúp
  - Điều khoản
  - Đăng xuất

**6. Tips & News Section**

```
┌─────────────────────────────────┐
│ 💡 Mẹo Tài Chính Hôm Nay        │
├─────────────────────────────────┤
│ "Quy tắc 50/30/20: Phân bổ 50%  │
│  thu nhập cho nhu cầu thiết yếu,│
│  30% cho giải trí, 20% tiết     │
│  kiệm và đầu tư"                │
│                                 │
│ [Đọc thêm →]                    │
└─────────────────────────────────┘
```

**Nội dung thay đổi hàng ngày:**
- Tips tài chính
- Tin tức kinh tế
- Xu hướng đầu tư
- Success stories

**Interactions trên trang chủ:**

1. **Pull to Refresh**: 
   - Kéo từ trên xuống
   - Cập nhật dữ liệu mới nhất
   - Animation loading

2. **Floating Action Button (FAB)**:
   - Icon: ➕
   - Vị trí: Góc dưới phải (trên Bottom Nav)
   - Màu: Accent (#FFDF20)
   - Tap → Menu popup:
     - 📊 Phân tích mới
     - 💰 Cập nhật thu chi
     - 👨‍💼 Đặt lịch chuyên gia
     - 💬 Tạo bài viết

3. **Search Bar** (Optional):
   - Icon: 🔍
   - Placeholder: "Tìm kiếm..."
   - Search trong:
     - Tính năng
     - Lịch sử
     - Forum posts

**States của trang chủ:**

**A. First Time User (Chưa có data):**
- Hiển thị onboarding cards
- CTA nổi bật: "Bắt đầu phân tích tài chính"
- Tutorial tooltips (có thể skip)

**B. Active User (Có data, active hàng ngày):**
- Hiển thị overview đầy đủ
- Streak badges
- Personalized recommendations

**C. Inactive User (Lâu không dùng):**
- Welcome back message
- Summary của những gì bỏ lỡ
- Reminder cập nhật thu chi

**D. Goal Achieved:**
- Celebration animation 🎉
- Badge mới
- Suggest tạo mục tiêu mới

---

### GIAI ĐOẠN 3: FLOW PHÂN TÍCH TÀI CHÍNH (Core Flow)

Đây là **luồng chính** và **quan trọng nhất** của MONEVO, bao gồm 6 bước tuần tự.

#### 3.1. Nhập Liệu Tài Chính
**Màn hình**: `input` (FinancialAnalysis)

**Dữ liệu cần nhập:**
1. **Thu Chi Hàng Tháng:**
   - Thu nhập hàng tháng
   - Chi tiêu hàng tháng

2. **Tình Hình Tài Chính:**
   - Tiết kiệm hiện tại
   - Nợ hiện tại
   - Lãi suất nợ (%)

3. **Mục Tiêu Tài Chính (SMART):**
   - Loại mục tiêu (Mua nhà, Du lịch, Nghỉ hưu, v.v.)
   - Nhãn mục tiêu
   - Số tiền mục tiêu
   - Lãi suất đầu tư dự kiến (%)
   - Thời gian (năm)

4. **Đánh Giá Rủi Ro:**
   - Hồ sơ rủi ro (Thận trọng, Cân bằng, Tăng trưởng)
   - Điểm rủi ro

**Tùy chọn:**
- 🤖 Tư Vấn AI → Chuyển đến `consulting` (AI hỗ trợ phân tích)
- ✅ Hoàn tất phân tích → Chuyển đến `result`
- ⬅️ Quay lại trang chủ

#### 3.2. Kết Quả Phân Tích
**Màn hình**: `result` (AnalysisResult)

**Hiển thị:**
- 📊 Tóm tắt tình hình tài chính
- 💡 Đề xuất phân bổ tiết kiệm
- 📈 Chiến lược trả nợ (nếu có)
- 🎯 Kế hoạch đầu tư chi tiết
- 🔢 Tính toán theo công thức: FV = PV × (1 + r)^n
- ⚠️ Đánh giá rủi ro

**Hành động tiếp theo:**
- ➡️ Xem Tiến Độ → Chuyển đến `progress`
- ⬅️ Quay lại chỉnh sửa → Quay lại `input`

#### 3.3. Tiến Độ Đầu Tư
**Màn hình**: `progress` (InvestmentProgress)

**Hiển thị:**
- 📊 Biểu đồ tiến độ theo thời gian
- 💰 Số tiền hiện tại vs Mục tiêu
- 📅 Timeline chi tiết theo tháng/năm
- 🎯 Milestone đạt được
- 📈 Dự đoán hoàn thành mục tiêu

**Hành động:**
- ▶️ Bắt Đầu Theo Dõi → Chuyển đến `tracking`
- ✏️ Chỉnh Sửa Mục Tiêu → Quay lại `input`
- ⬅️ Quay lại kết quả phân tích

#### 3.4. Theo Dõi Hàng Tháng
**Màn hình**: `tracking` (MonthlyTracking)

**Hiển thị:**
- 📅 Lịch theo dõi tháng hiện tại
- 💵 Tiết kiệm thực tế vs Kế hoạch
- 📊 Biểu đồ so sánh hàng tháng
- ✅ Trạng thái đạt/không đạt mục tiêu
- 📈 Xu hướng tiết kiệm

**Hành động:**
- 💰 Cập Nhật Thu Chi → Chuyển đến `update`
- 🔮 Xem Dự Báo → Chuyển đến `forecast`
- ⬅️ Quay lại tiến độ

#### 3.5. Cập Nhật Thu Chi
**Màn hình**: `update` (UpdateIncomeExpense)

**Chức năng:**
- 📝 Nhập thu nhập tháng mới
- 📝 Nhập chi tiêu tháng mới
- 🔄 Hệ thống tự động tính lại tiết kiệm hàng tháng
- 💾 Lưu và cập nhật vào hệ thống

**Sau khi lưu:**
- ✅ Tự động quay lại `tracking` với dữ liệu mới

#### 3.6. Dự Báo Tương Lai
**Màn hình**: `forecast` (FutureForecast)

**Hiển thị:**
- 🔮 Dự báo dài hạn (5-10-20 năm)
- 📊 Biểu đồ tăng trưởng tài sản
- 🎭 Các kịch bản khác nhau:
  - Kịch bản lạc quan (lãi suất cao)
  - Kịch bản trung bình
  - Kịch bản thận trọng (lãi suất thấp)
- 💡 Đề xuất điều chỉnh

**Hành động:**
- ✅ Áp Dụng Kịch Bản → Cập nhật và quay lại `progress`
- 👨‍💼 Tư Vấn Chuyên Gia → Chuyển đến `expertList`
- ⬅️ Quay lại tracking
- 🏠 Về trang chủ

---

### GIAI ĐOẠN 4: TƯ VẤN & HỖ TRỢ

#### 4.1. Tư Vấn AI
**Màn hình**: `consulting` (ConsultingSupport)

**Chức năng:**
- 🤖 AI phân tích mục tiêu tài chính
- 💡 Đưa ra đề xuất cụ thể
- 📊 Phân tích điểm mạnh/yếu của kế hoạch
- ✅ Hoàn tất → Quay lại `tracking`

#### 4.2. Danh Sách Chuyên Gia
**Màn hình**: `expertList` (ExpertConsulting)

**Hiển thị:**
- 👨‍💼 Danh sách chuyên gia tài chính
- ⭐ Đánh giá và kinh nghiệm
- 💰 Mức phí tư vấn
- 📅 Lịch rảnh

**Hành động:**
- 📅 Chọn chuyên gia và Đặt Lịch → Chuyển đến `bookExpert`
- ⬅️ Quay lại trang chủ

#### 4.3. Đặt Lịch Chuyên Gia
**Màn hình**: `bookExpert` (BookExpert)

**Chức năng:**
- 📅 Chọn ngày tư vấn
- ⏰ Chọn giờ tư vấn
- 📝 Ghi chú vấn đề cần tư vấn
- ✅ Xác nhận đặt lịch → Chuyển đến `bookingConfirm`
- ⬅️ Quay lại danh sách chuyên gia

#### 4.4. Xác Nhận Đặt Lịch
**Màn hình**: `bookingConfirm` (BookingConfirmation)

**Hiển thị:**
- ✅ Thông báo đặt lịch thành công
- 📋 Chi tiết lịch hẹn
- 👨‍💼 Thông tin chuyên gia
- 📧 Gửi email xác nhận

**Hành động:**
- 🏠 Về Trang Chủ

---

### GIAI ĐOẠN 5: CÁC TÍNH NĂNG BỔ SUNG

#### 5.1. Điểm Danh Hàng Ngày
**Màn hình**: `checkin` (DailyCheckIn)

**Chức năng:**
- ✅ Check-in mỗi ngày để nhận điểm
- 🏆 Hệ thống điểm thưởng tích lũy
- 🎁 Streak bonus (điểm danh liên tục)
- 💎 Đổi điểm lấy phần thưởng
- 📊 Thống kê điểm danh

**Hành động:**
- 🏠 Về trang chủ

#### 5.2. Diễn Đàn Tài Chính
**Màn hình**: `forum` (Forum)

**Các diễn đàn:**
- 🥇 Vàng
- 📈 Cổ phiếu
- 📜 Trái phiếu
- 🏠 Nhà đất
- ₿ Bitcoin & Crypto

**Chức năng:**
- 📖 Xem danh sách chủ đề
- 💬 Đọc bài viết
- 👍 Like, comment, share
- ➕ Tạo bài viết mới → Chuyển đến `createPost`
- 🔍 Xem chi tiết bài viết → Chuyển đến `threadDetail`

#### 5.3. Tạo Bài Viết
**Màn hình**: `createPost` (CreatePost)

**Chức năng:**
- 📝 Nhập tiêu đề bài viết
- 📄 Nhập nội dung
- 🖼️ Đính kèm hình ảnh (tùy chọn)
- 🏷️ Chọn tags
- ✅ Đăng bài → Quay lại `forum`
- ⬅️ Hủy → Quay lại `forum`

#### 5.4. Chi Tiết Bài Viết
**Màn hình**: `threadDetail` (ThreadDetail)

**Hiển thị:**
- 📄 Nội dung đầy đủ
- 👤 Thông tin tác giả
- 💬 Danh sách bình luận
- 📊 Số lượt xem, like

**Chức năng:**
- 💬 Thêm bình luận
- 👍 Like/Unlike
- 🔖 Lưu bài viết
- ⬅️ Quay lại forum

#### 5.5. Chatbot AI
**Màn hình**: `aichat` (AIChatbot)

**Chức năng:**
- 💬 Chat với AI về vấn đề tài chính
- 📊 Hỏi về kế hoạch tài chính
- 💡 Nhận tư vấn nhanh
- 📚 Học kiến thức tài chính
- 🏠 Về trang chủ

#### 5.6. Lịch Sử
**Màn hình**: `history` (History)

**Hiển thị:**
- 📜 Lịch sử tư vấn AI
- 👨‍💼 Lịch sử tư vấn chuyên gia
- 📊 Lịch sử phân tích tài chính
- 🔄 Lịch sử cập nhật thu chi
- 🔍 Xem chi tiết từng lần tư vấn
- 🏠 Về trang chủ

#### 5.7. Thông Báo
**Màn hình**: `notifications` (Notifications)

**Hiển thị:**
- 🔔 Thông báo lịch hẹn với chuyên gia
- 💰 Nhắc nhở cập nhật thu chi
- 🎯 Nhắc nhở milestone sắp đến
- 🎁 Thông báo điểm thưởng
- ✅ Đánh dấu đã đọc
- 🏠 Về trang chủ

#### 5.8. Hồ Sơ
**Màn hình**: `profile` (Profile)

**Hiển thị:**
- 👤 Thông tin cá nhân
- 🏆 Điểm tích lũy
- 📊 Thống kê tài chính
- 🎯 Mục tiêu hiện tại
- 📈 Thành tích đạt được

**Hành động:**
- ⚙️ Cài Đặt → Chuyển đến `settings`
- 🏠 Về trang chủ

#### 5.9. Thống Kê
**Màn hình**: `statistics` (Statistics)

**Hiển thị:**
- 📊 Biểu đồ thu chi theo thời gian
- 💰 Phân tích chi tiêu theo danh mục
- 📈 Xu hướng tiết kiệm
- 🎯 Tỷ lệ hoàn thành mục tiêu
- 📉 So sánh tháng này vs tháng trước
- 🏠 Về trang chủ

#### 5.10. Quản Lý Ngân Sách
**Màn hình**: `budget` (BudgetManager)

**Chức năng:**
- 💰 Thiết lập ngân sách cho từng danh mục
- 📊 Theo dõi chi tiêu thực tế vs ngân sách
- ⚠️ Cảnh báo vượt ngân sách
- 📈 Đề xuất điều chỉnh
- 💡 Tips tiết kiệm
- 🏠 Về trang chủ

#### 5.11. Công Cụ Tài Chính
**Màn hình**: `tools` (FinancialTools)

**Các công cụ:**
- 🧮 Máy tính lãi suất kép
- 💰 Máy tính trả nợ
- 🏠 Máy tính vay mua nhà
- 📊 Máy tính ROI (Return on Investment)
- 💵 Chuyển đổi tiền tệ
- 📈 Tính toán lạm phát
- 🏠 Về trang chủ

---

### GIAI ĐOẠN 6: CÀI ĐẶT & QUẢN LÝ

#### 6.1. Cài Đặt
**Màn hình**: `settings` (Settings)

**Menu chính:**
- 👤 Thông Tin Cá Nhân → `personalInfo`
- 🔐 Đổi Mật Khẩu → `changePassword`
- ❓ Trung Tâm Trợ Giúp → `helpCenter`
- 📞 Liên Hệ Hỗ Trợ → `contactSupport`
- 📜 Điều Khoản Dịch Vụ → `termsOfService`
- 🔒 Chính Sách Bảo Mật → `privacyPolicy`
- 🚪 Đăng Xuất

#### 6.2. Thông Tin Cá Nhân
**Màn hình**: `personalInfo` (PersonalInfo)

**Chức năng:**
- ✏️ Chỉnh sửa họ tên
- ✏️ Cập nhật email
- ✏️ Cập nhật số điện thoại
- 🖼️ Đổi ảnh đại diện
- 💾 Lưu thay đổi
- ⬅️ Quay lại settings

#### 6.3. Đổi Mật Khẩu
**Màn hình**: `changePassword` (ChangePassword)

**Chức năng:**
- 🔐 Nhập mật khẩu cũ
- 🆕 Nhập mật khẩu mới
- ✅ Xác nhận mật khẩu mới
- 💾 Cập nhật
- ⬅️ Quay lại settings

#### 6.4. Trung Tâm Trợ Giúp
**Màn hình**: `helpCenter` (HelpCenter)

**Nội dung:**
- ❓ FAQ (Câu hỏi thường gặp)
- 📖 Hướng dẫn sử dụng
- 🎬 Video hướng dẫn
- 💡 Tips & Tricks
- ⬅️ Quay lại settings

#### 6.5. Liên Hệ Hỗ Trợ
**Màn hình**: `contactSupport` (ContactSupport)

**Chức năng:**
- 📧 Gửi email hỗ trợ
- 💬 Chat trực tuyến
- 📞 Hotline
- ⬅️ Quay lại settings

#### 6.6. Điều Khoản Dịch Vụ
**Màn hình**: `termsOfService` (TermsOfService)

**Hiển thị:**
- 📜 Nội dung điều khoản đầy đủ
- ⬅️ Quay lại settings

#### 6.7. Chính Sách Bảo Mật
**Màn hình**: `privacyPolicy` (PrivacyPolicy)

**Hiển thị:**
- 🔒 Nội dung chính sách bảo mật
- ⬅️ Quay lại settings

---

## 🎯 FLOW CHÍNH CHO CHUYÊN GIA

### GIAI ĐOẠN 1: AUTHENTICATION

#### 1.1. Chọn Loại Người Dùng
- Chọn "Chuyên Gia"
- Chuyển đến `login`

#### 1.2. Đăng Nhập/Đăng Ký
- Tương tự flow khách hàng
- Sau đăng nhập thành công → Chuyển đến `expertHome`

---

### GIAI ĐOẠN 2: TRANG CHỦ CHUYÊN GIA

#### 2.1. Trang Chủ Chuyên Gia
**Màn hình**: `expertHome` (ExpertHome)

**Dashboard hiển thị:**
- 💰 Thu nhập tổng
- 📅 Lịch tư vấn hôm nay
- 👥 Số khách hàng
- ⭐ Đánh giá trung bình
- 📊 Thống kê tháng này

**Hành động:**
- 💵 Xem Thu Nhập Tổng → `expertEarnings`
- 📊 Xem Thu Nhập Tháng → `expertMonthlyEarnings`
- 👥 Xem Khách Hàng → `expertClients`
- 📅 Xem Lịch Tư Vấn → `expertSchedule`
- 👤 Xem Hồ Sơ → `expertProfile`

---

### GIAI ĐOẠN 3: QUẢN LÝ CHUYÊN GIA

#### 3.1. Dashboard Chuyên Gia
**Màn hình**: `expertDashboard` (ExpertDashboard)

**Hiển thị:**
- 📊 Tổng quan hoạt động
- 📈 Biểu đồ thu nhập
- 👥 Khách hàng mới
- ⭐ Feedback gần nhất

**Hành động:**
- 👥 Quản Lý Khách Hàng → `expertClients`
- 📅 Quản Lý Lịch → `expertSchedule`
- 💰 Xem Thu Nhập → `expertEarnings`
- 👤 Hồ Sơ → `profile`
- ⬅️ Về trang chủ

#### 3.2. Quản Lý Khách Hàng
**Màn hình**: `expertClients` (ExpertClients)

**Hiển thị:**
- 👥 Danh sách khách hàng
- 📊 Tình trạng tư vấn
- 📅 Lịch hẹn tiếp theo
- 💼 Portfolio khách hàng

**Chức năng:**
- 🔍 Xem chi tiết khách hàng
- 📝 Ghi chú tư vấn
- 📞 Liên hệ khách hàng
- ⬅️ Quay lại dashboard

#### 3.3. Lịch Tư Vấn
**Màn hình**: `expertSchedule` (ExpertSchedule)

**Hiển thị:**
- 📅 Lịch theo tuần/tháng
- ⏰ Các buổi tư vấn đã đặt
- 👥 Thông tin khách hàng
- 📝 Nội dung tư vấn

**Chức năng:**
- ✅ Xác nhận lịch hẹn
- ❌ Hủy/Hoãn lịch
- 📝 Cập nhật ghi chú
- ⬅️ Quay lại dashboard

#### 3.4. Thu Nhập
**Màn hình**: `expertEarnings` (ExpertEarnings)

**Hiển thị:**
- 💰 Tổng thu nhập
- 📊 Biểu đồ thu nhập theo tháng
- 💵 Chi tiết giao dịch
- 📈 Xu hướng tăng trưởng
- 🏦 Thông tin rút tiền

**Chức năng:**
- 📥 Yêu cầu rút tiền
- 📄 Xuất báo cáo
- ⬅️ Quay lại dashboard

#### 3.5. Hồ Sơ Chuyên Gia
**Màn hình**: `expertProfile` (ExpertProfile)

**Hiển thị:**
- 👤 Thông tin chuyên gia
- 🎓 Bằng cấp/Chứng chỉ
- 💼 Kinh nghiệm
- ⭐ Đánh giá từ khách hàng
- 💰 Mức phí tư vấn

**Hành động:**
- ⚙️ Cài Đặt → `settings`
- 🚪 Đăng Xuất
- ⬅️ Về trang chủ

---

## 📊 BOTTOM NAVIGATION

### Bottom Navigation Khách Hàng
**5 Tab chính luôn hiển thị:**
1. 🏠 **Trang Chủ** → `home`
2. 📊 **Thống Kê** → `statistics`
3. 💰 **Ngân Sách** → `budget`
4. 🔧 **Công Cụ** → `tools`
5. ⚙️ **Cài Đặt** → `settings`

### Bottom Navigation Chuyên Gia
**5 Tab chính luôn hiển thị:**
1. 🏠 **Trang Chủ** → `expertHome`
2. 👥 **Khách Hàng** → `expertClients`
3. 📅 **Lịch** → `expertSchedule`
4. 💰 **Thu Nhập** → `expertEarnings`
5. 👤 **Hồ Sơ** → `expertProfile`

---

## 🔄 LUỒNG DỮ LIỆU

### Core Financial Flow (6 Bước Chính)
```
1. NHẬP LIỆU (input)
   ↓
2. PHÂN TÍCH (result)
   ↓
3. TIẾN ĐỘ (progress)
   ↓
4. THEO DÕI (tracking)
   ↓
5. CẬP NHẬT (update)
   ↓
6. DỰ BÁO (forecast)
   ↓
   (Lặp lại từ bước 4)
```

### Data Flow
- **analysisData**: Lưu trữ tất cả thông tin phân tích tài chính
- **monthlySavings**: Số tiền tiết kiệm hàng tháng (tự động tính)
- **currentGoal**: Mục tiêu hiện tại đang theo dõi
- **userType**: Phân biệt khách hàng vs chuyên gia
- **isAuthenticated**: Trạng thái đăng nhập

---

## 🎯 CÔNG THỨC TÀI CHÍNH SỬ DỤNG

### 1. Future Value (Giá Trị Tương Lai)
```
FV = PV × (1 + r)^n
```
- FV: Future Value (Giá trị tương lai)
- PV: Present Value (Giá trị hiện tại)
- r: Interest Rate (Lãi suất)
- n: Number of periods (Số kỳ)

### 2. Monthly Savings (Tiết Kiệm Hàng Tháng)
```
monthlySavings = monthlyIncome - monthlyExpense - monthlyDebtPayment
```

### 3. Monthly Debt Payment (Trả Nợ Hàng Tháng)
```
monthlyDebtPayment = min(
  currentDebt × 0.05,
  (monthlyIncome - monthlyExpense) × 0.3
)
```
- Tối đa 5% tổng nợ
- Không vượt quá 30% thu nhập khả dụng

---

## 🏆 HỆ THỐNG ĐIỂM THƯỞNG

### Cách Kiếm Điểm
- ✅ Điểm danh hàng ngày: +10 điểm
- 🔥 Streak 7 ngày liên tục: +50 điểm bonus
- 🎯 Hoàn thành milestone: +100 điểm
- 💬 Đăng bài trên forum: +20 điểm
- 👍 Bài viết được like: +5 điểm
- 💰 Cập nhật thu chi đúng hạn: +15 điểm

### Đổi Điểm
- Voucher giảm giá dịch vụ tư vấn
- Unlock tính năng premium
- Quà tặng từ đối tác

---

## 🎨 THIẾT KẾ & TRẢI NGHIỆM

### Theme Màu
- **Primary**: #009689 (Teal/Green)
- **Secondary**: #030213 (Dark Blue)
- **Accent**: #FFDF20 (Yellow)

### Typography
- **Headings**: Lexend (Professional, Modern)
- **Body Text**: Inter (Readable, Clean)

### Tối Ưu Cho iPhone 16 Pro Max
- Kích thước: 430px × 932px
- Dynamic Island integration
- Smooth scrolling
- Bottom Navigation luôn cố định
- Gestures tối ưu

---

## 🔐 BẢO MẬT & QUYỀN RIÊNG TƯ

### Authentication
- ✅ Đăng nhập an toàn với email/password
- 🔐 Mã hóa mật khẩu
- 🔑 Forgot password recovery
- 🚪 Logout an toàn

### Data Privacy
- 🔒 Dữ liệu tài chính được mã hóa
- 👤 Thông tin cá nhân được bảo vệ
- 📜 Tuân thủ chính sách bảo mật
- 🔐 Chỉ chuyên gia được phép xem thông tin khách hàng

---

## 📱 TÍNH NĂNG ĐẶC BIỆT

### 1. Nguyên Tắc SMART
Mọi mục tiêu tài chính đều tuân theo:
- **S**pecific (Cụ thể)
- **M**easurable (Đo lường được)
- **A**chievable (Khả thi)
- **R**elevant (Liên quan)
- **T**ime-bound (Có thời hạn)

### 2. AI Integration
- 🤖 Chatbot tư vấn 24/7
- 💡 Đề xuất thông minh
- 📊 Phân tích xu hướng
- ⚠️ Cảnh báo sớm

### 3. Gamification
- 🏆 Điểm thưởng
- 🔥 Streak tracking
- 🎯 Achievements
- 📊 Leaderboard (tùy chọn)

### 4. Community
- 💬 Diễn đàn 5 chủ đề đầu tư
- 👥 Kết nối cộng đồng
- 📚 Chia sẻ kinh nghiệm
- 💡 Học hỏi lẫn nhau

---

## 🚀 FLOW SỬ DỤNG NHANH

### Người Dùng Mới
```
Chọn Loại Người Dùng → Đăng Ký → Welcome → Trang Chủ → Nhập Liệu → Phân Tích
```

### Người Dùng Quay Lại
```
Đăng Nhập → Trang Chủ → Xem Tiến Độ/Cập Nhật/Thống Kê
```

### Sử Dụng Hàng Ngày
```
Đăng Nhập → Điểm Danh → Xem Thông Báo → Cập Nhật Thu Chi → Xem Tiến Độ
```

### Tư Vấn Chuyên Gia
```
Trang Chủ → Tư Vấn Chuyên Gia → Chọn Chuyên Gia → Đặt Lịch → Xác Nhận
```

### Tham Gia Cộng Đồng
```
Trang Chủ → Diễn Đàn → Chọn Chủ Đề → Đọc/Viết Bài → Tương Tác
```

---

## 📝 KẾT LUẬT

MONEVO cung cấp một hệ sinh thái hoàn chỉnh cho quản lý tài chính cá nhân với:

✅ **Flow hoàn chỉnh**: Từ nhập liệu → phân tích → theo dõi → dự báo
✅ **Tư vấn đa dạng**: AI Chatbot + Chuyên gia thực
✅ **Gamification**: Điểm thưởng khuyến khích sử dụng
✅ **Community**: Kết nối và học hỏi
✅ **Professional**: Công thức tài chính chính xác, thiết kế chuyên nghiệp
✅ **User-friendly**: Tối ưu cho iPhone, dễ sử dụng

App phù hợp cho cả **người mới bắt đầu** và **người có kinh nghiệm** trong quản lý tài chính cá nhân.