'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-dark/80 backdrop-blur-md border-b border-gray-800 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">LO</span>
          </div>
          <span className="text-white font-bold text-xl">LOOM</span>
        </Link>

        {/* 桌面端导航链接 */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-primary transition-colors font-medium">
            首页
          </Link>
          <Link href="/readings" className="text-white hover:text-primary transition-colors font-medium">
            塔罗占卜
          </Link>
          <Link href="/tarot-masters" className="text-white hover:text-primary transition-colors font-medium">
            塔罗师
          </Link>
          <Link href="/insights" className="text-white hover:text-primary transition-colors font-medium">
            AI洞察
          </Link>
        </div>

        {/* 桌面端操作按钮 */}
        <div className="hidden md:flex items-center space-x-4">
          {/* 语言切换 */}
          <div className="relative">
            <button className="flex items-center space-x-1 text-white hover:text-primary transition-colors">
              <span>中文</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* 开始占卜按钮 */}
          <Link href="/readings" className="btn-primary">
            开始占卜
          </Link>
        </div>

        {/* 移动端菜单按钮 */}
        <button 
          className="md:hidden text-white hover:text-primary transition-colors z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* 移动端菜单 */}
        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 right-0 bg-dark/95 backdrop-blur-md border-b border-gray-800 py-16 px-4 flex flex-col items-center space-y-8 z-40 animate-fadeIn">
            {/* 移动端导航链接 */}
            <div className="flex flex-col items-center space-y-6">
              <Link 
                href="/" 
                className="text-white hover:text-primary transition-colors font-medium text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                首页
              </Link>
              <Link 
                href="/readings" 
                className="text-white hover:text-primary transition-colors font-medium text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                塔罗占卜
              </Link>
              <Link 
                href="/tarot-masters" 
                className="text-white hover:text-primary transition-colors font-medium text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                塔罗师
              </Link>
              <Link 
                href="/insights" 
                className="text-white hover:text-primary transition-colors font-medium text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI洞察
              </Link>
            </div>

            {/* 移动端操作按钮 */}
            <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
              {/* 语言切换 */}
              <div className="w-full relative">
                <button className="flex items-center justify-between w-full text-white hover:text-primary transition-colors py-3 px-4 bg-white/10 rounded-xl">
                  <span>中文</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* 开始占卜按钮 */}
              <Link 
                href="/readings" 
                className="btn-primary w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                开始占卜
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}