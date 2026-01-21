'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import products from '../data/products.json'

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentLanguage = 'cn' // 暂时固定，后续集成国际化

  // 获取热门产品
  const hotProducts = products.filter(product => product.isHot)
  const totalProducts = hotProducts.length

  // 轮播控制
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProducts)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalProducts) % totalProducts)
  }

  return (
    <section className="py-16 bg-background-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">热门产品</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            我们的热门产品，为客户提供高质量的工业自动化解决方案
          </p>
        </div>

        <div className="relative">
          {/* 轮播内容 */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {hotProducts.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* 产品图片 */}
                    <div className="h-64 bg-gray-200 relative">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.images[0]})` }}></div>
                      {/* 产品类别标签 */}
                      <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                        {product.category === 'industrial-robot' ? '工业机械臂' : 
                         product.category === 'automation-equipment' ? '自动化设备' : '传感器'}
                      </div>
                    </div>

                    {/* 产品信息 */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {product.name[currentLanguage]}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.description[currentLanguage]}
                      </p>
                      
                      {/* 产品规格 */}
                      <div className="mb-6">
                        <div className="grid grid-cols-2 gap-2">
                          {product.specs.slice(0, 2).map((spec, index) => (
                            <div key={index} className="text-sm">
                              <span className="text-gray-500">{spec.label[currentLanguage]}:</span> 
                              <span className="font-medium text-primary">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 查看详情按钮 */}
                      <Link
                        href={`/${currentLanguage}/products/${product.id}`}
                        className="inline-flex items-center justify-center w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
                      >
                        查看详情
                        <ChevronRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 轮播控制按钮 */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="text-primary" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="text-primary" />
          </button>

          {/* 轮播指示器 */}
          <div className="flex justify-center mt-8 space-x-2">
            {hotProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-accent w-8' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 查看全部产品按钮 */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium"
          >
            查看全部产品
            <ChevronRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductCarousel