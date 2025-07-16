'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/api'

export default function AddLoan({ initialData = {}, onSubmit, onCancel, isEditing = false }) {
  const [formData, setFormData] = useState({
    member_id: '',
    book_id: '',
    tanggal_pinjam: '',
    tanggal_kembali: ''
  })

  const [members, setMembers] = useState([])
  const [books, setBooks] = useState([])

  const formatDateInput = (date) => {
    if (!date) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    api.get('/members')
      .then(res => setMembers(res.data))
      .catch(err => console.error('Gagal memuat anggota:', err))

    api.get('/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error('Gagal memuat buku:', err))
  }, [])

  useEffect(() => {
    if (isEditing && initialData && initialData.id) {
      setFormData({
        member_id: initialData.member_id || '',
        book_id: initialData.book_id || '',
        tanggal_pinjam: formatDateInput(initialData.tanggal_pinjam),
        tanggal_kembali: formatDateInput(initialData.tanggal_kembali)
      })
    } else {
      setFormData({
        member_id: '',
        book_id: '',
        tanggal_pinjam: '',
        tanggal_kembali: ''
      })
    }
  }, [initialData, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 space-y-4">
      <h2 className="text-xl font-semibold text-black">
        {isEditing ? 'Edit Peminjaman' : 'Tambah Peminjaman'}
      </h2>

      <div>
        <label htmlFor="member_id" className="block mb-1 font-medium text-black">Nama Anggota</label>
        <select
          id="member_id"
          name="member_id"
          value={formData.member_id}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          required>
          <option value="">-- Pilih Anggota --</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>
              {member.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="book_id" className="block mb-1 font-medium text-black">Judul Buku</label>
        <select
          id="book_id"
          name="book_id"
          value={formData.book_id}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-black"
          required>
          <option value="">-- Pilih Buku --</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>
              {book.judul}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Tanggal Pinjam"
          name="tanggal_pinjam"
          type="date"
          value={formData.tanggal_pinjam}
          onChange={handleChange} />
        <InputField
          label="Tanggal Kembali"
          name="tanggal_kembali"
          type="date"
          value={formData.tanggal_kembali}
          onChange={handleChange} />
      </div>


      <div className="flex gap-4">
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
          {isEditing ? 'Update' : 'Simpan'}
        </button>
        <button type="button" onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-black rounded-lg text-sm px-5 py-2.5 cursor-pointer">
          Batal
        </button>
      </div>
    </form>
  )
}

function InputField({ label, name, value, onChange, type = 'text' }) {
  return (
    <div className="mb-3.5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
      />
    </div>
  )
}