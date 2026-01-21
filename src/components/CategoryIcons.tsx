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

  // 使用滚动事件监听实现分类的折叠和展开
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

  // 获取可见分类和隐藏分类（前3个可见，其余隐藏）
  const visibleCategories = categories.slice(0, 3)
  const hiddenCategories = categories.slice(3)

  // 如果分类数量少于4个，不需要显示更多分类按钮
  const shouldShowMoreButton = categories.length >= 4 && isCollapsed

  return (
    <div 
      ref={containerRef}
      className={`category-icons-container transition-all duration-300 ease-in-out ${isFixed ? 'fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4' : 'py-8'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* 分类图标网格 - 移除overflow-hidden，允许下拉菜单显示 */}
          <div 
            className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 transition-all duration-300`}
          >
            {/* 前3个固定显示的分类 */}
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="category-icon-item group flex flex-col items-center text-center p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm"
              >
                {/* 分类图标 */}
                <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  ></div>
                </div>
                {/* 分类名称 */}
                <span className="text-sm font-black text-gray-800 group-hover:text-accent transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}

            {/* 第4个位置：根据状态显示原始分类或更多分类按钮 */}
            {shouldShowMoreButton ? (
              <div ref={dropdownRef} className="relative">
                {/* 更多分类按钮 */}
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="category-icon-item group flex flex-col items-center text-center p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm w-full"
                  aria-expanded={showDropdown}
                  aria-haspopup="true"
                  aria-label="更多分类"
                >
                  <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">更多</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-accent transition-colors">
                    更多分类
                  </span>
                  {/* 下拉箭头 */}
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform duration-300 mt-1 ${showDropdown ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 下拉菜单 */}
                {showDropdown && (
                  <div className="absolute top-full left-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                    {hiddenCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={category.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // 不折叠状态下显示第4个分类
              categories[3] && (
                <Link
                  key={categories[3].id}
                  href={categories[3].href}
                  className="category-icon-item group flex flex-col items-center text-center p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm"
                >
                  {/* 分类图标 */}
                  <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(${categories[3].image})` }}
                    ></div>
                  </div>
                  {/* 分类名称 */}
                  <span className="text-sm font-medium text-gray-800 group-hover:text-accent transition-colors">
                    {categories[3].name}
                  </span>
                </Link>
              )
            )}

            {/* 非折叠状态下显示剩余分类 */}
            {!isCollapsed && categories.slice(4).map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="category-icon-item group flex flex-col items-center text-center p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm"
              >
                {/* 分类图标 */}
                <div className="w-16 h-16 mb-2 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  ></div>
                </div>
                {/* 分类名称 */}
                <span className="text-sm font-medium text-gray-800 group-hover:text-accent transition-colors">
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