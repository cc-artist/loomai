import { TarotMaster, Spread, TarotCard } from './types'

// 塔罗师数据
export const tarotMasters: TarotMaster[] = [
  {
    id: 1,
    name: '神秘守护者',
    avatar: '🧙‍♂️',
    specialty: '爱情与关系',
    style: '深邃神秘，注重心灵连接',
    description: '擅长解读爱情关系中的深层情感和潜在问题，帮助您找到内心的答案。',
    background: '拥有超过20年的塔罗解读经验，曾为数千人提供爱情咨询服务。',
    experience: '专注于爱情塔罗解读，结合心理学和灵性智慧，帮助来访者解决情感困惑。',
    rating: 4.9,
    reviews: 1245
  },
  {
    id: 2,
    name: '智慧导师',
    avatar: '👴',
    specialty: '事业与人生规划',
    style: '理性睿智，提供实用建议',
    description: '专注于事业发展和人生规划，用清晰的洞察力帮助您做出明智决策。',
    background: '前企业高管，拥有丰富的商业经验，后转向塔罗解读领域，结合商业智慧和灵性指导。',
    experience: '擅长将塔罗解读与实际生活相结合，为来访者提供切实可行的建议和策略。',
    rating: 4.8,
    reviews: 987
  },
  {
    id: 3,
    name: '心灵疗愈师',
    avatar: '🧘‍♀️',
    specialty: '情绪疗愈与成长',
    style: '温暖治愈，充满同理心',
    description: '擅长处理情绪问题和个人成长，通过塔罗牌带来心灵的疗愈与启示。',
    background: '资深心理咨询师，融合塔罗牌与心理疗愈技术，帮助来访者实现内心的平和与成长。',
    experience: '专注于情绪疗愈和个人成长领域，通过塔罗牌帮助来访者探索内心世界，释放情绪包袱。',
    rating: 4.9,
    reviews: 1567
  },
  {
    id: 4,
    name: '预言家',
    avatar: '🔮',
    specialty: '未来趋势与机遇',
    style: '前瞻敏锐，洞察未来',
    description: '专注于解读未来趋势和潜在机遇，帮助您把握人生的重要转折点。',
    background: '天生具有敏锐的直觉和洞察力，结合塔罗牌的智慧，能够准确解读未来趋势。',
    experience: '擅长预测未来发展趋势，帮助来访者识别机遇和挑战，做出最佳决策。',
    rating: 4.7,
    reviews: 876
  }
]

// 牌阵数据
export const spreads: Spread[] = [
  {
    id: 1,
    name: '凯尔特十字',
    description: '经典的塔罗牌阵，提供全面的生活洞察',
    cards: 10,
    positions: [
      '当前状况',
      '挑战',
      '潜意识',
      '过去',
      '未来',
      '你',
      '环境',
      '希望与恐惧',
      '结果',
      '最终建议'
    ]
  },
  {
    id: 2,
    name: '爱情三角',
    description: '解读爱情关系中的三方动态',
    cards: 3,
    positions: ['你', '对方', '关系']
  },
  {
    id: 3,
    name: '事业发展',
    description: '洞察事业发展的潜力和挑战',
    cards: 4,
    positions: ['当前状况', '挑战', '机遇', '建议']
  },
  {
    id: 4,
    name: '单牌解读',
    description: '快速获取针对特定问题的洞察',
    cards: 1,
    positions: ['答案']
  }
]

