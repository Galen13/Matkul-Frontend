import { AuthProvider } from '@/components/authContext'
import AdminPage from '@/components/admin/adminPage'
import AdminNavbar from '@/components/admin/adminNavbar'

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <AdminPage>
        <AdminNavbar />
        <main className="sm:ml-64 p-4 min-h-screen">
          {children}
        </main>
      </AdminPage>
    </AuthProvider>
  )
}