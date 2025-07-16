'use client'

import { useState } from 'react'
import { useAuth } from '@/components/authContext'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(username, password)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
              <Image
                src="/logo-rli.png"
                alt="Rumah Literasi Indonesia"
                width={200}
                height={80}
                className="h-30 w-auto"
                priority
              />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Masuk ke Akun Anda
          </h1>
          <Link href="/" className="text-3xl font-semibold mt-4 tracking-tight text-blue-600">Rumah Literasi Indonesia</Link>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-4 rounded bg-red-100 p-3 text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              name="username"
              value={username}
              onChange={setUsername} />
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={setPassword} />
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              {isLoading ? 'Memuat...' : 'Login'}
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Daftar di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

function Input({ label, name, value, onChange, type = 'text' }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" />
    </div>
  )
}