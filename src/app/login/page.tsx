'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple authentication
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminAuth', JSON.stringify({ isAuthenticated: true }))
        router.push('/admin')
      } else {
        setError('用户名或密码错误')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1E40AF',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#1E40AF',
          color: 'white',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h1 style={{
            margin: '0',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>管理后台登录</h1>
          <p style={{
            margin: '8px 0 0',
            opacity: 0.9
          }}>请输入您的管理员账号和密码</p>
        </div>

        {/* Form */}
        <div style={{
          padding: '24px'
        }}>
          {error && (
            <div style={{
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Username */}
            <div>
              <label htmlFor="username" style={{
                display: 'block',
                marginBottom: '8px',
                color: '#374151',
                fontWeight: '500',
                fontSize: '14px'
              }}>用户名</label>
              <input
                id="username"
                type="text"
                placeholder="请输入用户名"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" style={{
                display: 'block',
                marginBottom: '8px',
                color: '#374151',
                fontWeight: '500',
                fontSize: '14px'
              }}>密码</label>
              <input
                id="password"
                type="password"
                placeholder="请输入密码"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: '#1E40AF',
                color: 'white',
                padding: '12px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          {/* Demo Info */}
          <div style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid #E5E7EB',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#6B7280',
              fontSize: '14px',
              marginBottom: '12px'
            }}>演示账号信息</p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center'
            }}>
              <div style={{
                backgroundColor: '#F9FAFB',
                padding: '12px',
                borderRadius: '4px',
                minWidth: '120px'
              }}>
                <p style={{
                  color: '#9CA3AF',
                  fontSize: '12px',
                  margin: '0 0 4px'
                }}>用户名</p>
                <p style={{
                  fontWeight: '500',
                  margin: '0'
                }}>admin</p>
              </div>
              <div style={{
                backgroundColor: '#F9FAFB',
                padding: '12px',
                borderRadius: '4px',
                minWidth: '120px'
              }}>
                <p style={{
                  color: '#9CA3AF',
                  fontSize: '12px',
                  margin: '0 0 4px'
                }}>密码</p>
                <p style={{
                  fontWeight: '500',
                  margin: '0'
                }}>admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage