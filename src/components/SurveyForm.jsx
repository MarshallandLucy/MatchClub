import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, ClipboardList, ChevronRight, ChevronLeft } from 'lucide-react';
import { matchDimensions } from '@/data/clubs';

// 引导式多步骤问卷配置 - 优化为4步，确保推荐覆盖度
const surveySteps = [
  {
    id: 1,
    dimension: matchDimensions.INTEREST,
    title: '兴趣方向',
    question: '你对哪些领域最感兴趣？（可多选）',
    type: 'multi',
    options: [
      { value: '学术', label: '📚 学术研究', desc: '探索知识，深入研究' },
      { value: '艺术', label: '🎨 艺术创作', desc: '表演、音乐、视觉艺术' },
      { value: '科技', label: '💻 科技创新', desc: '编程、机器人、黑客松' },
      { value: '运动', label: '⚽ 体育运动', desc: '竞技、健身、团队运动' },
      { value: '公益', label: '💚 社会公益', desc: '志愿服务、环保、助人' },
      { value: '商业', label: '💼 商业创业', desc: '创业、管理、资源对接' }
    ]
  },
  {
    id: 2,
    dimension: matchDimensions.GOAL,
    title: '期望收获',
    question: '你希望通过社团获得什么？（可多选）',
    type: 'multi',
    options: [
      { value: '技能', label: '📈 技能提升', desc: '学习新知识新技能' },
      { value: '社交', label: '👥 结交朋友', desc: '认识志同道合的伙伴' },
      { value: '履历', label: '📋 丰富履历', desc: '比赛获奖、项目经验' },
      { value: '兴趣', label: '❤️ 兴趣爱好', desc: '发展个人兴趣' },
      { value: '健康', label: '💪 身心健康', desc: '锻炼身体，缓解压力' },
      { value: '社会贡献', label: '🌍 社会贡献', desc: '帮助他人、服务社会' }
    ]
  },
  {
    id: 3,
    dimension: matchDimensions.TIME,
    title: '时间安排',
    question: '你每周能投入多少时间？',
    type: 'single',
    options: [
      { value: '1-2小时', label: '⏰ 1-2小时', desc: '轻松参与，不影响学业' },
      { value: '3-5小时', label: '🕐 3-5小时', desc: '适度投入，平衡发展' },
      { value: '5小时以上', label: '⏳ 5小时以上', desc: '深度参与，追求卓越' }
    ]
  },
  {
    id: 4,
    dimension: matchDimensions.ACTIVITY,
    title: '活动偏好',
    question: '你更喜欢哪种活动形式？（可多选）',
    type: 'multi',
    options: [
      { value: '室内', label: '🏠 室内活动', desc: '教室、实验室、活动室' },
      { value: '户外', label: '🌳 户外活动', desc: '运动、采风、观测' },
      { value: '线上', label: '💻 线上交流', desc: '远程协作、线上会议' },
      { value: '竞赛', label: '🏆 竞技比赛', desc: '比赛、评选、挑战' },
      { value: '表演', label: '🎭 演出展示', desc: '舞台表演、作品展示' }
    ]
  }
];

export function SurveyForm({ onComplete, initialData = {} }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(initialData);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentQuestion = surveySteps[currentStep];
  const isLastStep = currentStep === surveySteps.length - 1;

  const handleSingleSelect = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.dimension]: value
    }));
  };

  const handleMultiSelect = (value) => {
    setAnswers(prev => {
      const current = prev[currentQuestion.dimension] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return {
        ...prev,
        [currentQuestion.dimension]: updated
      };
    });
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.dimension];
    if (currentQuestion.type === 'multi') {
      return answer && answer.length > 0;
    }
    return !!answer;
  };

  const handleNext = () => {
    if (!canProceed()) return;
    
    if (isLastStep) {
      setIsCompleted(true);
      setProgress(100);
      setTimeout(() => {
        onComplete(answers);
      }, 800);
    } else {
      setCurrentStep(prev => prev + 1);
      setProgress(((currentStep + 2) / surveySteps.length) * 100);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setProgress((currentStep / surveySteps.length) * 100);
    }
  };

  const renderOptions = () => {
    const currentAnswer = answers[currentQuestion.dimension];

    if (currentQuestion.type === 'single') {
      return (
        <RadioGroup
          value={currentAnswer || ''}
          onValueChange={handleSingleSelect}
          className="grid gap-3"
        >
          {currentQuestion.options.map((option) => (
            <div key={option.value}>
              <RadioGroupItem
                value={option.value}
                id={`opt-${option.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`opt-${option.value}`}
                className="flex flex-col p-4 rounded-xl border-2 border-gray-200 cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50/30 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50"
              >
                <span className="font-semibold text-gray-900">{option.label}</span>
                <span className="text-sm text-gray-500 mt-1">{option.desc}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    }

    // 多选
    return (
      <div className="grid gap-3">
        {currentQuestion.options.map((option) => {
          const isSelected = (currentAnswer || []).includes(option.value);
          return (
            <div
              key={option.value}
              onClick={() => handleMultiSelect(option.value)}
              className={`
                flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={isSelected}
                  onChange={() => {}}
                  className="pointer-events-none"
                />
                <span className="font-semibold text-gray-900">{option.label}</span>
              </div>
              <span className="text-sm text-gray-500 mt-1 ml-8">{option.desc}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">匹配问卷</CardTitle>
              <p className="text-xs text-gray-500">步骤 {currentStep + 1} / {surveySteps.length}</p>
            </div>
          </div>
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {currentQuestion.title}
          </span>
        </div>
        
        {/* 进度条 */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
            style={{ width: `${progress || ((currentStep + 1) / surveySteps.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* 问题 */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {currentQuestion.question}
            </h3>
            <p className="text-sm text-gray-500">
              {currentQuestion.type === 'multi' ? '请选择至少一项' : '请选择一项'}
            </p>
          </div>

          {/* 选项 */}
          {renderOptions()}
          
          {/* 导航按钮 */}
          <div className="flex gap-3 pt-4">
            {currentStep > 0 && (
              <Button 
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                上一步
              </Button>
            )}
            <Button 
              onClick={handleNext}
              disabled={!canProceed() || isCompleted}
              className="flex-1 transition-all duration-300"
              variant={isCompleted ? "outline" : "default"}
            >
              {isCompleted ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  已完成
                </>
              ) : isLastStep ? (
                <>
                  完成问卷
                  <Check className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  下一步
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
