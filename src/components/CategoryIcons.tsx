'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// 分类图标数据类型
interface CategoryIcon {
  id: string
  name: string
  image: string
  href: string
}

interface CategoryIconsProps {
  categories: CategoryIcon[]
}

const CategoryIcons: React.FC<CategoryIconsProps> = ({ categories }) => {
  const [isFixed, setIsFixed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const containerOffsetTop = useRef<number>(0)

  // 初始化容器的offsetTop
  useEffect(() => {
    if (containerRef.current) {
      containerOffsetTop.current = containerRef.current.offsetTop
    }
  }, [])

  // 使用滚动事件监听实现分类的固定效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // 当页面滚动超过分类容器的offsetTop时，固定分类
      if (scrollY >= containerOffsetTop.current) {
        setIsFixed(true)
      } else {
        // 当页面滚动回到顶部时，恢复初始状态
        setIsFixed(false)
      }
    }

    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`category-icons-container transition-all duration-300 ease-in-out ${isFixed ? 'fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4' : 'py-8'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* 分类图标弹性布局 - 适配手机端一行显示 */}
          <div 
            className={`flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 transition-all duration-300`}
          >
            {/* 所有分类直接显示，不区分可见和隐藏 */}
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={category.href}
                className="category-icon-item group flex flex-col items-center text-center p-2 sm:p-2.5 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm min-w-[60px] sm:min-w-[70px]"
              >
                {/* 分类图标 */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 mb-1.5 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  ></div>
                </div>
                {/* 分类名称 */}
                <span className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-accent transition-colors truncate max-w-full">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryIcons