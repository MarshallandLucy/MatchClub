import { useState, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProfileForm } from '@/components/UserProfileForm';
import { SurveyForm } from '@/components/SurveyForm';
import { ClubFilter } from '@/components/ClubFilter';
import { ClubCard } from '@/components/ClubCard';
import { ClubDetailDialog } from '@/components/ClubDetailDialog';
import { SubmittedClubsDialog } from '@/components/SubmittedClubsDialog';
import { clubs } from '@/data/clubs';
import { sortClubsByRecommendation, calculateMatchScore } from '@/lib/recommendation';
import { toast } from 'sonner';
import { ChevronLeft, FileCheck, Sparkles, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index() {
  // 步骤状态: 'profile' -> 'survey' -> 'clubs'
  const [currentStep, setCurrentStep] = useLocalStorage('currentStep', 'profile');
  
  const [profile, setProfile] = useLocalStorage('userProfile', {
    name: '',
    class: '',
    phone: '',
    intro: ''
  });
  
  const [surveyAnswers, setSurveyAnswers] = useLocalStorage('surveyAnswers', {});
  const [selectedTag, setSelectedTag] = useLocalStorage('selectedTag', 'recommended');
  const [submittedClubs, setSubmittedClubs] = useLocalStorage('submittedClubs', []);
  const [selectedClub, setSelectedClub] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // 使用推荐算法排序社团
  const sortedClubs = useMemo(() => {
    return sortClubsByRecommendation(clubs, surveyAnswers);
  }, [surveyAnswers]);

  // 根据标签筛选 - 特别处理"推荐"标签
  const filteredClubs = useMemo(() => {
    if (selectedTag === 'recommended') {
      // 返回前3个推荐社团（确保至少有3个）
      return sortedClubs.filter(club => club.matchInfo?.isRecommended).slice(0, 3);
    }
    if (selectedTag === 'all') return sortedClubs;
    return sortedClubs.filter(club => club.primaryTag.id === selectedTag);
  }, [sortedClubs, selectedTag]);

  // 获取已投递社团的详细数据
  const submissions = useMemo(() => {
    const stored = JSON.parse(localStorage.getItem('intentSubmissions') || '[]');
    return stored.filter(s => s.userName === profile.name);
  }, [submittedClubs, profile.name]);

  // 获取选中社团的匹配信息
  const selectedClubMatchInfo = useMemo(() => {
    if (!selectedClub) return null;
    return calculateMatchScore(surveyAnswers, selectedClub);
  }, [selectedClub, surveyAnswers]);

  const handleProfileSave = (data) => {
    setProfile(data);
    toast.success('信息已保存');
    setTimeout(() => {
      setCurrentStep('survey');
    }, 800);
  };

  const handleSurveyComplete = (answers) => {
    setSurveyAnswers(answers);
    toast.success('问卷已完成！', {
      description: '已为您生成个性化推荐'
    });
    setTimeout(() => {
      setCurrentStep('clubs');
      // 自动选中"推荐"标签
      setSelectedTag('recommended');
    }, 800);
  };

  const handleTagSelect = (tagId) => {
    setSelectedTag(tagId);
  };

  const handleClubClick = (club) => {
    setSelectedClub(club);
    setDialogOpen(true);
  };

  // 处理已投递社团的点击
  const handleSubmittedClubClick = (submission) => {
    const club = clubs.find(c => c.id === submission.clubId);
    if (club) {
      setSelectedClub(club);
      setDialogOpen(true);
    } else {
      toast.error('未找到该社团信息');
    }
  };

  const handleSubmitIntent = () => {
    if (!profile.name?.trim() || !profile.class?.trim()) {
      toast.error('请先完善个人信息', {
        description: '请填写姓名和班级后再提交意向'
      });
      setDialogOpen(false);
      setCurrentStep('profile');
      return;
    }

    if (submittedClubs.includes(selectedClub.id)) {
      toast.info('您已经向该社团提交过意向了');
      return;
    }

    const submission = {
      clubId: selectedClub.id,
      clubName: selectedClub.name,
      userName: profile.name,
      userClass: profile.class,
      userPhone: profile.phone || '',
      surveyAnswers: surveyAnswers,
      matchScore: selectedClubMatchInfo?.percentage || 0,
      timestamp: new Date().toISOString()
    };
    
    const allSubmissions = JSON.parse(localStorage.getItem('intentSubmissions') || '[]');
    allSubmissions.push(submission);
    localStorage.setItem('intentSubmissions', JSON.stringify(allSubmissions));
    
    setSubmittedClubs(prev => [...prev, selectedClub.id]);
    toast.success('意向提交成功！', {
      description: `已将您的匹配档案发送至${selectedClub.name}`
    });
    setDialogOpen(false);
  };

  const handleBack = () => {
    if (currentStep === 'survey') {
      setCurrentStep('profile');
    } else if (currentStep === 'clubs') {
      setCurrentStep('survey');
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'profile', label: '填写信息' },
      { key: 'survey', label: '匹配问卷' },
      { key: 'clubs', label: '选择社团' }
    ];
    
    const currentIndex = steps.findIndex(s => s.key === currentStep);

    return (
      <div className="flex items-center justify-center gap-2 mb-6">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
              ${index <= currentIndex ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
            `}>
              {index < currentIndex ? '✓' : index + 1}
            </div>
            <span className={`
              ml-2 text-sm hidden sm:block
              ${index <= currentIndex ? 'text-blue-600 font-medium' : 'text-gray-400'}
            `}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div className={`
                w-8 h-0.5 mx-2
                ${index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>
    );
  };

  // 统计推荐社团数量
  const recommendedCount = useMemo(() => {
    return sortedClubs.filter(c => c.matchInfo?.isRecommended).length;
  }, [sortedClubs]);

  // 获取标签标题
  const getListTitle = () => {
    if (selectedTag === 'recommended') return '智能推荐';
    if (selectedTag === 'all') return '全部社团';
    return '筛选结果';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 pb-8">
      {/* 头部 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Marshall's MatchClub</h1>
                <p className="text-xs text-blue-600 font-medium">智能匹配 · 精准推荐</p>
              </div>
            </div>
            {currentStep === 'clubs' && (
              <SubmittedClubsDialog 
                submissions={submissions}
                onClubClick={handleSubmittedClubClick}
                trigger={
                  <Button variant="outline" size="sm" className="gap-1 text-xs">
                    <FileCheck className="w-3.5 h-3.5" />
                    已投递 ({submissions.length})
                  </Button>
                }
              />
            )}
          </div>
          
          {renderStepIndicator()}
        </div>
      </div>

      {/* 主内容 */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* 步骤1: 个人信息表单 */}
        {currentStep === 'profile' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">完善个人信息</h2>
              <p className="text-sm text-gray-500 mt-1">让我们更好地了解你，为您提供精准推荐</p>
            </div>
            <UserProfileForm 
              profile={profile} 
              onSave={handleProfileSave} 
            />
          </div>
        )}

        {/* 步骤2: 问卷 */}
        {currentStep === 'survey' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack}
                className="text-gray-500"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                返回
              </Button>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI智能匹配
              </div>
            </div>
            <SurveyForm 
              initialData={surveyAnswers}
              onComplete={handleSurveyComplete} 
            />
          </div>
        )}

        {/* 步骤3: 社团选择 */}
        {currentStep === 'clubs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack}
                className="text-gray-500"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                返回
              </Button>
              <span className="text-sm text-gray-500">
                {profile.name ? `${profile.name}，为` : '为'}您推荐
              </span>
            </div>

            {/* 智能匹配提示 */}
            {selectedTag === 'recommended' && recommendedCount > 0 && (
              <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      AI 智能匹配
                      <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                        TOP 3
                      </span>
                    </h3>
                    <p className="text-sm text-blue-100">
                      基于问卷分析，为您精选匹配度最高的3个社团
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 推荐提示（非推荐标签时显示） */}
            {selectedTag !== 'recommended' && recommendedCount > 0 && (
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">发现 {recommendedCount} 个推荐社团</h3>
                  <p className="text-sm text-blue-100">点击"推荐"标签查看智能匹配结果</p>
                </div>
              </div>
            )}

            {/* 社团筛选 */}
            <ClubFilter 
              selectedTag={selectedTag} 
              onTagSelect={handleTagSelect} 
            />

            {/* 社团列表 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  {getListTitle()}
                  {selectedTag === 'recommended' && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                      智能算法
                    </span>
                  )}
                </h2>
                <span className="text-sm text-gray-500">
                  共 {filteredClubs.length} 个社团
                </span>
              </div>
              
              {filteredClubs.length > 0 ? (
                <div className="grid gap-4">
                  {filteredClubs.map(club => (
                    <ClubCard 
                      key={club.id} 
                      club={club} 
                      onClick={() => handleClubClick(club)}
                      showRecommendation={true}
                      matchInfo={club.matchInfo}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  {selectedTag === 'recommended' ? (
                    <>
                      <p className="text-4xl mb-3">🤔</p>
                      <p className="text-gray-500 text-sm">暂无高匹配度社团</p>
                      <p className="text-gray-400 text-xs mt-1">建议重新填写问卷或查看全部社团</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => setSelectedTag('all')}
                      >
                        查看全部社团
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-400 mb-2">😕</p>
                      <p className="text-gray-500 text-sm">暂无符合条件的社团</p>
                      <p className="text-gray-400 text-xs mt-1">请尝试调整筛选条件</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 社团详情弹窗 */}
      <ClubDetailDialog
        club={selectedClub}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmitIntent={handleSubmitIntent}
        hasSubmitted={selectedClub ? submittedClubs.includes(selectedClub.id) : false}
        matchInfo={selectedClubMatchInfo}
      />
    </div>
  );
}
