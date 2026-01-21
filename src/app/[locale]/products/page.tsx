'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import products from '../../../data/products.json'
import CategoryIcons from '../../../components/CategoryIcons'
import categoriesData from '../../../data/categories.json'

const ProductListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const currentLanguage = 'cn' // 暂时固定，后续集成国际化

  // 产品分类 - 修改为参考样式的分类结构
  const categories = [
    { id: 'industrial-robot', name: { cn: '工业机械臂', en: 'Industrial Robots', jp: '産業用ロボット' }, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
    { id: 'automation-equipment', name: { cn: '自动化设备', en: 'Automation Equipment', jp: '自動化機器' }, image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
    { id: 'sensor', name: { cn: '传感器', en: 'Sensors', jp: 'センサー' }, image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' },
  ]

  // 过滤产品
  const filteredProducts = selectedCategory === null || selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div>
      {/* 产品列表 - Hero */}
      <section className="relative w-full h-64 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <h1 className="text-4xl font-bold text-white">产品列表</h1>
        </div>
      </section>

      {/* 产品列表 - 内容 */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* 分类图标展示模块 */}
          <CategoryIcons categories={categoriesData} />
          
          {/* 产品列表内容 */}
          <div className="py-16">

          {/* 产品数量统计 */}
          <div className="mb-8 text-gray-600">
            共 <span className="font-bold text-primary">{filteredProducts.length}</span> 个产品
          </div>

          {/* 产品列表 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-background-light rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* 产品图片 */}
                <div className="h-48 bg-gray-200">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.images[0]})` }}></div>
                </div>

                {/* 产品信息 */}
                <div className="p-5">
                  {/* 产品类别标签 */}
                  <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium mb-3">
                    {product.category === 'industrial-robot' ? '工业机械臂' : 
                     product.category === 'automation-equipment' ? '自动化设备' : '传感器'}
                  </div>

                  {/* 产品名称 */}
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {product.name[currentLanguage]}
                  </h3>

                  {/* 产品描述 */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description[currentLanguage]}
                  </p>

                  {/* 产品规格 */}
                  <div className="mb-5">
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
                    href={`/products/${product.id}`}
                    className="inline-flex items-center text-accent font-medium hover:text-accent/80 transition-colors"
                  >
                    查看详情
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 空状态 */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-background-light rounded-xl">
              <p className="text-gray-600 text-lg">暂无产品</p>
            </div>
          )}
        </div>
      </div>
      </section>
    </div>
  )
}

export default ProductListPage