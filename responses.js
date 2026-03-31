/**
 * ============================================
 * IRON PAINT CHATBOT - Kịch bản trả lời tự động
 * ============================================
 *
 * File này chứa toàn bộ kịch bản trả lời cho chatbot.
 * Bạn có thể dễ dàng chỉnh sửa nội dung, thêm/bớt từ khóa
 * mà KHÔNG cần thay đổi code chính.
 */

// ============================================
// THÔNG TIN DOANH NGHIỆP
// ============================================
const BUSINESS_INFO = {
  name: "IRON PAINT",
  slogan: "Sơn Iron - Siêu nhanh siêu mạnh",
  description:
    "IRON PAINT chuyên cung cấp các sản phẩm sơn chất lượng cao: Sơn nước Iron, Sơn lót Iron, Sơn sắt mạ kẽm Iron 1K, Sơn xịt Iron, Tẩy sơn Iron, Sơn sàn Epoxy.",
  phone: "093 644 5654",
  address: "91/18/5 Lê Văn Duyệt, P.Gia Định, TP.HCM",
  website: "https://sonrongdo.com/",
  workingHours: "Thứ Hai - Thứ Sáu: 8:00 - 17:00 | Thứ Bảy: 8:00 - 12:00",
  zalo: "093 644 5654",
};

