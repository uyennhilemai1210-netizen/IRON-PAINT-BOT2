/**
 * ============================================
 * IRON PAINT CHATBOT - Facebook Messenger Bot
 * ============================================
 *
 * Chatbot tự động trả lời tin nhắn cho Page Iron Paint
 * Kết hợp: Keyword Matching + AI (OpenAI GPT)
 *
 * Tác giả: Manus AI
 * Phiên bản: 1.0.0
 */

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const OpenAI = require("openai");

const {
  KEYWORD_RESPONSES,
  WELCOME_QUICK_REPLIES,
  PERSISTENT_MENU,
  GET_STARTED_PAYLOAD,
  AI_SYSTEM_PROMPT,
  BUSINESS_INFO,
  getProductListText,
  getProductGroupText,
} = require("./responses");

// ============================================
// CẤU HÌNH
// ============================================
const app = express();
const PORT = process.env.PORT || 3000;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "iron_paint_verify_2024";
const GRAPH_API_VERSION = "v21.0";
const GRAPH_API_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

// OpenAI Client (tùy chọn - nếu có API key)
let openaiClient = null;
if (process.env.OPENAI_API_KEY) {
  openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log("✅ OpenAI AI đã được kích hoạt");
} else {
  console.log("ℹ️  OpenAI AI chưa được cấu hình - chỉ dùng keyword matching");
}

// Lưu trữ lịch sử hội thoại ngắn hạn (trong bộ nhớ)
const conversationHistory = new Map();
const HISTORY_MAX_LENGTH = 10;
const HISTORY_EXPIRY_MS = 30 * 60 * 1000; // 30 phút

app.use(express.json());

// ============================================
// WEBHOOK VERIFICATION (GET)
// ============================================
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ Webhook đã được xác minh thành công!");
      res.status(200).send(challenge);
    } else {
      console.error("❌ Xác minh webhook thất bại - token không khớp");
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// ============================================
// WEBHOOK EVENTS (POST)
// ============================================
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    // Trả về 200 ngay lập tức để Facebook không gửi lại
    res.status(200).send("EVENT_RECEIVED");

    // Xử lý từng entry
    body.entry.forEach((entry) => {
      // Lấy messaging events
      const messagingEvents = entry.messaging;
      if (!messagingEvents) return;

      messagingEvents.forEach((event) => {
        const senderPsid = event.sender.id;

        console.log(`\n📩 Nhận event từ PSID: ${senderPsid}`);

        if (event.message) {
          handleMessage(senderPsid, event.message);
        } else if (event.postback) {
          handlePostback(senderPsid, event.postback);
        }
      });
    });
  } else {
    res.sendStatus(404);
  }
});

// ============================================
// XỬ LÝ TIN NHẮN
// ============================================
async function handleMessage(senderPsid, receivedMessage) {
  // Bỏ qua echo messages (tin nhắn từ chính page)
  if (receivedMessage.is_echo) return;

  let responseText = null;

  if (receivedMessage.text) {
    const messageText = receivedMessage.text.trim();
    console.log(`💬 Tin nhắn: "${messageText}"`);

    // Bước 1: Tìm keyword match
    responseText = findKeywordResponse(messageText);

    if (responseText) {
      console.log("🔑 Trả lời bằng keyword matching");
    } else if (openaiClient) {
      // Bước 2: Nếu không match keyword, dùng AI
      console.log("🤖 Chuyển sang AI để trả lời...");
      responseText = await getAIResponse(senderPsid, messageText);
    } else {
      // Bước 3: Fallback - không có AI
      responseText = getFallbackResponse();
    }
  } else if (receivedMessage.attachments) {
    // Khách gửi hình ảnh hoặc file
    responseText =
      `Cảm ơn bạn đã gửi! 😊\n\n` +
      `Để hỗ trợ bạn tốt nhất, vui lòng mô tả thêm nhu cầu của bạn nhé!\n\n` +
      `Hoặc nhắn:\n` +
      `👉 "Sản phẩm" - Xem danh mục\n` +
      `👉 "Tư vấn" - Được tư vấn\n` +
      `👉 "Liên hệ" - Thông tin liên hệ`;
  }

  if (responseText) {
    await sendTextMessage(senderPsid, responseText);
  }
}

