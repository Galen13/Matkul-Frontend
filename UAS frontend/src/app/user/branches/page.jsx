'use client'

import { useEffect, useState } from 'react'
import api from '@/utils/api'
import UserNavbar from '@/components/userNavbar'

export default function BranchesPage() {
  const [branches, setBranches] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await api.get('/cabang')
        setBranches(res.data)
      } catch (err) {
        setError('Gagal memuat data cabang')
      } finally {
        setLoading(false)
      }
    }

    fetchBranches()
  }, [])

  const filteredBranches = [...branches]
    .filter((branch) =>
      branch.nama_cabang.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.id - b.id)

  return (
    <div>
      <UserNavbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <h1 className="text-2xl font-bold mb-6 text-slate-800">Daftar Cabang</h1>

        {loading ? (
          <p className="text-gray-600">Memuat data cabang...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            <div className="pb-4 bg-white">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 w-full max-w-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Cari nama cabang..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className="relative max-h-[500px] overflow-y-auto overflow-x-hidden rounded-lg shadow-md border border-gray-200 bg-white">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="sticky top-0 bg-gray-100 z-10 text-xs text-gray-700 uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3">No</th>
                    <th scope="col" className="px-6 py-3">Nama Cabang</th>
                    <th scope="col" className="px-6 py-3">Alamat</th>
                    <th scope="col" className="px-6 py-3">Penanggung Jawab</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBranches.map((branch, index) => (
                    <tr
                      key={branch.id}
                      className="bg-white border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold">{index + 1}</td>
                      <td className="px-6 py-4">{branch.nama_cabang}</td>
                      <td className="px-6 py-4">{branch.alamat}</td>
                      <td className="px-6 py-4">{branch.penanggung_jawab}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}