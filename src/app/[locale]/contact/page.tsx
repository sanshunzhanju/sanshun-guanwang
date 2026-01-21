'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // 模拟表单提交
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      // 5秒后重置成功状态
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div>
      {/* 联系我们 - Hero */}
      <section className="relative w-full h-64 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <h1 className="text-4xl font-bold text-white">商务合作</h1>
        </div>
      </section>

      {/* 联系我们 - 内容 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧联系方式 */}
            <div className="lg:col-span-1">
              <div className="bg-background-light rounded-xl p-6">
                <h3 className="text-xl font-semibold text-primary mb-6">联系信息</h3>

                {/* 联系信息 */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">公司地址</h4>
                      <p className="text-gray-600">上海市浦东新区张江高科技园区</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">联系电话</h4>
                      <p className="text-gray-600">+86 021-12345678</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">电子邮箱</h4>
                      <p className="text-gray-600">info@sanshun.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">工作时间</h4>
                      <p className="text-gray-600">周一至周五: 9:00 - 18:00</p>
                      <p className="text-gray-600">周六至周日: 休息</p>
                    </div>
                  </div>
                </div>

                {/* 公司地图 */}
                <div className="mt-8">
                  <h4 className="font-semibold text-primary mb-3">公司地图</h4>
                  <div className="h-64 bg-gray-200 rounded-xl overflow-hidden">
                    {/* 地图占位符 */}
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}></div>
                    {/* 地图覆盖层 */}
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <div className="bg-white px-6 py-3 rounded-lg shadow-lg">
                        <p className="text-primary font-medium">地图加载中...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧留言表单 */}
            <div className="lg:col-span-2">
              <div className="bg-background-light rounded-xl p-8">
                <h3 className="text-xl font-semibold text-primary mb-6">留言表单</h3>

                {/* 表单成功提示 */}
                {submitSuccess && (
                  <div className="mb-6 bg-green-100 text-green-700 px-4 py-3 rounded-lg">
                    留言提交成功，我们将尽快与您联系！
                  </div>
                )}

                {/* 留言表单 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        姓名 *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="请输入您的姓名"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        邮箱 *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="请输入您的邮箱"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      电话
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="请输入您的电话"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      留言内容 *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="请输入您的留言内容"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium disabled:bg-accent/70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '提交中...' : '提交留言'}
                  </button>
                </form>

                {/* 表单说明 */}
                <div className="mt-6 text-sm text-gray-500">
                  <p>* 为必填项</p>
                  <p>我们将对您的个人信息严格保密，请放心填写。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage