# FLOW SỬ DỤNG CHI TIẾT - KHÁCH HÀNG
## Mở rộng GIAI ĐOẠN 3-6 cho Ứng Dụng MONEVO

---

## 📋 MỤC LỤC BỔ SUNG

Tài liệu này mở rộng chi tiết cho 4 giai đoạn chính:

### GIAI ĐOẠN 3: FLOW PHÂN TÍCH TÀI CHÍNH (Core Flow)
- 3.1. Nhập Liệu Tài Chính (Chi tiết đầy đủ)
- 3.2. Kết Quả Phân Tích (Các kịch bản)
- 3.3. Tiến Độ Đầu Tư (Theo dõi visual)
- 3.4. Theo Dõi Hàng Tháng (Calendar & tracking)
- 3.5. Cập Nhật Thu Chi (Quick update)
- 3.6. Dự Báo Tương Lai (Scenarios)

### GIAI ĐOẠN 4: TƯ VẤN & HỖ TRỢ
- 4.1. Tư Vấn AI (Chatbot flow)
- 4.2. Danh Sách Chuyên Gia (Filtering & sorting)
- 4.3. Đặt Lịch Chuyên Gia (Booking system)
- 4.4. Xác Nhận Đặt Lịch (Confirmation)

### GIAI ĐOẠN 5: CÁC TÍNH NĂNG BỔ SUNG
- 5.1. Điểm Danh Hàng Ngày (Gamification)
- 5.2-5.4. Diễn Đàn Tài Chính (Community features)
- 5.5. Chatbot AI (24/7 support)
- 5.6-5.11. Các tính năng utilities

### GIAI ĐOẠN 6: CÀI ĐẶT & QUẢN LÝ
- 6.1-6.7. Settings & account management

---

## 🎯 GIAI ĐOẠN 3: FLOW PHÂN TÍCH TÀI CHÍNH (Core Flow)

### 3.1. NHẬP LIỆU TÀI CHÍNH - CHI TIẾT ĐẦY ĐỦ

**Màn hình**: `input` (FinancialAnalysis)

#### Layout Tổng Quan

```
┌─────────────────────────────────────────┐
│ ← Phân Tích Tài Chính    [💾 Draft]    │
├─────────────────────────────────────────┤
│ Progress: ▓▓░░ 50% (Bước 2/4)           │
├─────────────────────────────────────────┤
│                                         │
│ [Scrollable Content]                    │
│                                         │
│ 📊 BƯỚC 1: THU CHI HÀNG THÁNG           │
│ 📊 BƯỚC 2: TÀI SẢN & NỢ                 │
│ 🎯 BƯỚC 3: MỤC TIÊU SMART               │
│ ⚠️ BƯỚC 4: ĐÁNH GIÁ RỦI RO             │
│                                         │
│ [🤖 Tư Vấn AI] [✅ Hoàn Tất]            │
└─────────────────────────────────────────┘
```

#### BƯỚC 1: Thu Chi Hàng Tháng

**Form Fields:**

**1. Thu nhập hàng tháng**
```
┌─────────────────────────────────────┐
│ 💰 Thu nhập hàng tháng              │
│ ┌─────────────────────────────────┐ │
│ │ 15,000,000                  VNĐ │ │
│ └─────────────────────────────────┘ │
│ 💡 Bao gồm lương, thu nhập phụ,     │
│    đầu tư thụ động                  │
│                                     │
│ [💵 Breakdown]                      │
│ • Lương chính: 12,000,000           │
│ • Thưởng TB/tháng: 2,000,000        │
│ • Freelance: 1,000,000              │
└─────────────────────────────────────┘
```

**Validation:**
- Min: 1,000,000 VNĐ
- Max: 1,000,000,000 VNĐ
- Format: Auto thêm dấu phẩy khi nhập
- Error states:
  - Empty: "Vui lòng nhập thu nhập"
  - < Min: "Thu nhập tối thiểu 1 triệu VNĐ"
  - > Max: "Vui lòng kiểm tra lại số tiền"

**Helper Features:**
- Icon 📊 bên phải → Popup "Breakdown thu nhập"
  ```
  ┌──────────────────────────┐
  │ Phân Tích Thu Nhập       │
  ├──────────────────────────┤
  │ Lương chính:             │
  │ [12,000,000] VNĐ         │
  │                          │
  │ Thưởng TB/tháng:         │
  │ [2,000,000] VNĐ          │
  │                          │
  │ Thu nhập phụ:            │
  │ [1,000,000] VNĐ          │
  │                          │
  │ Tổng: 15,000,000 VNĐ     │
  │                          │
  │ [Áp dụng] [Hủy]          │
  └──────────────────────────┘
  ```

