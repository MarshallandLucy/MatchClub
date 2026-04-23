import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Calendar, History, Sparkles, Check, Star, TrendingUp } from 'lucide-react';

export function ClubDetailDialog({ 
  club, 
  open, 
  onOpenChange, 
  onSubmitIntent,
  hasSubmitted,
  matchInfo
}) {
  if (!club) return null;

  const isRecommended = matchInfo?.isRecommended;
  const matchPercentage = matchInfo?.percentage || 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="text-6xl mb-3">{club.logo}</div>
            <div className="flex items-center justify-center gap-2">
              <div className="text-xl font-bold">{club.name}</div>
              {isRecommended && (
                <Badge className="bg-blue-100 text-blue-700">
                  <Sparkles className="w-3 h-3 mr-1" />
                  推荐
                </Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-center text-gray-500 text-sm">{club.slogan}</p>
          
          {/* 匹配度展示 */}
          {isRecommended && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">匹配度分析</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{matchPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  style={{ width: `${matchPercentage}%` }}
                />
              </div>
              {matchInfo.reasons.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {matchInfo.reasons.map((reason, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-white text-blue-700 px-2 py-1 rounded-full"
                    >
                      {reason.dimension}: {reason.match}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* 主标签 */}
          <div className="flex justify-center">
            <span className={`
              inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium
              ${club.primaryTag.color}
            `}>
              <span className="text-lg">{club.primaryTag.icon}</span>
              {club.primaryTag.name}类社团
            </span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div>
              <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                社团简介
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">{club.description}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                <History className="w-4 h-4 text-orange-500" />
                社团历史
              </h4>
              <p className="text-sm text-gray-600">{club.history}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-green-500" />
                精彩活动
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {club.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 数据统计 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-600">{club.members}</div>
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <Users className="w-3 h-3" />
                成员
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-orange-500">{club.recruiting}</div>
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <Target className="w-3 h-3" />
                招新
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-0.5">
                <span className="text-xl font-bold text-yellow-600">{club.rating}</span>
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="text-xs text-gray-500">评分</div>
            </div>
          </div>
          
          <Button
            onClick={onSubmitIntent}
            disabled={hasSubmitted}
            className="w-full transition-all duration-300"
            variant={hasSubmitted ? "outline" : "default"}
          >
            {hasSubmitted ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                已提交
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                {isRecommended ? '一键投递推荐社团' : '一键发送意向'}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
