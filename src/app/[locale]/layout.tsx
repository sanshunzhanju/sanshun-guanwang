import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../styles/globals.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '三顺官网',
  description: '专业的 B2B 公司官网',
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen page-transition">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}