// ============================================
// XỬ LÝ POSTBACK (từ menu, nút bấm)
// ============================================
async function handlePostback(senderPsid, receivedPostback) {
  const payload = receivedPostback.payload;
  console.log(`🔘 Postback payload: "${payload}"`);

  let responseText = "";

  switch (payload) {
    case GET_STARTED_PAYLOAD:
    case "GET_STARTED":
      responseText =
        `Xin chào! 👋 Chào mừng bạn đến với ${BUSINESS_INFO.name}! 🎨\n\n` +
        `${BUSINESS_INFO.description}\n\n` +
        `Mình có thể giúp gì cho bạn?\n` +
        `👉 "Sản phẩm" - Xem danh mục sản phẩm\n` +
        `👉 "Giá" - Hỏi về giá cả\n` +
        `👉 "Đặt hàng" - Đặt mua sản phẩm\n` +
        `👉 "Bảng màu" - Xem bảng màu\n` +
        `👉 "Bán lẻ" - Hỏi về mua lẻ\n` +
        `👉 "Liên hệ" - Thông tin liên hệ`;
      break;

    case "MENU_PRODUCTS":
    case "SAN_PHAM":
      responseText = getProductListText();
      break;

    case "MENU_PRICE":
    case "BAO_GIA":
      responseText = findKeywordResponse("giá");
      break;

    case "MENU_ORDER":
    case "DAT_HANG":
      responseText = findKeywordResponse("đặt hàng");
      break;

    case "MENU_COLOR":
    case "BANG_MAU":
      responseText = findKeywordResponse("bảng màu");
      break;

    case "MENU_CONTACT":
    case "LIEN_HE":
      responseText = findKeywordResponse("liên hệ");
      break;

    default:
      responseText =
        `Cảm ơn bạn! Mình có thể giúp gì thêm?\n\n` +
        `Nhắn "Sản phẩm" để xem danh mục hoặc "Liên hệ" để được hỗ trợ trực tiếp.`;
  }

  if (responseText) {
    await sendTextMessage(senderPsid, responseText);
  }
}

