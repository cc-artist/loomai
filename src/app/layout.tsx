import '../styles/globals.css'
import type { Metadata } from 'next'
import Navigation from '../components/Navigation'

export const metadata: Metadata = {
  title: 'LOOM – 免费在线 AI 塔罗占卜 | 无需注册',
  description: 'LOOM 提供免费的在线 AI 塔罗占卜，即时牌阵与互动指引，解答爱情、事业和生活疑惑——无需注册。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-b from-dark to-[#111827]">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-[#111827] py-8 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
            <p>© 2026 LOOM. 保留所有权利。</p>
            <div className="mt-4 flex justify-center space-x-6">
              <a href="/privacy" className="hover:text-primary transition-colors">隐私政策</a>
              <a href="/terms" className="hover:text-primary transition-colors">服务条款</a>
              <a href="/about" className="hover:text-primary transition-colors">关于我们</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}