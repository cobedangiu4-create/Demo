import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';
import { MessageCircle, Send, User, Bot, Lightbulb, FileText } from 'lucide-react';
import { Goal } from '../types';

interface ConsultingSupportProps {
  goal: Goal;
  monthlyIncome: number;
  onComplete: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export default function ConsultingSupport({ goal, monthlyIncome, onComplete }: ConsultingSupportProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Xin chào! Tôi là trợ lý tài chính ảo. Tôi thấy bạn đang lên kế hoạch cho mục tiêu "${goal.category}" với số tiền ${(goal.targetCost / 1000000).toFixed(0)} triệu VND. Tôi có thể giúp gì cho bạn?`,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [notes, setNotes] = useState('');

  const quickQuestions = [
    'Làm thế nào để tăng tiết kiệm?',
    'Tôi nên đầu tư vào đâu?',
    'Làm sao giảm chi tiêu?',
    'Có nên vay để đầu tư không?',
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('tăng tiết kiệm') || lowerMessage.includes('tiết kiệm nhiều hơn')) {
      return `Với thu nhập ${(monthlyIncome / 1000000).toFixed(0)} triệu/tháng, bạn nên áp dụng quy tắc 50/30/20: dành 20% (${(monthlyIncome * 0.2 / 1000000).toFixed(1)} triệu) cho tiết kiệm. Một số mẹo: 1) Tự động chuyển tiền tiết kiệm vào đầu tháng, 2) Giảm chi tiêu không cần thiết, 3) Tìm nguồn thu nhập phụ.`;
    }

    if (lowerMessage.includes('đầu tư') || lowerMessage.includes('investment')) {
      return `Dựa trên lãi suất kỳ vọng ${goal.interestRate}% của bạn, tôi khuyên nên đa dạng hóa: 60% quỹ ETF, 30% trái phiếu, 10% tiết kiệm ngân hàng. Đây là danh mục cân bằng rủi ro và lợi nhuận cho người mới.`;
    }

    if (lowerMessage.includes('giảm chi tiêu') || lowerMessage.includes('chi phí')) {
      return `Để giảm chi tiêu: 1) Theo dõi chi tiêu hàng ngày, 2) Giảm ăn ngoài (tiết kiệm ~500k-1tr/tháng), 3) Hủy các dịch vụ không dùng, 4) Mua sắm theo kế hoạch, tránh mua sắm cảm xúc. Mỗi khoản tiết kiệm nhỏ đều góp phần đạt mục tiêu!`;
    }

    if (lowerMessage.includes('vay') || lowerMessage.includes('loan')) {
      return `Tôi KHÔNG khuyên vay để đầu tư, đặc biệt nếu bạn chưa có kinh nghiệm. Rủi ro rất cao vì lãi suất vay (12-18%/năm) thường cao hơn lợi nhuận đầu tư. Chỉ vay khi thực sự cần thiết và đã có kế hoạch trả nợ rõ ràng.`;
    }

    if (lowerMessage.includes('khẩn cấp') || lowerMessage.includes('emergency')) {
      const emergencyFund = monthlyIncome * 0.5 * 6;
      return `Trước khi đầu tư dài hạn, bạn nên có quỹ khẩn cấp ${(emergencyFund / 1000000).toFixed(0)} triệu VND (6 tháng chi phí thiết yếu). Quỹ này giúp bạn không phải bán tài sản đầu tư khi có sự cố.`;
    }

    return `Cảm ơn câu hỏi của bạn! Dựa trên dữ liệu bạn đã nhập, tôi thấy mục tiêu của bạn khá thực tế. Hãy kiên trì tiết kiệm ${(goal.monthlySavings! / 1000000).toFixed(1)} triệu/tháng. Nếu cần tư vấn chuyên sâu hơn, hãy liên hệ chuyên gia tài chính. Bạn còn thắc mắc gì khác không?`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: getBotResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputMessage('');
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="p-4 pb-6 space-y-4">
      <div className="space-y-1">
        <h2>Tư vấn và hỗ trợ</h2>
        <p className="text-sm text-muted-foreground">
          Trò chuyện với trợ lý tài chính
        </p>
      </div>

      {/* Chatbot */}
      <Card className="flex flex-col" style={{ height: 'calc(100vh - 280px)' }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4" />
                Trợ lý tài chính
              </CardTitle>
              <CardDescription className="text-xs">
                Đặt câu hỏi về kế hoạch của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'bot' && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <Bot className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] rounded-lg p-2 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-xs leading-relaxed">{message.text}</p>
                        <p className="text-[10px] opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('vi-VN', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <User className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Quick questions */}
              <div className="p-3 border-t">
                <p className="text-xs text-muted-foreground mb-2">Gợi ý:</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {quickQuestions.slice(0, 2).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-[10px] h-auto py-1 px-2"
                    >
                      {question}
                    </Button>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Nhập câu hỏi..."
                    className="text-xs"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="h-9 w-9 flex-shrink-0">
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

      {/* Summary */}
      <Card className="bg-muted/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Tóm tắt kế hoạch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mục tiêu:</span>
            <span>{goal.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Chi phí:</span>
            <span>{(goal.targetCost / 1000000).toFixed(0)}M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tiết kiệm/tháng:</span>
            <span>{(goal.monthlySavings! / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Thời gian:</span>
            <span>{goal.timeYears} năm</span>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Alert className="py-2">
        <Lightbulb className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Tư vấn chỉ mang tính tham khảo. Hãy tham khảo chuyên gia nếu cần.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => window.location.reload()} size="sm" className="flex-1">
          Tạo mới
        </Button>
        <Button onClick={onComplete} size="sm" className="flex-1">
          Hoàn thành
        </Button>
      </div>
    </div>
  );
}
