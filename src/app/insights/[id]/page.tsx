import { notFound } from 'next/navigation'
import Link from 'next/link'

// 模拟AI洞察数据
const aiInsights = [
  {
    id: '1',
    title: '如何通过塔罗牌探索内心世界',
    content: '塔罗牌不仅是预测未来的工具，更是探索内心世界的镜子。通过定期的自我占卜，你可以更深入地了解自己的情绪、需求和潜意识模式。\n\n塔罗牌的每张牌都代表着不同的象征意义和能量，当你抽取一张牌时，它会反映出你当前的内心状态或生活情境。通过解读牌面的象征意义，你可以获得关于自己的深刻洞察。\n\n要有效地使用塔罗牌探索内心世界，建议你：\n\n1. 选择一个安静、舒适的环境，确保你不会被打扰\n2. 深呼吸，放松身心，集中注意力\n3. 提出一个具体的问题或关注的领域\n4. 从牌堆中抽取一张或多张牌\n5. 仔细观察牌面的图像、颜色和象征意义\n6. 记录你的第一印象和感受\n7. 结合牌面的传统意义和你的个人直觉进行解读\n\n通过这种方式，塔罗牌可以帮助你发现内心深处的智慧和真相，促进自我成长和疗愈。',
    category: '自我成长',
    createdAt: new Date('2026-03-10'),
    readTime: '5分钟',
    author: 'AI塔罗智慧'
  },
  {
    id: '2',
    title: '爱情关系中的塔罗智慧',
    content: '塔罗牌可以帮助你理解爱情关系中的动态和挑战。通过特定的爱情牌阵，你可以获得关于伴侣关系、沟通模式和未来发展的深刻洞察。\n\n在爱情关系中，塔罗牌可以提供以下帮助：\n\n1. 理解当前关系的状态和动态\n2. 识别关系中的挑战和机遇\n3. 探索伴侣的内心感受和需求\n4. 获得关于关系未来发展的指引\n5. 发现自己在关系中的模式和行为\n\n常用的爱情牌阵包括：\n\n- 爱情三角牌阵：探索你、对方和关系本身的能量\n- 凯尔特十字牌阵：提供全面的关系洞察\n- 双人关系牌阵：深入分析双方的互动模式\n- 未来发展牌阵：预测关系的长期走向\n\n无论你是处于单身、恋爱还是婚姻状态，塔罗牌都可以为你提供宝贵的智慧和指引，帮助你建立更健康、更和谐的爱情关系。',
    category: '爱情关系',
    createdAt: new Date('2026-03-09'),
    readTime: '6分钟',
    author: 'AI塔罗智慧'
  },
  {
    id: '3',
    title: '事业决策中的塔罗指引',
    content: '当面临重要的事业决策时，塔罗牌可以提供客观的视角和智慧。它能帮助你识别机遇、挑战和内心的真实意愿，从而做出更明智的选择。\n\n在事业决策中，塔罗牌可以帮助你：\n\n1. 评估当前的职业状况\n2. 识别潜在的机遇和挑战\n3. 探索不同选择的可能结果\n4. 了解自己的职业价值观和目标\n5. 获得关于行动步骤的指引\n\n适合事业决策的牌阵包括：\n\n- 事业发展牌阵：探索当前状况、挑战、机遇和建议\n- 决策牌阵：比较不同选择的优缺点\n- 职业路径牌阵：探索长期职业发展方向\n- 成功要素牌阵：识别实现职业目标的关键因素\n\n通过塔罗牌的指引，你可以更清晰地了解自己的职业道路，做出符合内心真实意愿的决策，实现职业上的成功和满足。',
    category: '事业发展',
    createdAt: new Date('2026-03-08'),
    readTime: '7分钟',
    author: 'AI塔罗智慧'
  },
  {
    id: '4',
    title: '塔罗牌与情绪疗愈',
    content: '塔罗牌可以作为一种有效的情绪疗愈工具。通过解读牌面，你可以识别和释放负面情绪，获得内心的平静和疗愈。\n\n情绪疗愈是一个过程，塔罗牌可以在以下方面提供帮助：\n\n1. 识别和命名情绪：牌面的图像和象征意义可以帮助你识别和表达难以言说的情绪\n2. 探索情绪的根源：通过解读牌阵，你可以发现情绪背后的深层原因\n3. 释放负面情绪：将情绪投射到牌面上可以帮助你安全地释放负面能量\n4. 获得情绪支持：牌面的指引可以给你带来安慰和希望\n5. 培养情绪智慧：通过定期占卜，你可以提高对情绪的觉察和管理能力\n\n适合情绪疗愈的牌阵包括：\n\n- 情绪觉察牌阵：探索当前的情绪状态\n- 疗愈之旅牌阵：引导你走过疗愈过程\n- 内心平静牌阵：帮助你获得内心的平静\n- 情绪释放牌阵：支持你释放负面情绪\n\n塔罗牌的情绪疗愈力量在于它能够帮助你连接内心深处的智慧，促进自我理解和接纳，从而实现情绪的平衡和疗愈。',
    category: '情绪疗愈',
    createdAt: new Date('2026-03-07'),
    readTime: '5分钟',
    author: 'AI塔罗智慧'
  },
  {
    id: '5',
    title: '如何选择适合你的塔罗牌阵',
    content: '不同的牌阵适用于不同类型的问题。了解各种牌阵的特点和适用场景，可以帮助你获得更准确、更有针对性的解读。\n\n选择牌阵时，考虑以下因素：\n\n1. 问题的性质：不同的牌阵适合不同类型的问题（爱情、事业、自我成长等）\n2. 问题的复杂度：简单问题适合使用少量牌的牌阵，复杂问题需要更全面的牌阵\n3. 所需的深度：有些牌阵提供表面的洞察，而有些则深入探索潜意识层面\n4. 个人偏好：选择你感觉最有共鸣的牌阵\n\n常见的塔罗牌阵包括：\n\n- 单牌解读：适合快速获取针对特定问题的洞察\n- 三牌阵：提供过去、现在和未来的视角\n- 凯尔特十字：经典的全面解读牌阵\n- 爱情三角：适合探索爱情关系\n- 事业发展：专注于职业问题\n\n记住，没有绝对正确或错误的牌阵选择。重要的是选择一个你感觉舒适、能够帮助你获得所需洞察的牌阵。随着经验的积累，你会逐渐发现最适合不同情况的牌阵。',
    category: '塔罗技巧',
    createdAt: new Date('2026-03-06'),
    readTime: '4分钟',
    author: 'AI塔罗智慧'
  },
  {
    id: '6',
    title: '塔罗牌中的潜意识密码',
    content: '塔罗牌的意象和符号与我们的潜意识有着深刻的联系。学习解读这些密码，可以帮助你解锁内心深处的智慧和直觉。\n\n塔罗牌的每张牌都包含丰富的象征意义，这些象征与我们的潜意识紧密相连。当你观察一张塔罗牌时，你的潜意识会立即对牌面的图像、颜色和符号做出反应，产生直觉性的理解。\n\n要解读塔罗牌中的潜意识密码，建议你：\n\n1. 放松身心，清空头脑\n2. 凝视牌面，注意你的第一印象和感受\n3. 记录你看到的图像、颜色和符号\n4. 探索这些象征在你个人生活中的意义\n5. 结合传统的牌义，形成完整的解读\n\n通过这种方式，你可以超越表面的解读，深入探索潜意识层面的智慧。塔罗牌可以帮助你：\n\n- 发现隐藏的欲望和恐惧\n- 识别潜意识中的模式和信念\n- 获得来自内心深处的指引\n- 连接更高的智慧和直觉\n\n塔罗牌中的潜意识密码是打开内心智慧之门的钥匙，通过学习解读这些密码，你可以获得更深刻、更有意义的洞察。',
    category: '潜意识探索',
    createdAt: new Date('2026-03-05'),
    readTime: '6分钟',
    author: 'AI塔罗智慧'
  }
]

