'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/authContext'

export default function AdminPage({ children }) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== 'admin')) {
      router.push('/')
    }
  }, [loading, isAuthenticated, user, router])

  if (loading || !isAuthenticated || user?.role !== 'admin') {
    return <p className="p-4 text-center">Mengalihkan...</p>
  }

  return children
}