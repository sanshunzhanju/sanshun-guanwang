import company from '../../../data/company.json'

const AboutPage = () => {
  const currentLanguage = 'cn' // 暂时固定，后续集成国际化

  return (
    <div>
      {/* 1. 顶部横幅模块 */}
      <section className="relative w-full h-screen bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">关于我们</h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              {company.about[currentLanguage]}
            </p>
          </div>
        </div>
      </section>

      {/* 2. 研究与创新模块 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">研究与创新</h2>
            <p className="text-gray-600 mb-8">
              我们是一个活力四射又充满理性的团队，深谙技术重要，市场更重要。专注于行业技术和解决方案的深度研发，以行业价值为导向持续创新，每年将营收的10%投入研发，开发具有领先优势的核心技术和行业解决方案，为客户创造价值。
            </p>
            <a href="#" className="inline-flex items-center text-accent font-medium hover:text-accent/80 transition-colors">
              了解更多
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 3. 数据统计模块 */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 数据卡片 1 */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">20.8%</div>
              <p className="text-gray-600">2024年，研发投入占营业收入比例</p>
            </div>
            {/* 数据卡片 2 */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">12,490亿</div>
              <p className="text-gray-600">近十年累计研发投入</p>
            </div>
            {/* 数据卡片 3 */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">54.1%</div>
              <p className="text-gray-600">截至2024年12月，研发员工占比</p>
            </div>
            {/* 数据卡片 4 */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-primary mb-2">15万</div>
              <p className="text-gray-600">截至2024年，申请专利数量</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 开放、合作、共赢模块 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">开放、合作、共赢</h2>
            <p className="text-gray-600 mb-8">
              坚持市场导向、产业导向，与国内外领先企业和研究机构建立长期稳定的合作关系，共同探索产业前沿技术，共享产业、技术资源，推动产业发展和技术进步。
            </p>
            <a href="#" className="inline-flex items-center text-accent font-medium hover:text-accent/80 transition-colors">
              了解更多
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 5. 发展历程模块 */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 左侧：发展历程内容 */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">发展历程</h2>
              <div className="space-y-6">
                {company.history.map((item, index) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-xl font-semibold text-primary mb-2">{item.year} - {item.title[currentLanguage]}</h3>
                    <p className="text-gray-600">{item.description[currentLanguage]}</p>
                  </div>
                ))}
              </div>
              <a href="#" className="inline-flex items-center text-accent font-medium hover:text-accent/80 transition-colors mt-4">
                更多
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            {/* 右侧：年份时间轴 */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/20"></div>
              <div className="space-y-12">
                {company.history.map((item, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute left-[-9px] top-1 w-4 h-4 bg-accent rounded-full"></div>
                    <div className="text-xl font-bold text-primary">{item.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 质量方针模块 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 左侧：质量方针内容 */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">质量方针</h2>
              <div className="space-y-4">
                <p className="text-gray-600">质量方针是企业在质量方面的宗旨和方向，是企业质量文化的核心。我们的质量方针是：</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>以顾客为关注焦点，满足顾客需求并超越顾客期望</li>
                  <li>持续改进，不断提高产品和服务质量</li>
                  <li>全员参与，建立健全质量管理体系</li>
                  <li>科技创新，引领行业发展</li>
                  <li>诚信经营，树立良好企业形象</li>
                </ul>
              </div>
            </div>
            {/* 右侧：相关图片 */}
            <div>
              <div className="h-96 bg-gray-200 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 资质证书模块（保留原有模块） */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">资质证书</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们的资质证书，证明了公司的实力与信誉
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {company.certificates.map((certificate) => (
              <div
                key={certificate.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* 证书图片 */}
                <div className="h-64 bg-gray-200">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${certificate.image})` }}></div>
                </div>

                {/* 证书名称 */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-primary">
                    {certificate.name[currentLanguage]}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage