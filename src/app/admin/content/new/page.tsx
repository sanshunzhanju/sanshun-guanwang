'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

const ContentNewPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Tabs state
  const [activeTab, setActiveTab] = useState('cn')
  const [activeSummaryTab, setActiveSummaryTab] = useState('cn')
  const [activeContentTab, setActiveContentTab] = useState('cn')

  // Content form state
  const [contentForm, setContentForm] = useState({
    id: `c${(Math.random() * 1000).toString().padStart(3, '0')}`,
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

  const handleInputChange = (field: string, value: any, lang?: string) => {
    if (lang) {
      setContentForm(prev => ({
        ...prev,
        [field]: {
          ...prev[field as keyof typeof prev],
          [lang]: value
        }
      }))
    } else {
      setContentForm(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Auto generate slug from Chinese title if empty
    let slug = e.target.value
    if (!slug && contentForm.title.cn) {
      slug = contentForm.title.cn
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    }
    handleInputChange('slug', slug)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validate form
    if (!contentForm.title.cn || !contentForm.content.cn) {
      setError('请填写必填项')
      setLoading(false)
      return
    }

    // Set published_at if status is published
    const finalForm = {
      ...contentForm,
      published_at: contentForm.status === 'published' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    }

    // Simple save logic (would be replaced with API call in production)
    setTimeout(() => {
      // Get existing content from localStorage or use default
      const existingContent = localStorage.getItem('content')
      let content = existingContent ? JSON.parse(existingContent) : []

      // Add new content
      content.push(finalForm)

      // Save back to localStorage
      localStorage.setItem('content', JSON.stringify(content))

      setSuccess('内容创建成功')
      setLoading(false)

      // Redirect to content list after 1 second
      setTimeout(() => {
        router.push('/admin/content')
      }, 1000)
    }, 1000)
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
        <h1 className="text-2xl font-bold text-gray-900">新增内容</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">内容信息</h2>
          <p className="text-gray-500 mt-1">请填写内容的详细信息</p>
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
                <span className="text-sm text-gray-500">自动生成</span>
              </div>
              <input 
                id="contentId" 
                type="text"
                value={contentForm.id} 
                readOnly 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Content Module */}
            <div className="space-y-2">
              <label htmlFor="moduleId" className="block text-sm font-medium text-gray-700">所属模块</label>
              <select
                id="moduleId"
                value={contentForm.module_id}
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
                      value={contentForm.title.cn}
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
                      value={contentForm.title.en}
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
                      value={contentForm.title.jp}
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
                value={contentForm.slug}
                onChange={handleSlugChange}
                required
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-gray-500">URL别名用于生成友好的URL地址，如不填写则自动从中文标题生成</p>
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
                      value={contentForm.summary.cn}
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
                      value={contentForm.summary.en}
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
                      value={contentForm.summary.jp}
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
                      value={contentForm.content.cn}
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
                      value={contentForm.content.en}
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
                      value={contentForm.content.jp}
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
                  className={`px-4 py-2 rounded-lg transition-colors ${contentForm.status === 'draft' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => handleInputChange('status', 'draft')}
                >
                  草稿
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg transition-colors ${contentForm.status === 'published' ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => handleInputChange('status', 'published')}
                >
                  发布
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg transition-colors ${contentForm.status === 'archived' ? 'bg-gray-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
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
                  保存内容
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContentNewPage