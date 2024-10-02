'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { FiSave, FiLock, FiUnlock, FiHelpCircle } from 'react-icons/fi'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(
    () => import('@uiw/react-md-editor').then((mod) => mod.default),
    { ssr: false }
)

export default function DocumentEditor() {
  const params = useParams()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('# 여기에 내용을 입력하세요')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLocked, setIsLocked] = useState(false)
  const [password, setPassword] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)

  const isNewDocument = params.slug === 'new'

  useEffect(() => {
    if (!isNewDocument) {
      fetchDocument()
    }
  }, [params.slug])

  async function fetchDocument() {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/documents/${params.slug}`)
      if (!response.ok) throw new Error('문서를 불러오는데 실패했습니다')
      const data = await response.json()
      setTitle(data.title)
      setContent(data.content)
      setIsLocked(data.isLocked || false)
    } catch {
      setError('문서를 불러오는데 실패했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const method = isNewDocument ? 'POST' : 'PUT'
      const url = isNewDocument ? '/api/documents' : `/api/documents/${params.slug}`

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, isLocked, password }),
      })

      if (!response.ok) throw new Error('문서 저장에 실패했습니다')

      const data = await response.json()
      router.push(`/wiki/${data.slug}`)
    } catch {
      setError('문서 저장에 실패했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">로딩 중...</div>
  }

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {isNewDocument ? '새 문서 작성' : '문서 편집'}
          </h1>
          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                <p>{error}</p>
              </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="문서 제목"
                  className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700"
                  required
              />
            </div>
            <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <MDEditor
                  value={content}
                  onChange={(value) => setContent(value || '')}
                  preview="live"
                  height={500}
                  className="w-full"
              />
            </div>
            <div className="mb-6 flex items-center">
              <input
                  type="checkbox"
                  id="lockDocument"
                  checked={isLocked}
                  onChange={(e) => setIsLocked(e.target.checked)}
                  className="sr-only"
              />
              <label
                  htmlFor="lockDocument"
                  className="flex items-center cursor-pointer text-gray-700 dark:text-gray-300"
              >
                <div className="relative">
                  <div className="block bg-gray-300 dark:bg-gray-600 w-10 h-6 rounded-full"></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${isLocked ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <span className="ml-3 flex items-center">
                문서 잠그기
                  {isLocked ? (
                      <FiLock className="ml-2 text-blue-500" />
                  ) : (
                      <FiUnlock className="ml-2 text-gray-500 dark:text-gray-400" />
                  )}
              </span>
              </label>
              <div className="relative ml-2">
                <FiHelpCircle
                    className="text-gray-500 dark:text-gray-400 cursor-help"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                />
                {showTooltip && (
                    <div className="absolute z-10 w-64 px-4 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-6">
                      문서를 잠그면 비밀번호를 설정하여 특정 사용자만 접근할 수 있도록 제한할 수 있습니다.
                    </div>
                )}
              </div>
            </div>
            <div className={`mb-6 overflow-hidden transition-all duration-300 ease-in-out ${isLocked ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="문서 비밀번호"
                  className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700"
                  required={isLocked}
              />
            </div>
            <div className="flex justify-end">
              <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSave className="mr-2" size={20} />
                {isLoading ? '저장 중...' : '저장하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}