'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Globe } from 'lucide-react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<'cn' | 'en' | 'jp'>('cn')

  const languages: { code: 'cn' | 'en' | 'jp'; name: string }[] = [
    { code: 'cn', name: '中文' },
    { code: 'en', name: 'English' },
    { code: 'jp', name: '日本語' },
  ]

  const navLinks = [
    { href: '/', label: { cn: '首页', en: 'Home', jp: 'ホーム' } },
    { href: '/about', label: { cn: '关于我们', en: 'About', jp: '会社紹介' } },
    { href: '/products', label: { cn: '产品列表', en: 'Products', jp: '製品一覧' } },
    { href: '/contact', label: { cn: '商务合作', en: 'Contact', jp: 'お問い合わせ' } },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">三顺</span>
            </div>
            <span className="text-xl font-bold text-primary">Sanshun</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-accent transition-colors font-medium"
              >
                {link.label[currentLanguage]}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-full border border-gray-300 hover:border-accent transition-colors"
            >
              <Globe size={18} className="text-gray-600" />
              <span className="text-sm font-medium">
                {languages.find(lang => lang.code === currentLanguage)?.name}
              </span>
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLanguage(lang.code)
                      setIsLanguageOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${currentLanguage === lang.code ? 'text-accent font-medium' : 'text-gray-700'}`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                {link.label[currentLanguage]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar