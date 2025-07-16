'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/api'
import Navbar from '@/components/Navbar'

export default function BranchesPage() {
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await api.get('/cabang')
        setBranches(res.data)
      } catch (err) {
        setError('Gagal memuat data cabang')
      } finally {
        setLoading(false)
      }
    }

    fetchBranches()
  }, [])

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold mb-6">Daftar Cabang</h1>

      {loading ? (
        <p className="text-gray-600">Memuat data cabang...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : branches.length === 0 ? (
        <p className="text-gray-600">Tidak ada cabang yang tersedia saat ini.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-lg shadow p-4"
            >
              <h2 className="text-xl font-semibold mb-2">{branch.nama_cabang}</h2>
              <p className="text-gray-700"><span className="font-medium">Alamat:</span> {branch.alamat}</p>
              <p className="text-gray-700"><span className="font-medium">Penanggung Jawab:</span> {branch.penanggung_jawab}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}