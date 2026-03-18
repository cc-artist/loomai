export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* 主标题 */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            您的AI塔罗圣所
          </span>
          <span className="block text-white">带来疗愈与启示</span>
        </h1>

        {/* 副标题 */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-lg text-gray-300">
          <span className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100%免费
          </span>
          <span className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            无需注册
          </span>
          <span className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            即时AI洞察
          </span>
          <span className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            隐私优先
          </span>
        </div>

        {/* 行动按钮 */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <a href="/readings" className="btn-primary text-lg py-4 px-8">
            立即开始占卜
          </a>
          <a href="/tarot-masters" className="bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20">
            选择塔罗师
          </a>
        </div>

        {/* 品牌标识 */}
        <div className="flex justify-center items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-full py-3 px-6 inline-block border border-white/10">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">LO</span>
          </div>
          <span className="text-white font-bold text-2xl">LOOM</span>
        </div>
      </div>
    </section>
  )
}