interface InsightPageProps {
  params: {
    id: string
  }
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { id } = await params
  const insight = aiInsights.find(i => i.id === id)

  if (!insight) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {/* 洞察详情头部 */}
      <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
              {insight.category}
            </span>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{insight.createdAt.toLocaleDateString('zh-CN')}</span>
              <span>•</span>
              <span>{insight.readTime}</span>
              <span>•</span>
              <span>作者：{insight.author}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {insight.title}
          </h1>
        </div>
      </section>

      {/* 洞察内容 */}
      <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
        <div className="prose prose-invert max-w-none">
          {insight.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* 相关推荐 */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            相关推荐
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiInsights
            .filter(i => i.id !== insight.id && i.category === insight.category)
            .slice(0, 3)
            .map((relatedInsight) => (
              <Link 
                key={relatedInsight.id} 
                href={`/insights/${relatedInsight.id}`}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10"
              >
                <h3 className="text-lg font-bold mb-2 text-white hover:text-primary transition-colors">
                  {relatedInsight.title}
                </h3>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {relatedInsight.content}
                </p>
                <div className="mt-4 text-sm text-gray-400">
                  {relatedInsight.readTime} • {relatedInsight.createdAt.toLocaleDateString('zh-CN')}
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* 行动召唤 */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          准备好获得个性化的塔罗洞察了吗？
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          立即开始AI塔罗占卜，获得针对您特定问题的深刻解读和个性化建议。
        </p>
        <Link href="/readings" className="btn-primary text-lg py-4 px-8">
          立即开始占卜
        </Link>
      </section>
    </div>
  )
}