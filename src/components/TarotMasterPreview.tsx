import Link from 'next/link'

export default function TarotMasterPreview() {
  const tarotMasters = [
    {
      id: 1,
      name: '神秘守护者',
      avatar: '🧙‍♂️',
      specialty: '爱情与关系',
      style: '深邃神秘，注重心灵连接',
      description: '擅长解读爱情关系中的深层情感和潜在问题，帮助您找到内心的答案。'
    },
    {
      id: 2,
      name: '智慧导师',
      avatar: '👴',
      specialty: '事业与人生规划',
      style: '理性睿智，提供实用建议',
      description: '专注于事业发展和人生规划，用清晰的洞察力帮助您做出明智决策。'
    },
    {
      id: 3,
      name: '心灵疗愈师',
      avatar: '🧘‍♀️',
      specialty: '情绪疗愈与成长',
      style: '温暖治愈，充满同理心',
      description: '擅长处理情绪问题和个人成长，通过塔罗牌带来心灵的疗愈与启示。'
    },
    {
      id: 4,
      name: '预言家',
      avatar: '🔮',
      specialty: '未来趋势与机遇',
      style: '前瞻敏锐，洞察未来',
      description: '专注于解读未来趋势和潜在机遇，帮助您把握人生的重要转折点。'
    }
  ]

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            选择您的塔罗师
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tarotMasters.map((master) => (
            <div 
              key={master.id} 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{master.avatar}</div>
                <h3 className="text-xl font-bold mb-1 text-white">{master.name}</h3>
                <p className="text-primary font-medium">{master.specialty}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-3">风格：{master.style}</p>
                <p className="text-gray-300 text-sm">{master.description}</p>
              </div>
              
              <Link 
                href={`/tarot-masters/${master.id}`} 
                className="block w-full text-center py-3 px-6 bg-primary/20 hover:bg-primary/30 text-primary rounded-full transition-all duration-300 font-medium"
              >
                选择这位塔罗师
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/tarot-masters" 
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <span>查看所有塔罗师</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}