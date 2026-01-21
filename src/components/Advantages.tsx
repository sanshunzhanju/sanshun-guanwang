'use client'

import { Lightbulb, Shield, Headphones, Code } from 'lucide-react'
import company from '../data/company.json'

const Advantages = () => {
  const currentLanguage = 'cn' // 暂时固定，后续集成国际化

  // 优势图标映射
  const advantageIcons = {
    'innovative': <Lightbulb className="w-12 h-12 text-accent" />,
    'quality': <Shield className="w-12 h-12 text-accent" />,
    'service': <Headphones className="w-12 h-12 text-accent" />,
    'customization': <Code className="w-12 h-12 text-accent" />
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-3">公司优势</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            我们的核心优势，为客户提供高质量的工业自动化解决方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {company.advantages.map((advantage) => (
            <div
              key={advantage.id}
              className="bg-background-light rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* 优势图标 */}
              <div className="mb-6">
                {advantageIcons[advantage.icon as keyof typeof advantageIcons]}
              </div>

              {/* 优势标题 */}
              <h3 className="text-xl font-semibold text-primary mb-3">
                {advantage.title[currentLanguage]}
              </h3>

              {/* 优势描述 */}
              <p className="text-gray-600">
                {advantage.description[currentLanguage]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Advantages