// ============================================
// DANH MỤC SẢN PHẨM (11 sản phẩm + 1 sơn sàn epoxy)
// ============================================
const PRODUCTS = {
  // --- NHÓM SƠN NƯỚC ---
  son_nuoc_eco_plast: {
    name: "🏠 Sơn Nước Nội Thất Iron Eco Plast",
    description:
      "Sơn nước nội thất gốc nhựa Acrylic cho tường và trần, màng sơn mờ mịn, không độc hại, mùi dễ chịu. Phù hợp cho tường mới hoặc sơn lại.",
    features: [
      "Độ che phủ tốt, tiết kiệm",
      "Chịu chùi rửa",
      "Chống nấm mốc",
      "Nhanh khô, không độc hại",
    ],
  },
  son_nuoc_shield_interior: {
    name: "🏠 Sơn Nước Nội Thất Iron Shield Interior - Dễ Lau Chùi",
    description:
      "Sơn nước nội thất gốc nhựa Acrylic, độ che phủ cao, dễ lau chùi, kháng nấm mốc và bền màu. Lựa chọn tối ưu cho công trình dân dụng.",
    features: [
      "Chịu chùi rửa cao, dễ vệ sinh",
      "Màng sơn nhẵn mịn, nhẹ mùi",
      "Chống nấm mốc",
      "Nhanh khô, dễ sử dụng",
      "Che lấp khiếm khuyết tường",
    ],
  },
  son_nuoc_super_coat: {
    name: "🏠 Sơn Nước Nội Thất Iron Super Coat (Cao cấp)",
    description:
      "Sơn nước nội thất cao cấp, mang lại vẻ đẹp sang trọng, tao nhã. Độ che phủ cao, dễ lau chùi, bền màu, an toàn cho sức khỏe.",
    features: [
      "Chịu chùi rửa cao",
      "Màng sơn nhẵn mịn",
      "Chống nấm mốc",
      "Nhanh khô",
      "Độ che phủ cao",
    ],
  },
  son_nuoc_shield_exterior: {
    name: "🏠 Sơn Nước Ngoại Thất Iron Shield Exterior - Chống Phai Màu",
    description:
      "Sơn nước ngoại thất cao cấp 100% nhựa Acrylic, chống chọi thời tiết khắc nghiệt, bền màu theo thời gian. Chống bám bẩn tốt, VOC thấp.",
    features: [
      "Bền màu UV, chống phai",
      "Chống bám bụi",
      "Chống nấm mốc, rong rêu",
      "Phản xạ nhiệt",
      "Chống vệt nước",
    ],
  },

  // --- NHÓM SƠN LÓT ---
  son_lot_kiem_noi_that_ak11: {
    name: "🛡️ Sơn Lót Kiềm Nội Thất AK11",
    description:
      "Sơn lót kháng kiềm cao cấp gốc nước, thân thiện môi trường, dành cho bề mặt tường nội thất. Giúp lớp sơn phủ bám dính tốt và bền đẹp hơn.",
    features: [
      "Kháng kiềm hiệu quả",
      "Chống nước",
      "Bám dính cao",
      "Không độc hại, thân thiện môi trường",
    ],
  },
  son_lot_kiem_ngoai_that_ak12: {
    name: "🛡️ Sơn Lót Kiềm Ngoại Thất AK12",
    description:
      "Sơn lót kháng kiềm cao cấp gốc nước cho ngoại thất. Thẩm thấu sâu, kháng kiềm, chống thấm ngược, bảo vệ lớp sơn phủ bền đẹp theo thời gian.",
    features: [
      "Kháng kiềm",
      "Bám dính cao",
      "Chống nước, chống thấm ngược",
      "Không độc hại, thân thiện môi trường",
    ],
  },
  son_lot_kem_iron_1k: {
    name: "🛡️ Sơn Lót Kẽm Iron 1K",
    description:
      "Sơn lót 1 thành phần gốc nhựa Alkyd biến tính, tăng cường bám dính và chống rỉ cho bề mặt kim loại trước khi sơn phủ. Phù hợp cho nhà xưởng, sắt thép, thép mạ kẽm, xe tải, mái hiên, cửa cổng.",
    features: [
      "Bám dính tốt trên nhiều bề mặt kim loại",
      "Nhanh khô, dễ sử dụng",
      "Chống rỉ và ăn mòn hiệu quả",
      "Độ phủ cao",
    ],
  },

  // --- SƠN SẮT MẠ KẼM IRON 1K PHỦ ---
  son_iron_1k_phu: {
    name: "🔩 Sơn Iron 1K Phủ (Sơn Sắt Mạ Kẽm)",
    description:
      "Sơn đa năng cao cấp 1 thành phần, gốc nhựa Acrylic TPA. Không chứa chì và thủy ngân, an toàn. Bám dính cao trên sắt thép, kẽm. Có thể sơn trực tiếp không cần lót.",
    features: [
      "Bám dính cao trên sắt thép, kẽm",
      "Màng sơn cứng, nhanh khô",
      "Tiết kiệm chi phí",
      "Độ phủ cao, bền màu",
      "Sơn trực tiếp không cần lót",
    ],
  },

  // --- NHÓM SƠN XỊT ---
  son_xit_iron: {
    name: "🎨 Sơn Xịt Iron",
    description:
      "Sơn xịt gốc dung môi cao cấp, khô nhanh, bám dính tốt trên nhiều bề mặt: sắt thép, mạ kẽm, gỗ, nhựa, bê tông, composite, vải, da, gốm. Không chứa chì và thủy ngân. Dùng cho cả trang trí và công nghiệp.",
    features: [
      "Độ bám dính cao",
      "Màng sơn cứng, độ bóng cao",
      "Khô rất nhanh (5-7 phút)",
      "Đa dạng màu sắc",
      "Dễ sử dụng",
    ],
  },
  son_xit_chiu_nhiet: {
    name: "🔥 Sơn Xịt Chịu Nhiệt Iron",
    description:
      "Sơn xịt chịu nhiệt cao cấp, bảo vệ các bộ phận, vật liệu khỏi bị ăn mòn do nhiệt độ cao và quá trình oxy hóa. Phù hợp cho ống xả xe máy, máy móc công nghiệp, nồi hơi, lò sưởi, ống khói.",
    features: [
      "Chịu nhiệt cao",
      "Khô nhanh",
      "Độ phủ cao, dễ sử dụng",
      "Không chứa chì và thủy ngân",
    ],
  },

  // --- TẨY SƠN ---
  tay_son_iron: {
    name: "🧹 Chất Tẩy Sơn Iron Dạng Xịt",
    description:
      "Hỗn hợp dung môi và phụ gia đặc biệt, tẩy nhiều loại sơn (Alkyd, Amino, Epoxy) hiệu quả và nhanh chóng. Phù hợp tẩy sơn cũ trên kim loại, thủy tinh, gỗ, đá, máy móc.",
    features: [
      "Dễ dàng tẩy sơn",
      "Hiệu quả nhanh chóng (5-10 phút)",
      "Phù hợp nhiều loại sơn",
      "Dễ làm sạch",
    ],
  },

  // --- SƠN SÀN EPOXY ---
  son_san_epoxy: {
    name: "🏭 Sơn Sàn Epoxy Iron",
    description:
      "Sơn sàn Epoxy Iron - hoàn hảo cho sàn nhà xưởng, garage, kho bãi. Chống trầy xước, chịu lực tốt.",
    features: [
      "Chống trầy xước cao",
      "Chịu lực, chịu mài mòn",
      "Dễ vệ sinh",
      "Thẩm mỹ cao, nhiều màu sắc",
    ],
  },
};

