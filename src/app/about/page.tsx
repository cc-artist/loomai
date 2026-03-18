export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* 页面标题 */}
      <section className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            关于 LOOM
          </span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          探索AI与塔罗智慧的完美结合，为您带来深刻的洞察与疗愈。
        </p>
      </section>

      {/* 关于我们内容 */}
      <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">我们的使命</h2>
          <p className="text-gray-300 leading-relaxed">
            LOOM 的使命是通过 AI 技术与塔罗智慧的结合，为用户提供免费、便捷、深入的占卜体验，帮助用户探索内心世界，获得心灵的疗愈与启示。我们相信，每个人都有能力通过自我探索实现成长和疗愈。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">我们的愿景</h2>
          <p className="text-gray-300 leading-relaxed">
            我们致力于成为全球领先的 AI 塔罗占卜平台，通过持续的技术创新和内容优化，为用户提供更加个性化、准确和有价值的占卜体验。我们希望通过我们的服务，帮助更多人找到内心的平衡与智慧。
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">我们的理念</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-xl font-bold mb-2 text-white">智慧与洞察</h3>
              <p className="text-gray-300 text-sm">
                通过塔罗智慧与AI技术的结合，为用户提供深刻的洞察和指引。
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-4xl mb-4">💚</div>
              <h3 className="text-xl font-bold mb-2 text-white">疗愈与成长</h3>
              <p className="text-gray-300 text-sm">
                关注用户的心灵健康，通过占卜体验促进个人成长和疗愈。
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2 text-white">隐私与安全</h3>
              <p className="text-gray-300 text-sm">
                严格保护用户隐私，确保用户数据安全，让用户放心使用我们的服务。
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">我们的团队</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            LOOM 团队由一群充满激情和创造力的专业人士组成，包括 AI 工程师、塔罗专家、设计师和开发者。我们共同致力于将 AI 技术与塔罗智慧完美结合，为用户提供卓越的占卜体验。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">AI 研发团队</h3>
              <p className="text-gray-300 text-sm">
                专注于 AI 技术的研发和优化，确保占卜结果的准确性和个性化。
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">TC</span>
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">塔罗专家团队</h3>
              <p className="text-gray-300 text-sm">
                拥有丰富的塔罗解读经验，为 AI 系统提供专业的塔罗知识支持。
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">UX</span>
              </div>
              <h3 className="text-lg font-bold mb-1 text-white">用户体验团队</h3>
              <p className="text-gray-300 text-sm">
                致力于打造流畅、直观、美观的用户界面，提升用户体验。
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">联系我们</h2>
          <p className="text-gray-300 leading-relaxed">
            如果您对 LOOM 有任何问题、建议或反馈，欢迎通过以下方式联系我们：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3 text-white">一般咨询</h3>
              <p className="text-gray-300">
                电子邮件：info@mysticx.ai
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3 text-white">技术支持</h3>
              <p className="text-gray-300">
                电子邮件：support@mysticx.ai
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}