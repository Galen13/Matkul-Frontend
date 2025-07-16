'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/api'
import Navbar from '@/components/Navbar'

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get('/books')
        setBooks(res.data)
      } catch (err) {
        setError('Gagal memuat data buku')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold mb-6">Daftar Buku</h1>

      {loading ? (
        <p className="text-gray-600">Memuat data buku...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : books.length === 0 ? (
        <p className="text-gray-600">Tidak ada buku yang tersedia saat ini.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{book.judul}</h2>
                <p className="text-sm text-gray-600 mb-2">{book.pengarang}</p>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><span className="font-medium">Penerbit:</span> {book.penerbit}</p>
                  <p><span className="font-medium">Tahun Terbit:</span> {book.tahun_terbit}</p>
                  <p><span className="font-medium">Jumlah:</span> {book.jumlah}</p>
                  <p><span className="font-medium">Lokasi Cabang:</span> {book.nama_cabang}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}