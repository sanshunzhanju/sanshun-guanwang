import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div>
        <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          页面不存在
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          很抱歉，您访问的页面不存在或已被移除。请检查您的URL是否正确，或返回首页继续浏览。
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage