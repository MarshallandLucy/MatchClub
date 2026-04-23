// 社团标签系统 - 每个社团只有一个唯一主标签
export const clubTags = {
  ACADEMIC: { id: 'academic', name: '学术', color: 'bg-blue-100 text-blue-700', icon: '📚' },
  ART: { id: 'art', name: '文艺', color: 'bg-purple-100 text-purple-700', icon: '🎨' },
  SPORTS: { id: 'sports', name: '体育', color: 'bg-orange-100 text-orange-700', icon: '⚽' },
  TECH: { id: 'tech', name: '科技', color: 'bg-cyan-100 text-cyan-700', icon: '💻' },
  PUBLIC: { id: 'public', name: '公益', color: 'bg-green-100 text-green-700', icon: '💚' },
  SOCIAL: { id: 'social', name: '社交', color: 'bg-pink-100 text-pink-700', icon: '🤝' }
};

// 匹配维度定义
export const matchDimensions = {
  INTEREST: 'interest',      // 兴趣方向
  TIME: 'time',              // 时间安排
  SKILL: 'skill',            // 技能水平
  ACTIVITY: 'activity',      // 活动形式
  GOAL: 'goal'               // 期望收获
};

export const clubs = [
  {
    id: 1,
    name: "星空观测社",
    logo: "🔭",
    slogan: "一起仰望星空，探索宇宙奥秘",
    primaryTag: clubTags.ACADEMIC,
    matchScores: {
      [matchDimensions.INTEREST]: ['学术', '科技', '自然'],
      [matchDimensions.TIME]: ['3-5小时', '5小时以上'],
      [matchDimensions.SKILL]: ['入门', '进阶'],
      [matchDimensions.ACTIVITY]: ['户外', '室内'],
      [matchDimensions.GOAL]: ['技能', '兴趣', '社交']
    },
    description: "我们是一群热爱天文的爱好者，定期组织观测活动，分享天文知识讲座，一起探索浩瀚宇宙。",
    history: "成立于2015年，已有100+名成员",
    activities: ["月度星空观测", "天文知识竞赛", "天文台参观"],
    members: 85,
    recruiting: 30,
    rating: 4.8,
    activity: 0.85
  },
  {
    id: 2,
    name: "极客黑客松协会",
    logo: "💻",
    slogan: "用代码改变世界",
    primaryTag: clubTags.TECH,
    matchScores: {
      [matchDimensions.INTEREST]: ['科技', '学术', '商业'],
      [matchDimensions.TIME]: ['5小时以上', '3-5小时'],
      [matchDimensions.SKILL]: ['进阶', '高级'],
      [matchDimensions.ACTIVITY]: ['室内', '竞赛'],
      [matchDimensions.GOAL]: ['技能', '履历', '兴趣']
    },
    description: "如果你热爱编程，喜欢挑战，这里是你的天堂！定期举办黑客松活动，技术分享会。",
    history: "成立于2018年，已有150+名技术达人",
    activities: ["季度黑客松", "技术工作坊", "企业参访"],
    members: 120,
    recruiting: 45,
    rating: 4.9,
    activity: 0.92
  },
  {
    id: 3,
    name: "街舞社",
    logo: "💃",
    slogan: "舞动青春，释放自我",
    primaryTag: clubTags.ART,
    matchScores: {
      [matchDimensions.INTEREST]: ['艺术', '运动', '表演'],
      [matchDimensions.TIME]: ['3-5小时', '1-2小时'],
      [matchDimensions.SKILL]: ['入门', '进阶'],
      [matchDimensions.ACTIVITY]: ['室内', '表演'],
      [matchDimensions.GOAL]: ['兴趣', '社交', '技能']
    },
    description: "无论你是街舞小白还是舞蹈大神，都欢迎加入！一起跳舞，一起嗨！",
    history: "成立于2010年，已有200+名成员",
    activities: ["日常训练", "街舞大赛", "校园演出"],
    members: 180,
    recruiting: 50,
    rating: 4.7,
    activity: 0.88
  },
  {
    id: 4,
    name: "摄影协会",
    logo: "📷",
    slogan: "用镜头记录美好",
    primaryTag: clubTags.ART,
    matchScores: {
      [matchDimensions.INTEREST]: ['艺术', '自然', '学术'],
      [matchDimensions.TIME]: ['3-5小时', '周末'],
      [matchDimensions.SKILL]: ['入门', '进阶'],
      [matchDimensions.ACTIVITY]: ['户外', '室内'],
      [matchDimensions.GOAL]: ['兴趣', '技能', '社交']
    },
    description: "喜欢拍照？这里有志同道合的朋友！一起采风，一起分享，一起进步！",
    history: "成立于2012年，已有120+名成员",
    activities: ["户外采风", "摄影展", "技术分享"],
    members: 95,
    recruiting: 35,
    rating: 4.6,
    activity: 0.75
  },
  {
    id: 5,
    name: "电竞俱乐部",
    logo: "🎮",
    slogan: "电竞不是游戏，是热爱",
    primaryTag: clubTags.SPORTS,
    matchScores: {
      [matchDimensions.INTEREST]: ['运动', '竞技', '科技'],
      [matchDimensions.TIME]: ['5小时以上', '3-5小时'],
      [matchDimensions.SKILL]: ['入门', '进阶', '高级'],
      [matchDimensions.ACTIVITY]: ['室内', '线上', '竞赛'],
      [matchDimensions.GOAL]: ['兴趣', '竞技', '社交']
    },
    description: "LOL、王者荣耀、CSGO... 我们都有！定期训练，参加高校联赛！",
    history: "成立于2017年，已有200+名成员",
    activities: ["日常训练", "高校联赛", "观赛活动"],
    members: 200,
    recruiting: 60,
    rating: 4.5,
    activity: 0.90
  },
  {
    id: 6,
    name: "志愿者协会",
    logo: "🤝",
    slogan: "奉献爱心，服务社会",
    primaryTag: clubTags.PUBLIC,
    matchScores: {
      [matchDimensions.INTEREST]: ['公益', '社会', '助人'],
      [matchDimensions.TIME]: ['1-2小时', '3-5小时'],
      [matchDimensions.SKILL]: ['入门'],
      [matchDimensions.ACTIVITY]: ['户外', '室内'],
      [matchDimensions.GOAL]: ['社会贡献', '成长', '社交']
    },
    description: "参与各类志愿服务活动，传递温暖与关爱，让大学生活更有意义。",
    history: "成立于2013年，已有300+名志愿者",
    activities: ["社区服务", "环保活动", "支教项目"],
    members: 300,
    recruiting: 80,
    rating: 4.8,
    activity: 0.82
  },
  {
    id: 7,
    name: "辩论社",
    logo: "🎤",
    slogan: "以辩会友，以论明理",
    primaryTag: clubTags.ACADEMIC,
    matchScores: {
      [matchDimensions.INTEREST]: ['学术', '思辨', '表达'],
      [matchDimensions.TIME]: ['3-5小时', '5小时以上'],
      [matchDimensions.SKILL]: ['进阶', '高级'],
      [matchDimensions.ACTIVITY]: ['室内', '竞赛'],
      [matchDimensions.GOAL]: ['技能', '履历', '社交']
    },
    description: "锻炼逻辑思维与口才，参与校内外辩论赛事，提升表达能力与批判性思维。",
    history: "成立于2014年，多次获得省级辩论赛奖项",
    activities: ["辩论训练", "模拟辩论赛", "校际交流"],
    members: 65,
    recruiting: 25,
    rating: 4.7,
    activity: 0.78
  },
  {
    id: 8,
    name: "音乐爱好者协会",
    logo: "🎵",
    slogan: "音乐无界，热爱有声",
    primaryTag: clubTags.ART,
    matchScores: {
      [matchDimensions.INTEREST]: ['艺术', '表演', '音乐'],
      [matchDimensions.TIME]: ['3-5小时', '1-2小时'],
      [matchDimensions.SKILL]: ['入门', '进阶'],
      [matchDimensions.ACTIVITY]: ['室内', '表演'],
      [matchDimensions.GOAL]: ['兴趣', '社交', '技能']
    },
    description: "汇集校园音乐人才，定期举办音乐会、音乐节，提供演出平台与音乐交流机会。",
    history: "成立于2011年，培养众多校园歌手",
    activities: ["草坪音乐会", "音乐创作工作坊", "校园歌手大赛"],
    members: 150,
    recruiting: 40,
    rating: 4.6,
    activity: 0.80
  },
  {
    id: 9,
    name: "篮球社",
    logo: "🏀",
    slogan: "热血球场，青春飞扬",
    primaryTag: clubTags.SPORTS,
    matchScores: {
      [matchDimensions.INTEREST]: ['运动', '竞技', '团队'],
      [matchDimensions.TIME]: ['3-5小时', '5小时以上'],
      [matchDimensions.SKILL]: ['入门', '进阶', '高级'],
      [matchDimensions.ACTIVITY]: ['户外', '室内', '竞赛'],
      [matchDimensions.GOAL]: ['兴趣', '竞技', '健康', '社交']
    },
    description: "每周固定训练与友谊赛，组织参加高校篮球联赛，欢迎各水平篮球爱好者。",
    history: "成立于2009年，校男篮主力输出社团",
    activities: ["日常训练", "友谊赛", "新生杯篮球赛"],
    members: 220,
    recruiting: 50,
    rating: 4.8,
    activity: 0.95
  },
  {
    id: 10,
    name: "机器人创新实验室",
    logo: "🤖",
    slogan: "创造未来，从机器人开始",
    primaryTag: clubTags.TECH,
    matchScores: {
      [matchDimensions.INTEREST]: ['科技', '学术', '工程'],
      [matchDimensions.TIME]: ['5小时以上', '3-5小时'],
      [matchDimensions.SKILL]: ['进阶', '高级'],
      [matchDimensions.ACTIVITY]: ['室内', '竞赛'],
      [matchDimensions.GOAL]: ['技能', '履历', '兴趣']
    },
    description: "探索人工智能与机器人技术，参与RoboMaster等顶级赛事，亲手打造智能机器人。",
    history: "成立于2016年，曾获RoboMaster全国二等奖",
    activities: ["机器人制作", "编程培训", "参加机器人大赛"],
    members: 55,
    recruiting: 20,
    rating: 4.9,
    activity: 0.88
  },
  {
    id: 11,
    name: "心理健康协会",
    logo: "💚",
    slogan: "关注心灵，温暖同行",
    primaryTag: clubTags.PUBLIC,
    matchScores: {
      [matchDimensions.INTEREST]: ['公益', '助人', '社会'],
      [matchDimensions.TIME]: ['1-2小时', '3-5小时'],
      [matchDimensions.SKILL]: ['入门', '进阶'],
      [matchDimensions.ACTIVITY]: ['室内', '户外'],
      [matchDimensions.GOAL]: ['成长', '社会贡献', '技能']
    },
    description: "普及心理健康知识，提供朋辈心理支持，组织减压活动与心理沙龙。",
    history: "成立于2019年，与校心理咨询中心合作",
    activities: ["心理沙龙", "减压工作坊", "心理健康宣传"],
    members: 45,
    recruiting: 30,
    rating: 4.7,
    activity: 0.72
  },
  {
    id: 12,
    name: "创业俱乐部",
    logo: "🚀",
    slogan: "敢想敢做，创业未来",
    primaryTag: clubTags.SOCIAL,
    matchScores: {
      [matchDimensions.INTEREST]: ['商业', '创新', '管理'],
      [matchDimensions.TIME]: ['3-5小时', '5小时以上'],
      [matchDimensions.SKILL]: ['进阶', '高级'],
      [matchDimensions.ACTIVITY]: ['室内', '线上'],
      [matchDimensions.GOAL]: ['履历', '成长', '社交']
    },
    description: "汇聚创业梦想家，提供创业培训、资源对接、项目孵化支持。",
    history: "成立于2017年，已孵化5个学生创业项目",
    activities: ["创业讲座", "商业计划书大赛", "创业路演"],
    members: 80,
    recruiting: 35,
    rating: 4.5,
    activity: 0.85
  },
  // 新增社团
  {
    id: 13,
    name: "羽毛球协会",
    logo: "🏸",
    slogan: "轻盈跃动，羽你同行",
    primaryTag: clubTags.SPORTS,
    matchScores: {
      [matchDimensions.INTEREST]: ['运动', '竞技', '健身'],
      [matchDimensions.TIME]: ['1-2小时', '3-5小时'],
      [matchDimensions.SKILL]: ['入门', '进阶', '高级'],
      [matchDimensions.ACTIVITY]: ['室内', '户外', '竞赛'],
      [matchDimensions.GOAL]: ['健康', '兴趣', '社交']
    },
    description: "从新手到高手，这里有适合各个水平的训练。定期组织友谊赛和校际交流。",
    history: "成立于2015年，拥有80+活跃成员",
    activities: ["日常训练", "友谊赛", "校际联赛"],
    members: 95,
    recruiting: 40,
    rating: 4.7,
    activity: 0.86
  },
  {
    id: 14,
    name: "话剧社",
    logo: "🎭",
    slogan: "舞台之上，演绎人生",
    primaryTag: clubTags.ART,
    matchScores: {
      [matchDimensions.INTEREST]: ['艺术', '表演', '创作'],
      [matchDimensions.TIME]: ['3-5小时', '5小时以上'],
      [matchDimensions.SKILL]: ['入门', '进阶'],
      [matchDimensions.ACTIVITY]: ['室内', '表演'],
      [matchDimensions.GOAL]: ['兴趣', '技能', '社交']
    },
    description: "从剧本创作到舞台表演，体验戏剧艺术的魅力。每年举办专场演出。",
    history: "成立于2012年，多部原创话剧获省级奖项",
    activities: ["剧本围读", "表演训练", "年度大戏"],
    members: 70,
    recruiting: 25,
    rating: 4.8,
    activity: 0.79
  },
  {
    id: 15,
    name: "英语角俱乐部",
    logo: "🌍",
    slogan: "连接世界，畅所欲言",
    primaryTag: clubTags.ACADEMIC,
    matchScores: {
      [matchDimensions.INTEREST]: ['学术', '语言', '文化'],
      [matchDimensions.TIME]: ['1-2小时', '3-5小时'],
      [matchDimensions.SKILL]: ['入门', '进阶', '高级'],
      [matchDimensions.ACTIVITY]: ['室内', '线上'],
      [matchDimensions.GOAL]: ['技能', '社交', '兴趣']
    },
    description: "每周英语角活动，外籍教师参与，主题讨论、演讲训练，提升口语表达能力。",
    history: "成立于2014年，累计举办500+场活动",
    activities: ["英语角", "演讲比赛", "电影赏析"],
    members: 160,
    recruiting: 50,
    rating: 4.6,
    activity: 0.83
  },
  {
    id: 16,
    name: "棋艺社",
    logo: "♟️",
    slogan: "棋逢对手，智者博弈",
    primaryTag: clubTags.SOCIAL,
    matchScores: {
      [matchDimensions.INTEREST]: ['竞技', '思辨', '文化'],
      [matchDimensions.TIME]: ['1-2小时', '3-5小时'],
      [matchDimensions.SKILL]: ['入门', '进阶', '高级'],
      [matchDimensions.ACTIVITY]: ['室内', '竞赛'],
      [matchDimensions.GOAL]: ['兴趣', '技能', '社交']
    },
    description: "围棋、象棋、国际象棋，以棋会友。定期举办校内比赛和大师讲座。",
    history: "成立于2013年，培养多名省级棋手",
    activities: ["棋艺交流", "校内比赛", "大师讲座"],
    members: 60,
    recruiting: 30,
    rating: 4.5,
    activity: 0.74
  },
  {
    id: 17,
    name: "新媒体工作室",
    logo: "📱",
    slogan: "记录校园，传播精彩",
    primaryTag: clubTags.TECH,
    matchScores: {
      [matchDimensions.INTEREST]: ['科技', '艺术', '创作'],
      [matchDimensions.TIME]: ['3-5小时', '5小时以上'],
      [matchDimensions.SKILL]: ['入门', '进阶'],
      [matchDimensions.ACTIVITY]: ['室内', '户外'],
      [matchDimensions.GOAL]: ['技能', '履历', '兴趣']
    },
    description: "运营校园官方新媒体账号，学习短视频制作、图文编辑、运营推广。",
    history: "成立于2018年，多平台粉丝累计10万+",
    activities: ["视频拍摄", "图文创作", "运营培训"],
    members: 75,
    recruiting: 35,
    rating: 4.7,
    activity: 0.87
  },
  {
    id: 18,
    name: "环保协会",
    logo: "🌱",
    slogan: "绿色地球，从我做起",
    primaryTag: clubTags.PUBLIC,
    matchScores: {
      [matchDimensions.INTEREST]: ['公益', '自然', '社会'],
      [matchDimensions.TIME]: ['1-2小时', '3-5小时'],
      [matchDimensions.SKILL]: ['入门'],
      [matchDimensions.ACTIVITY]: ['户外', '室内'],
      [matchDimensions.GOAL]: ['社会贡献', '成长', '兴趣']
    },
    description: "倡导绿色生活方式，组织环保活动，参与校园垃圾分类与节能减排。",
    history: "成立于2016年，获省级环保社团称号",
    activities: ["环保宣传", "植树活动", "旧物回收"],
    members: 110,
    recruiting: 45,
    rating: 4.6,
    activity: 0.80
  },
  {
    id: 19,
    name: "桌游协会",
    logo: "🎲",
    slogan: "桌游人生，欢乐无限",
    primaryTag: clubTags.SOCIAL,
    matchScores: {
      [matchDimensions.INTEREST]: ['社交', '竞技', '娱乐'],
      [matchDimensions.TIME]: ['1-2小时', '3-5小时'],
      [matchDimensions.SKILL]: ['入门', '进阶'],
      [matchDimensions.ACTIVITY]: ['室内'],
      [matchDimensions.GOAL]: ['社交', '兴趣', '放松']
    },
    description: "狼人杀、剧本杀、德式桌游，各种类型应有尽有。每周固定桌游夜。",
    history: "成立于2019年，拥有500+款桌游",
    activities: ["桌游之夜", "剧本杀", "策略游戏"],
    members: 130,
    recruiting: 60,
    rating: 4.8,
    activity: 0.91
  },
  {
    id: 20,
    name: "传统武术社",
    logo: "🥋",
    slogan: "传承武术，强身健体",
    primaryTag: clubTags.SPORTS,
    matchScores: {
      [matchDimensions.INTEREST]: ['运动', '文化', '健身'],
      [matchDimensions.TIME]: ['1-2小时', '3-5小时'],
      [matchDimensions.SKILL]: ['入门', '进阶', '高级'],
      [matchDimensions.ACTIVITY]: ['室内', '户外', '表演'],
      [matchDimensions.GOAL]: ['健康', '技能', '兴趣']
    },
    description: "学习太极拳、咏春、跆拳道等传统武术，强身健体，传承文化。",
    history: "成立于2011年，多次在武术大赛中获奖",
    activities: ["日常训练", "武术表演", "交流比赛"],
    members: 88,
    recruiting: 40,
    rating: 4.7,
    activity: 0.84
  }
];

// 社团分类（用于筛选）
export const clubCategories = [
  { id: "all", name: "全部", color: "bg-gray-100 text-gray-700" },
  { id: "academic", name: "学术", color: "bg-blue-100 text-blue-700" },
  { id: "art", name: "文艺", color: "bg-purple-100 text-purple-700" },
  { id: "sports", name: "体育", color: "bg-orange-100 text-orange-700" },
  { id: "public", name: "公益", color: "bg-green-100 text-green-700" },
  { id: "tech", name: "科技", color: "bg-cyan-100 text-cyan-700" },
  { id: "social", name: "社交", color: "bg-pink-100 text-pink-700" }
];