**2. Chi tiêu hàng tháng**
```
┌─────────────────────────────────────┐
│ 💸 Chi tiêu hàng tháng              │
│ ┌─────────────────────────────────┐ │
│ │ 10,000,000                  VNĐ │ │
│ └─────────────────────────────────┘ │
│ ⚠️ Chi tiêu chiếm 67% thu nhập      │
│    (Khuyến nghị < 70%)              │
│                                     │
│ [📋 Breakdown]                      │
│ • Nhà ở: 3,500,000 (35%)            │
│ • Ăn uống: 3,000,000 (30%)          │
│ • Đi lại: 1,500,000 (15%)           │
│ • Giải trí: 1,000,000 (10%)         │
│ • Khác: 1,000,000 (10%)             │
│                                     │
│ 💰 Khả năng tiết kiệm: 5,000,000/th │
└─────────────────────────────────────┘
```

**Smart Insights (Realtime):**
```
┌──────────────────────────────────┐
│ 💡 Phân Tích Thông Minh          │
├──────────────────────────────────┤
│ • Tỷ lệ tiết kiệm: 33% ✅ TỐT   │
│   (Khuyến nghị ≥ 20%)            │
│                                  │
│ • Nếu giảm chi tiêu 10%:         │
│   → Tiết kiệm thêm 1tr/tháng     │
│   → Đạt mục tiêu nhanh hơn 2 năm │
│                                  │
│ [Xem đề xuất tiết kiệm →]        │
└──────────────────────────────────┘
```

#### BƯỚC 2: Tài Sản & Nợ

**3. Tiết kiệm hiện tại**
```
┌─────────────────────────────────────┐
│ 💎 Tiết kiệm/Tài sản hiện tại       │
│ ┌─────────────────────────────────┐ │
│ │ 50,000,000                  VNĐ │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Bao gồm:                            │
│ • Tiền mặt/Tiết kiệm ngân hàng      │
│ • Đầu tư chứng khoán, quỹ           │
│ • Vàng, ngoại tệ                    │
│ • (Không tính nhà, xe)              │
└─────────────────────────────────────┘
```

**4. Nợ hiện tại**
```
┌─────────────────────────────────────┐
│ 💳 Tổng nợ hiện tại                 │
│ ┌─────────────────────────────────┐ │
│ │ 20,000,000                  VNĐ │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [📋 Chi tiết các khoản nợ]          │
│ • Thẻ tín dụng: 8,000,000           │
│ • Vay cá nhân: 12,000,000           │
│                                     │
│ 💡 Tỷ lệ nợ/Thu nhập: 1.3x ✅ KHỎE  │
│    (Khuyến nghị < 2x)               │
└─────────────────────────────────────┘
```

**5. Lãi suất nợ trung bình**
```
┌─────────────────────────────────────┐
│ 📈 Lãi suất nợ trung bình (%/năm)   │
│ ┌─────────────────────────────────┐ │
│ │ ◄─────●─────► 12%               │ │
│ │ 0%          15%           30%   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ⚠️ Lãi suất 12% là mức TRUNG BÌNH   │
│                                     │
│ Auto-calculate trả nợ hàng tháng:   │
│ → 1,000,000 VNĐ/tháng               │
│ → Hết nợ sau 24 tháng               │
│ → Tổng lãi: 2,400,000 VNĐ           │
│                                     │
│ 💡 [Xem chiến lược trả nợ tối ưu]   │
└─────────────────────────────────────┘
```

**Debt Strategy Calculator Popup:**
```
┌────────────────────────────────────┐
│ Chiến Lược Trả Nợ Tối Ưu          │
├────────────────────────────────────┤
│ Phương án 1: Trả đều               │
│ • Trả: 1,000,000/tháng             │
│ • Thời gian: 24 tháng              │
│ • Tổng lãi: 2,400,000              │
│                                    │
│ Phương án 2: Tăng tốc (Đề xuất)    │
│ • Trả: 1,500,000/tháng             │
│ • Thời gian: 15 tháng ✅           │
│ • Tổng lãi: 1,800,000 ✅           │
│ • Tiết kiệm: 600,000               │
│                                    │
│ Phương án 3: Tối thiểu             │
│ • Trả: 500,000/tháng               │
│ • Thời gian: 56 tháng ⚠️           │
│ • Tổng lãi: 8,000,000 ⚠️           │
│                                    │
│ [Chọn phương án 2] [Đóng]          │
└────────────────────────────────────┘
```

