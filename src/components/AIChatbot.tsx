import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  ChevronLeft,
  Send,
  Bot,
  User,
  Sparkles,
  TrendingUp,
  Calculator,
  Lightbulb,
  Target,
  PieChart,
  BookOpen,
  Zap,
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatbotProps {
  onBackHome: () => void;
}

export default function AIChatbot({ onBackHome }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Xin chào! Tôi là AI Trợ lý Tài chính của bạn. 👋 Tôi có thể giúp bạn:\n\n• Phân tích tình hình tài chính\n• Tư vấn đầu tư và tiết kiệm\n• Lập kế hoạch mục tiêu SMART\n• Giải đáp thắc mắc tài chính\n\nBạn muốn tìm hiểu về điều gì?',
      timestamp: new Date(),
      suggestions: [
        'Làm sao để tiết kiệm hiệu quả?',
        'Tôi nên đầu tư vào đâu?',
        'Phân tích ngân sách của tôi',
        'Mục tiêu SMART là gì?',
      ],
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickActions = [
    {
      icon: Calculator,
      label: 'Phân tích chi tiêu',
      query: 'Phân tích chi tiêu của tôi và đưa ra lời khuyên',
    },
    {
      icon: TrendingUp,
      label: 'Tư vấn đầu tư',
      query: 'Tôi muốn tư vấn về đầu tư phù hợp',
    },
    {
      icon: Target,
      label: 'Lập mục tiêu',
      query: 'Giúp tôi lập kế hoạch tài chính với mục tiêu SMART',
    },
    {
      icon: PieChart,
      label: 'Quy tắc 50/30/20',
      query: 'Giải thích quy tắc 50/30/20 và cách áp dụng',
    },
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes('tiết kiệm') ||
      lowerMessage.includes('save') ||
      lowerMessage.includes('tích lũy')
    ) {
      return '💰 **Chiến lược tiết kiệm hiệu quả:**\n\n1. **Tự động hóa tiết kiệm**: Chuyển 20-30% thu nhập vào tài khoản tiết kiệm ngay khi nhận lương\n\n2. **Quy tắc 50/30/20**:\n   • 50% cho nhu cầu thiết yếu\n   • 30% cho mong muốn cá nhân\n   • 20% cho tiết kiệm & đầu tư\n\n3. **Cắt giảm chi tiêu không cần thiết**:\n   • Giảm ăn uống ngoài: tiết kiệm ~2-3 triệu/tháng\n   • Hủy dịch vụ không dùng\n   • Mua sắm có kế hoạch\n\n4. **Tăng thu nhập phụ**: Freelance, bán hàng online, đầu tư\n\nBạn muốn tôi tính toán cụ thể cho thu nhập của bạn không?';
    }

    if (
      lowerMessage.includes('đầu tư') ||
      lowerMessage.includes('invest') ||
      lowerMessage.includes('chứng khoán') ||
      lowerMessage.includes('cổ phiếu')
    ) {
      return '📈 **Tư vấn đầu tư cho người mới:**\n\n**1. Đa dạng hóa danh mục:**\n   • 40% Quỹ ETF (VN30, VNDiamond)\n   • 30% Trái phiếu chính phủ\n   • 20% Tiết kiệm ngân hàng\n   • 10% Vàng/USD (phòng ngừa rủi ro)\n\n**2. Nguyên tắc vàng:**\n   ✅ Chỉ đầu tư tiền nhàn rỗi\n   ✅ Đầu tư dài hạn (5-10 năm)\n   ✅ Học trước khi đầu tư\n   ✅ Không vay để đầu tư\n\n**3. Lãi suất kỳ vọng:**\n   • ETF: 10-15%/năm\n   • Trái phiếu: 6-8%/năm\n   • Tiết kiệm: 5-6%/năm\n\nBạn có bao nhiêu vốn để bắt đầu đầu tư?';
    }

    if (
      lowerMessage.includes('phân tích') ||
      lowerMessage.includes('chi tiêu') ||
      lowerMessage.includes('ngân sách')
    ) {
      return '📊 **Phân tích ngân sách cá nhân:**\n\nĐể tôi giúp bạn phân tích chính xác, vui lòng cung cấp:\n\n1. **Thu nhập hàng tháng**: _____ VND\n2. **Chi tiêu cố định**:\n   • Tiền nhà/trọ: _____\n   • Ăn uống: _____\n   • Di chuyển: _____\n   • Hóa đơn (điện, nước, internet): _____\n3. **Chi tiêu linh hoạt**: _____\n4. **Nợ hiện tại** (nếu có): _____\n\n💡 Sau khi có thông tin, tôi sẽ:\n   ✅ Phân tích cơ cấu chi tiêu\n   ✅ Tìm khoản tiết kiệm tiềm năng\n   ✅ Đề xuất kế hoạch tối ưu\n   ✅ So sánh với chuẩn 50/30/20';
    }

    if (
      lowerMessage.includes('smart') ||
      lowerMessage.includes('mục tiêu') ||
      lowerMessage.includes('kế hoạch')
    ) {
      return '🎯 **Mục tiêu SMART trong tài chính:**\n\n**S - Specific (Cụ thể)**\n   ❌ "Tôi muốn giàu"\n   ✅ "Tôi muốn có 500 triệu để mua nhà"\n\n**M - Measurable (Đo lường được)**\n   ✅ Tiết kiệm 10 triệu/tháng\n   ✅ Tăng thu nhập 20%\n\n**A - Achievable (Khả thi)**\n   ✅ Phù hợp với thu nhập hiện tại\n   ✅ Có thể điều chỉnh linh hoạt\n\n**R - Relevant (Thực tế)**\n   ✅ Phù hợp với hoàn cảnh\n   ✅ Ưu tiên hợp lý\n\n**T - Time-bound (Có thời hạn)**\n   ✅ Đạt 500 triệu trong 5 năm\n   ✅ Trả hết nợ trong 2 năm\n\n**Ví dụ mục tiêu SMART:**\n"Tiết kiệm 500 triệu VND trong 5 năm để trả trước 30% căn hộ bằng cách tiết kiệm 8 triệu/tháng và đầu tư với lãi suất 7%/năm"\n\nBạn muốn lập mục tiêu gì?';
    }

    if (
      lowerMessage.includes('50/30/20') ||
      lowerMessage.includes('503020') ||
      lowerMessage.includes('quy tắc')
    ) {
      return '📊 **Quy tắc 50/30/20:**\n\n**50% - Nhu cầu thiết yếu** 🏠\n   • Tiền nhà/trọ\n   • Ăn uống\n   • Di chuyển\n   • Hóa đơn điện nước\n   • Bảo hiểm\n\n**30% - Mong muốn cá nhân** 🎭\n   • Du lịch\n   • Giải trí\n   • Shopping\n   • Ăn nhà hàng\n   • Sở thích\n\n**20% - Tiết kiệm & Đầu tư** 💰\n   • Quỹ khẩn cấp\n   • Tiết kiệm mục tiêu\n   • Đầu tư dài hạn\n   • Trả nợ\n\n**Ví dụ với thu nhập 20 triệu:**\n   • 10 triệu: Thiết yếu\n   • 6 triệu: Mong muốn\n   • 4 triệu: Tiết kiệm\n\n✨ Đây là quy tắc cơ bản, bạn có thể điều chỉnh theo hoàn cảnh. Nếu còn sống với bố mẹ, có thể tăng tỷ lệ tiết kiệm lên 30-40%!';
    }

    if (
      lowerMessage.includes('quỹ khẩn cấp') ||
      lowerMessage.includes('emergency fund')
    ) {
      return '🆘 **Quỹ khẩn cấp - Tại sao quan trọng:**\n\n**Mục đích:**\n   • Đối phó với tình huống bất ngờ\n   • Mất việc, ốm đau, tai nạn\n   • Tránh phải vay nợ khi khủng hoảng\n\n**Số tiền cần có:**\n   • Độc thân: 3-6 tháng chi phí\n   • Có gia đình: 6-12 tháng chi phí\n   • Freelancer: 12 tháng chi phí\n\n**Cách tính:**\nChi phí thiết yếu/tháng × Số tháng\n\n**Ví dụ:**\nChi tiêu 10 triệu/tháng\n→ Quỹ khẩn cấp = 10tr × 6 = 60 triệu\n\n**Nơi cất giữ:**\n   ✅ Tiết kiệm ngân hàng không kỳ hạn\n   ✅ Tài khoản thanh toán lãi suất cao\n   ❌ Không đầu tư vào cổ phiếu, crypto\n\n💡 Ưu tiên xây dựng quỹ này TRƯỚC KHI đầu tư!';
    }

    return '🤔 Câu hỏi hay đấy! Tôi hiểu bạn muốn tìm hiểu về tài chính. Tôi có thể giúp bạn về:\n\n• **Tiết kiệm**: Chiến lược, mẹo, quy tắc\n• **Đầu tư**: Cổ phiếu, quỹ, trái phiếu, crypto\n• **Ngân sách**: Phân tích chi tiêu, tối ưu hóa\n• **Mục tiêu**: Lập kế hoạch SMART\n• **Nợ**: Quản lý và trả nợ hiệu quả\n\nBạn muốn tìm hiểu cụ thể về lĩnh vực nào nhất? 😊';
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputMessage;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: getBotResponse(messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const handleSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdfa] to-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500 shadow-lg">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackHome}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Badge className="bg-white/20 text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Assistant
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center relative">
              <Bot className="h-6 w-6 text-white" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-purple-600"></div>
            </div>
            <div>
              <h1 className="text-white text-xl">AI Trợ Lý Tài Chính</h1>
              <p className="text-white/80 text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Đang online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-3 bg-white border-b">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => handleQuickAction(action.query)}
                className="flex items-center gap-2 px-3 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors whitespace-nowrap text-sm"
              >
                <Icon className="h-4 w-4 text-purple-600" />
                <span className="text-purple-900">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 px-4 py-4 overflow-y-auto"
      >
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user'
                      ? 'bg-primary'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div
                  className={`flex-1 ${
                    message.sender === 'user' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-sm'
                        : 'bg-gray-100 text-gray-900 rounded-tl-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-2">
                    {message.timestamp.toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>

                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestion(suggestion)}
                          className="px-3 py-2 bg-white border-2 border-purple-200 hover:border-purple-400 rounded-lg text-xs text-gray-700 hover:bg-purple-50 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t">
        <div className="flex items-center gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 border-2 focus:border-purple-400"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim()}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Powered by AI • Chỉ mang tính chất tham khảo
        </p>
      </div>
    </div>
  );
}