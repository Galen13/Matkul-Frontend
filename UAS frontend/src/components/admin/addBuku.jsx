'use client'

import { useState, useEffect } from 'react'
import api from '@/utils/api'

export default function AddBuku({ initialData = {}, onSubmit, onCancel, isEditing = false }) {
  const [formData, setFormData] = useState({
    judul: '',
    pengarang: '',
    penerbit: '',
    tahun_terbit: '',
    jumlah: '',
    lokasi_cabang_id: ''
  })

  const [branches, setBranches] = useState([])

  useEffect(() => {
    api.get('/cabang')
      .then(res => setBranches(res.data))
      .catch(err => console.error('Gagal memuat cabang:', err))
  }, [])

  useEffect(() => {
    if (isEditing && initialData && initialData.id) {
      setFormData({
        judul: initialData.judul || '',
        pengarang: initialData.pengarang || '',
        penerbit: initialData.penerbit || '',
        tahun_terbit: initialData.tahun_terbit || '',
        jumlah: initialData.jumlah || '',
        lokasi_cabang_id: initialData.lokasi_cabang_id || ''
      })
    } else {
      setFormData({
        judul: '',
        pengarang: '',
        penerbit: '',
        tahun_terbit: '',
        jumlah: '',
        lokasi_cabang_id: ''
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-semibold text-black mb-5">
        {isEditing ? 'Edit Buku' : 'Tambah Buku'}
      </h2>

      <InputField label="Judul" name="judul" value={formData.judul} onChange={handleChange} />
      <InputField label="Pengarang" name="pengarang" value={formData.pengarang} onChange={handleChange} />
      <InputField label="Penerbit" name="penerbit" value={formData.penerbit} onChange={handleChange} />

      <div className="grid md:grid-cols-2 md:gap-6">
        <InputField
          label="Tahun Terbit"
          name="tahun_terbit"
          type="number"
          value={formData.tahun_terbit}
          onChange={handleChange} />
        <InputField
          label="Jumlah"
          name="jumlah"
          type="number"
          value={formData.jumlah}
          onChange={handleChange} />
      </div>

      <div className="mb-3.5">
        <label htmlFor="lokasi_cabang_id" className="block text-sm font-medium text-gray-800 mb-1">
          Cabang
        </label>
        <select
          id="lokasi_cabang_id"
          name="lokasi_cabang_id"
          value={formData.lokasi_cabang_id}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none
                     focus:ring-2 focus:ring-blue-500"
          required>
          <option value="">-- Pilih Cabang --</option>
          {branches.map(branch => (
            <option key={branch.id} value={branch.id}>
              {branch.nama_cabang}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
          {isEditing ? 'Update' : 'Simpan'}
        </button>
        <button
          type="button"
          onClick={onCancel}
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