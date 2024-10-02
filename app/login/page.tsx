'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: api 구현을 하고 구현해야함
    console.log('Login attempt', { email, password })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl px-8 pt-8 pb-8 mb-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">로그인</h2>
          <div className="mb-6">
            <input
              className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
              id="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
              id="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
              type="submit"
              onClick={handleSubmit}
            >
              로그인
            </button>
            <Link href="/signup" className="mt-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              계정이 없으신가요? 회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}