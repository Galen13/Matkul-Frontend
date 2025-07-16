'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/api'
import UserNavbar from '@/components/userNavbar'

export default function HistoryPage() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/peminjaman/user')
        setHistory(res.data)
      } catch (err) {
        setError('Gagal memuat riwayat peminjaman')
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const formatDate = (isoString) => {
    if (!isoString) return '-'
    const date = new Date(isoString)
    if (isNaN(date)) return '-'
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const getStatus = (tglKembali) => {
    if (!tglKembali) return 'Sedang Dipinjam'
    return 'Sudah Dikembalikan'
  }

  const sortedHistory = [...history].sort((a, b) => a.id - b.id)

  return (
    <div>
      <UserNavbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <h1 className="text-2xl font-bold mb-6 text-slate-800">Riwayat Peminjaman Anda</h1>

        {loading ? (
          <p className="text-gray-600">Memuat riwayat...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : history.length === 0 ? (
          <p className="text-gray-600">Belum ada riwayat peminjaman.</p>
        ) : (
          <div className="relative max-h-[500px] overflow-y-auto overflow-x-hidden rounded-lg shadow-md border border-gray-200 bg-white">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="sticky top-0 bg-gray-100 z-10 text-xs text-gray-700 uppercase">
                <tr>
                  <th className="px-6 py-3">No</th>
                  <th className="px-6 py-3">Judul Buku</th>
                  <th className="px-6 py-3">Tanggal Pinjam</th>
                  <th className="px-6 py-3">Tanggal Kembali</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedHistory.map((item, index) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold">{index + 1}</td>
                    <td className="px-6 py-4">{item.judul}</td>
                    <td className="px-6 py-4">{formatDate(item.tanggal_pinjam)}</td>
                    <td className="px-6 py-4">{formatDate(item.tanggal_kembali)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          getStatus(item.tanggal_kembali) === 'Sedang Dipinjam'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                        {getStatus(item.tanggal_kembali)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}