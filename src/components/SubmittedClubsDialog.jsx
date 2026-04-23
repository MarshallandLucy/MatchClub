import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileCheck, Clock, Calendar, ChevronRight, ExternalLink } from 'lucide-react';

export function SubmittedClubsDialog({ submissions, trigger, onClubClick }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleClubClick = (submission) => {
    if (onClubClick) {
      onClubClick(submission);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <FileCheck className="w-4 h-4" />
            查看已投递
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-600" />
            已投递的社团
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] mt-4">
          {submissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>暂无投递记录</p>
              <p className="text-sm text-gray-400 mt-1">快去社团列表选择感兴趣的社团吧</p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((submission, index) => (
                <div 
                  key={index}
                  onClick={() => handleClubClick(submission)}
                  className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl p-4 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                        {submission.clubName}
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                          已提交
                        </span>
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                        <Calendar className="w-3 h-3" />
                        {formatDate(submission.timestamp)}
                      </div>
                      {submission.matchScore > 0 && (
                        <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                          <span className="font-medium">匹配度: {submission.matchScore}%</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs">查看</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:hidden" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <div className="mt-4 pt-4 border-t text-center text-xs text-gray-500">
          共投递 {submissions.length} 个社团 · 点击可查看详情
        </div>
      </DialogContent>
    </Dialog>
  );
}
