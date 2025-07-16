'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/api'
import AddLoan from '@/components/admin/addLoan'

export default function AdminLoansPage() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchLoans()
  }, [])

  const fetchLoans = () => {
    api.get('/peminjaman')
      .then(res => setLoans(res.data))
      .catch(err => console.error('Gagal fetch loans:', err))
      .finally(() => setLoading(false))
  }

  const handleSimpan = async (formData) => {
    try {
      if (isEditing) {
        await api.put(`/peminjaman/${editData.id}`, formData)
      } else {
        await api.post('/peminjaman', formData)
      }
      fetchLoans()
      handleBatal()
    } catch (err) {
      console.error('Gagal menyimpan peminjaman:', err)
      alert('Gagal menyimpan data: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleEdit = (loan) => {
    setEditData(loan)
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus peminjaman ini?')) {
      try {
        await api.delete(`/peminjaman/${id}`)
        fetchLoans()
      } catch (err) {
        console.error('Gagal menghapus peminjaman:', err)
        alert('Gagal menghapus data: ' + (err.response?.data?.message || err.message))
      }
    }
  }

  const handleBatal = () => {
    setEditData({})
    setIsEditing(false)
    setShowForm(false)
  }

  const handleTambah = () => {
    setEditData({})
    setIsEditing(false)
    setShowForm(true)
  }

  const term = searchTerm.toLowerCase()
  const filteredLoans = loans.filter(
    (loan) =>
      loan.id.toString().includes(term) ||
      loan.nama_anggota.toLowerCase().includes(term)
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Manajemen Peminjaman</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="relative w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            id="loan-search" type="text" placeholder="Cari ID atau nama anggota..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg
                      bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <button onClick={handleTambah} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer">
          Tambah Peminjaman
        </button>
      </div>

      {showForm && (
        <AddLoan
          initialData={editData}
          onSubmit={handleSimpan}
          onCancel={handleBatal}
          isEditing={isEditing} />
      )}

      {loading ? (
        <p>Memuat data...</p>
      ) : filteredLoans.length === 0 ? (
        <p className="text-gray-600">Tidak ada data peminjaman.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="sticky top-0 bg-gray-100 text-gray-700 text-xs uppercase z-10">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Nama Anggota</th>
                <th className="px-6 py-3">Judul Buku</th>
                <th className="px-6 py-3">Tanggal Pinjam</th>
                <th className="px-6 py-3">Tanggal Kembali</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan, index) => (
                <tr key={loan.id} className={index % 2 === 0 ? 'bg-white border-b border-gray-200' : 'bg-gray-50 border-b border-gray-200'}>
                  <td className="px-6 py-4 font-semibold">{index + 1}</td>
                  <td className="px-6 py-4">{loan.nama_anggota}</td>
                  <td className="px-6 py-4">{loan.judul_buku}</td>
                  <td className="px-6 py-4">{formatDate(loan.tanggal_pinjam)}</td>
                  <td className="px-6 py-4">{formatDate(loan.tanggal_kembali)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleEdit(loan)} className="text-blue-600 hover:underline mr-3">Edit</button>
                    <button onClick={() => handleDelete(loan.id)} className="text-red-600 hover:underline">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID')
}