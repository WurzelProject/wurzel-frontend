'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Sun, Moon, User, Bell, Menu, X } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useState, useEffect, useRef } from 'react'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // 임시 추천 키워드 목록
  const dummySuggestions = [
    '위키 작성 방법', '마크다운 문법', 'Wurzel Engine 사용법',
    '문서 편집하기', '협업 기능', '버전 관리', '태그 시스템'
  ]

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredSuggestions = dummySuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSuggestions(filteredSuggestions)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [searchTerm])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        (searchRef.current && !searchRef.current.contains(event.target as Node)) &&
        (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node))
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setShowSuggestions(false)
    setIsMobileMenuOpen(false)
    router.push(`/wiki/${encodeURIComponent(suggestion)}`)
  }

  const renderSuggestions = () => (
    showSuggestions && suggestions.length > 0 && (
      <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden">
        <ul className="py-2">
          {suggestions.map((suggestion, index) => (
            <li key={index}>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white transition-colors duration-150"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
              {index < suggestions.length - 1 && (
                <div className="mx-4 border-t border-gray-200 dark:border-gray-700"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  )

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Wurzel Engine</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                placeholder="검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-100 text-gray-900 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              {renderSuggestions()}
            </div>
            <Link
              href="/announcements"
              className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="공지사항"
            >
              <Bell size={20} />
            </Link>
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
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-300 dark:hover:text-gray-200 dark:hover:bg-gray-800"
            >
              <span className="sr-only">메뉴 열기</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="relative mb-3" ref={mobileSearchRef}>
            <input
              type="text"
              placeholder="검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 text-gray-900 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            {renderSuggestions()}
          </div>
          <Link
            href="/announcements"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
          >
            공지사항
          </Link>
          <button
            onClick={toggleTheme}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {theme === 'light' ? '다크 모드' : '라이트 모드'}
          </button>
          {isLoggedIn ? (
            <Link
              href="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              프로필
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-600"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}