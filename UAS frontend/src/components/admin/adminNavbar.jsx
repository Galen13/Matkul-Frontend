'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/components/authContext'
import { useState, useRef, useEffect } from 'react'
import { Home, Book, Users, HandCoins, Building2 } from 'lucide-react'

export default function AdminNavbar() {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const menuItems = [
    { href: '/admin',        label: 'Dashboard',            Icon: Home },
    { href: '/admin/books',  label: 'Manajemen Buku',       Icon: Book },
    { href: '/admin/members',label: 'Manajemen Anggota',    Icon: Users },
    { href: '/admin/loans',  label: 'Manajemen Peminjaman', Icon: HandCoins },
    { href: '/admin/branches',label:'Manajemen Cabang',     Icon: Building2 },
  ]

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between w-full px-4 py-2.5">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="flex items-center cursor-pointer">
              <img src="/logo-rli.png" className="h-8 mr-2" alt="RLI Logo" />
              <span className="text-xl font-semibold whitespace-nowrap dark:text-white">
                Rumah Literasi Indonesia
              </span>
            </Link>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
              aria-expanded={dropdownOpen}>
              <span className="sr-only">Open user menu</span>
              <Image
                src="/default-avatar.png"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border-2 border-gray-600 object-cover" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-4 z-50 w-56 bg-white dark:bg-gray-700 text-slate-800 dark:text-white rounded-lg shadow-md ring-1 ring-slate-200 dark:ring-gray-600">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-600">
                  <span className="block text-sm font-medium">{user?.username || 'Pengguna'}</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user?.email || 'email@example.com'}</span>
                </div>
                <ul className="py-2">
                  <li>
                    <Link
                      href="/admin/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-slate-700 dark:text-white">
                      Profil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600 dark:text-red-400 cursor-pointer">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-16 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">

            {menuItems.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="ml-3">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
}