import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import {
  ChevronLeft,
  Image as ImageIcon,
  Link2,
  Hash,
  Send,
  X,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface CreatePostProps {
  onBack: () => void;
  forumId: string;
  forumName: string;
  forumColor: string;
}

export default function CreatePost({ onBack, forumId, forumName, forumColor }: CreatePostProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({ title: '', content: '' });

  const handleAddTag = () => {
    if (tagInput.trim() && tags.length < 5 && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const newErrors = { title: '', content: '' };
    let isValid = true;

    if (!title.trim()) {
      newErrors.title = 'Tiêu đề không được để trống';
      isValid = false;
    } else if (title.length < 10) {
      newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
      isValid = false;
    }

    if (!content.trim()) {
      newErrors.content = 'Nội dung không được để trống';
      isValid = false;
    } else if (content.length < 50) {
      newErrors.content = 'Nội dung phải có ít nhất 50 ký tự';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after 2 seconds and go back
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 2000);
  };

  const suggestedTags = [
    'Phân tích',
    'Tư vấn',
    'Newbie',
    'Dài hạn',
    'Ngắn hạn',
    'Rủi ro cao',
    'An toàn',
    'Kinh nghiệm',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className={`bg-gradient-to-r ${forumColor} shadow-lg`}>
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-white/20 -ml-2"
              disabled={isSubmitting}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Badge className="bg-white/20 text-white border-0">
              {forumName}
            </Badge>
          </div>
          <h1 className="text-white text-xl">Tạo bài viết mới</h1>
          <p className="text-white/80 text-sm mt-1">
            Chia sẻ kiến thức và kinh nghiệm của bạn
          </p>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-500 to-green-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-white">
                  <p className="font-medium">Tạo bài thành công!</p>
                  <p className="text-sm text-white/80">Bài viết của bạn đã được đăng</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Form */}
      <div className="px-4 pb-6 mt-6 space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề bài viết *</Label>
          <Input
            id="title"
            placeholder="Nhập tiêu đề hấp dẫn (ít nhất 10 ký tự)"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({ ...errors, title: '' });
            }}
            className={`h-12 border-2 ${errors.title ? 'border-red-500' : 'focus:border-primary'}`}
            maxLength={200}
          />
          {errors.title && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.title}</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            {title.length}/200 ký tự
          </p>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content">Nội dung bài viết *</Label>
          <Textarea
            id="content"
            placeholder="Chia sẻ chi tiết suy nghĩ, phân tích hoặc kinh nghiệm của bạn (ít nhất 50 ký tự)"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setErrors({ ...errors, content: '' });
            }}
            className={`min-h-[200px] border-2 ${errors.content ? 'border-red-500' : 'focus:border-primary'}`}
            maxLength={5000}
          />
          {errors.content && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{errors.content}</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            {content.length}/5000 ký tự
          </p>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">Thẻ tag (tối đa 5)</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="tags"
                placeholder="Thêm tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
                disabled={tags.length >= 5}
              />
            </div>
            <Button
              type="button"
              onClick={handleAddTag}
              disabled={!tagInput.trim() || tags.length >= 5}
              variant="outline"
            >
              Thêm
            </Button>
          </div>

          {/* Current Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="pl-3 pr-2 py-1 text-sm"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Suggested Tags */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Gợi ý tag:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedTags
                .filter((tag) => !tags.includes(tag))
                .slice(0, 6)
                .map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (tags.length < 5) {
                        setTags([...tags, tag]);
                      }
                    }}
                    disabled={tags.length >= 5}
                    className="h-7 text-xs"
                  >
                    #{tag}
                  </Button>
                ))}
            </div>
          </div>
        </div>

        {/* Additional Tools */}
        <Card className="border-2 border-dashed">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-3">Công cụ thêm</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" disabled className="justify-start">
                <ImageIcon className="h-4 w-4 mr-2" />
                Thêm ảnh
                <Badge variant="secondary" className="ml-auto text-xs">
                  Pro
                </Badge>
              </Button>
              <Button variant="outline" size="sm" disabled className="justify-start">
                <Link2 className="h-4 w-4 mr-2" />
                Thêm link
                <Badge variant="secondary" className="ml-auto text-xs">
                  Pro
                </Badge>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Nâng cấp lên Pro để mở khóa tính năng
            </p>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              Nguyên tắc đăng bài
            </h3>
            <ul className="space-y-1 text-xs text-blue-700">
              <li>• Sử dụng ngôn từ lịch sự, tôn trọng</li>
              <li>• Không spam, quảng cáo không liên quan</li>
              <li>• Cung cấp thông tin chính xác, có nguồn</li>
              <li>• Không đưa ra lời khuyên tài chính không có căn cứ</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-primary to-[#00a896] hover:from-primary/90 hover:to-[#00a896]/90"
            disabled={isSubmitting || !title || !content}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Đang đăng...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Đăng bài
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
