import Link from 'next/link'
import { tarotMasters } from '@/utils/mockData'

export default function TarotMastersPage() {
  return (
    <div className="space-y-12">
      {/* 页面标题 */}
      <section className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            选择您的塔罗师
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          每位AI塔罗师都有独特的风格和专业领域，选择最适合您需求的塔罗师，开始您的占卜之旅。
        </p>
      </section>

      {/* 塔罗师列表 */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tarotMasters.map((master) => (
            <Link 
              key={master.id} 
              href={`/tarot-masters/${master.id}`}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10 group"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{master.avatar}</div>
                <h3 className="text-xl font-bold mb-1 text-white group-hover:text-primary transition-colors">{master.name}</h3>
                <p className="text-primary font-medium">{master.specialty}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-3">风格：{master.style}</p>
                <p className="text-gray-300 text-sm line-clamp-3">{master.description}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{master.rating}</span>
                  <span>({master.reviews})</span>
                </div>
                <div className="text-primary group-hover:text-primary/80 transition-colors">
                  了解更多 →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 行动召唤 */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          准备好开始占卜了吗？
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          选择您的塔罗师，提出您的问题，让AI塔罗牌为您带来深刻的洞察和启示。
        </p>
        <Link href="/readings" className="btn-primary text-lg py-4 px-8">
          立即开始占卜
        </Link>
      </section>
    </div>
  )
}