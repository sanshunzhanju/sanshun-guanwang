import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: '管理后台登录',
  description: '三顺科技管理后台登录页面',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cn">
      <body>
        {children}
      </body>
    </html>
  )
}