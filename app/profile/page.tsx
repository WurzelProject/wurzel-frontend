'use client'

import { useState } from 'react'
import { User, Mail, Key, Edit2, Check, LogOut, FileText } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState('사용자이름')
  const [email, setEmail] = useState('user@example.com')

  const editedPages = [
    { id: 1, title: '인공지능', editedAt: '2023-04-01 14:30' },
    { id: 2, title: '블록체인', editedAt: '2023-03-28 09:15' },
    { id: 3, title: '양자컴퓨팅', editedAt: '2023-03-25 16:45' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile update', { username, email })
    setIsEditing(false)
  }

  const handleLogout = () => {
    console.log('Logout')
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-2xl p-4">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl px-8 pt-8 pb-8 mb-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">프로필</h2>
              <div className="flex space-x-2">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  {isEditing ? <Check size={24} /> : <Edit2 size={24} />}
                </button>
                <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                >
                  <LogOut size={24} />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                  사용자 이름
                </label>
                <div className="flex items-center">
                  <User size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                      className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                  이메일
                </label>
                <div className="flex items-center">
                  <Mail size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                      className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                  비밀번호
                </label>
                <div className="flex items-center">
                  <Key size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <input
                      className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      disabled
                  />
                </div>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isEditing ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
                    type="submit"
                >
                  저장
                </button>
              </div>
            </form>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">최근 편집한 페이지</h3>
              <ul className="space-y-2">
                {editedPages.map((page) => (
                    <li key={page.id} className="flex items-center justify-between">
                      <Link href={`/wiki/${page.title}`} className="flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                        <FileText size={16} className="mr-2" />
                        {page.title}
                      </Link>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{page.editedAt}</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
  )
}