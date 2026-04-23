import { matchDimensions } from '@/data/clubs';

/**
 * 计算社团推荐匹配度
 * @param {Object} surveyAnswers - 用户问卷答案
 * @param {Object} club - 社团数据
 * @returns {Object} 包含匹配分数和推荐理由的对象
 */
export function calculateMatchScore(surveyAnswers, club) {
  if (!surveyAnswers || Object.keys(surveyAnswers).length === 0) {
    return { score: 0, reasons: [], percentage: 0, isRecommended: false };
  }

  let totalScore = 0;
  let maxScore = 0;
  const reasons = [];

  // 遍历每个匹配维度
  Object.keys(matchDimensions).forEach(dimensionKey => {
    const dimension = matchDimensions[dimensionKey];
    const userValue = surveyAnswers[dimension];
    const clubValues = club.matchScores[dimension];

    if (!userValue || !clubValues) return;

    maxScore += 20; // 每个维度最高20分

    // 检查用户选择是否匹配社团维度
    if (Array.isArray(userValue)) {
      // 多选情况 - 计算匹配比例
      const matches = userValue.filter(v => clubValues.includes(v));
      const matchScore = (matches.length / Math.max(userValue.length, 1)) * 20;
      totalScore += Math.min(matchScore, 20);
      
      if (matches.length > 0) {
        reasons.push({
          dimension: getDimensionLabel(dimension),
          match: matches[0],
          weight: Math.round(matchScore)
        });
      }
    } else {
      // 单选情况
      if (clubValues.includes(userValue)) {
        totalScore += 20;
        reasons.push({
          dimension: getDimensionLabel(dimension),
          match: userValue,
          weight: 20
        });
      } else {
        // 部分匹配给予基础分
        totalScore += 3;
      }
    }
  });

  // 活跃度加成 (0-5分)
  const activityBonus = (club.activity || 0) * 5;
  totalScore += activityBonus;

  // 评分加成 (0-5分)
  const ratingBonus = ((club.rating || 4) / 5) * 5;
  totalScore += ratingBonus;

  maxScore += 10; // 活跃度+评分最高10分

  const percentage = Math.round((totalScore / maxScore) * 100);

  return {
    score: totalScore,
    maxScore,
    percentage: Math.min(percentage, 100),
    reasons: reasons.slice(0, 3), // 取前3个理由
    isRecommended: false // 默认不推荐，由排序函数决定
  };
}

/**
 * 对社团列表进行推荐排序，确保至少3个推荐
 * @param {Array} clubs - 社团列表
 * @param {Object} surveyAnswers - 用户问卷答案
 * @returns {Array} 排序后的社团列表（带匹配度信息）
 */
export function sortClubsByRecommendation(clubs, surveyAnswers) {
  if (!surveyAnswers || Object.keys(surveyAnswers).length === 0) {
    // 无问卷数据时按活跃度和评分排序
    return clubs.map(club => ({
      ...club,
      matchInfo: { score: 0, percentage: 0, reasons: [], isRecommended: false }
    })).sort((a, b) => b.activity - a.activity);
  }

  // 计算所有社团的匹配分数
  const scoredClubs = clubs.map(club => {
    const matchInfo = calculateMatchScore(surveyAnswers, club);
    return {
      ...club,
      matchInfo
    };
  });

  // 按匹配度降序排序
  scoredClubs.sort((a, b) => b.matchInfo.percentage - a.matchInfo.percentage);

  // 确保至少有3个推荐社团
  // 策略：前3名都标记为推荐（无论匹配度多少），或者匹配度≥50%的标记为推荐
  scoredClubs.forEach((club, index) => {
    // 前3名自动推荐，或者匹配度≥50%
    club.matchInfo.isRecommended = index < 3 || club.matchInfo.percentage >= 50;
  });

  // 再次排序：推荐的在前，然后按匹配度排序
  return scoredClubs.sort((a, b) => {
    // 首先按是否推荐排序
    if (a.matchInfo.isRecommended !== b.matchInfo.isRecommended) {
      return a.matchInfo.isRecommended ? -1 : 1;
    }
    // 然后按匹配分数排序
    return b.matchInfo.percentage - a.matchInfo.percentage;
  });
}

/**
 * 获取匹配维度中文标签
 */
function getDimensionLabel(dimension) {
  const labels = {
    [matchDimensions.INTEREST]: '兴趣',
    [matchDimensions.TIME]: '时间',
    [matchDimensions.SKILL]: '技能',
    [matchDimensions.ACTIVITY]: '活动',
    [matchDimensions.GOAL]: '目标'
  };
  return labels[dimension] || dimension;
}

/**
 * 生成推荐理由文本
 */
export function generateRecommendationReason(matchInfo) {
  if (!matchInfo.isRecommended) return null;
  
  const topReason = matchInfo.reasons[0];
  if (!topReason) return '综合匹配度较高';
  
  return `在${topReason.dimension}方面匹配：${topReason.match}`;
}

/**
 * 获取星级评分显示
 */
export function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: emptyStars
  };
}
