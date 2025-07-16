import './globals.css'
import { AuthProvider } from '@/components/authContext'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Rumah Literasi Indonesia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <AuthProvider>
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}