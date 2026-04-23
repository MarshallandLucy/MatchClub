import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Check, Phone } from 'lucide-react';

export function UserProfileForm({ profile, onSave }) {
  const [formData, setFormData] = useState(profile);
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    if (!phone) return true; // 联系方式可选
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = '请输入姓名';
    if (!formData.class?.trim()) newErrors.class = '请输入班级';
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = '请输入正确的手机号格式';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="w-5 h-5" />
          个人信息
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">姓名 *</Label>
            <Input
              id="name"
              placeholder="请输入姓名"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="class">班级 *</Label>
            <Input
              id="class"
              placeholder="请输入班级（如：计算机2301班）"
              value={formData.class || ''}
              onChange={(e) => handleChange('class', e.target.value)}
              className={errors.class ? 'border-red-500' : ''}
            />
            {errors.class && <p className="text-xs text-red-500">{errors.class}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              联系方式
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="请输入手机号（选填）"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={errors.phone ? 'border-red-500' : ''}
              maxLength={11}
            />
            {errors.phone ? (
              <p className="text-xs text-red-500">{errors.phone}</p>
            ) : (
              <p className="text-xs text-gray-400">用于社团联系您，不会公开显示</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="intro">一句话介绍自己</Label>
            <Textarea
              id="intro"
              placeholder="简单介绍一下自己（50字以内）"
              maxLength={50}
              value={formData.intro || ''}
              onChange={(e) => handleChange('intro', e.target.value)}
              className="resize-none"
              rows={2}
            />
            <p className="text-xs text-gray-400 text-right">{formData.intro?.length || 0}/50</p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full transition-all duration-300"
            variant={isSaved ? "outline" : "default"}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                已保存
              </>
            ) : (
              '保存并继续'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
