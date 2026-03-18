'use client'
import Link from 'next/link'
import { useState } from 'react'

// 模拟AI洞察数据
const aiInsights = [
  {
    id: '1',
    title: '如何通过塔罗牌探索内心世界',
    content: '塔罗牌不仅是预测未来的工具，更是探索内心世界的镜子。通过定期的自我占卜，你可以更深入地了解自己的情绪、需求和潜意识模式。',
    category: '自我成长',
    createdAt: new Date('2026-03-10'),
    readTime: '5分钟'
  },
  {
    id: '2',
    title: '爱情关系中的塔罗智慧',
    content: '塔罗牌可以帮助你理解爱情关系中的动态和挑战。通过特定的爱情牌阵，你可以获得关于伴侣关系、沟通模式和未来发展的深刻洞察。',
    category: '爱情关系',
    createdAt: new Date('2026-03-09'),
    readTime: '6分钟'
  },
  {
    id: '3',
    title: '事业决策中的塔罗指引',
    content: '当面临重要的事业决策时，塔罗牌可以提供客观的视角和智慧。它能帮助你识别机遇、挑战和内心的真实意愿，从而做出更明智的选择。',
    category: '事业发展',
    createdAt: new Date('2026-03-08'),
    readTime: '7分钟'
  },
  {
    id: '4',
    title: '塔罗牌与情绪疗愈',
    content: '塔罗牌可以作为一种有效的情绪疗愈工具。通过解读牌面，你可以识别和释放负面情绪，获得内心的平静和疗愈。',
    category: '情绪疗愈',
    createdAt: new Date('2026-03-07'),
    readTime: '5分钟'
  },
  {
    id: '5',
    title: '如何选择适合你的塔罗牌阵',
    content: '不同的牌阵适用于不同类型的问题。了解各种牌阵的特点和适用场景，可以帮助你获得更准确、更有针对性的解读。',
    category: '塔罗技巧',
    createdAt: new Date('2026-03-06'),
    readTime: '4分钟'
  },
  {
    id: '6',
    title: '塔罗牌中的潜意识密码',
    content: '塔罗牌的意象和符号与我们的潜意识有着深刻的联系。学习解读这些密码，可以帮助你解锁内心深处的智慧和直觉。',
    category: '潜意识探索',
    createdAt: new Date('2026-03-05'),
    readTime: '6分钟'
  }
]

const categories = ['全部', '自我成长', '爱情关系', '事业发展', '情绪疗愈', '塔罗技巧', '潜意识探索']

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('全部')

  // 过滤洞察内容
  const filteredInsights = selectedCategory === '全部' 
    ? aiInsights 
    : aiInsights.filter(insight => insight.category === selectedCategory)

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* 页面标题 */}
      <section className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AI 洞察与疗愈
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          探索塔罗智慧与AI结合的深刻洞察，获得心灵的疗愈与成长。
        </p>
      </section>

      {/* 分类筛选 */}
      <section>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 洞察列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInsights.map((insight) => (
            <Link 
              key={insight.id} 
              href={`/insights/${insight.id}`}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10 group"
            >
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full">
                  {insight.category}
                </span>
                <span className="text-gray-400">{insight.readTime}</span>
              </div>

              <h2 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                {insight.title}
              </h2>

              <p className="text-gray-300 mb-4 line-clamp-3">
                {insight.content}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{insight.createdAt.toLocaleDateString('zh-CN')}</span>
                <span className="text-primary group-hover:text-primary/80 transition-colors">
                  阅读更多 →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 空状态 */}
        {filteredInsights.length === 0 && (
          <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2 text-white">暂无相关内容</h3>
            <p className="text-gray-300">请尝试选择其他分类</p>
          </div>
        )}
      </section>

      {/* 行动召唤 */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          需要更个性化的洞察？
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          尝试我们的AI塔罗占卜服务，获得针对您特定问题的深刻解读和个性化建议。
        </p>
        <Link href="/readings" className="btn-primary text-lg py-4 px-8">
          立即开始占卜
        </Link>
      </section>
    </div>
  )
}