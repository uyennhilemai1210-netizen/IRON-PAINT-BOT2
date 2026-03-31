# HƯỚNG DẪN TRIỂN KHAI CHATBOT FACEBOOK MESSENGER CHO IRON PAINT

Tài liệu này hướng dẫn chi tiết từng bước để bạn tự triển khai chatbot cho Fanpage Iron Paint hoàn toàn miễn phí.

---

## PHẦN 1: CHUẨN BỊ MÃ NGUỒN (SOURCE CODE)

Mã nguồn chatbot đã được viết sẵn và tối ưu cho ngành sơn. Bạn có thể tải toàn bộ thư mục `iron-paint-chatbot` về máy tính của mình.

### Tùy chỉnh thông tin doanh nghiệp

Trước khi triển khai, bạn cần mở file `responses.js` bằng bất kỳ trình soạn thảo văn bản nào (Notepad, VS Code...) và cập nhật thông tin thật của bạn ở phần đầu file:

```javascript
const BUSINESS_INFO = {
  name: "IRON PAINT",
  slogan: "Sơn Iron - Siêu nhanh siêu mạnh",
  description: "Iron Paint chuyên cung cấp các sản phẩm sơn chất lượng cao...",
  phone: "[093 644 5654]", // <-- Sửa tại đây
  address: "[91/18/5 Lê Văn Duyệt, P.Gia Định, TP.HCM]",     // <-- Sửa tại đây
  website: "[[SƠN RỒNG ĐỎ](https://sonrongdo.com/  )]",       // <-- Sửa tại đây
  workingHours: "Thứ Hai - Thứ Sáu: 8:00 - 17:00 | Thứ Bảy: 8:00 - 12:00",
  zalo: "[093 644 5654]",          // <-- Sửa tại đây
};
```

---

## PHẦN 2: TẠO FACEBOOK APP VÀ LẤY TOKEN

Vì bạn đã có quyền Admin của Page, bạn chỉ cần làm theo các bước sau:

### Bước 1: Đăng ký tài khoản Facebook Developer