#### BƯỚC 3: Mục Tiêu SMART

**6. Chọn loại mục tiêu**
```
┌─────────────────────────────────────┐
│ 🎯 Loại mục tiêu tài chính          │
│                                     │
│ Popular Choices:                    │
│ ┌─────────┬─────────┬─────────┐     │
│ │ 🏠 Mua  │ 🚗 Mua  │ ✈️ Du   │     │
│ │   Nhà   │   Xe    │   Lịch  │     │
│ │ 1-5 tỷ  │ 500tr-2t│ 10-100tr│     │
│ │ 5-15 năm│ 2-5 năm │ 1-3 năm │     │
│ └─────────┴─────────┴─────────┘     │
│                                     │
│ More Options:                       │
│ • 🎓 Học vấn (50-500tr, 3-10 năm)   │
│ • 👨‍👩‍👧 Quỹ khẩn cấp (3-6 tháng chi)│
│ • 🌴 Nghỉ hưu (2-10 tỷ, 10-30 năm)  │
│ • 💍 Đám cưới (100-500tr, 1-5 năm)  │
│ • 💼 Khởi nghiệp (100tr-2t, 2-5 năm)│
│ • 🎯 Tự do tài chính (5-20t,15-30năm)│
│ • ✨ Khác (Tùy chỉnh)                │
└─────────────────────────────────────┘
```

**Khi chọn "Mua nhà":**
```
┌─────────────────────────────────────┐
│ 🏠 Mua Nhà/Căn Hộ                   │
├─────────────────────────────────────┤
│ Smart Suggestions:                  │
│                                     │
│ Dựa trên thu nhập 15tr/tháng:       │
│                                     │
│ ○ Căn hộ 1PN (800tr - 1.2 tỷ)      │
│   → Phù hợp trong 8-12 năm          │
│                                     │
│ ● Căn hộ 2PN (1.5 - 2.5 tỷ)        │
│   → Phù hợp trong 12-18 năm         │
│                                     │
│ ○ Căn hộ 3PN (2.5 - 4 tỷ)          │
│   → Cần 18-25 năm hoặc tăng thu nhập│
│                                     │
│ 💡 Với tiết kiệm 5tr/tháng, lãi 7%, │
│    bạn có thể mua căn hộ 2PN trong  │
│    15 năm (không vay ngân hàng)     │
│                                     │
│ [Tiếp tục] [Tùy chỉnh]              │
└─────────────────────────────────────┘
```

**7. Tên mục tiêu**
```
┌─────────────────────────────────────┐
│ ✏️ Đặt tên cho mục tiêu             │
│ ┌─────────────────────────────────┐ │
│ │ Mua căn hộ 2PN tại Quận 7 HCM   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 💡 Tên cụ thể giúp bạn động lực hơn│
│                                     │
│ Ví dụ hay:                          │
│ • "Căn hộ view sông Q7 cho gia đình"│
│ • "Vòng quanh thế giới cùng vợ"     │
│ • "Quỹ hưu trí thoải mái tại Đà Lạt"│
└─────────────────────────────────────┘
```

**8. Số tiền mục tiêu**
```
┌─────────────────────────────────────┐
│ 💵 Số tiền cần đạt                  │
│ ┌─────────────────────────────────┐ │
│ │ 1,500,000,000               VNĐ │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 🧮 Calculator Hỗ Trợ:               │
│ ┌─────────────────────────────────┐ │
│ │ Giá căn hộ:      1,800,000,000  │ │
│ │ Trả trước 20%:     360,000,000  │ │
│ │ Vay ngân hàng:   1,440,000,000  │ │
│ │                                 │ │
│ │ Hoặc mua không vay:             │ │
│ │ Giá căn hộ:      1,500,000,000  │ │
│ │ Phí (5%):           75,000,000  │ │
│ │ ────────────────────────────    │ │
│ │ TỔNG:            1,575,000,000  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 💡 Gợi ý: Nên có buffer 5-10%       │
│    cho chi phí phát sinh            │
│                                     │
│ [Áp dụng: 1,575,000,000]            │
└─────────────────────────────────────┘
```

