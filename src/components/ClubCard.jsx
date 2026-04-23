import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Star, Sparkles } from 'lucide-react';

export function ClubCard({ club, onClick, showRecommendation = false, matchInfo }) {
  const isRecommended = showRecommendation && matchInfo?.isRecommended;
  const matchPercentage = matchInfo?.percentage || 0;

  return (
    <Card 
      className={`
        cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden
        ${isRecommended ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-lg'}
      `}
      onClick={onClick}
    >
      {/* 推荐标识条 */}
      {isRecommended && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">为你推荐</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold">{matchPercentage}%</span>
            <span className="text-xs opacity-90">匹配度</span>
          </div>
        </div>
      )}
      
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <div className="text-4xl">{club.logo}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 truncate">{club.name}</h3>
              {isRecommended && (
                <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 font-medium">
                  推荐
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">{club.slogan}</p>
          </div>
        </div>
        
        {/* 标签展示 - 只显示主标签 */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`
            inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
            ${club.primaryTag.color}
          `}>
            <span>{club.primaryTag.icon}</span>
            {club.primaryTag.name}
          </span>
          
          {/* 匹配理由 */}
          {isRecommended && matchInfo.reasons[0] && (
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full truncate">
              {matchInfo.reasons[0].dimension}匹配
            </span>
          )}
        </div>
        
        {/* 评分和活跃度 */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-gray-700">{club.rating}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {club.members}
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              招新 {club.recruiting}
            </span>
          </div>
        </div>

        {/* 匹配度进度条（仅推荐显示） */}
        {isRecommended && (
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
