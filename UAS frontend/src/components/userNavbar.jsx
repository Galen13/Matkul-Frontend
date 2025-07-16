'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/components/authContext'

export default function UserNavbar() {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm ring-1 ring-slate-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/user" className="text-xl font-semibold text-slate-900">
            Rumah Literasi Indonesia
          </Link>
          <Link href="/user/books" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            Koleksi Buku
          </Link>
          <Link href="/user/branches" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            Cabang
          </Link>
          <Link href="/user/history" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            Riwayat
          </Link>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
            id="user-menu-button"
            aria-expanded={dropdownOpen}>
            <span className="sr-only">Open user menu</span>
            <Image
              src="/default-avatar.png"
              alt="Profile"
              width={45}
              height={45}
              className="rounded-full border-2 border-gray-300 object-cover" />
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-4 z-50 w-56 bg-white text-slate-800 rounded-lg shadow-md ring-1 ring-slate-200"
              id="user-dropdown">
              <div className="px-4 py-3 border-b border-gray-100">
                <span className="block text-sm font-medium">{user?.username || 'Pengguna'}</span>
                <span className="block text-sm text-gray-500 truncate">{user?.email || 'email@example.com'}</span>
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    href="/user/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-slate-700 cursor-pointer">
                    Profil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-slate-700 cursor-pointer">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}