// ============================================
// TẠO DANH SÁCH SẢN PHẨM DẠNG TEXT (theo nhóm)
// ============================================
function getProductListText() {
  let text = `📋 DANH MỤC SẢN PHẨM IRON PAINT:\n\n`;
  text += `🏠 SƠN NƯỚC:\n`;
  text += `  1. Iron Eco Plast (Nội thất)\n`;
  text += `  2. Iron Shield Interior - Dễ Lau Chùi\n`;
  text += `  3. Iron Super Coat (Nội thất cao cấp)\n`;
  text += `  4. Iron Shield Exterior - Chống Phai Màu (Ngoại thất)\n\n`;
  text += `🛡️ SƠN LÓT:\n`;
  text += `  5. Lót Kiềm Nội Thất AK11\n`;
  text += `  6. Lót Kiềm Ngoại Thất AK12\n`;
  text += `  7. Lót Kẽm Iron 1K (cho kim loại)\n\n`;
  text += `🔩 SƠN SẮT:\n`;
  text += `  8. Sơn Iron 1K Phủ (Sắt mạ kẽm)\n\n`;
  text += `🎨 SƠN XỊT:\n`;
  text += `  9. Sơn Xịt Iron\n`;
  text += `  10. Sơn Xịt Chịu Nhiệt Iron\n\n`;
  text += `🧹 TẨY SƠN:\n`;
  text += `  11. Chất Tẩy Sơn Iron Dạng Xịt\n\n`;
  text += `🏭 SƠN SÀN:\n`;
  text += `  12. Sơn Sàn Epoxy Iron\n\n`;
  text += `👉 Nhắn tên sản phẩm để xem chi tiết!\nVí dụ: "eco plast", "shield interior", "sơn xịt", "epoxy"...`;
  return text;
}

