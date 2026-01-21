'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import products from '../../../../data/products.json'

// 获取产品数据的辅助函数
const getProductById = (id: string) => {
  return products.find(product => product.id === id) || null
}

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const product = getProductById(id)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const currentLanguage = 'cn' // 暂时固定，后续集成国际化

  // 如果产品不存在，显示404
  if (!product) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <p className="text-gray-600 mb-8">产品不存在</p>
      </div>
    )
  }

  return (
    <div>
      {/* 产品详情 - Hero */}
      <section className="relative w-full h-64 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.images[0]})` }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <h1 className="text-4xl font-bold text-white">{product.name[currentLanguage]}</h1>
        </div>
      </section>

      {/* 产品详情 - 内容 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 左侧大图相册 */}
            <div>
              {/* 主图 */}
              <div className="h-96 bg-gray-200 rounded-xl overflow-hidden relative mb-4">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.images[currentImageIndex]})` }}></div>
                
                {/* 图片切换按钮 */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="text-primary" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="text-primary" />
                </button>
              </div>

              {/* 缩略图 */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`h-20 bg-gray-200 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${currentImageIndex === index ? 'ring-2 ring-accent scale-105' : 'hover:ring-2 hover:ring-gray-300'}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
                  </div>
                ))}
              </div>

              {/* 视频 */}
              {product.videos.length > 0 && (
                <div className="mt-8">
                  <div className="h-64 bg-gray-200 rounded-xl overflow-hidden relative">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${product.videos[0].cover})` }}></div>
                    {/* 播放按钮 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer">
                        <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 右侧产品信息 */}
            <div>
              {/* 产品描述 */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">产品描述</h2>
                <p className="text-gray-600 mb-8">
                  {product.description[currentLanguage]}
                </p>

                {/* 规格参数表格 */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">规格参数</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                        {product.specs.map((spec, index) => (
                          <tr key={index} className={`${index % 2 === 0 ? 'bg-background-light' : 'bg-white'}`}>
                            <td className="px-4 py-3 text-gray-600 font-medium">{spec.label[currentLanguage]}</td>
                            <td className="px-4 py-3 text-primary">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 下载手册按钮 */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-4">产品手册</h3>
                  <a
                    href={product.manual}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
                  >
                    <Download size={18} className="mr-2" />
                    下载产品手册 (PDF)
                  </a>
                </div>

                {/* 相关操作按钮 */}
                <div className="flex space-x-4">
                  <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    立即咨询
                  </button>
                  <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-medium">
                    加入购物车
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 相关产品推荐 */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">相关产品推荐</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              查看更多相关产品
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 相关产品 - 这里可以根据产品类别过滤显示相关产品 */}
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* 产品图片 */}
                  <div className="h-48 bg-gray-200">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${relatedProduct.images[0]})` }}></div>
                  </div>

                  {/* 产品信息 */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {relatedProduct.name[currentLanguage]}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {relatedProduct.description[currentLanguage]}
                    </p>
                    <a
                      href={`/products/${relatedProduct.id}`}
                      className="inline-flex items-center text-accent font-medium hover:text-accent/80 transition-colors"
                    >
                      查看详情
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetailPage