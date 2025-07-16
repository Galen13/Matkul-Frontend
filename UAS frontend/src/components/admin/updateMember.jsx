'use client'

import { useEffect, useState } from 'react'

export default function UpdateMember({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kelamin: '',
    no_hp: '',
    alamat: ''
  })

  useEffect(() => {
    if (initialData && initialData.id) {
      setFormData({
        nama: initialData.nama || '',
        email: initialData.email || '',
        kelamin: initialData.kelamin || '',
        no_hp: initialData.no_hp || '',
        alamat: initialData.alamat || ''
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-semibold text-black mb-5">Edit Anggota</h2>

      <InputField label="Nama" name="nama" value={formData.nama} onChange={handleChange} />
      <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />

      <SelectField
        label="Jenis Kelamin"
        name="kelamin"
        value={formData.kelamin}
        onChange={handleChange}
        options={[
          { value: '', label: '-- Pilih --' },
          { value: 'Laki-laki', label: 'Laki-laki' },
          { value: 'Perempuan', label: 'Perempuan' }
        ]} />

      <div className="grid md:grid-cols-2 md:gap-6">
        <InputField label="No. HP" name="no_hp" value={formData.no_hp} onChange={handleChange} />
        <InputField label="Alamat" name="alamat" value={formData.alamat} onChange={handleChange} />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                     focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
          Update
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
      <label htmlFor={name} className="block text-sm font-medium text-gray-800 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800" />
    </div>
  )
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="mb-3.5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-800 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 bg-white">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}