'use client'

import { useEffect, useState } from 'react'

export default function AddBranch({ initialData = {}, onSubmit, onCancel, isEditing = false }) {
  const [formData, setFormData] = useState({
    nama_cabang: '',
    alamat: '',
    penanggung_jawab: ''
  })

  useEffect(() => {
    if (isEditing && initialData && initialData.id) {
      setFormData({
        nama_cabang: initialData.nama_cabang || '',
        alamat: initialData.alamat || '',
        penanggung_jawab: initialData.penanggung_jawab || ''
      })
    } else {
      setFormData({
        nama_cabang: '',
        alamat: '',
        penanggung_jawab: ''
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
        {isEditing ? 'Edit Cabang' : 'Tambah Cabang'}
      </h2>

      <InputField
        label="Nama Cabang"
        name="nama_cabang"
        value={formData.nama_cabang}
        onChange={handleChange} />
      <InputField
        label="Alamat"
        name="alamat"
        value={formData.alamat}
        onChange={handleChange} />
      <InputField
        label="Penanggung Jawab"
        name="penanggung_jawab"
        value={formData.penanggung_jawab}
        onChange={handleChange} />

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