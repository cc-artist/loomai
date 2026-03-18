import { notFound } from 'next/navigation'
import Link from 'next/link'
import { tarotMasters } from '@/utils/mockData'

interface TarotMasterPageProps {
  params: {
    id: string
  }
}

export default async function TarotMasterDetailPage({ params }: TarotMasterPageProps) {
  const { id } = await params
  const masterId = parseInt(id)
  const master = tarotMasters.find(m => m.id === masterId)

  if (!master) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* 塔罗师详情头部 */}
      <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* 塔罗师头像和基本信息 */}
          <div className="flex-shrink-0 text-center md:text-left">
            <div className="text-8xl mb-4">{master.avatar}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{master.name}</h1>
            <p className="text-primary text-xl font-medium mb-4">{master.specialty}</p>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{master.rating}</span>
                <span>({master.reviews} 条评价)</span>
              </div>
            </div>
          </div>

          {/* 塔罗师详细信息 */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3 text-white">关于塔罗师</h2>
              <p className="text-gray-300 leading-relaxed">{master.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">背景与经验</h3>
              <p className="text-gray-300 leading-relaxed">{master.background}</p>
              <p className="text-gray-300 leading-relaxed mt-2">{master.experience}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">解读风格</h3>
              <p className="text-gray-300 leading-relaxed">{master.style}</p>
            </div>

            {/* 选择塔罗师按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href={`/readings?master=${master.id}`} 
                className="btn-primary text-lg py-4 px-8 flex-1"
              >
                选择这位塔罗师占卜
              </Link>
              <Link 
                href="/tarot-masters" 
                className="bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20 flex-1 text-center"
              >
                返回选择
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 推荐牌阵 */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            推荐牌阵
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 牌阵卡片 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-xl font-bold mb-3 text-white">凯尔特十字</h3>
            <p className="text-gray-300 mb-4">经典的塔罗牌阵，提供全面的生活洞察</p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>10张牌</span>
              <Link 
                href={`/readings?master=${master.id}&spread=1`} 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                使用该牌阵 →
              </Link>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-xl font-bold mb-3 text-white">爱情三角</h3>
            <p className="text-gray-300 mb-4">解读爱情关系中的三方动态</p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>3张牌</span>
              <Link 
                href={`/readings?master=${master.id}&spread=2`} 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                使用该牌阵 →
              </Link>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-xl font-bold mb-3 text-white">事业发展</h3>
            <p className="text-gray-300 mb-4">洞察事业发展的潜力和挑战</p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>4张牌</span>
              <Link 
                href={`/readings?master=${master.id}&spread=3`} 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                使用该牌阵 →
              </Link>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-xl font-bold mb-3 text-white">单牌解读</h3>
            <p className="text-gray-300 mb-4">快速获取针对特定问题的洞察</p>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>1张牌</span>
              <Link 
                href={`/readings?master=${master.id}&spread=4`} 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                使用该牌阵 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}