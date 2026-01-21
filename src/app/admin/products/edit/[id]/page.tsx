'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, PlusCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'
import products from '@/data/products.json'
import { Product } from '@/types/product'

const ProductEditPage = () => {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [product, setProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    id: '',
    category: 'industrial-robot',
    name: { cn: '', en: '', jp: '' },
    description: { cn: '', en: '', jp: '' },
    specs: [{ label: { cn: '', en: '' }, value: '', id: Date.now() }],
    images: [''],
    videos: [{ url: '', cover: '', id: Date.now() }],
    manual: '',
    isHot: false
  })

  // Tabs state
  const [activeTab, setActiveTab] = useState('cn')
  const [activeDescTab, setActiveDescTab] = useState('cn')

  useEffect(() => {
    // Load product data
    const existingProduct = products.find(p => p.id === id)
    if (existingProduct) {
      setProduct(existingProduct)
      setFormData({
        ...existingProduct,
        specs: existingProduct.specs.map((spec, index) => ({ ...spec, id: Date.now() + index })),
        videos: existingProduct.videos.map((video, index) => ({ ...video, id: Date.now() + index }))
      })
    } else {
      // Check localStorage for updated products
      const localStorageProducts = localStorage.getItem('products')
      if (localStorageProducts) {
        const localStorageProductsData = JSON.parse(localStorageProducts)
        const updatedProduct = localStorageProductsData.find((p: Product) => p.id === id)
        if (updatedProduct) {
          setProduct(updatedProduct)
          setFormData({
            ...updatedProduct,
            specs: updatedProduct.specs.map((spec, index) => ({ ...spec, id: Date.now() + index })),
            videos: updatedProduct.videos.map((video, index) => ({ ...video, id: Date.now() + index }))
          })
        } else {
          setError('产品不存在')
        }
      } else {
        setError('产品不存在')
      }
    }
  }, [id])

  const handleInputChange = (field: string, value: any, lang?: string) => {
    if (lang) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field as keyof typeof prev],
          [lang]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSpecChange = (index: number, field: string, value: any, lang?: string) => {
    const updatedSpecs = [...formData.specs]
    if (lang) {
      updatedSpecs[index].label[lang] = value
    } else {
      updatedSpecs[index][field as keyof typeof updatedSpecs[index]] = value
    }
    setFormData(prev => ({
      ...prev,
      specs: updatedSpecs
    }))
  }

  const handleAddSpec = () => {
    setFormData(prev => ({
      ...prev,
      specs: [...prev.specs, { label: { cn: '', en: '' }, value: '', id: Date.now() }]
    }))
  }

  const handleRemoveSpec = (id: number) => {
    setFormData(prev => ({
      ...prev,
      specs: prev.specs.filter(spec => spec.id !== id)
    }))
  }

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...formData.images]
    updatedImages[index] = value
    setFormData(prev => ({
      ...prev,
      images: updatedImages
    }))
  }

  const handleAddImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }))
  }

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleVideoChange = (index: number, field: string, value: string) => {
    const updatedVideos = [...formData.videos]
    updatedVideos[index][field as keyof typeof updatedVideos[index]] = value
    setFormData(prev => ({
      ...prev,
      videos: updatedVideos
    }))
  }

  const handleAddVideo = () => {
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, { url: '', cover: '', id: Date.now() }]
    }))
  }

  const handleRemoveVideo = (id: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter(video => video.id !== id)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validate form
    if (!formData.name.cn || !formData.description.cn) {
      setError('请填写必填项')
      setLoading(false)
      return
    }

    // Update product
    const updatedProduct = {
      ...formData,
      updated_at: new Date().toISOString()
    }

    // Simple save logic (would be replaced with API call in production)
    setTimeout(() => {
      // Get existing products from localStorage or use default
      const existingProducts = localStorage.getItem('products')
      let productsData = existingProducts ? JSON.parse(existingProducts) : [...products]

      // Update product
      const updatedProductsList = productsData.map((item: Product) => 
        item.id === updatedProduct.id ? updatedProduct : item
      )

      // Save back to localStorage
      localStorage.setItem('products', JSON.stringify(updatedProductsList))

      setSuccess('产品更新成功')
      setLoading(false)

      // Redirect to product list after 1 second
      setTimeout(() => {
        router.push('/admin/products')
      }, 1000)
    }, 1000)
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/products')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回产品列表
          </button>
          <h1 className="text-2xl font-bold text-gray-900">编辑产品</h1>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/products')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回产品列表
          </button>
          <h1 className="text-2xl font-bold text-gray-900">编辑产品</h1>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">加载产品数据中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/admin/products')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回产品列表
        </button>
        <h1 className="text-2xl font-bold text-gray-900">编辑产品</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">产品信息</h2>
          <p className="text-gray-500 mt-1">请修改产品的详细信息</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg p-4">
                <p>{success}</p>
              </div>
            )}

            {/* Product ID */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="productId" className="block text-sm font-medium text-gray-700">产品ID</label>
                <span className="text-sm text-gray-500">不可修改</span>
              </div>
              <input 
                id="productId" 
                type="text"
                value={formData.id} 
                readOnly 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Product Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">产品分类</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="industrial-robot">工业机器人</option>
                <option value="mechanical-parts">机械零件</option>
                <option value="electronic-parts">电子零件</option>
                <option value="other">其他</option>
              </select>
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">产品名称</label>
              <div className="border-b border-gray-200">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'cn' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('cn')}
                  >
                    中文
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'en' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('en')}
                  >
                    英文
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'jp' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('jp')}
                  >
                    日文
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {activeTab === 'cn' && (
                  <div>
                    <label htmlFor="name-cn" className="block text-sm font-medium text-gray-700">名称 (中文)</label>
                    <input
                      id="name-cn"
                      type="text"
                      placeholder="中文名称"
                      value={formData.name.cn}
                      onChange={(e) => handleInputChange('name', e.target.value, 'cn')}
                      required
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
                {activeTab === 'en' && (
                  <div>
                    <label htmlFor="name-en" className="block text-sm font-medium text-gray-700">名称 (英文)</label>
                    <input
                      id="name-en"
                      type="text"
                      placeholder="English Name"
                      value={formData.name.en}
                      onChange={(e) => handleInputChange('name', e.target.value, 'en')}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
                {activeTab === 'jp' && (
                  <div>
                    <label htmlFor="name-jp" className="block text-sm font-medium text-gray-700">名称 (日文)</label>
                    <input
                      id="name-jp"
                      type="text"
                      placeholder="日本語名"
                      value={formData.name.jp}
                      onChange={(e) => handleInputChange('name', e.target.value, 'jp')}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">产品描述</label>
              <div className="border-b border-gray-200">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeDescTab === 'cn' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveDescTab('cn')}
                  >
                    中文
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeDescTab === 'en' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveDescTab('en')}
                  >
                    英文
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeDescTab === 'jp' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveDescTab('jp')}
                  >
                    日文
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {activeDescTab === 'cn' && (
                  <div>
                    <label htmlFor="description-cn" className="block text-sm font-medium text-gray-700">描述 (中文)</label>
                    <textarea
                      id="description-cn"
                      placeholder="中文描述"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px]"
                      value={formData.description.cn}
                      onChange={(e) => handleInputChange('description', e.target.value, 'cn')}
                      required
                    />
                  </div>
                )}
                {activeDescTab === 'en' && (
                  <div>
                    <label htmlFor="description-en" className="block text-sm font-medium text-gray-700">描述 (英文)</label>
                    <textarea
                      id="description-en"
                      placeholder="English Description"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px]"
                      value={formData.description.en}
                      onChange={(e) => handleInputChange('description', e.target.value, 'en')}
                    />
                  </div>
                )}
                {activeDescTab === 'jp' && (
                  <div>
                    <label htmlFor="description-jp" className="block text-sm font-medium text-gray-700">描述 (日文)</label>
                    <textarea
                      id="description-jp"
                      placeholder="日本語の説明"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px]"
                      value={formData.description.jp}
                      onChange={(e) => handleInputChange('description', e.target.value, 'jp')}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Product Specifications */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">产品规格</label>
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                >
                  <PlusCircle className="h-4 w-4" />
                  添加规格
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.specs.map((spec, index) => (
                  <div key={spec.id} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <label htmlFor={`spec-label-cn-${index}`} className="block text-sm font-medium text-gray-700">规格名称 (中文)</label>
                          <input
                            id={`spec-label-cn-${index}`}
                            type="text"
                            placeholder="中文规格名称"
                            value={spec.label.cn}
                            onChange={(e) => handleSpecChange(index, 'label', e.target.value, 'cn')}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor={`spec-label-en-${index}`} className="block text-sm font-medium text-gray-700">规格名称 (英文)</label>
                          <input
                            id={`spec-label-en-${index}`}
                            type="text"
                            placeholder="English Spec Name"
                            value={spec.label.en}
                            onChange={(e) => handleSpecChange(index, 'label', e.target.value, 'en')}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor={`spec-value-${index}`} className="block text-sm font-medium text-gray-700">规格值</label>
                          <input
                            id={`spec-value-${index}`}
                            type="text"
                            placeholder="规格值"
                            value={spec.value}
                            onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(spec.id)}
                      className="flex items-center justify-center p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">删除规格</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">产品图片</label>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                >
                  <PlusCircle className="h-4 w-4" />
                  添加图片
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      placeholder="图片URL"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="flex items-center justify-center p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">删除图片</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Videos */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">产品视频</label>
                <button
                  type="button"
                  onClick={handleAddVideo}
                  className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                >
                  <PlusCircle className="h-4 w-4" />
                  添加视频
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.videos.map((video, index) => (
                  <div key={video.id} className="flex gap-3 flex-col md:flex-row items-start p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-1 space-y-3 w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label htmlFor={`video-url-${index}`} className="block text-sm font-medium text-gray-700">视频URL</label>
                          <input
                            id={`video-url-${index}`}
                            type="text"
                            placeholder="视频URL"
                            value={video.url}
                            onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor={`video-cover-${index}`} className="block text-sm font-medium text-gray-700">封面URL</label>
                          <input
                            id={`video-cover-${index}`}
                            type="text"
                            placeholder="封面URL"
                            value={video.cover}
                            onChange={(e) => handleVideoChange(index, 'cover', e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveVideo(video.id)}
                      className="flex items-center justify-center p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">删除视频</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Manual */}
            <div className="space-y-2">
              <label htmlFor="manual" className="block text-sm font-medium text-gray-700">产品手册</label>
              <input
                id="manual"
                type="text"
                placeholder="产品手册URL"
                value={formData.manual}
                onChange={(e) => handleInputChange('manual', e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Hot Product Switch */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">热门产品</label>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={formData.isHot}
                      onChange={(e) => handleInputChange('isHot', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                  <span className="text-sm text-gray-500">{formData.isHot ? '是' : '否'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 p-6 border-t border-gray-100 bg-gray-50">
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  保存中...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  保存修改
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductEditPage