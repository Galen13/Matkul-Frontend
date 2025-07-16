'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/authContext'
import Link from 'next/link'
import { Book, Users, Library, Building2 } from 'lucide-react'
import api from '@/utils/api'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const [summaryData, setSummaryData] = useState({
    totalBooks: 0,
    totalMembers: 0,
    totalLoans: 0,
    totalBranches: 0,
  })
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user && user.role === 'admin') {
      const fetchSummaryData = async () => {
        try {
          const booksRes = await api.get('/books')
          const totalBooks = booksRes.data.length

          const membersRes = await api.get('/members')
          const totalMembers = membersRes.data.length

          const loansRes = await api.get('/peminjaman')
          const totalLoans = loansRes.data.length

          const branchesRes = await api.get('/cabang')
          const totalBranches = branchesRes.data.length

          setSummaryData({
            totalBooks,
            totalMembers,
            totalLoans,
            totalBranches,
          })
        } catch (err) {
          console.error('Error fetching summary data:', err)
          setError('Gagal memuat data ringkasan.')
        } finally {
          setDataLoading(false)
        }
      }

      fetchSummaryData()
    } else if (!loading) {
      setDataLoading(false);
    }
  }, [user, loading])

  if (loading || dataLoading) {
    return <p className="pt-16 p-4">Memuat...</p>
  }

  if (!user || user.role !== 'admin') {
    return <p className="pt-16 p-4">Akses ditolak</p>
  }

  if (error) {
    return <p className="pt-16 p-4 text-red-500">{error}</p>
  }

  return (
    <div className="pt-20 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Buku" value={summaryData.totalBooks} icon={Book} />
        <SummaryCard title="Total Anggota" value={summaryData.totalMembers} icon={Users} />
        <SummaryCard title="Total Peminjaman" value={summaryData.totalLoans} icon={Library} />
        <SummaryCard title="Total Cabang" value={summaryData.totalBranches} icon={Building2} />
      </div>

      <h1 className="text-2xl font-semibold text-gray-700 mb-2 mt-12">Aktivitas Terbaru</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card href="/admin/books" title="Manajemen Buku" />
        <Card href="/admin/members" title="Manajemen Anggota" />
        <Card href="/admin/loans" title="Manajemen Peminjaman" />
        <Card href="/admin/branches" title="Manajemen Cabang" />
      </div>
    </div>
  )
}

function SummaryCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-700">{value}</p>
      </div>
      {Icon && <Icon size={48} className="text-indigo-400 opacity-70" />}
    </div>
  )
}

function Card({ title, href }) {
  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm transition hover:shadow-lg">
      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-700">{title}</h2>
      <Link
        href={href}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        View More
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </Link>
    </div>
  )
}