// ============================================
// TẠO CHI TIẾT SẢN PHẨM DẠNG TEXT
// ============================================
function getProductDetailText(productKey) {
  const p = PRODUCTS[productKey];
  if (!p) return null;
  let text = `━━━━━━━━━━━━━━━━━━━━\n`;
  text += `${p.name}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  text += `📝 ${p.description}\n\n`;
  text += `✨ Đặc điểm nổi bật:\n`;
  p.features.forEach((f) => {
    text += `  ✅ ${f}\n`;
  });
  text += `\n💰 Liên hệ Hotline: ${BUSINESS_INFO.phone} để nhận báo giá!\n`;
  text += `📍 Địa chỉ: ${BUSINESS_INFO.address}`;
  return text;
}

// ============================================
// TẠO CHI TIẾT NHÓM SẢN PHẨM (nhiều SP cùng nhóm)
// ============================================
function getProductGroupText(productKeys) {
  let text = "";
  productKeys.forEach((key, index) => {
    const p = PRODUCTS[key];
    if (!p) return;
    if (index > 0) text += `\n\n`;
    text += `━━━━━━━━━━━━━━━━━━━━\n`;
    text += `${p.name}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━\n`;
    text += `📝 ${p.description}\n`;
    text += `✨ Nổi bật: ${p.features.join(" | ")}`;
  });
  text += `\n\n💰 Liên hệ Hotline: ${BUSINESS_INFO.phone} để nhận báo giá!`;
  return text;
}

// ============================================
// KỊCH BẢN TRẢ LỜI THEO TỪ KHÓA
// (Ưu tiên từ trên xuống dưới - match đầu tiên sẽ được dùng)
// ============================================
const KEYWORD_RESPONSES = [
  // --- CHÀO HỎI ---
  {
    keywords: [
      "xin chào", "hello", "chào", "alo", "hey",
      "chào bạn", "chào shop", "chào anh", "chào chị",
      "có ai không", "shop ơi", "hi shop", "hi bạn",
    ],
    response: () => ({
      text:
        `Xin chào! 👋 Chào mừng bạn đến với ${BUSINESS_INFO.name}! 🎨\n\n` +
        `${BUSINESS_INFO.description}\n\n` +
        `Bạn cần tư vấn về sản phẩm nào? Nhắn cho mình:\n` +
        `👉 "Sản phẩm" - Xem danh mục sản phẩm\n` +
        `👉 "Giá" - Hỏi về giá cả\n` +
        `👉 "Đặt hàng" - Đặt mua sản phẩm\n` +
        `👉 "Bảng màu" - Xem bảng màu\n` +
        `👉 "Bán lẻ" - Hỏi về mua lẻ\n` +
        `👉 "Liên hệ" - Thông tin liên hệ`,
    }),
    priority: 1,
  },

  // --- SẢN PHẨM / DANH MỤC ---
  {
    keywords: [
      "sản phẩm", "danh mục", "có gì", "bán gì",
      "loại sơn", "các loại", "menu", "catalogue",
      "xem sản phẩm", "danh sách",
    ],
    response: () => ({
      text: getProductListText(),
    }),
    priority: 2,
  },

  // --- SƠN NƯỚC ECO PLAST ---
  {
    keywords: ["eco plast", "ecoplast", "eco", "sơn eco"],
    response: () => ({
      text: getProductDetailText("son_nuoc_eco_plast"),
    }),
    priority: 3,
  },

  // --- SƠN NƯỚC SHIELD INTERIOR ---
  {
    keywords: [
      "shield interior", "lau chùi", "dễ lau chùi",
      "sơn nội thất dễ lau", "interior",
    ],
    response: () => ({
      text: getProductDetailText("son_nuoc_shield_interior"),
    }),
    priority: 3,
  },

  // --- SƠN NƯỚC SUPER COAT ---
  {
    keywords: [
      "super coat", "supercoat", "supper coat",
      "sơn cao cấp", "sơn nội thất cao cấp",
    ],
    response: () => ({
      text: getProductDetailText("son_nuoc_super_coat"),
    }),
    priority: 3,
  },

  // --- SƠN NƯỚC SHIELD EXTERIOR ---
  {
    keywords: [
      "shield exterior", "chống phai", "chống phai màu",
      "sơn ngoại thất", "exterior", "ngoại thất",
    ],
    response: () => ({
      text: getProductDetailText("son_nuoc_shield_exterior"),
    }),
    priority: 3,
  },

  // --- SƠN NƯỚC (chung) ---
  {
    keywords: [
      "sơn nước", "son nuoc", "sơn tường", "sơn nhà",
      "sơn nội thất", "sơn trong nhà",
    ],
    response: () => ({
      text: getProductGroupText([
        "son_nuoc_eco_plast",
        "son_nuoc_shield_interior",
        "son_nuoc_super_coat",
        "son_nuoc_shield_exterior",
      ]),
    }),
    priority: 4,
  },

  // --- SƠN LÓT AK11 ---
  {
    keywords: ["ak11", "lót nội thất", "lót kiềm nội thất"],
    response: () => ({
      text: getProductDetailText("son_lot_kiem_noi_that_ak11"),
    }),
    priority: 3,
  },

  // --- SƠN LÓT AK12 ---
  {
    keywords: ["ak12", "lót ngoại thất", "lót kiềm ngoại thất"],
    response: () => ({
      text: getProductDetailText("son_lot_kiem_ngoai_that_ak12"),
    }),
    priority: 3,
  },

  // --- SƠN LÓT KẼM IRON 1K ---
  {
    keywords: ["lót kẽm", "lót 1k", "lót iron 1k", "lot kem"],
    response: () => ({
      text: getProductDetailText("son_lot_kem_iron_1k"),
    }),
    priority: 3,
  },

  // --- SƠN LÓT (chung) ---
  {
    keywords: [
      "sơn lót", "son lot", "lót kiềm", "kháng kiềm",
      "lót", "primer",
    ],
    response: () => ({
      text: getProductGroupText([
        "son_lot_kiem_noi_that_ak11",
        "son_lot_kiem_ngoai_that_ak12",
        "son_lot_kem_iron_1k",
      ]),
    }),
    priority: 4,
  },

  // --- SƠN IRON 1K PHỦ (SẮT MẠ KẼM) ---
  {
    keywords: [
      "1k phủ", "iron 1k", "sơn 1k", "1k phu",
      "sơn sắt", "mạ kẽm", "son sat", "ma kem",
      "sơn sắt mạ kẽm", "sơn kim loại",
      "sơn sắt thép", "sơn thép",
    ],
    response: () => ({
      text: getProductDetailText("son_iron_1k_phu"),
    }),
    priority: 3,
  },

  // --- SƠN XỊT IRON ---
  {
    keywords: [
      "sơn xịt", "son xit", "xịt sơn", "sơn phun",
      "sơn bình xịt", "bình xịt", "spray",
    ],
    response: () => ({
      text: getProductGroupText(["son_xit_iron", "son_xit_chiu_nhiet"]),
    }),
    priority: 3,
  },

  // --- SƠN XỊT CHỊU NHIỆT ---
  {
    keywords: [
      "chịu nhiệt", "xịt chịu nhiệt", "sơn nhiệt",
      "ống xả", "chịu nóng", "heat resistant",
    ],
    response: () => ({
      text: getProductDetailText("son_xit_chiu_nhiet"),
    }),
    priority: 3,
  },

  // --- TẨY SƠN ---
  {
    keywords: [
      "tẩy sơn", "tay son", "chất tẩy", "tẩy",
      "bóc sơn", "lột sơn", "remove", "tẩy sơn xịt",
    ],
    response: () => ({
      text: getProductDetailText("tay_son_iron"),
    }),
    priority: 3,
  },

  // --- SƠN SÀN EPOXY ---
  {
    keywords: [
      "epoxy", "sơn sàn", "son san", "sơn epoxy",
      "sơn nhà xưởng", "sơn garage", "sơn kho",
      "floor coating", "sàn nhà xưởng",
    ],
    response: () => ({
      text: getProductDetailText("son_san_epoxy"),
    }),
    priority: 3,
  },

  // --- GIÁ CẢ ---
  {
    keywords: [
      "giá", "bao nhiêu", "báo giá", "price",
      "giá cả", "giá tiền", "chi phí", "phí",
      "giá sơn", "bảng giá", "giá bán",
    ],
    response: () => ({
      text:
        `💰 THÔNG TIN GIÁ CẢ - IRON PAINT\n\n` +
        `Giá sản phẩm Iron Paint phụ thuộc vào:\n` +
        `📦 Loại sản phẩm\n` +
        `📏 Quy cách đóng gói (thể tích/trọng lượng)\n` +
        `🔢 Số lượng đặt mua\n\n` +
        `👉 Để được báo giá chính xác nhất, vui lòng cho mình biết:\n` +
        `1️⃣ Bạn cần loại sơn nào?\n` +
        `2️⃣ Số lượng bao nhiêu?\n` +
        `3️⃣ Giao đến khu vực nào?\n\n` +
        `📞 Hoặc gọi ngay Hotline: ${BUSINESS_INFO.phone}\n` +
        `💬 Zalo: ${BUSINESS_INFO.zalo}\n\n` +
        `⚡ Cam kết giá tốt nhất thị trường!`,
    }),
    priority: 5,
  },

  // --- ĐẶT HÀNG ---
  {
    keywords: [
      "đặt hàng", "mua", "order", "đặt mua",
      "mua hàng", "đặt", "muốn mua", "cần mua",
      "lấy hàng", "ship", "giao hàng",
    ],
    response: () => ({
      text:
        `🛒 ĐẶT HÀNG - IRON PAINT\n\n` +
        `Để đặt hàng, bạn vui lòng cung cấp:\n\n` +
        `1️⃣ Tên sản phẩm cần mua\n` +
        `2️⃣ Số lượng\n` +
        `3️⃣ Họ tên người nhận\n` +
        `4️⃣ Số điện thoại\n` +
        `5️⃣ Địa chỉ giao hàng\n\n` +
        `🚚 Chính sách giao hàng:\n` +
        `  ✅ Giao hàng toàn quốc\n` +
        `  ✅ Miễn phí giao hàng cho đơn lớn\n` +
        `  ✅ Thanh toán khi nhận hàng (COD)\n\n` +
        `📞 Đặt hàng nhanh qua Hotline: ${BUSINESS_INFO.phone}\n` +
        `💬 Hoặc nhắn thông tin đặt hàng ngay tại đây, nhân viên sẽ xác nhận sớm nhất!`,
    }),
    priority: 5,
  },

  // --- BÁN LẺ ---
  {
    keywords: [
      "bán lẻ", "ban le", "lẻ", "mua lẻ",
      "1 hộp", "1 lon", "1 chai", "mua ít",
      "có bán lẻ", "nhận bán lẻ",
    ],
    response: () => ({
      text:
        `🛍️ CHÍNH SÁCH BÁN LẺ - IRON PAINT\n\n` +
        `✅ CÓ! Iron Paint nhận bán lẻ cho mọi khách hàng!\n\n` +
        `🎯 Dù bạn cần 1 lon hay cả container, chúng tôi đều phục vụ:\n` +
        `  • Bán lẻ: Mua từ 1 sản phẩm\n` +
        `  • Bán sỉ: Giá ưu đãi cho đơn lớn\n` +
        `  • Đại lý: Chính sách chiết khấu hấp dẫn\n\n` +
        `📞 Liên hệ ngay Hotline: ${BUSINESS_INFO.phone}\n` +
        `📍 Mua trực tiếp tại: ${BUSINESS_INFO.address}\n\n` +
        `👉 Nhắn "Đặt hàng" để mua ngay!`,
    }),
    priority: 5,
  },

  // --- BẢNG MÀU ---
  {
    keywords: [
      "bảng màu", "bang mau", "màu sắc", "color",
      "màu", "có màu gì", "chọn màu", "mã màu",
      "bao nhiêu màu", "palette",
    ],
    response: () => ({
      text:
        `🎨 BẢNG MÀU - IRON PAINT\n\n` +
        `Iron Paint cung cấp đa dạng bảng màu cho từng dòng sản phẩm:\n\n` +
        `🏠 Sơn Nước Iron: Hệ màu đa dạng theo tiêu chuẩn\n` +
        `🔩 Sơn Iron 1K Phủ: Các màu phổ biến cho kim loại\n` +
        `🎨 Sơn Xịt Iron: Đa dạng màu sắc\n` +
        `🏭 Sơn Sàn Epoxy: Nhiều màu cho nhà xưởng\n\n` +
        `👉 Để xem bảng màu chi tiết, vui lòng cho mình biết bạn quan tâm dòng sơn nào?\n\n` +
        `📞 Hoặc liên hệ Hotline: ${BUSINESS_INFO.phone} để được tư vấn màu phù hợp!`,
    }),
    priority: 5,
  },

  // --- ĐẠI LÝ / SỈ ---
  {
    keywords: [
      "đại lý", "dai ly", "sỉ", "bán sỉ",
      "nhà phân phối", "hợp tác", "chiết khấu",
      "làm đại lý", "mở đại lý",
    ],
    response: () => ({
      text:
        `🤝 CHÍNH SÁCH ĐẠI LÝ - IRON PAINT\n\n` +
        `Iron Paint luôn chào đón các đối tác kinh doanh!\n\n` +
        `🎯 Quyền lợi đại lý:\n` +
        `  ✅ Chiết khấu hấp dẫn theo cấp bậc\n` +
        `  ✅ Hỗ trợ marketing, bảng hiệu\n` +
        `  ✅ Đào tạo kỹ thuật sản phẩm\n` +
        `  ✅ Chính sách đổi trả linh hoạt\n` +
        `  ✅ Hỗ trợ giao hàng\n\n` +
        `📞 Liên hệ phòng kinh doanh: ${BUSINESS_INFO.phone}\n` +
        `📧 Hoặc để lại SĐT, nhân viên sẽ gọi lại tư vấn chi tiết!`,
    }),
    priority: 5,
  },

  // --- LIÊN HỆ / ĐỊA CHỈ ---
  {
    keywords: [
      "liên hệ", "lien he", "địa chỉ", "dia chi",
      "ở đâu", "cửa hàng", "showroom", "số điện thoại",
      "hotline", "phone", "sdt", "zalo",
      "giờ mở cửa", "giờ làm việc",
    ],
    response: () => ({
      text:
        `📍 THÔNG TIN LIÊN HỆ - IRON PAINT\n\n` +
        `🏪 ${BUSINESS_INFO.name}\n` +
        `📍 Địa chỉ: ${BUSINESS_INFO.address}\n` +
        `📞 Hotline: ${BUSINESS_INFO.phone}\n` +
        `💬 Zalo: ${BUSINESS_INFO.zalo}\n` +
        `🌐 Website: ${BUSINESS_INFO.website}\n` +
        `🕐 Giờ làm việc: ${BUSINESS_INFO.workingHours}\n\n` +
        `💡 Bạn có thể nhắn tin trực tiếp tại đây, đội ngũ Iron Paint luôn sẵn sàng hỗ trợ!`,
    }),
    priority: 6,
  },

  // --- TƯ VẤN ---
  {
    keywords: [
      "tư vấn", "tu van", "hỏi", "hướng dẫn",
      "nên dùng", "loại nào", "chọn loại",
      "phù hợp", "dùng gì", "sơn gì",
      "thi công", "cách sơn", "cách dùng",
    ],
    response: () => ({
      text:
        `💡 TƯ VẤN SẢN PHẨM - IRON PAINT\n\n` +
        `Để tư vấn chính xác nhất, bạn vui lòng cho mình biết:\n\n` +
        `1️⃣ Bạn cần sơn cho bề mặt gì?\n` +
        `   (Tường, sắt thép, mạ kẽm, sàn nhà xưởng...)\n\n` +
        `2️⃣ Mục đích sử dụng?\n` +
        `   (Nội thất, ngoại thất, chống gỉ, trang trí...)\n\n` +
        `3️⃣ Diện tích cần sơn? (nếu biết)\n\n` +
        `Mình sẽ tư vấn sản phẩm và liều lượng phù hợp nhất cho bạn! 😊\n\n` +
        `📞 Tư vấn nhanh qua Hotline: ${BUSINESS_INFO.phone}`,
    }),
    priority: 6,
  },

  // --- CẢM ƠN ---
  {
    keywords: ["cảm ơn", "cam on", "thank", "thanks", "ok", "được rồi", "tốt"],
    response: () => ({
      text:
        `Cảm ơn bạn đã quan tâm đến sản phẩm Iron Paint! 😊\n\n` +
        `Nếu cần thêm thông tin gì, đừng ngại nhắn tin cho mình nhé!\n` +
        `📞 Hotline: ${BUSINESS_INFO.phone}\n\n` +
        `Chúc bạn một ngày tốt lành! 🎨`,
    }),
    priority: 10,
  },
];

// ============================================
// QUICK REPLIES CHO TIN NHẮN ĐẦU TIÊN
// ============================================
const WELCOME_QUICK_REPLIES = [
  {
    content_type: "text",
    title: "📋 Sản phẩm",
    payload: "SAN_PHAM",
  },
  {
    content_type: "text",
    title: "💰 Báo giá",
    payload: "BAO_GIA",
  },
  {
    content_type: "text",
    title: "🛒 Đặt hàng",
    payload: "DAT_HANG",
  },
  {
    content_type: "text",
    title: "🎨 Bảng màu",
    payload: "BANG_MAU",
  },
  {
    content_type: "text",
    title: "📍 Liên hệ",
    payload: "LIEN_HE",
  },
];

// ============================================
// PERSISTENT MENU
// ============================================
const PERSISTENT_MENU = [
  {
    locale: "default",
    composer_input_disabled: false,
    call_to_actions: [
      {
        type: "postback",
        title: "📋 Xem sản phẩm",
        payload: "MENU_PRODUCTS",
      },
      {
        type: "postback",
        title: "💰 Hỏi giá",
        payload: "MENU_PRICE",
      },
      {
        type: "postback",
        title: "🛒 Đặt hàng",
        payload: "MENU_ORDER",
      },
      {
        type: "postback",
        title: "🎨 Bảng màu",
        payload: "MENU_COLOR",
      },
      {
        type: "postback",
        title: "📞 Liên hệ",
        payload: "MENU_CONTACT",
      },
    ],
  },
];

// ============================================
// GET STARTED PAYLOAD
// ============================================
const GET_STARTED_PAYLOAD = "GET_STARTED";

// ============================================
// CONTEXT CHO AI (khi không match keyword)
// ============================================
const AI_SYSTEM_PROMPT = `Bạn là trợ lý tư vấn bán hàng của IRON PAINT - thương hiệu sơn chuyên nghiệp.

THÔNG TIN CÔNG TY:
- Tên: ${BUSINESS_INFO.name}
- Slogan: ${BUSINESS_INFO.slogan}
- Mô tả: ${BUSINESS_INFO.description}
- Hotline: ${BUSINESS_INFO.phone}
- Địa chỉ: ${BUSINESS_INFO.address}
- Website: ${BUSINESS_INFO.website}
- Giờ làm việc: ${BUSINESS_INFO.workingHours}
- Zalo: ${BUSINESS_INFO.zalo}

SẢN PHẨM CHÍNH (12 sản phẩm):

NHÓM SƠN NƯỚC:
1. Iron Eco Plast - Sơn nước nội thất gốc Acrylic, mờ mịn, không độc hại
2. Iron Shield Interior - Sơn nội thất dễ lau chùi, kháng nấm mốc, bền màu
3. Iron Super Coat - Sơn nội thất cao cấp, sang trọng, che phủ cao
4. Iron Shield Exterior - Sơn ngoại thất chống phai màu, chống bám bụi, phản xạ nhiệt

NHÓM SƠN LÓT:
5. Lót Kiềm Nội Thất AK11 - Sơn lót kháng kiềm gốc nước cho nội thất
6. Lót Kiềm Ngoại Thất AK12 - Sơn lót kháng kiềm gốc nước cho ngoại thất
7. Lót Kẽm Iron 1K - Sơn lót chống rỉ cho kim loại, sắt thép, mạ kẽm

NHÓM SƠN SẮT:
8. Sơn Iron 1K Phủ - Sơn đa năng 1 thành phần, bám dính cao trên sắt thép kẽm, sơn trực tiếp không cần lót

NHÓM SƠN XỊT:
9. Sơn Xịt Iron - Sơn xịt đa năng, khô nhanh 5-7 phút, nhiều bề mặt
10. Sơn Xịt Chịu Nhiệt Iron - Sơn xịt chịu nhiệt cho ống xả, máy móc, nồi hơi

NHÓM TẨY SƠN:
11. Chất Tẩy Sơn Iron Dạng Xịt - Tẩy sơn Alkyd, Amino, Epoxy nhanh 5-10 phút

NHÓM SƠN SÀN:
12. Sơn Sàn Epoxy Iron - Sơn sàn nhà xưởng, garage, kho bãi

QUY TẮC TRẢ LỜI:
- Trả lời bằng tiếng Việt, thân thiện, chuyên nghiệp
- Tư vấn dựa trên nhu cầu thực tế của khách
- Nếu khách hỏi giá cụ thể, hãy nói "Liên hệ Hotline: ${BUSINESS_INFO.phone} để nhận báo giá tốt nhất"
- Luôn khuyến khích khách liên hệ hotline hoặc để lại SĐT
- Trả lời ngắn gọn, dễ hiểu, không quá 200 từ
- Có nhận bán lẻ từ 1 sản phẩm
- KHÔNG bịa đặt thông tin về giá cả cụ thể
- KHÔNG trả lời các câu hỏi không liên quan đến sơn và sản phẩm Iron Paint`;

// ============================================
// EXPORTS
// ============================================
module.exports = {
  BUSINESS_INFO,
  PRODUCTS,
  KEYWORD_RESPONSES,
  WELCOME_QUICK_REPLIES,
  PERSISTENT_MENU,
  GET_STARTED_PAYLOAD,
  AI_SYSTEM_PROMPT,
  getProductListText,
  getProductDetailText,
  getProductGroupText,
};
