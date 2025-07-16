'use client'

import { useAuth } from '@/components/authContext'
import UserNavbar from '@/components/userNavbar'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/utils/api'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    username: '',
    password: '',
    kelamin: '',
    no_hp: '',
    alamat: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        nama: user.nama || '',
        email: user.email || '',
        username: user.username || '',
        password: '',
        kelamin: user.kelamin || '',
        no_hp: user.no_hp || '',
        alamat: user.alamat || ''
      })
    }
  }, [user])

  if (loading) {
    return (
      <div>
        <UserNavbar />
        <p className="text-gray-600 mt-20 text-center">Memuat data profil...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div>
        <UserNavbar />
        <p className="text-red-600 mt-20 text-center">Gagal memuat data user.</p>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    try {
      await api.put('/auth/profile', formData)
      setMessage('Profil berhasil diperbarui.')
    } catch (err) {
      console.error('Gagal update profil:', err)
      setMessage('Gagal update profil.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="pt-28 pb-10 bg-white min-h-screen">
      <UserNavbar />
      <div className="w-[96%] md:w-[90%] lg:w-[80%] mx-auto">
        <div className="w-full shadow-2xl p-6 rounded-xl bg-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800">Profil</h1>
          <h2 className="text-sm text-gray-500 mb-6">Edit Profil Pengguna</h2>

          <div className="flex justify-center mb-6">
            <div className="w-[141px] h-[141px] rounded-full bg-gray-100 overflow-hidden border border-gray-300">
              <img
                src="/default-avatar.png"
                alt="Foto Profil"
                className="w-full h-full object-cover" />
            </div>
          </div>

          {message && (
            <p
              className={`text-center font-medium mb-4 ${
                message.includes('berhasil') ? 'text-green-600' : 'text-red-600'
              }`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange} />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange} />
              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Kosongkan jika tidak ingin mengganti" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Jenis Kelamin</label>
                <select
                  name="kelamin"
                  value={formData.kelamin}
                  onChange={handleChange}
                  className="p-3 w-full border rounded-lg bg-gray-50 text-gray-800">
                  <option value="">Pilih</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <InputField
                label="No. Telepon"
                name="no_hp"
                value={formData.no_hp}
                onChange={handleChange} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Alamat</label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="p-3 w-full border rounded-lg bg-gray-50 text-gray-800"
                rows={3}>
              </textarea>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer">
                Kembali
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 cursor-pointer">
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function InputField({ label, name, value, onChange, type = 'text', placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="p-3 w-full border rounded-lg bg-gray-50 text-gray-800" />
    </div>
  )
}