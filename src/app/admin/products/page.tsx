'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MoreHorizontal, Edit, Trash2, Plus, Check, X, Eye, EyeOff } from 'lucide-react'
import products from '@/data/products.json'
import { Product } from '@/types/product'

const ProductManagement = () => {
  const [productList, setProductList] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    // Initialize product list from JSON data
    setProductList(products)
    setFilteredProducts(products)
  }, [])

  useEffect(() => {
    // Filter products based on search term
    if (!searchTerm) {
      setFilteredProducts(productList)
      return
    }

    const filtered = productList.filter(product => 
      product.name.cn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.cn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [searchTerm, productList])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleToggleStatus = (id: string) => {
    // This would be replaced with API call later
    const updatedProducts = productList.map(product => 
      product.id === id ? { ...product, isHot: !product.isHot } : product
    )
    setProductList(updatedProducts)
    // Save to local storage for demo purposes
    localStorage.setItem('products', JSON.stringify(updatedProducts))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
          <p className="text-gray-500 mt-1">管理您的产品信息，包括添加、编辑和删除产品</p>
        </div>
        <a 
          href="/admin/products/new" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          新增产品
        </a>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="pb-3">
          <h3 className="text-sm font-medium">产品筛选</h3>
          <p className="text-xs text-gray-500">搜索和筛选您的产品</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="搜索产品名称、ID或描述..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[40px]">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品信息</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">热门状态</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                        {/* 这里可以替换为合适的图标 */}
                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name.cn}</div>
                        <div className="text-sm text-gray-500">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {product.category === 'industrial-robot' ? '工业机械臂' : 
                       product.category === 'automation-equipment' ? '自动化设备' : '传感器'}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1 text-sm ${product.isHot ? 'text-green-600' : 'text-gray-400'}`}
                      onClick={() => handleToggleStatus(product.id)}
                    >
                      {product.isHot ? (
                        <>
                          <Check className="h-4 w-4" />
                          热门
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4" />
                          普通
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="relative inline-block">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">打开菜单</span>
                      </button>
                      {/* 简单的下拉菜单，实际项目中可优化 */}
                      <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                        <Link href={`/admin/products/edit/${product.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <span className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            编辑
                          </span>
                        </Link>
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleToggleStatus(product.id)}
                        >
                          <span className="flex items-center gap-2">
                            {product.isHot ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            {product.isHot ? '取消热门' : '设为热门'}
                          </span>
                        </button>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <span className="flex items-center gap-2">
                            <Trash2 className="h-4 w-4" />
                            删除
                          </span>
                        </button>
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
          共 <span className="font-medium">{filteredProducts.length}</span> 个产品
        </p>
        <div className="flex items-center gap-2">
          <button type="button" disabled className="px-3 py-1 text-sm bg-gray-100 text-gray-500 rounded-md cursor-not-allowed">
            上一页
          </button>
          <button type="button" className="px-3 py-1 text-sm bg-primary text-white rounded-md">
            1
          </button>
          <button type="button" disabled className="px-3 py-1 text-sm bg-gray-100 text-gray-500 rounded-md cursor-not-allowed">
            下一页
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductManagement