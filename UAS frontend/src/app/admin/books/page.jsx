'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/api'
import AddBuku from '@/components/admin/addBuku'

export default function AdminBooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books')
      setBooks(res.data)
    } catch (err) {
      console.error('Gagal fetch books:', err)
      setError('Gagal memuat data buku')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleSimpan = async (formData) => {
    try {
      if (isEditing) {
        await api.put(`/books/${editId}`, formData)
      } else {
        await api.post('/books', formData)
      }
      fetchBooks()
      handleBatal()
    } catch (err) {
      console.error('Gagal menyimpan buku:', err)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus buku ini?')) {
      try {
        await api.delete(`/books/${id}`)
        fetchBooks()
      } catch (err) {
        console.error('Gagal menghapus buku:', err)
      }
    }
  }

  const handleEdit = (book) => {
    setEditId(book.id)
    setIsEditing(true)
    setShowForm(true)
  }

  const handleBatal = () => {
    setEditId(null)
    setIsEditing(false)
    setShowForm(false)
  }

  const term = searchTerm.toLowerCase()
  const sortedBooks = [...books]
    .filter(
      (b) =>
        b.id.toString().includes(term) ||
        b.judul.toLowerCase().includes(term)
    )

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">
        Manajemen Buku
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
            id="table-search" type="text" value={searchTerm} placeholder="Cari ID atau judul buku..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg
                      bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <button
          onClick={() => {
            setEditId(null)
            setIsEditing(false)
            setShowForm(true)
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 whitespace-nowrap cursor-pointer">
          Tambah Buku
        </button>
      </div>

      {showForm && (
        <AddBuku
          initialData={isEditing ? books.find(b => b.id === editId) : {}}
          onSubmit={handleSimpan}
          onCancel={handleBatal}
          isEditing={isEditing} />
      )}

      {loading ? (
        <p className="text-gray-600">Memuat data buku...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="relative max-h-[500px] overflow-y-auto overflow-x-hidden rounded-lg shadow-md
                        border border-gray-200 bg-white">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 bg-gray-100 z-10 text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Judul</th>
                <th className="px-6 py-3">Pengarang</th>
                <th className="px-6 py-3">Penerbit</th>
                <th className="px-6 py-3">Tahun Terbit</th>
                <th className="px-6 py-3">Jumlah</th>
                <th className="px-6 py-3">Cabang</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sortedBooks.map((book, index) => (
                <tr
                  key={book.id}
                  className="border-b border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                  <td className="px-6 py-4 font-semibold">{index + 1}</td>
                  <td className="px-6 py-4">{book.judul}</td>
                  <td className="px-6 py-4">{book.pengarang}</td>
                  <td className="px-6 py-4">{book.penerbit}</td>
                  <td className="px-6 py-4">{book.tahun_terbit}</td>
                  <td className="px-6 py-4">{book.jumlah}</td>
                  <td className="px-6 py-4">{book.nama_cabang}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(book)}
                      className="text-blue-600 hover:underline mr-3">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
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