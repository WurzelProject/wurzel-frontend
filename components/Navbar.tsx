'use client'

import Link from 'next/link'
import { Search, Sun, Moon, User } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(true) // TODO: api 구현 완료시 나머지 구현예정

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Wurzel Engine</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="검색..."
                className="w-full bg-gray-100 text-gray-900 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="테마 변경"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            {isLoggedIn ? (
              <Link href="/profile" className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                <User size={20} className="mr-1" />
                <span>프로필</span>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  로그인
                </Link>
                <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}