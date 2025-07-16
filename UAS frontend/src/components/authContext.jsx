'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import api from '@/utils/api'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
  }, [])

  const getCurrentUser = async () => {
    try {
      const res = await api.get('/auth/profile')
      setUser(res.data)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      await api.post('/auth/login', { username, password })
      const res = await api.get('/auth/profile')
      setUser(res.data)

      if (res.data.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/user')
      }
    } catch (err) {
      throw new Error(err?.response?.data?.message || 'Login gagal')
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
      setUser(null)
      router.push('/')
    } catch (err) {
      console.error('Logout gagal:', err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)