**9. Lãi suất đầu tư dự kiến**
```
┌─────────────────────────────────────┐
│ 📊 Lãi suất đầu tư dự kiến (%/năm)  │
│ ┌─────────────────────────────────┐ │
│ │ ◄─────●─────► 7%                │ │
│ │ 1%    5%   10%   15%            │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📖 Hướng Dẫn Chọn Lãi Suất:         │
│                                     │
│ 🔵 3-4%: Tiết kiệm ngân hàng        │
│    • Rủi ro: Thấp nhất ✅           │
│    • Lợi nhuận: Thấp                │
│    • Phù hợp: Mục tiêu ngắn hạn     │
│                                     │
│ 🟢 5-7%: Quỹ đầu tư cân bằng        │
│    • Rủi ro: Trung bình ⚠️          │
│    • Lợi nhuận: Trung bình          │
│    • Phù hợp: Mục tiêu 5-15 năm ✅  │
│                                     │
│ 🟡 8-12%: Cổ phiếu/Chứng khoán      │
│    • Rủi ro: Cao ⚠️⚠️              │
│    • Lợi nhuận: Cao                 │
│    • Phù hợp: Mục tiêu > 15 năm     │
│                                     │
│ 🔴 > 12%: Đầu tư mạo hiểm           │
│    • Rủi ro: Rất cao ❌             │
│    • Lợi nhuận: Rất cao hoặc mất    │
│    • Phù hợp: Chuyên gia & có buffer│
│                                     │
│ 💡 Đề xuất cho bạn: 7%              │
│    (Dựa trên risk profile cân bằng) │
│                                     │
│ [Áp dụng 7%] [Tùy chỉnh]            │
└─────────────────────────────────────┘
```

**10. Thời gian**
```
┌─────────────────────────────────────┐
│ ⏰ Thời gian thực hiện (năm)         │
│                                     │
│ Slider:                             │
│ ┌─────────────────────────────────┐ │
│ │ ◄─────────●─────────────► 10    │ │
│ │ 1      5     10    15    20  30 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Hoặc nhập trực tiếp: [10] năm       │
│                                     │
│ 📅 Dự kiến hoàn thành: 12/2035      │
│                                     │
│ 🧮 Tính Toán Nhanh:                 │
│ ┌─────────────────────────────────┐ │
│ │ Với thời gian 10 năm:           │ │
│ │ • Tiết kiệm/tháng: 8,500,000    │ │
│ │ • Tổng đóng góp: 1,020,000,000  │ │
│ │ • Lãi tích lũy: 480,000,000     │ │
│ │ ────────────────────────────    │ │
│ │ → Cần 56% thu nhập ⚠️ KHÓ       │ │
│ │                                 │ │
│ │ 💡 Đề xuất: Tăng lên 15 năm     │ │
│ │    → Tiết kiệm/tháng: 5,000,000 │ │
│ │    → Chỉ cần 33% thu nhập ✅    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [◄ 5 năm] [10 năm] [15 năm ►]       │
└─────────────────────────────────────┘
```

#### BƯỚC 4: Đánh Giá Rủi Ro

**11. Hồ sơ rủi ro**
```
┌─────────────────────────────────────┐
│ ⚠️ Hồ sơ chấp nhận rủi ro           │
│                                     │
│ ○ 🔵 THẬN TRỌNG                     │
│   • Ưu tiên: Bảo toàn vốn           │
│   • Lợi nhuận: 3-4%/năm             │
│   • Biến động: < 5%                 │
│   • Phù hợp: Người gần nghỉ hưu,    │
│     mục tiêu ngắn hạn               │
│   • Portfolio: 70% tiết kiệm,       │
│     30% trái phiếu                  │
│                                     │
│ ● 🟢 CÂN BẰNG (Đề xuất cho bạn)     │
│   • Ưu tiên: Cân bằng risk/return   │
│   • Lợi nhuận: 5-7%/năm             │
│   • Biến động: 10-15%               │
│   • Phù hợp: Mục tiêu trung/dài hạn,│
│     độ tuổi 25-45                   │
│   • Portfolio: 50% quỹ, 30% CP,     │
│     20% tiết kiệm                   │
│                                     │
│ ○ 🟡 TĂNG TRƯỞNG                    │
│   • Ưu tiên: Tối đa hóa lợi nhuận   │
│   • Lợi nhuận: 8-12%/năm            │
│   • Biến động: 20-30%               │
│   • Phù hợp: Trẻ (< 35), có buffer, │
│     mục tiêu dài hạn > 15 năm       │
│   • Portfolio: 70% CP, 20% quỹ,     │
│     10% startup/crypto              │
│                                     │
│ 💡 Dựa trên:                        │
│ • Tuổi: 30-35                       │
│ • Mục tiêu: 10 năm (trung hạn)      │
│ • Thu nhập: Ổn định                 │
│ → Đề xuất: CÂN BẰNG                 │
│                                     │
│ [Làm bài test đánh giá rủi ro]      │
└─────────────────────────────────────┘
```

