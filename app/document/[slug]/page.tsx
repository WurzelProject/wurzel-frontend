'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { FiSave } from 'react-icons/fi'
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

  const isNewDocument = params.slug === 'new'

  useEffect(() => {
    if (!isNewDocument) {
      fetchDocument()
    }
  }, [params.slug])

  async function fetchDocument() {
    setIsLoading(true)
    try {
      // TODO: 쓰읍, 아직 api가 구현이 안되서 무조건 문서 불러오기 실패만 뜰꺼에요
      const response = await fetch(`/api/documents/${params.slug}`)
      if (!response.ok) throw new Error('문서를 불러오는데 실패했습니다')
      const data = await response.json()
      setTitle(data.title)
      setContent(data.content)
    } catch {
      setError('문서를 불러오는데 실패했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  // TODO: 여기도 마찬가지
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
        body: JSON.stringify({ title, content }),
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