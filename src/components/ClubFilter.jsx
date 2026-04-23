import { clubCategories } from '@/data/clubs';
import { Sparkles } from 'lucide-react';

export function ClubFilter({ selectedTag, onTagSelect }) {
  // 插入"推荐"标签到最前面
  const categoriesWithRecommend = [
    { id: 'recommended', name: '推荐', color: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white', icon: '✨', isSpecial: true },
    ...clubCategories
  ];

  return (
    <div className="w-full">
      <p className="text-sm text-gray-600 mb-3 font-medium">选择感兴趣的社团类型</p>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {categoriesWithRecommend.map((category) => {
          const isSelected = selectedTag === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onTagSelect(category.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                transition-all duration-200 snap-start
                hover:scale-105 active:scale-95 flex items-center gap-1.5
                ${isSelected 
                  ? category.isSpecial 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg ring-2 ring-blue-300' 
                    : 'bg-blue-600 text-white shadow-md'
                  : category.isSpecial
                    ? 'bg-blue-50 text-blue-600 border-2 border-blue-200 hover:bg-blue-100'
                    : `${category.color} hover:bg-opacity-80`
                }
              `}
            >
              {category.isSpecial && <Sparkles className="w-4 h-4" />}
              {category.id !== 'all' && category.id !== 'recommended' && (
                <span className="text-base">
                  {category.id === 'academic' && '📚'}
                  {category.id === 'art' && '🎨'}
                  {category.id === 'sports' && '⚽'}
                  {category.id === 'public' && '💚'}
                  {category.id === 'tech' && '💻'}
                  {category.id === 'social' && '🤝'}
                </span>
              )}
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