// 塔罗牌数据（韦特体系完整版）
export const tarotCards: TarotCard[] = [
  // 大阿卡纳（Major Arcana）
  {
    id: 1,
    name: '魔术师',
    suit: 'Major Arcana',
    number: 1,
    image: '/tarot-cards/major-arcana/magician.jpg',
    meaning: '创造、行动、意志力',
    reversedMeaning: '缺乏自信、操控'
  },
  {
    id: 2,
    name: '女祭司',
    suit: 'Major Arcana',
    number: 2,
    image: '/tarot-cards/major-arcana/high-priestess.jpg',
    meaning: '直觉、神秘、内心智慧',
    reversedMeaning: '直觉被忽略、秘密泄露'
  },
  {
    id: 3,
    name: '女皇',
    suit: 'Major Arcana',
    number: 3,
    image: '/tarot-cards/major-arcana/empress.jpg',
    meaning: '丰饶、母性、创造力',
    reversedMeaning: '缺乏创造力、依赖'
  },
  {
    id: 4,
    name: '皇帝',
    suit: 'Major Arcana',
    number: 4,
    image: '/tarot-cards/major-arcana/emperor.jpg',
    meaning: '权威、结构、领导力',
    reversedMeaning: '独裁、缺乏自律'
  },
  {
    id: 5,
    name: '教皇',
    suit: 'Major Arcana',
    number: 5,
    image: '/tarot-cards/major-arcana/hierophant.jpg',
    meaning: '传统、指导、精神信仰',
    reversedMeaning: '反叛、个人信念'
  },
  {
    id: 6,
    name: '恋人',
    suit: 'Major Arcana',
    number: 6,
    image: '/tarot-cards/major-arcana/lovers.jpg',
    meaning: '爱情、选择、和谐',
    reversedMeaning: '失衡、错误选择'
  },
  {
    id: 7,
    name: '战车',
    suit: 'Major Arcana',
    number: 7,
    image: '/tarot-cards/major-arcana/chariot.jpg',
    meaning: '胜利、控制、决心',
    reversedMeaning: '失控、缺乏方向'
  },
  {
    id: 8,
    name: '力量',
    suit: 'Major Arcana',
    number: 8,
    image: '/tarot-cards/major-arcana/strength.jpg',
    meaning: '勇气、力量、耐心',
    reversedMeaning: '软弱、缺乏勇气'
  },
  {
    id: 9,
    name: '隐士',
    suit: 'Major Arcana',
    number: 9,
    image: '/tarot-cards/major-arcana/hermit.jpg',
    meaning: '孤独、内省、智慧',
    reversedMeaning: '孤立、逃避'
  },
  {
    id: 10,
    name: '命运之轮',
    suit: 'Major Arcana',
    number: 10,
    image: '/tarot-cards/major-arcana/wheel-of-fortune.jpg',
    meaning: '变化、命运、循环',
    reversedMeaning: '停滞、厄运'
  },
  {
    id: 11,
    name: '正义',
    suit: 'Major Arcana',
    number: 11,
    image: '/tarot-cards/major-arcana/justice.jpg',
    meaning: '公平、正义、平衡',
    reversedMeaning: '不公、失衡'
  },
  {
    id: 12,
    name: '倒吊人',
    suit: 'Major Arcana',
    number: 12,
    image: '/tarot-cards/major-arcana/hanged-man.jpg',
    meaning: '牺牲、投降、新视角',
    reversedMeaning: '自私、拒绝牺牲'
  },
  {
    id: 13,
    name: '死神',
    suit: 'Major Arcana',
    number: 13,
    image: '/tarot-cards/major-arcana/death.jpg',
    meaning: '结束、转变、重生',
    reversedMeaning: '抗拒变化、停滞'
  },
  {
    id: 14,
    name: '节制',
    suit: 'Major Arcana',
    number: 14,
    image: '/tarot-cards/major-arcana/temperance.jpg',
    meaning: '平衡、调和、耐心',
    reversedMeaning: '失衡、过度'
  },
  {
    id: 15,
    name: '恶魔',
    suit: 'Major Arcana',
    number: 15,
    image: '/tarot-cards/major-arcana/devil.jpg',
    meaning: '诱惑、束缚、欲望',
    reversedMeaning: '解脱、自由'
  },
  {
    id: 16,
    name: '高塔',
    suit: 'Major Arcana',
    number: 16,
    image: '/tarot-cards/major-arcana/tower.jpg',
    meaning: '灾难、变革、觉醒',
    reversedMeaning: '避免灾难、抗拒变革'
  },
  {
    id: 17,
    name: '星星',
    suit: 'Major Arcana',
    number: 17,
    image: '/tarot-cards/major-arcana/star.jpg',
    meaning: '希望、灵感、指引',
    reversedMeaning: '绝望、失去方向'
  },
  {
    id: 18,
    name: '月亮',
    suit: 'Major Arcana',
    number: 18,
    image: '/tarot-cards/major-arcana/moon.jpg',
    meaning: '直觉、梦境、潜意识',
    reversedMeaning: '困惑、恐惧'
  },
  {
    id: 19,
    name: '太阳',
    suit: 'Major Arcana',
    number: 19,
    image: '/tarot-cards/major-arcana/sun.jpg',
    meaning: '成功、活力、幸福',
    reversedMeaning: '失败、缺乏活力'
  },
  {
    id: 20,
    name: '审判',
    suit: 'Major Arcana',
    number: 20,
    image: '/tarot-cards/major-arcana/judgement.jpg',
    meaning: '重生、觉醒、审判',
    reversedMeaning: '自我谴责、缺乏觉醒'
  },
  {
    id: 21,
    name: '世界',
    suit: 'Major Arcana',
    number: 21,
    image: '/tarot-cards/major-arcana/world.jpg',
    meaning: '完成、成功、统一',
    reversedMeaning: '未完成、失败'
  },
  {
    id: 22,
    name: '愚人',
    suit: 'Major Arcana',
    number: 0,
    image: '/tarot-cards/major-arcana/fool.jpg',
    meaning: '开始、自由、冒险',
    reversedMeaning: '鲁莽、混乱'
  }
]