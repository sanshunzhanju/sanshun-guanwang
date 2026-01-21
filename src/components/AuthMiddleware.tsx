'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AuthMiddlewareProps {
  children: ReactNode
}

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('adminAuth')
    const isAuthenticated = auth ? JSON.parse(auth).isAuthenticated : false

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push('/admin/login')
    }
  }, [router])

  return <>{children}</>
}

export default AuthMiddleware