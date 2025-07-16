'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/api'
import AddMember from '@/components/admin/updateMember'

export default function AdminMembersPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(null)
  const [editId, setEditId] = useState(null)

  const fetchMembers = async () => {
    try {
      const res = await api.get('/members')
      setMembers(res.data)
    } catch (err) {
      console.error('Gagal fetch members:', err)
      setError('Gagal memuat data anggota')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleEdit = (member) => {
    setFormData(member)
    setEditId(member.id)
    setShowForm(true)
  }

  const handleSubmit = async (data) => {
    try {
      await api.put(`/members/${editId}`, data)
      fetchMembers()
      resetForm()
    } catch (err) {
      console.error('Gagal memperbarui anggota:', err)
    }
  }

  const resetForm = () => {
    setFormData(null)
    setEditId(null)
    setShowForm(false)
  }

  const term = searchTerm.toLowerCase()
  const filtered = members.filter(
    (m) =>
      m.id.toString().includes(term) ||
      m.nama.toLowerCase().includes(term)
  )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Manajemen Anggota</h1>

      <div className="relative w-full sm:w-72 mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          id="member-search" type="text" value={searchTerm} placeholder="Cari ID atau nama..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
                     focus:ring-blue-500 focus:border-blue-500" />
      </div>

      {showForm && formData && (
        <AddMember
          initialData={formData}
          onSubmit={handleSubmit}
          onCancel={resetForm} />
      )}

      {loading ? (
        <p className="text-gray-600">Memuat data anggota...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-600">Tidak ada data anggota.</p>
      ) : (
        <div className="relative max-h-[500px] overflow-y-auto overflow-x-hidden rounded-lg shadow-md
                        border border-gray-200 bg-white">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 bg-gray-100 z-10 text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Kelamin</th>
                <th className="px-6 py-3">No. HP</th>
                <th className="px-6 py-3">Alamat</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, idx) => (
                <tr key={m.id}
                  className="border-b border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                  <td className="px-6 py-4 font-semibold">{idx + 1}</td>
                  <td className="px-6 py-4">{m.nama}</td>
                  <td className="px-6 py-4">{m.email}</td>
                  <td className="px-6 py-4">{m.kelamin}</td>
                  <td className="px-6 py-4">{m.no_hp}</td>
                  <td className="px-6 py-4">{m.alamat}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(m)}
                      className="text-blue-600 hover:underline">
                      Edit
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