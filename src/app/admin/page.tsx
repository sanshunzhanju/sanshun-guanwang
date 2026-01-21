import { ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react'

const AdminDashboard = () => {
  // Mock data - to be replaced with real data later
  const stats = [
    {
      title: '产品总数',
      value: '4',
      change: '+2',
      trend: 'up',
      description: '较上月增长',
      color: 'bg-primary/20',
      textColor: 'text-primary'
    },
    {
      title: '已发布内容',
      value: '12',
      change: '+3',
      trend: 'up',
      description: '较上月增长',
      color: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: '媒体文件',
      value: '28',
      change: '+5',
      trend: 'up',
      description: '较上月增长',
      color: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: '待处理事项',
      value: '2',
      change: '-1',
      trend: 'down',
      description: '较上月减少',
      color: 'bg-amber-100',
      textColor: 'text-amber-600'
    }
  ]

  // Mock recent activities
  const recentActivities = [
    { id: 1, user: '管理员', action: '创建了新产品', target: '工业机械臂 X2', time: '2小时前' },
    { id: 2, user: '管理员', action: '更新了首页内容', target: '首页横幅', time: '5小时前' },
    { id: 3, user: '管理员', action: '上传了媒体文件', target: '产品图片', time: '1天前' },
    { id: 4, user: '管理员', action: '下架了产品', target: '旧款传感器', time: '2天前' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
        <p className="text-gray-500 mt-1">欢迎回来，管理员。这是您的网站概览。</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="pb-2">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className={`w-5 h-5 ${stat.textColor}`} />
                  ) : (
                    <ArrowDownRight className={`w-5 h-5 ${stat.textColor}`} />
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? '↑' : '↓'} {Math.abs(parseInt(stat.change))}%
                </span>
                <span className="text-xs text-gray-500 ml-1">较上月</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">最近活动</h3>
            <p className="text-sm text-gray-500">查看您的最新操作记录</p>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-primary/10 rounded-full">
                  <AlertCircle className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium text-gray-900">{activity.user}</span> 
                    <span className="text-gray-500">{activity.action}</span> 
                    <span className="font-medium text-gray-900">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">快速操作</h3>
            <p className="text-sm text-gray-500">常用功能快速访问</p>
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-sm font-medium">创建新产品</span>
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-200 rounded-full">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01" />
                  </svg>
                </div>
                <span className="text-sm font-medium">发布新内容</span>
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-200 rounded-full">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">上传媒体文件</span>
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-200 rounded-full">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">系统设置</span>
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard