// 塔罗师类型定义
export interface TarotMaster {
  id: number;
  name: string;
  avatar: string;
  specialty: string;
  style: string;
  description: string;
  background: string;
  experience: string;
  rating: number;
  reviews: number;
}

// 塔罗牌类型定义
export interface TarotCard {
  id: number;
  name: string;
  suit: string;
  number: number;
  image: string;
  meaning: string;
  reversedMeaning: string;
}

// 牌阵类型定义
export interface Spread {
  id: number;
  name: string;
  description: string;
  cards: number;
  positions: string[];
}

// 占卜结果类型定义
export interface Reading {
  id: string;
  tarotMasterId: number;
  spreadId: number;
  cards: TarotCard[];
  interpretation: string;
  createdAt: Date;
}

// AI洞察类型定义
export interface AIInsight {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
}