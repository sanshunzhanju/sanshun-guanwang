'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

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
  const [isCollapsed, setIsCollapsed] = useState(false) // 控制分类是否折叠
  const [showDropdown, setShowDropdown] = useState(false) // 控制更多分类下拉菜单显示
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const containerOffsetTop = useRef<number>(0)

  // 初始化容器的offsetTop
  useEffect(() => {
    if (containerRef.current) {
      containerOffsetTop.current = containerRef.current.offsetTop
    }
  }, [])

  // 使用滚动事件监听实现分类的折叠和固定效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // 当页面滚动超过分类容器的offsetTop时，固定并折叠分类
      if (scrollY >= containerOffsetTop.current) {
        setIsFixed(true)
        setIsCollapsed(true)
      } else {
        // 当页面滚动回到顶部时，恢复初始状态
        setIsFixed(false)
        setIsCollapsed(false)
        setShowDropdown(false) // 关闭下拉菜单
      }
    }

    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 获取可见分类和隐藏分类
  const visibleCategories = categories.slice(0, 3)
  const hiddenCategories = categories.slice(3)

  return (
    <div 
      ref={containerRef}
      className={`category-icons-container transition-all duration-300 ease-in-out ${isFixed ? 'fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3' : 'py-8'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* 分类图标弹性布局 - 适配手机端 */}
          <div 
            className={`flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-5 transition-all duration-300`}
          >
            {/* 前3个固定显示的分类 */}
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="category-icon-item group flex flex-col items-center text-center p-1.5 sm:p-2 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm min-w-[55px] sm:min-w-[65px]"
              >
                {/* 分类图标 - 根据状态调整大小 */}
                <div className={`rounded-full overflow-hidden bg-gray-100 flex items-center justify-center transition-all duration-300
                  ${isCollapsed ? 'w-8 h-8 mb-1.5' : 'w-10 h-10 sm:w-11 sm:h-11 mb-2'}
                `}>
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  ></div>
                </div>
                {/* 分类名称 - 根据状态调整大小 */}
                <span className={`font-medium group-hover:text-accent transition-colors truncate max-w-full
                  ${isCollapsed ? 'text-xs' : 'text-xs sm:text-sm'}
                `}>
                  {category.name}
                </span>
              </Link>
            ))}

            {/* 更多分类按钮 - 仅在折叠状态显示 */}
            {isCollapsed && (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="category-icon-item group flex flex-col items-center text-center p-1.5 sm:p-2 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm min-w-[55px]"
                  aria-expanded={showDropdown}
                  aria-haspopup="true"
                  aria-label="更多分类"
                >
                  {/* 更多分类图标 */}
                  <div className="w-8 h-8 mb-1.5 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-700">更多</span>
                  </div>
                  {/* 更多分类文字 */}
                  <span className="text-xs font-medium text-gray-800 group-hover:text-accent transition-colors">
                    更多分类
                  </span>
                  {/* 下拉箭头 */}
                  <ChevronDown 
                    className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-300 mt-0.5 ${showDropdown ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* 下拉菜单 */}
                {showDropdown && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
                    {/* 下拉菜单标题 */}
                    <div className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-50 border-b border-gray-100">
                      所有分类
                    </div>
                    {/* 下拉菜单内容 - 网格布局显示隐藏的分类 */}
                    <div className="grid grid-cols-3 gap-2 p-3">
                      {hiddenCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={category.href}
                          className="flex flex-col items-center py-2 px-1 text-center rounded-md text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowDropdown(false)}
                        >
                          {/* 下拉菜单中的分类图标 */}
                          <div className="w-8 h-8 mb-1 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                            <div 
                              className="w-full h-full bg-cover bg-center"
                              style={{ backgroundImage: `url(${category.image})` }}
                            ></div>
                          </div>
                          {/* 下拉菜单中的分类名称 */}
                          <span className="truncate max-w-full">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 非折叠状态下显示剩余分类 */}
            {!isCollapsed && categories.slice(3).map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="category-icon-item group flex flex-col items-center text-center p-1.5 sm:p-2 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm min-w-[55px] sm:min-w-[65px]"
              >
                {/* 分类图标 */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 mb-2 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
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