**Risk Assessment Quiz (khi tap "Làm bài test"):**
```
┌─────────────────────────────────────┐
│ 📋 Đánh Giá Mức Chấp Nhận Rủi Ro    │
├─────────────────────────────────────┤
│ Câu 1/5:                            │
│                                     │
│ Nếu giá trị đầu tư của bạn giảm 20% │
│ trong 1 tháng, bạn sẽ:              │
│                                     │
│ ○ A. Lo lắng và bán hết ngay        │
│      (Risk score: 1-3)              │
│                                     │
│ ● B. Giữ nguyên và chờ hồi phục     │
│      (Risk score: 4-6) ✅           │
│                                     │
│ ○ C. Mua thêm vì giá rẻ             │
│      (Risk score: 7-10)             │
│                                     │
│ ────────────────────────────────    │
│                                     │
│ Câu 2/5:                            │
│                                     │
│ Bạn có thể chờ đợi bao lâu để thấy  │
│ lợi nhuận từ đầu tư?                │
│                                     │
│ ○ A. < 1 năm (Risk score: 1-3)      │
│                                     │
│ ● B. 1-5 năm (Risk score: 4-6) ✅   │
│                                     │
│ ○ C. > 5 năm (Risk score: 7-10)     │
│                                     │
│ [◄ Trước] [Tiếp ►]                  │
└─────────────────────────────────────┘

... (3 câu còn lại) ...

[Kết quả sau 5 câu]
┌─────────────────────────────────────┐
│ 🎯 Kết Quả Đánh Giá                 │
├─────────────────────────────────────┤
│ Risk Score của bạn: 5/10            │
│                                     │
│ Hồ sơ rủi ro: CÂN BẰNG 🟢           │
│                                     │
│ Phân tích:                          │
│ ✅ Bạn hiểu rủi ro và lợi nhuận     │
│ ✅ Có thể chấp nhận biến động vừa   │
│ ✅ Tư duy đầu tư dài hạn            │
│ ⚠️ Cần học thêm về đa dạng hóa      │
│                                     │
│ Portfolio đề xuất:                  │
│ • 50% Quỹ đầu tư index              │
│ • 30% Cổ phiếu blue-chip            │
│ • 20% Tiết kiệm/Trái phiếu          │
│                                     │
│ Lãi suất dự kiến: 6-7%/năm          │
│                                     │
│ [Áp dụng] [Làm lại]                 │
└─────────────────────────────────────┘
```

**12. Slider điểm rủi ro**
```
┌─────────────────────────────────────┐
│ 📊 Điểm chấp nhận rủi ro            │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🔵──🟢──●──🟡──🔴               │ │
│ │ 1   3   5   7   10              │ │
│ │ Thận   Cân  Tăng  Mạo           │ │
│ │ trọng  bằng trưởng hiểm          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Điểm của bạn: 5/10                  │
│                                     │
│ Giải thích:                         │
│ • 1-3: Không chấp nhận mất vốn      │
│ • 4-6: Chấp nhận biến động vừa      │
│ • 7-9: Sẵn sàng rủi ro cao          │
│ • 10: Chấp nhận mất toàn bộ để tăng │
│   trưởng cao                        │
└─────────────────────────────────────┘
```

#### Bottom Actions

```
┌─────────────────────────────────────┐
│ [🤖 Tư Vấn AI Ngay]                 │
│ • Review tất cả inputs              │
│ • Đánh giá tính khả thi             │
│ • Đề xuất điều chỉnh                │
│ • Optimization tips                 │
│                                     │
│ [✅ Hoàn Tất Phân Tích]             │
│ • Tính toán chi tiết                │
│ • Tạo kế hoạch tài chính            │
│ • Xem kết quả & đề xuất             │
└─────────────────────────────────────┘
```

#### Smart Features

