import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
import {
  ChevronLeft,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  MoreVertical,
  Send,
  Eye,
  Clock,
  Users,
  Award,
  Heart,
  Reply,
  Flag,
} from 'lucide-react';

interface ThreadDetailProps {
  onBack: () => void;
  threadId: string;
  forumName: string;
  forumColor: string;
}

interface Comment {
  id: string;
  author: string;
  authorLevel: string;
  content: string;
  likes: number;
  time: string;
  isLiked: boolean;
  replies?: Comment[];
}

export default function ThreadDetail({
  onBack,
  threadId,
  forumName,
  forumColor,
}: ThreadDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'FinanceGuru',
      authorLevel: 'Expert',
      content:
        'Phân tích rất chi tiết và có căn cứ. Tôi đồng ý với quan điểm này, đặc biệt là phần về rủi ro trong ngắn hạn. Mọi người nên cân nhắc kỹ trước khi đầu tư.',
      likes: 45,
      time: '1 giờ trước',
      isLiked: false,
      replies: [
        {
          id: '1-1',
          author: 'InvestorPro',
          authorLevel: 'Pro',
          content: 'Cảm ơn bạn đã chia sẻ! Bạn có thể nói rõ hơn về phần rủi ro không?',
          likes: 12,
          time: '45 phút trước',
          isLiked: false,
        },
        {
          id: '1-2',
          author: 'FinanceGuru',
          authorLevel: 'Expert',
          content:
            'Chắc chắn rồi! Rủi ro chính là biến động giá trong 3-6 tháng tới do yếu tố vĩ mô...',
          likes: 23,
          time: '30 phút trước',
          isLiked: false,
        },
      ],
    },
    {
      id: '2',
      author: 'MarketWatch',
      authorLevel: 'Advanced',
      content:
        'Số liệu bạn đưa ra có vẻ hợp lý. Tuy nhiên, tôi nghĩ nên xem xét thêm yếu tố lãi suất FED trong phân tích này.',
      likes: 32,
      time: '2 giờ trước',
      isLiked: false,
    },
    {
      id: '3',
      author: 'NewbieInvestor',
      authorLevel: 'Member',
      content:
        'Mình mới tìm hiểu về đầu tư, có thể giải thích đơn giản hơn không ạ? Cảm ơn!',
      likes: 18,
      time: '3 giờ trước',
      isLiked: false,
      replies: [
        {
          id: '3-1',
          author: 'MarketTeacher',
          authorLevel: 'Pro',
          content:
            'Để mình giải thích dễ hiểu nhé: Hiện tại giá đang tăng nhưng có thể sẽ giảm trong ngắn hạn...',
          likes: 28,
          time: '2 giờ trước',
          isLiked: false,
        },
      ],
    },
    {
      id: '4',
      author: 'TechAnalyst',
      authorLevel: 'Expert',
      content:
        'Từ góc độ phân tích kỹ thuật, chỉ báo RSI đang ở vùng quá mua. Cần thận trọng nếu entry ở vị trí này.',
      likes: 56,
      time: '5 giờ trước',
      isLiked: false,
    },
  ]);

  // Mock thread data
  const thread = {
    id: threadId,
    title: 'VNIndex phá đỉnh 1,300 điểm - Cơ hội hay rủi ro?',
    author: 'TraderPro',
    authorLevel: 'Expert',
    content: `Xin chào cộng đồng,

Như các bạn đã biết, VNIndex vừa chạm mốc 1,300 điểm trong phiên giao dịch hôm nay - một cột mốc quan trọng mà thị trường đã chờ đợi từ lâu. Tôi muốn chia sẻ một số phân tích và nhận định cá nhân về tình hình này.

**Các yếu tố tích cực:**
• Thanh khoản thị trường tăng mạnh, đạt trung bình 20,000 tỷ/phiên
• Dòng tiền ngoại đổ vào mạnh trong 3 tháng qua
• Nhiều cổ phiếu blue-chips đang có P/E hấp dẫn
• Kinh tế vĩ mô Việt Nam phục hồi tích cực

**Những rủi ro cần lưu ý:**
• Thị trường có dấu hiệu FOMO, nhiều mã tăng nóng
• Áp lực chốt lời tại vùng kháng cự quan trọng
• Yếu tố địa chính trị toàn cầu vẫn bất ổn
• Lãi suất FED có thể tăng trong quý tới

**Chiến lược của tôi:**
1. Chốt lời 30% danh mục tại vùng đỉnh
2. Giữ 50% danh mục với các cổ phiếu nền tảng
3. Dự trữ 20% cash để DCA nếu thị trường điều chỉnh

Các bạn nghĩ sao về tình hình hiện tại? Cơ hội hay rủi ro đang chiếm ưu thế?

#VNIndex #ThịTrường #ChiếnLược`,
    likes: 234,
    views: 18900,
    replies: comments.length + comments.reduce((acc, c) => acc + (c.replies?.length || 0), 0),
    time: '1 giờ trước',
    tags: ['VNIndex', 'Phân tích', 'Chiến lược'],
    isPinned: true,
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentLike = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? {
                    ...reply,
                    isLiked: !reply.isLiked,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  }
                : reply
            ),
          };
        }
        return comment;
      })
    );
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'Bạn',
      authorLevel: 'Member',
      content: commentText,
      likes: 0,
      time: 'Vừa xong',
      isLiked: false,
    };

    if (replyTo) {
      setComments(
        comments.map((comment) => {
          if (comment.id === replyTo) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newComment],
            };
          }
          return comment;
        })
      );
      setReplyTo(null);
    } else {
      setComments([newComment, ...comments]);
    }

    setCommentText('');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Pro':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Advanced':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Expert':
        return <Award className="h-3 w-3" />;
      case 'Pro':
        return <Award className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* Header */}
      <div className={`bg-gradient-to-r ${forumColor} shadow-lg sticky top-0 z-10`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Badge className="bg-white/20 text-white border-0">{forumName}</Badge>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 -mr-2"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Thread Content */}
      <div className="px-4 pb-6">
        <Card className="border-0 shadow-xl mt-4">
          <CardContent className="p-4">
            {/* Author Info */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-[#00a896] rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{thread.author}</p>
                    <Badge
                      className={`text-xs border ${getLevelColor(thread.authorLevel)}`}
                    >
                      {getLevelIcon(thread.authorLevel)}
                      <span className="ml-1">{thread.authorLevel}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {thread.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {thread.views.toLocaleString()} lượt xem
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl mb-3">{thread.title}</h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {thread.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-primary/30 text-primary"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Content */}
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                {thread.content}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t">
              <Button
                variant={isLiked ? 'default' : 'outline'}
                size="sm"
                onClick={handleLike}
                className={isLiked ? 'bg-red-500 hover:bg-red-600' : ''}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-white' : ''}`} />
                {thread.likes + (isLiked ? 1 : 0)}
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {thread.replies}
              </Button>
              <Button
                variant={isBookmarked ? 'default' : 'outline'}
                size="sm"
                onClick={handleBookmark}
                className={isBookmarked ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
              >
                <Bookmark
                  className={`h-4 w-4 ${isBookmarked ? 'fill-white' : ''}`}
                />
              </Button>
              <Button variant="outline" size="sm" className="ml-auto">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comment Input */}
        <Card className="border-0 shadow-lg mt-4">
          <CardContent className="p-4">
            {replyTo && (
              <div className="mb-3 p-2 bg-blue-50 rounded-lg flex items-center justify-between">
                <span className="text-sm text-blue-700 flex items-center gap-1">
                  <Reply className="h-3 w-3" />
                  Đang trả lời bình luận
                </span>
                <button
                  onClick={() => setReplyTo(null)}
                  className="text-blue-700 hover:text-blue-900"
                >
                  <span className="text-xs">Hủy</span>
                </button>
              </div>
            )}
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <Textarea
                  placeholder="Viết bình luận của bạn..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[80px] border-2 focus:border-primary"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    {commentText.length}/1000 ký tự
                  </p>
                  <Button
                    size="sm"
                    onClick={handlePostComment}
                    disabled={!commentText.trim()}
                    className="bg-gradient-to-r from-primary to-[#00a896]"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Gửi
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base">
              Bình luận ({thread.replies})
            </h2>
            <Button variant="outline" size="sm">
              Mới nhất
            </Button>
          </div>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id}>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium">{comment.author}</p>
                          <Badge
                            className={`text-xs border ${getLevelColor(
                              comment.authorLevel
                            )}`}
                          >
                            {getLevelIcon(comment.authorLevel)}
                            <span className="ml-1">{comment.authorLevel}</span>
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            • {comment.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                          {comment.content}
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className={`flex items-center gap-1 text-xs ${
                              comment.isLiked
                                ? 'text-red-500'
                                : 'text-muted-foreground hover:text-primary'
                            }`}
                          >
                            <ThumbsUp
                              className={`h-3 w-3 ${
                                comment.isLiked ? 'fill-red-500' : ''
                              }`}
                            />
                            {comment.likes}
                          </button>
                          <button
                            onClick={() => setReplyTo(comment.id)}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                          >
                            <Reply className="h-3 w-3" />
                            Trả lời
                          </button>
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 ml-auto">
                            <Flag className="h-3 w-3" />
                            Báo cáo
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-12 mt-3 space-y-3">
                    {comment.replies.map((reply) => (
                      <Card key={reply.id} className="border-0 shadow-sm bg-gray-50">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Users className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-medium">{reply.author}</p>
                                <Badge
                                  className={`text-xs border ${getLevelColor(
                                    reply.authorLevel
                                  )}`}
                                >
                                  {reply.authorLevel}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  • {reply.time}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                                {reply.content}
                              </p>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleCommentLike(reply.id)}
                                  className={`flex items-center gap-1 text-xs ${
                                    reply.isLiked
                                      ? 'text-red-500'
                                      : 'text-muted-foreground hover:text-primary'
                                  }`}
                                >
                                  <ThumbsUp
                                    className={`h-3 w-3 ${
                                      reply.isLiked ? 'fill-red-500' : ''
                                    }`}
                                  />
                                  {reply.likes}
                                </button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