// ============================================
// TÌM KEYWORD MATCH
// ============================================
function findKeywordResponse(messageText) {
  const normalizedText = messageText
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,!?;:'"()]/g, "")
    .trim();

  // Sắp xếp theo priority (số nhỏ ưu tiên cao hơn)
  const sortedResponses = [...KEYWORD_RESPONSES].sort(
    (a, b) => (a.priority || 99) - (b.priority || 99)
  );

  for (const item of sortedResponses) {
    for (const keyword of item.keywords) {
      const normalizedKeyword = keyword
        .toLowerCase()
        .normalize("NFC")
        .replace(/[.,!?;:'"()]/g, "")
        .trim();

      if (normalizedText.includes(normalizedKeyword)) {
        const result = item.response();
        return result.text;
      }
    }
  }

  return null;
}

// ============================================
// TRẢ LỜI BẰNG AI (OpenAI GPT)
// ============================================
async function getAIResponse(senderPsid, messageText) {
  try {
    // Lấy lịch sử hội thoại
    const history = getConversationHistory(senderPsid);

    // Thêm tin nhắn mới vào lịch sử
    history.push({ role: "user", content: messageText });

    // Gọi OpenAI API
    const completion = await openaiClient.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: AI_SYSTEM_PROMPT },
        ...history,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse =
      completion.choices[0]?.message?.content ||
      getFallbackResponse();

    // Lưu response vào lịch sử
    history.push({ role: "assistant", content: aiResponse });
    saveConversationHistory(senderPsid, history);

    return aiResponse;
  } catch (error) {
    console.error("❌ Lỗi AI:", error.message);
    return getFallbackResponse();
  }
}

// ============================================
// QUẢN LÝ LỊCH SỬ HỘI THOẠI
// ============================================
function getConversationHistory(senderPsid) {
  const entry = conversationHistory.get(senderPsid);
  if (entry && Date.now() - entry.timestamp < HISTORY_EXPIRY_MS) {
    return entry.messages;
  }
  return [];
}

function saveConversationHistory(senderPsid, messages) {
  // Giới hạn số lượng tin nhắn lưu trữ
  const trimmedMessages = messages.slice(-HISTORY_MAX_LENGTH);
  conversationHistory.set(senderPsid, {
    messages: trimmedMessages,
    timestamp: Date.now(),
  });
}

// Dọn dẹp lịch sử cũ mỗi 10 phút
setInterval(() => {
  const now = Date.now();
  for (const [psid, entry] of conversationHistory) {
    if (now - entry.timestamp > HISTORY_EXPIRY_MS) {
      conversationHistory.delete(psid);
    }
  }
}, 10 * 60 * 1000);

// ============================================
// CÂU TRẢ LỜI MẶC ĐỊNH (FALLBACK)
// ============================================
function getFallbackResponse() {
  return (
    `Cảm ơn bạn đã nhắn tin cho Iron Paint! 😊\n\n` +
    `Mình chưa hiểu rõ câu hỏi của bạn. Bạn có thể thử:\n\n` +
    `👉 "Sản phẩm" - Xem danh mục sản phẩm\n` +
    `👉 "Giá" - Hỏi về giá cả\n` +
    `👉 "Đặt hàng" - Đặt mua sản phẩm\n` +
    `👉 "Bảng màu" - Xem bảng màu\n` +
    `👉 "Tư vấn" - Được tư vấn\n` +
    `👉 "Liên hệ" - Thông tin liên hệ\n\n` +
    `📞 Hoặc gọi hotline: ${BUSINESS_INFO.phone} để được hỗ trợ trực tiếp!`
  );
}

// ============================================
// GỬI TIN NHẮN QUA SEND API
// ============================================
async function sendTextMessage(recipientId, text) {
  // Facebook giới hạn 2000 ký tự mỗi tin nhắn
  // Nếu dài hơn, chia thành nhiều tin nhắn
  const MAX_LENGTH = 2000;
  const messages = [];

  if (text.length <= MAX_LENGTH) {
    messages.push(text);
  } else {
    // Chia tin nhắn theo dòng
    const lines = text.split("\n");
    let current = "";
    for (const line of lines) {
      if ((current + "\n" + line).length > MAX_LENGTH) {
        if (current) messages.push(current.trim());
        current = line;
      } else {
        current += (current ? "\n" : "") + line;
      }
    }
    if (current) messages.push(current.trim());
  }

  for (const msg of messages) {
    await sendMessage(recipientId, { text: msg });
    // Delay nhỏ giữa các tin nhắn
    if (messages.length > 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}

async function sendMessage(recipientId, message) {
  const requestBody = {
    recipient: { id: recipientId },
    message: message,
    messaging_type: "RESPONSE",
  };

  try {
    const response = await axios.post(
      `${GRAPH_API_URL}/me/messages`,
      requestBody,
      {
        params: { access_token: PAGE_ACCESS_TOKEN },
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(`✅ Tin nhắn đã gửi đến ${recipientId}`);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Lỗi gửi tin nhắn:",
      error.response?.data?.error || error.message
    );
    throw error;
  }
}

// ============================================
// GỬI TYPING INDICATOR
// ============================================
async function sendTypingIndicator(recipientId, action = "typing_on") {
  try {
    await axios.post(
      `${GRAPH_API_URL}/me/messages`,
      {
        recipient: { id: recipientId },
        sender_action: action,
      },
      {
        params: { access_token: PAGE_ACCESS_TOKEN },
      }
    );
  } catch (error) {
    // Không cần xử lý lỗi cho typing indicator
  }
}

// ============================================
// THIẾT LẬP MESSENGER PROFILE
// (Get Started button, Persistent Menu, Greeting)
// ============================================
async function setupMessengerProfile() {
  if (!PAGE_ACCESS_TOKEN || PAGE_ACCESS_TOKEN === "your_page_access_token_here") {
    console.log("⚠️  Chưa cấu hình PAGE_ACCESS_TOKEN - bỏ qua setup Messenger Profile");
    return;
  }

  try {
    const profileData = {
      get_started: {
        payload: GET_STARTED_PAYLOAD,
      },
      greeting: [
        {
          locale: "default",
          text: `Chào mừng bạn đến với ${BUSINESS_INFO.name}! 🎨\nNhấn "Bắt đầu" để được tư vấn sản phẩm sơn chất lượng cao.`,
        },
        {
          locale: "vi_VN",
          text: `Chào mừng bạn đến với ${BUSINESS_INFO.name}! 🎨\nNhấn "Bắt đầu" để được tư vấn sản phẩm sơn chất lượng cao.`,
        },
      ],
      persistent_menu: PERSISTENT_MENU,
    };

    const response = await axios.post(
      `${GRAPH_API_URL}/me/messenger_profile`,
      profileData,
      {
        params: { access_token: PAGE_ACCESS_TOKEN },
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("✅ Messenger Profile đã được thiết lập:", response.data);
  } catch (error) {
    console.error(
      "❌ Lỗi thiết lập Messenger Profile:",
      error.response?.data?.error || error.message
    );
  }
}

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Iron Paint Chatbot</title></head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px;">
        <h1>🎨 Iron Paint Chatbot</h1>
        <p>✅ Server đang hoạt động!</p>
        <p>📅 Thời gian: ${new Date().toLocaleString("vi-VN")}</p>
        <hr>
        <h3>Trạng thái:</h3>
        <ul>
          <li>Webhook: <strong>/webhook</strong></li>
          <li>AI: <strong>${openaiClient ? "Đã kích hoạt ✅" : "Chưa cấu hình ⚠️"}</strong></li>
          <li>Page Token: <strong>${PAGE_ACCESS_TOKEN && PAGE_ACCESS_TOKEN !== "your_page_access_token_here" ? "Đã cấu hình ✅" : "Chưa cấu hình ⚠️"}</strong></li>
        </ul>
      </body>
    </html>
  `);
});

// ============================================
// KHỞI ĐỘNG SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`\n============================================`);
  console.log(`🎨 IRON PAINT CHATBOT`);
  console.log(`============================================`);
  console.log(`🚀 Server đang chạy tại port ${PORT}`);
  console.log(`📡 Webhook URL: http://localhost:${PORT}/webhook`);
  console.log(`🤖 AI: ${openaiClient ? "Đã kích hoạt" : "Chưa cấu hình"}`);
  console.log(`============================================\n`);

  // Thiết lập Messenger Profile khi server khởi động
  setupMessengerProfile();
});

module.exports = app;
