import Link from 'next/link'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'
import TarotMasterPreview from '../components/TarotMasterPreview'

export default function Home() {
  return (
    <div className="space-y-20">
      {/* 英雄区域 */}
      <HeroSection />

      {/* 核心功能 */}
      <FeaturesSection />

      {/* 塔罗师预览 */}
      <TarotMasterPreview />

      {/* 行动召唤 */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          准备好探索你的内心世界了吗？
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          无需注册，立即体验AI塔罗占卜的力量，获得关于爱情、事业和生活的深刻洞察。
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/readings" className="btn-primary text-lg py-4 px-8">
            立即开始占卜
          </Link>
          <Link href="/tarot-masters" className="btn-secondary text-lg py-4 px-8">
            选择塔罗师
          </Link>
        </div>
      </section>
    </div>
  )
}