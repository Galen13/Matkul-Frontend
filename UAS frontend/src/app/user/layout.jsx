'use client'

import { AuthProvider } from '@/components/authContext'

export default function UserLayout({ children }) {
  return (
    <AuthProvider>
      <main className="container mx-auto px-4 py-8 flex-1">
        {children}
      </main>
    </AuthProvider>
  )
}