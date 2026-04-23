export const categories = [
  { id: 'all', name: '全部' },
  { id: 'recommended', name: '推荐' },
  { id: 'academic', name: '学术' },
  { id: 'art', name: '文艺' },
  { id: 'sports', name: '体育' },
  { id: 'public', name: '公益' },
  { id: 'tech', name: '科技' },
  { id: 'social', name: '社交' },
];

export const clubs = [
  { id: 1, name: '星空观测社', logo: '🔭', tag: 'academic', tagName: '学术', slogan: '一起仰望星空，探索宇宙奥秘', members: 85, recruiting: 30, rating: 4.8, activity: 0.85, description: '定期组织观测活动和天文分享。', activities: ['月度观测', '讲座', '竞赛'], match: { interest: ['学术', '科技'], goal: ['技能', '兴趣'], time: ['3-5小时', '5小时以上'], activity: ['户外', '室内'] } },
  { id: 2, name: '极客黑客松协会', logo: '💻', tag: 'tech', tagName: '科技', slogan: '用代码改变世界', members: 120, recruiting: 45, rating: 4.9, activity: 0.92, description: '技术分享与黑客松实践。', activities: ['黑客松', '工作坊', '企业参访'], match: { interest: ['科技', '学术'], goal: ['技能', '履历'], time: ['3-5小时', '5小时以上'], activity: ['室内', '竞赛'] } },
  { id: 3, name: '街舞社', logo: '💃', tag: 'art', tagName: '文艺', slogan: '舞动青春，释放自我', members: 180, recruiting: 50, rating: 4.7, activity: 0.88, description: '街舞训练与校园演出。', activities: ['日常训练', '演出', '比赛'], match: { interest: ['艺术', '运动'], goal: ['兴趣', '社交'], time: ['1-2小时', '3-5小时'], activity: ['室内', '表演'] } },
  { id: 4, name: '摄影协会', logo: '📷', tag: 'art', tagName: '文艺', slogan: '用镜头记录美好', members: 95, recruiting: 35, rating: 4.6, activity: 0.75, description: '摄影采风与作品展。', activities: ['采风', '摄影展', '分享'], match: { interest: ['艺术', '自然'], goal: ['兴趣', '技能'], time: ['1-2小时', '3-5小时'], activity: ['户外', '室内'] } },
  { id: 5, name: '电竞俱乐部', logo: '🎮', tag: 'sports', tagName: '体育', slogan: '电竞不是游戏，是热爱', members: 200, recruiting: 60, rating: 4.5, activity: 0.9, description: '电竞训练和联赛参赛。', activities: ['训练', '联赛', '观赛'], match: { interest: ['运动', '科技'], goal: ['兴趣', '竞技'], time: ['3-5小时', '5小时以上'], activity: ['线上', '竞赛'] } },
  { id: 6, name: '志愿者协会', logo: '🤝', tag: 'public', tagName: '公益', slogan: '奉献爱心，服务社会', members: 300, recruiting: 80, rating: 4.8, activity: 0.82, description: '各类公益与志愿服务。', activities: ['社区服务', '环保活动', '支教'], match: { interest: ['公益'], goal: ['社会贡献', '成长'], time: ['1-2小时', '3-5小时'], activity: ['户外', '室内'] } },
  { id: 7, name: '辩论社', logo: '🎤', tag: 'academic', tagName: '学术', slogan: '以辩会友，以论明理', members: 65, recruiting: 25, rating: 4.7, activity: 0.78, description: '逻辑表达与赛事训练。', activities: ['训练', '模拟赛', '交流'], match: { interest: ['学术'], goal: ['技能', '履历'], time: ['3-5小时', '5小时以上'], activity: ['室内', '竞赛'] } },
  { id: 8, name: '篮球社', logo: '🏀', tag: 'sports', tagName: '体育', slogan: '热血球场，青春飞扬', members: 220, recruiting: 50, rating: 4.8, activity: 0.95, description: '固定训练与联赛参与。', activities: ['训练', '友谊赛', '新生杯'], match: { interest: ['运动'], goal: ['健康', '竞技'], time: ['3-5小时', '5小时以上'], activity: ['户外', '竞赛'] } }
];

export const survey = [
  { key: 'interest', title: '兴趣方向', multi: true, options: ['学术', '艺术', '科技', '运动', '公益', '商业'] },
  { key: 'goal', title: '期望收获', multi: true, options: ['技能', '社交', '履历', '兴趣', '健康', '社会贡献'] },
  { key: 'time', title: '每周时间', multi: false, options: ['1-2小时', '3-5小时', '5小时以上'] },
  { key: 'activity', title: '活动偏好', multi: true, options: ['室内', '户外', '线上', '竞赛', '表演'] },
];
