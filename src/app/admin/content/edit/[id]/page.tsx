'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

// Define content type
interface Content {
  id: string
  title: {
    [key: string]: string
  }
  slug: string
  content: {
    [key: string]: string
  }
  summary: {
    [key: string]: string
  }
  module_id: string
  status: 'draft' | 'published' | 'archived'
  view_count: number
  created_by: string
  updated_by: string
  published_at: string | null
  created_at: string
  updated_at: string
}

const ContentEditPage = () => {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [content, setContent] = useState<Content | null>(null)
  const [formData, setFormData] = useState({
    id: '',
    title: { cn: '', en: '', jp: '' },
    slug: '',
    content: { cn: '', en: '', jp: '' },
    summary: { cn: '', en: '', jp: '' },
    module_id: 'home',
    status: 'draft' as 'draft' | 'published' | 'archived',
    view_count: 0,
    created_by: 'admin',
    updated_by: 'admin',
    published_at: null as string | null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  })
  
  // Tabs state
  const [activeTab, setActiveTab] = useState('cn')
  const [activeSummaryTab, setActiveSummaryTab] = useState('cn')
  const [activeContentTab, setActiveContentTab] = useState('cn')

  useEffect(() => {
    // Load content data from localStorage or mock data
    const existingContent = localStorage.getItem('content')
    let contentData: Content[] = []
    
    if (existingContent) {
      contentData = JSON.parse(existingContent)
    } else {
      // Mock content data if none exists
      contentData = [
        {
          id: 'c001',
          title: { cn: '首页横幅', en: 'Home Banner', jp: 'ホームバナー' },
          slug: 'home-banner',
          content: { 
            cn: '<h1>专业的 B2B 解决方案提供商</h1><p>致力于为客户提供高质量的产品和服务</p>',
            en: '<h1>Professional B2B Solutions Provider</h1><p>Committed to providing high-quality products and services</p>',
            jp: '<h1>専門的なB2Bソリューションプロバイダー</h1><p>顧客に高品質な製品とサービスを提供することに専念しています</p>'
          },
          summary: { 
            cn: '首页横幅内容',
            en: 'Home page banner content',
            jp: 'ホームページバナーコンテンツ'
          },
          module_id: 'home',
          status: 'published',
          view_count: 1250,
          created_by: 'admin',
          updated_by: 'admin',
          published_at: '2023-10-15T08:30:00Z',
          created_at: '2023-10-10T14:20:00Z',
          updated_at: '2023-10-15T08:30:00Z'
        }
      ]
    }

    const foundContent = contentData.find(item => item.id === id)
    if (foundContent) {
      setContent(foundContent)
      setFormData(foundContent)
    } else {
      setError('内容不存在')
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

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('slug', e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validate form
    if (!formData.title.cn || !formData.content.cn) {
      setError('请填写必填项')
      setLoading(false)
      return
    }

    // Update content
    const updatedContent = {
      ...formData,
      updated_at: new Date().toISOString(),
      updated_by: 'admin',
      published_at: formData.status === 'published' ? (formData.published_at || new Date().toISOString()) : null
    }

    // Simple save logic (would be replaced with API call in production)
    setTimeout(() => {
      // Get existing content from localStorage or use default
      const existingContent = localStorage.getItem('content')
      let content = existingContent ? JSON.parse(existingContent) : []

      // Update content
      const updatedContentList = content.map((item: Content) => 
        item.id === updatedContent.id ? updatedContent : item
      )

      // Save back to localStorage
      localStorage.setItem('content', JSON.stringify(updatedContentList))

      setSuccess('内容更新成功')
      setLoading(false)

      // Redirect to content list after 1 second
      setTimeout(() => {
        router.push('/admin/content')
      }, 1000)
    }, 1000)
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/content')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回内容列表
          </button>
          <h1 className="text-2xl font-bold text-gray-900">编辑内容</h1>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/content')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回内容列表
          </button>
          <h1 className="text-2xl font-bold text-gray-900">编辑内容</h1>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">加载内容数据中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/admin/content')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回内容列表
        </button>
        <h1 className="text-2xl font-bold text-gray-900">编辑内容</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">内容信息</h2>
          <p className="text-gray-500 mt-1">请修改内容的详细信息</p>
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

            {/* Content ID */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="contentId" className="block text-sm font-medium text-gray-700">内容ID</label>
                <span className="text-sm text-gray-500">不可修改</span>
              </div>
              <input 
                id="contentId" 
                type="text"
                value={formData.id} 
                readOnly 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Content Module */}
            <div className="space-y-2">
              <label htmlFor="moduleId" className="block text-sm font-medium text-gray-700">所属模块</label>
              <select
                id="moduleId"
                value={formData.module_id}
                onChange={(e) => handleInputChange('module_id', e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="home">首页</option>
                <option value="about">关于我们</option>
                <option value="contact">联系我们</option>
                <option value="products">产品中心</option>
              </select>
            </div>

            {/* Content Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">内容标题</label>
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
                    <label htmlFor="title-cn" className="block text-sm font-medium text-gray-700">标题 (中文)</label>
                    <input
                      id="title-cn"
                      type="text"
                      placeholder="中文标题"
                      value={formData.title.cn}
                      onChange={(e) => handleInputChange('title', e.target.value, 'cn')}
                      required
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
                {activeTab === 'en' && (
                  <div>
                    <label htmlFor="title-en" className="block text-sm font-medium text-gray-700">标题 (英文)</label>
                    <input
                      id="title-en"
                      type="text"
                      placeholder="English Title"
                      value={formData.title.en}
                      onChange={(e) => handleInputChange('title', e.target.value, 'en')}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
                {activeTab === 'jp' && (
                  <div>
                    <label htmlFor="title-jp" className="block text-sm font-medium text-gray-700">标题 (日文)</label>
                    <input
                      id="title-jp"
                      type="text"
                      placeholder="日本語タイトル"
                      value={formData.title.jp}
                      onChange={(e) => handleInputChange('title', e.target.value, 'jp')}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Content Slug */}
            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">URL别名</label>
              <input
                id="slug"
                type="text"
                placeholder="URL别名"
                value={formData.slug}
                onChange={handleSlugChange}
                required
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-gray-500">URL别名用于生成友好的URL地址</p>
            </div>

            {/* Content Summary */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">内容摘要</label>
              <div className="border-b border-gray-200">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeSummaryTab === 'cn' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveSummaryTab('cn')}
                  >
                    中文
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeSummaryTab === 'en' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveSummaryTab('en')}
                  >
                    英文
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeSummaryTab === 'jp' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveSummaryTab('jp')}
                  >
                    日文
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {activeSummaryTab === 'cn' && (
                  <div>
                    <label htmlFor="summary-cn" className="block text-sm font-medium text-gray-700">摘要 (中文)</label>
                    <textarea
                      id="summary-cn"
                      placeholder="中文摘要"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[80px]"
                      value={formData.summary.cn}
                      onChange={(e) => handleInputChange('summary', e.target.value, 'cn')}
                    />
                  </div>
                )}
                {activeSummaryTab === 'en' && (
                  <div>
                    <label htmlFor="summary-en" className="block text-sm font-medium text-gray-700">摘要 (英文)</label>
                    <textarea
                      id="summary-en"
                      placeholder="English Summary"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[80px]"
                      value={formData.summary.en}
                      onChange={(e) => handleInputChange('summary', e.target.value, 'en')}
                    />
                  </div>
                )}
                {activeSummaryTab === 'jp' && (
                  <div>
                    <label htmlFor="summary-jp" className="block text-sm font-medium text-gray-700">摘要 (日文)</label>
                    <textarea
                      id="summary-jp"
                      placeholder="日本語サマリー"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[80px]"
                      value={formData.summary.jp}
                      onChange={(e) => handleInputChange('summary', e.target.value, 'jp')}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">内容正文</label>
              <div className="border-b border-gray-200">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeContentTab === 'cn' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveContentTab('cn')}
                  >
                    中文
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeContentTab === 'en' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveContentTab('en')}
                  >
                    英文
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeContentTab === 'jp' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveContentTab('jp')}
                  >
                    日文
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {activeContentTab === 'cn' && (
                  <div>
                    <label htmlFor="content-cn" className="block text-sm font-medium text-gray-700">正文 (中文)</label>
                    <textarea
                      id="content-cn"
                      placeholder="中文正文"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[200px]"
                      value={formData.content.cn}
                      onChange={(e) => handleInputChange('content', e.target.value, 'cn')}
                      required
                    />
                    <p className="text-xs text-gray-500">支持HTML标签，如h1-h6, p, ul, ol, img等</p>
                  </div>
                )}
                {activeContentTab === 'en' && (
                  <div>
                    <label htmlFor="content-en" className="block text-sm font-medium text-gray-700">正文 (英文)</label>
                    <textarea
                      id="content-en"
                      placeholder="English Content"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[200px]"
                      value={formData.content.en}
                      onChange={(e) => handleInputChange('content', e.target.value, 'en')}
                    />
                  </div>
                )}
                {activeContentTab === 'jp' && (
                  <div>
                    <label htmlFor="content-jp" className="block text-sm font-medium text-gray-700">正文 (日文)</label>
                    <textarea
                      id="content-jp"
                      placeholder="日本語コンテンツ"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[200px]"
                      value={formData.content.jp}
                      onChange={(e) => handleInputChange('content', e.target.value, 'jp')}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Content Status */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">内容状态</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg transition-colors ${formData.status === 'draft' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => handleInputChange('status', 'draft')}
                >
                  草稿
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg transition-colors ${formData.status === 'published' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => handleInputChange('status', 'published')}
                >
                  发布
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg transition-colors ${formData.status === 'archived' ? 'bg-gray-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => handleInputChange('status', 'archived')}
                >
                  归档
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 p-6 border-t border-gray-100 bg-gray-50">
            <button
              type="button"
              onClick={() => router.push('/admin/content')}
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

export default ContentEditPage