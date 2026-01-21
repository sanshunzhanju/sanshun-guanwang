'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Package, FileText, Settings, LogOut } from 'lucide-react'
import AuthMiddleware from '@/components/AuthMiddleware'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)

  const menuItems = [
    { id: 'dashboard', name: '仪表盘', icon: <LayoutDashboard className="w-5 h-5" />, href: '/admin' },
    { id: 'products', name: '产品管理', icon: <Package className="w-5 h-5" />, href: '/admin/products' },
    { id: 'content', name: '内容管理', icon: <FileText className="w-5 h-5" />, href: '/admin/content' },
    { id: 'settings', name: '系统设置', icon: <Settings className="w-5 h-5" />, href: '/admin/settings' },
  ]

  return (
    <AuthMiddleware>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <h1 className={`font-bold text-lg transition-all ${sidebarOpen ? 'block' : 'hidden'}`}>管理后台</h1>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                )}
              </svg>
            </button>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link 
                    href={item.href} 
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${activeMenu === item.id ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveMenu(item.id)}
                  >
                    {item.icon}
                    <span className={`transition-all ${sidebarOpen ? 'block' : 'hidden'}`}>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
              <h2 className="font-semibold text-lg">管理后台</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-medium">AD</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">管理员</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <button 
                  className="p-2 rounded-lg hover:bg-gray-100"
                  onClick={() => {
                  localStorage.removeItem('adminAuth')
                  router.push('/admin/login')
                }}
                >
                  <LogOut className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </header>
          
          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthMiddleware>
  )
}

export default AdminLayout