1. Truy cập [Facebook for Developers](https://developers.facebook.com/)

1. Đăng nhập bằng tài khoản Facebook cá nhân (tài khoản đang quản trị Page Iron)

1. Nhấn vào **"Bắt đầu"** (Get Started) ở góc phải trên cùng và làm theo hướng dẫn để đăng ký tài khoản Developer.

### Bước 2: Tạo Ứng dụng (App)

1. Trong trang Developer, nhấn **"Tạo ứng dụng"** (Create App).

1. Chọn loại ứng dụng: **"Khác"** (Other) -> Tiếp tục.

1. Chọn loại: **"Doanh nghiệp"** (Business) -> Tiếp tục.

1. Điền tên ứng dụng (VD: `Iron Paint Chatbot`), nhập email liên hệ và chọn Tài khoản kinh doanh (nếu có) -> Nhấn **"Tạo ứng dụng"**.

### Bước 3: Thêm sản phẩm Messenger

1. Trong bảng điều khiển ứng dụng, cuộn xuống tìm phần **"Messenger"** và nhấn **"Thiết lập"** (Set up).

1. Ở menu bên trái, chọn **Messenger** -> **Cài đặt API** (API Settings).

### Bước 4: Lấy Page Access Token

1. Cuộn xuống phần **"Mã truy cập"** (Access Tokens).

1. Nhấn **"Thêm trang"** (Add Page) và làm theo hướng dẫn để kết nối với Page Iron của bạn.

1. Sau khi kết nối, nhấn nút **"Tạo mã"** (Generate Token).

1. **QUAN TRỌNG:** Copy đoạn mã dài loằng ngoằng này và lưu lại ra một file text. Đây chính là `PAGE_ACCESS_TOKEN`.

---

## PHẦN 3: ĐƯA CHATBOT LÊN MẠNG (DEPLOY LÊN RENDER)

Để chatbot hoạt động 24/7, chúng ta cần đưa code lên một máy chủ. [Render.com](https://render.com) là một dịch vụ miễn phí rất tốt cho việc này.

### Bước 1: Đưa code lên GitHub

1. Tạo tài khoản [GitHub](https://github.com/).

1. Tạo một repository mới (Private hoặc Public đều được).

1. Upload toàn bộ các file trong thư mục `iron-paint-chatbot` lên repository này.

### Bước 2: Triển khai trên Render

1. Truy cập [Render.com](https://render.com/) và đăng nhập bằng tài khoản GitHub.

1. Nhấn **"New"** -> **"Web Service"**.

1. Chọn **"Build and deploy from a Git repository"** -> Next.

1. Kết nối với repository GitHub bạn vừa tạo.

1. Điền thông tin:

- Name: `iron-paint-chatbot`

- Region: Chọn khu vực gần nhất (VD: Singapore)

- Branch: `main`

- Runtime: `Node`

- Build Command: `npm install`

- Start Command: `node app.js`

- Instance Type: Chọn gói **Free**

1. Cuộn xuống phần **Environment Variables** (Biến môi trường), thêm các biến sau:

- Key: `PAGE_ACCESS_TOKEN` | Value: *(Dán mã token bạn đã copy ở Phần 2 vào đây)*

- Key: `VERIFY_TOKEN` | Value: `iron_paint_verify_2024`

- Key: `OPENAI_API_KEY` | Value: *(Nếu bạn có tài khoản OpenAI, dán API key vào đây. Nếu không có, hãy bỏ qua biến này, chatbot vẫn hoạt động bình thường với kịch bản có sẵn)*

1. Nhấn **"Create Web Service"**.

1. Chờ khoảng 2-3 phút để Render cài đặt. Khi thấy chữ "Live" màu xanh lá cây là thành công.

1. Copy đường link ứng dụng của bạn ở góc trên bên trái (VD: `https://iron-paint-chatbot.onrender.com` ).

---

## PHẦN 4: CẤU HÌNH WEBHOOK (KẾT NỐI FACEBOOK VỚI CHATBOT)

Bây giờ chúng ta sẽ báo cho Facebook biết gửi tin nhắn đến đâu.

1. Quay lại trang [Facebook Developer](https://developers.facebook.com/), vào ứng dụng của bạn -> **Messenger** -> **Cài đặt API**.

1. Cuộn xuống phần **"Webhooks"**, nhấn **"Thêm URL gọi lại"** (Add Callback URL).

1. Điền thông tin:

- URL gọi lại: Dán link Render của bạn và thêm `/webhook` vào cuối. (VD: `https://iron-paint-chatbot.onrender.com/webhook` )

- Mã xác minh (Verify Token): Nhập chính xác chữ `iron_paint_verify_2024`

1. Nhấn **"Xác minh và lưu"**.

1. Sau khi lưu thành công, nhấn nút **"Thêm đăng ký"** (Add Subscriptions) ở ngay bên dưới.

1. Tích chọn 2 ô: `messages` và `messaging_postbacks` -> Nhấn **Lưu**.

---

## PHẦN 5: KIỂM TRA VÀ HOÀN THIỆN

1. Dùng tài khoản Facebook cá nhân (hoặc nhờ bạn bè) nhắn tin vào Page Iron.

1. Thử nhắn các từ khóa như: "xin chào", "giá", "sơn nước", "đặt hàng".

1. Chatbot sẽ tự động trả lời theo kịch bản trong file `responses.js`.

**Lưu ý quan trọng:**Vì ứng dụng của bạn đang ở chế độ "Đang phát triển" (Development Mode), chatbot sẽ chỉ trả lời tin nhắn từ những người có quyền Quản trị viên (Admin), Người phát triển (Developer) hoặc Người thử nghiệm (Tester) của ứng dụng.

Để chatbot trả lời TẤT CẢ khách hàng:

1. Bạn cần chuyển ứng dụng sang chế độ **"Trực tiếp"** (Live Mode) bằng nút gạt ở trên cùng màn hình Facebook Developer.

1. Facebook có thể yêu cầu bạn cung cấp URL Chính sách quyền riêng tư (Privacy Policy) và xác minh doanh nghiệp trước khi cho phép Live.

---

## CÁCH CHỈNH SỬA KỊCH BẢN SAU NÀY

Nếu bạn muốn thay đổi câu trả lời, thêm sản phẩm mới hoặc cập nhật giá:

1. Mở file `responses.js`

1. Tìm đến phần `PRODUCTS` hoặc `KEYWORD_RESPONSES`

1. Chỉnh sửa nội dung chữ nằm trong dấu ngoặc kép `""` hoặc dấu backtick ````.

1. Lưu file, đẩy lên GitHub, Render sẽ tự động cập nhật chatbot của bạn!

Chúc bạn kinh doanh hồng phát cùng Iron Paint! 🎨

