'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm ring-1 ring-slate-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-semibold text-slate-900">
            Rumah Literasi Indonesia
          </Link>
          <Link href="/books" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            Koleksi Buku
          </Link>
          <Link href="/branches" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            Cabang
          </Link>
        </div>
        <div>
          <Link
            href="/login"
            className="group inline-flex items-center justify-center rounded-full py-2 px-4 m-1 text-sm font-semibold 
              focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white 
              hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 
              focus-visible:outline-slate-900">
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}