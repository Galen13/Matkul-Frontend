'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/api'
import AddBranch from '@/components/admin/addBranch'

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const fetchBranches = async () => {
    try {
      const res = await api.get('/cabang')
      setBranches(res.data)
    } catch (err) {
      console.error('Gagal fetch branches:', err)
      setError('Gagal memuat data cabang')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBranches()
  }, [])

  const handleSimpan = async (formData) => {
    try {
      if (isEditing) {
        await api.put(`/cabang/${editId}`, formData)
      } else {
        await api.post('/cabang', formData)
      }
      fetchBranches()
      handleBatal()
    } catch (err) {
      console.error('Gagal menyimpan cabang:', err)
    }
  }

  const handleEdit = (branch) => {
    setEditId(branch.id)
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus cabang ini?')) {
      try {
        await api.delete(`/cabang/${id}`)
        fetchBranches()
      } catch (err) {
        console.error('Gagal menghapus cabang:', err)
      }
    }
  }

  const handleBatal = () => {
    setEditId(null)
    setIsEditing(false)
    setShowForm(false)
  }

  const term = searchTerm.toLowerCase()
  const filteredBranches = branches
    .filter(
      (c) =>
        c.id.toString().includes(term) ||
        c.nama_cabang.toLowerCase().includes(term)
    )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">
        Manajemen Cabang
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div className="relative w-full sm:w-72">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            id="branch-search" type="text" value={searchTerm} placeholder="Cari ID atau nama cabang..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
                      focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <button
          onClick={() => {
            setEditId(null)
            setIsEditing(false)
            setShowForm(true)
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 whitespace-nowrap cursor-pointer">
          Tambah Cabang
        </button>
      </div>

      {showForm && (
        <AddBranch
          initialData={isEditing ? branches.find(c => c.id === editId) : {}}
          onSubmit={handleSimpan}
          onCancel={handleBatal}
          isEditing={isEditing} />
     )}

      {loading ? (
        <p className="text-gray-600">Memuat data cabang...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="relative max-h-[500px] overflow-y-auto overflow-x-hidden rounded-lg shadow-md
                        border border-gray-200 bg-white">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 bg-gray-100 z-10 text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Nama Cabang</th>
                <th className="px-6 py-3">Alamat</th>
                <th className="px-6 py-3">Penanggung Jawab</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((branch, index) => (
                <tr key={branch.id}
                  className="border-b border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                  <td className="px-6 py-4 font-semibold">{index + 1}</td>
                  <td className="px-6 py-4">{branch.nama_cabang}</td>
                  <td className="px-6 py-4">{branch.alamat}</td>
                  <td className="px-6 py-4">{branch.penanggung_jawab}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(branch)}
                      className="text-blue-600 hover:underline mr-3">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(branch.id)}
                      className="text-red-600 hover:underline">
                      Hapus
                    </button>
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