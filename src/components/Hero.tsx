'use client'

import Link from 'next/link'

const Hero = () => {
  const currentLanguage = 'cn' // 暂时固定，后续集成国际化

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-primary to-primary/90">
      {/* 背景图片 */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}></div>
      </div>

      {/* 内容 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            专业的 B2B 解决方案提供商
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            致力于为客户提供高质量的产品和服务
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/products"
              className="px-8 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors text-center"
            >
              查看产品
            </Link>
            <button
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth'
                })
              }}
              className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium rounded-lg transition-colors text-center"
            >
              联系我们
            </button>
          </div>
        </div>
      </div>

      {/* 向下滚动指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default Hero