**1. Auto-save Draft**
```
┌──────────────────┐
│ ☁️ Đã lưu nháp   │
│ 14:35            │
└──────────────────┘
```
- Tự động lưu mỗi 30 giây
- Icon cloud animation khi saving
- Có thể resume từ draft

**2. Progress Tracking**
```
Progress Bar: ▓▓▓░ 75%
Bước 3/4: Mục Tiêu SMART
```
- Visual progress indicator
- Có thể tap vào để jump
- Validation mỗi bước

**3. Smart Validation**
- Realtime validation khi blur
- Green checkmark khi valid
- Red error message khi invalid
- Suggestions để fix errors

**4. Contextual Help**
```
┌──────────────────────────┐
│ ❓ Cần Trợ Giúp?         │
├──────────────────────────┤
│ • Video hướng dẫn (2 phút)│
│ • Chat với AI             │
│ • Xem ví dụ mẫu           │
│ • Liên hệ hỗ trợ          │
└──────────────────────────┘
```

---

### 3.2. KẾT QUẢ PHÂN TÍCH - CHI TIẾT

**Màn hình**: `result` (AnalysisResult)

#### Kịch Bản 1: MỤC TIÊU KHẢ THI (80-110%)

```
┌─────────────────────────────────────┐
│ ← Kết Quả Phân Tích    [📥 Tải PDF] │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ✅ CHÚC MỪNG!                   │ │
│ │ MỤC TIÊU CÓ THỂ ĐẠT ĐƯỢC!       │ │
│ │                                 │ │
│ │ 🎯 Mua căn hộ 2PN tại Q7        │ │
│ │ 💰 Mục tiêu: 1,500,000,000đ     │ │
│ │ 📅 Thời gian: 10 năm            │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📊 TÓM TẮT TÌNH HÌNH TÀI CHÍNH      │
│ ┌─────────────────────────────────┐ │
│ │ ThuChi Hàng Tháng:             │ │
│ │ ┌───────────────────┐           │ │
│ │ │ Thu nhập:  15,000,000          │ │
│ │ │ Chi tiêu: -10,000,000          │ │
│ │ │ Trả nợ:    -1,000,000          │ │
│ │ │ ─────────────────────          │ │
│ │ │ Tiết kiệm:  4,000,000 ✅       │ │
│ │ └───────────────────┘           │ │
│ │                                 │ │
│ │ Tỷ lệ tiết kiệm: 26.7%          │ │
│ │ (Tốt! Khuyến nghị ≥ 20%)        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 💳 CHIẾN LƯỢC TRẢ NỢ (Ưu tiên!)    │
│ ┌─────────────────────────────────┐ │
│ │ Phase 1: Thanh toán nợ (2 năm)  │ │
│ │                                 │ │
│ │ Nợ hiện tại: 20,000,000đ        │ │
│ │ Lãi suất: 12%/năm               │ │
│ │ Trả/tháng: 1,000,000đ           │ │
│ │                                 │ │
│ │ [Progress: ▓▓░░░░░░░░] 0%       │ │
│ │                                 │ │
│ │ Timeline:                       │ │
│ │ 12/2025 ▓▓▓▓▓░░░░░ 50% (10tr)  │ │
│ │ 12/2026 ▓▓▓▓▓▓▓▓▓▓ HẾT NỢ! 🎉  │ │
│ │                                 │ │
│ │ 💡 Tip: Dùng thưởng Tết/tháng 13│ │
│ │    để trả nợ nhanh hơn          │ │
│ │                                 │ │
│ │ Sau khi hết nợ (năm 2027):      │ │
│ │ → Tiết kiệm tăng lên 5tr/tháng  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 🎯 KẾ HOẠCH ĐẦU TƯ CHI TIẾT        │
│ ┌─────────────────────────────────┐ │
│ │ Phase 2: Tích lũy (8 năm còn lại)│ │
│ │                                 │ │
│ │ Vốn ban đầu: 50,000,000đ        │ │
│ │ Tiết kiệm/tháng:                │ │
│ │ • Năm 1-2: 4,000,000 (Có nợ)    │ │
│ │ • Năm 3-10: 5,000,000 (Hết nợ)  │ │
│ │                                 │ │
│ │ Lãi suất: 7%/năm (Cân bằng)     │ │
│ │                                 │ │
│ │ 📈 Projection:                  │ │
│ │ ┌─────────────────────────────┐ │ │
│ │ │ Năm 10 (12/2035):           │ │ │
│ │ │                             │ │ │
│ │ │ Gốc đóng góp: 626,000,000   │ │ │
│ │ │ (50tr + 4tr×24 + 5tr×96)    │ │ │
│ │ │                             │ │ │
│ │ │ Lãi tích lũy:  524,000,000  │ │ │
│ │ │ (Lãi kép 7%/năm)            │ │ │
│ │ │                             │ │ │
│ │ │ ═══════════════════════════ │ │ │
│ │ │ TỔNG: 1,150,000,000đ        │ │ │
│ │ │                             │ │ │
│ │ │ Mục tiêu: 1,500,000,000đ    │ │ │
│ │ │ Đạt được: 76.7% ⚠️          │ │ │
│ │ │ Thiếu: 350,000,000đ         │ │ │
│ │ └─────────────────────────────┘ │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 💡 ĐỀ XUẤT ĐỂ ĐẠT 100%              │
│ ┌─────────────────────────────────┐ │
│ │ Chọn 1 trong 3 phương án:       │ │
│ │                                 │ │
│ │ ✅ Phương án 1: Tăng thời gian  │ │
│ │    • Kéo dài thêm 3 năm (13 năm)│ │
│ │    • Giữ nguyên tiết kiệm 4-5tr │ │
│ │    • Đạt: 1,580,000,000đ ✅     │ │
│ │    • Dễ thực hiện nhất          │ │
│ │                                 │ │
│ │ ○ Phương án 2: Tăng tiết kiệm   │ │
│ │    • Tiết kiệm 6.5tr/tháng      │ │
│ │    • Giữ nguyên 10 năm          │ │
│ │    • Đạt: 1,510,000,000đ ✅     │ │
│ │    • Cần cắt giảm chi tiêu      │ │
│ │                                 │ │
│ │ ○ Phương án 3: Tăng lãi suất    │ │
│ │    • Đầu tư mạo hiểm hơn (10%)  │ │
│ │    • Giữ nguyên tiết kiệm & time│ │
│ │    • Đạt: 1,530,000,000đ ✅     │ │
│ │    • Rủi ro cao hơn ⚠️          │ │
│ │                                 │ │
│ │ [Áp dụng Phương án 1]           │ │
│ │ [So sánh chi tiết 3 phương án]  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 🔢 CÔNG THỨC CHI TIẾT               │
│ ┌─────────────────────────────────┐ │
│ │ [Tap để mở rộng]                │ │
│ │                                 │ │
│ │ Future Value Formula:           │ │
│ │ FV = PV(1+r)^n + PMT[(1+r)^n-1]/r│ │
│ │                                 │ │
│ │ 💡 Xem calculation step-by-step │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📈 BIỂU ĐỒ TĂNG TRƯỞNG 10 NĂM      │
│ ┌─────────────────────────────────┐ │
│ │ 1.5t ┤              ╱ ─ ─ ─ ─ Mục│ │
│ │      │            ╱          tiêu│ │
│ │ 1.2t │          ╱                │ │
│ │      │        ╱                  │ │
│ │ 900tr│      ╱                    │ │
│ │      │    ╱                      │ │
│ │ 600tr│  ╱                        │ │
│ │      │╱                          │ │
│ │ 300tr├────────────────────────   │ │
│ │      │                           │ │
│ │ 50tr ●───────────────────────    │ │
│ │      └────────────────────────   │ │
│ │      0  2  4  6  8  10 năm      │ │
│ │                                 │ │
│ │ ──── Tổng tài sản               │ │
│ │ ─ ─  Mục tiêu                   │ │
│ │ .... Gốc đóng góp               │ │
│ │                                 │ │
│ │ [Xem từng năm chi tiết]         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 🎯 MILESTONES & CELEBRATIONS        │
│ ┌─────────────────────────────────┐ │
│ │ ✅ 12/2025: 100tr (Hoàn nợ 50%)  │ │
│ │ ⏳ 12/2026: HẾT NỢ! 🎉          │ │
│ │ ⏳ 12/2028: 300tr (20%)          │ │
│ │ ⏳ 12/2030: 600tr (40%)          │ │
│ │ ⏳ 12/2033: 900tr (60%)          │ │
│ │ ⏳ 12/2035: 1.15t (77%)          │ │
│ │                                 │ │
│ │ 💡 Nhận thông báo khi đạt mỗi   │ │
│ │    milestone để động lực!       │ │
│ │                                 │ │
│ │ [⚙️ Cài đặt nhắc nhở]            │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ⚠️ PORTFOLIO & QUẢN LÝ RỦI RO       │
│ ┌─────────────────────────────────┐ │
│ │ Hồ sơ rủi ro: CÂN BẰNG (5/10)   │ │
│ │ Lãi suất mục tiêu: 7%/năm       │ │
│ │                                 │ │
│ │ 📊 Portfolio Đề Xuất:           │ │
│ │                                 │ │
│ │ 50% Quỹ đầu tư (300tr)          │ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░      │ │
│ │ • VN30 Index Fund               │ │
│ │ • Balanced Fund                 │ │
│ │ • Lãi kỳ vọng: 6-8%             │ │
│ │                                 │ │
│ │ 30% Cổ phiếu (180tr)            │ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░      │ │
│ │ • Blue-chip: VNM, VCB, VHM      │ │
│ │ • Lãi kỳ vọng: 8-12%            │ │
│ │                                 │ │
│ │ 20% Tiết kiệm/TP (120tr)        │ │
│ │ ▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░      │ │
│ │ • Tiết kiệm kỳ hạn              │ │
│ │ • Trái phiếu chính phủ          │ │
│ │ • Lãi: 4-6%                     │ │
│ │                                 │ │
│ │ 💡 Cân bằng lại mỗi năm         │ │
│ │    (Rebalancing)                │ │
│ │                                 │ │
│ │ Rủi ro:                         │ │
│ │ ✅ Đa dạng hóa tốt              │ │
│ │ ⚠️ Biến động ±10-15%/năm        │ │
│ │ ✅ Phù hợp mục tiêu dài hạn     │ │
│ │                                 │ │
│ │ [Tìm hiểu về các loại quỹ]      │ │
│ │ [Tư vấn portfolio cá nhân hóa]  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 💼 HÀNH ĐỘNG TIẾP THEO              │
│ ┌─────────────────────────────────┐ │
│ │ Tuần này:                       │ │
│ │ ☐ 1. Thiết lập auto-transfer    │ │
│ │      5tr/tháng vào quỹ đầu tư   │ │
│ │                                 │ │
│ │ ☐ 2. Mở tài khoản đầu tư chứng  │ │
│ │      khoán (nếu chưa có)        │ │
│ │                                 │ │
│ │ Tháng này:                      │ │
│ │ ☐ 3. Tập trung trả nợ 1tr/tháng │ │
│ │                                 │ │
│ │ ☐ 4. Review chi tiêu, tìm cách  │ │
│ │      cắt giảm 5-10%             │ │
│ │                                 │ │
│ │ Quý này:                        │ │
│ │ ☐ 5. Học về quỹ đầu tư & cổ phiếu│ │
│ │      (Khóa học miễn phí)        │ │
│ │                                 │ │
│ │ ☐ 6. Xem xét tăng thu nhập      │ │
│ │      (Freelance, side hustle)   │ │
│ │                                 │ │
│ │ [✅ Đánh dấu hoàn thành]         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📥 ACTIONS                          │
│ ┌───────────┬───────────┬─────────┐ │
│ │📈 Xem     │✏️ Chỉnh   │💾 Lưu & │ │
│ │  Tiến Độ  │   Sửa     │  Chia Sẻ│ │
│ └───────────┴───────────┴─────────┘ │
│ ┌───────────┬───────────┬─────────┐ │
│ │🤖 Tư Vấn  │👨‍💼 Đặt    │🏠 Trang  │ │
│ │   AI      │  Chuyên Gia│  Chủ   │ │
│ └───────────┴───────────┴─────────┘ │
└─────────────────────────────────────┘
```

**[Tiếp tục với các kịch bản khác và các màn hình 3.3 - 3.6, GIAI ĐOẠN 4-6...]**

---

## 📝 LƯU Ý

Đây là phần 1 của tài liệu chi tiết. File này mở rộng:
- GIAI ĐOẠN 3.1: Nhập liệu (100% hoàn thiện)
- GIAI ĐOẠN 3.2: Kết quả phân tích - Kịch bản 1 (100% hoàn thiện)

Cần tiếp tục bổ sung:
- Kịch bản 2, 3 của phần 3.2
- Phần 3.3 - 3.6
- GIAI ĐOẠN 4-6 đầy đủ

Tài liệu sẽ được cập nhật thêm trong các phần tiếp theo!