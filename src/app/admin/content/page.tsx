'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MoreHorizontal, Edit, Trash2, Plus, Check, X, Eye, EyeOff } from 'lucide-react'

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

const ContentManagementPage = () => {
  const [contentList, setContentList] = useState<Content[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredContent, setFilteredContent] = useState<Content[]>([])
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    // Mock content data (would be replaced with API call in production)
    const mockContent: Content[] = [
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
      },
      {
        id: 'c002',
        title: { cn: '关于我们', en: 'About Us', jp: '会社概要' },
        slug: 'about-us',
        content: { 
          cn: '<h2>三顺科技有限公司</h2><p>成立于2020年，是一家专业的B2B解决方案提供商...</p>',
          en: '<h2>Sanshun Technology Co., Ltd.</h2><p>Founded in 2020, we are a professional B2B solutions provider...</p>',
          jp: '<h2>三順科技株式会社</h2><p>2020年に設立された専門的なB2Bソリューションプロバイダーです...</p>'
        },
        summary: { 
          cn: '关于我们页面内容',
          en: 'About us page content',
          jp: '会社概要ページコンテンツ'
        },
        module_id: 'about',
        status: 'published',
        view_count: 890,
        created_by: 'admin',
        updated_by: 'admin',
        published_at: '2023-10-12T10:15:00Z',
        created_at: '2023-10-10T15:45:00Z',
        updated_at: '2023-10-12T10:15:00Z'
      },
      {
        id: 'c003',
        title: { cn: '服务优势', en: 'Service Advantages', jp: 'サービスの利点' },
        slug: 'service-advantages',
        content: { 
          cn: '<h2>我们的服务优势</h2><ul><li>专业团队</li><li>优质服务</li><li>创新技术</li></ul>',
          en: '<h2>Our Service Advantages</h2><ul><li>Professional Team</li><li>Quality Service</li><li>Innovative Technology</li></ul>',
          jp: '<h2>当社のサービスの利点</h2><ul><li>専門チーム</li><li>高品質なサービス</li><li>革新的な技術</li></ul>'
        },
        summary: { 
          cn: '服务优势内容',
          en: 'Service advantages content',
          jp: 'サービスの利点コンテンツ'
        },
        module_id: 'home',
        status: 'draft',
        view_count: 0,
        created_by: 'admin',
        updated_by: 'admin',
        published_at: null,
        created_at: '2023-10-18T09:20:00Z',
        updated_at: '2023-10-18T09:20:00Z'
      },
      {
        id: 'c004',
        title: { cn: '联系我们', en: 'Contact Us', jp: 'お問い合わせ' },
        slug: 'contact-us',
        content: { 
          cn: '<h2>联系我们</h2><p>电话：123-456-7890</p><p>邮箱：info@example.com</p>',
          en: '<h2>Contact Us</h2><p>Phone: 123-456-7890</p><p>Email: info@example.com</p>',
          jp: '<h2>お問い合わせ</h2><p>電話：123-456-7890</p><p>メール：info@example.com</p>'
        },
        summary: { 
          cn: '联系我们页面内容',
          en: 'Contact us page content',
          jp: 'お問い合わせページコンテンツ'
        },
        module_id: 'contact',
        status: 'published',
        view_count: 560,
        created_by: 'admin',
        updated_by: 'admin',
        published_at: '2023-10-13T14:30:00Z',
        created_at: '2023-10-10T16:10:00Z',
        updated_at: '2023-10-13T14:30:00Z'
      }
    ]

    setContentList(mockContent)
    setFilteredContent(mockContent)
  }, [])

  useEffect(() => {
    // Filter content based on search term and active tab
    let filtered = contentList

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.cn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.status === activeTab)
    }

    setFilteredContent(filtered)
  }, [searchTerm, activeTab, contentList])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusChange = (id: string, status: Content['status']) => {
    // This would be replaced with API call later
    const updatedContent = contentList.map(item => 
      item.id === id ? { ...item, status } : item
    )
    setContentList(updatedContent)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">内容管理</h1>
          <p className="text-gray-500 mt-1">管理网站的文本内容，包括页面、文章等</p>
        </div>
        <Link href="/admin/content/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          新增内容
        </Link>
      </div>

      {/* Tabs for content status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4">
          <div className="border-b border-gray-200">
            <div className="flex space-x-4">
              <button
                type="button"
                className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'all' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('all')}
              >
                全部
              </button>
              <button
                type="button"
                className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'published' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('published')}
              >
                已发布
              </button>
              <button
                type="button"
                className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'draft' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('draft')}
              >
                草稿
              </button>
              <button
                type="button"
                className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${activeTab === 'archived' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('archived')}
              >
                已归档
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="space-y-2">
            <div>
              <h3 className="text-sm font-medium text-gray-700">内容筛选</h3>
              <p className="text-xs text-gray-500">搜索和筛选您的内容</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="搜索内容标题、别名..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left w-[40px]">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">内容信息</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">模块</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">状态</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">浏览量</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">更新时间</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">{item.title.cn}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{item.slug}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{item.title.en}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {item.module_id === 'home' ? '首页' : 
                       item.module_id === 'about' ? '关于我们' : 
                       item.module_id === 'contact' ? '联系我们' : item.module_id}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'published' ? 'bg-green-100 text-green-600' : 
                                                                   item.status === 'draft' ? 'bg-amber-100 text-amber-600' : 
                                                                   'bg-gray-100 text-gray-600'}`}>
                      {item.status === 'published' ? '已发布' : 
                       item.status === 'draft' ? '草稿' : '已归档'}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-600">{item.view_count}</span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-500">
                      {new Date(item.updated_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="relative inline-block">
                      <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        <span className="sr-only">打开菜单</span>
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                        <div className="p-2">
                          <div className="px-2 py-1 text-xs font-medium text-gray-500">内容操作</div>
                          <div className="border-t border-gray-100 my-1"></div>
                          <Link 
                            href={`/admin/content/edit/${item.id}`} 
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                            编辑
                          </Link>
                          {item.status === 'draft' ? (
                            <button 
                              onClick={() => handleStatusChange(item.id, 'published')}
                              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Check className="h-4 w-4" />
                              发布
                            </button>
                          ) : item.status === 'published' ? (
                            <>
                              <button 
                                onClick={() => handleStatusChange(item.id, 'draft')}
                                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <EyeOff className="h-4 w-4" />
                                转为草稿
                              </button>
                              <button 
                                onClick={() => handleStatusChange(item.id, 'archived')}
                                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <X className="h-4 w-4" />
                                归档
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={() => handleStatusChange(item.id, 'published')}
                              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Check className="h-4 w-4" />
                              重新发布
                            </button>
                          )}
                          <div className="border-t border-gray-100 my-1"></div>
                          <button 
                            className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            删除
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          共 <span className="font-medium">{filteredContent.length}</span> 条内容
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            上一页
          </button>
          <button className="px-4 py-2 bg-primary text-white border border-primary rounded-lg hover:bg-primary/90 transition-colors">
            1
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
            下一页
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentManagementPage