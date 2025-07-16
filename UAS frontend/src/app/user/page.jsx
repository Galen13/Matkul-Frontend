'use client'

import UserNavbar from '@/components/userNavbar'
import Link from 'next/link'

export default function UserHomePage() {
  return (
    <div>
      <UserNavbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
          Selamat Datang di{' '}
          <span className="relative whitespace-nowrap text-blue-600">
            <span className="relative">Rumah Literasi Indonesia</span>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          Senang melihat Anda kembali di platform literasi terbesar di Indonesia.
        </p>
      </div>

      <section className="bg-slate-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">Koleksi Buku</h3>
              <p className="mt-4 text-sm text-slate-600">
                Ribuan buku dari berbagai genre tersedia untuk Anda baca dan pinjam.
              </p>
              <Link
                href="/user/books"
                className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                Lihat Semua Buku <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">Cabang Taman Baca</h3>
              <p className="mt-4 text-sm text-slate-600">
                Temukan taman baca kami yang tersebar di berbagai lokasi strategis.
              </p>
              <Link
                href="/user/branches"
                className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                Cari Cabang <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">Riwayat Peminjaman</h3>
              <p className="mt-4 text-sm text-slate-600">
                Lihat catatan buku yang telah Anda pinjam sebelumnya.
              </p>
              <Link
                href="/user/history"
                className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                Lihat Riwayat <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}