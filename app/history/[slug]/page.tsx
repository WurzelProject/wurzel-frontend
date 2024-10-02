'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FiClock, FiUser, FiExternalLink } from 'react-icons/fi'

interface Revision {
  id: string
  timestamp: string
  author: string
  description: string
}

// Mock data
const mockRevisions: Revision[] = [
  {
    id: '5',
    timestamp: '2023-06-05T11:20:00Z',
    author: 'Ample',
    description: '최신 정보로 업데이트'
  },
  {
    id: '4',
    timestamp: '2023-06-04T16:45:00Z',
    author: 'AmpleTwo',
    description: '이미지 추가 및 레이아웃 개선'
  },
  {
    id: '3',
    timestamp: '2023-06-03T09:15:00Z',
    author: 'AmpleThree',
    description: '새로운 섹션 추가'
  },
  {
    id: '2',
    timestamp: '2023-06-02T14:30:00Z',
    author: 'AmpleFour',
    description: '오타 수정 및 내용 추가'
  },
  {
    id: '1',
    timestamp: '2023-06-01T10:00:00Z',
    author: 'AmpleFive',
    description: '초기 문서 작성'
  }
]

export default function DocumentHistory() {
  const params = useParams()
  const [revisions, setRevisions] = useState<Revision[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('')

  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      setRevisions(mockRevisions)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">문서 수정 이력</h1>
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {revisions.map((revision, index) => (
              <li key={revision.id} className={index === 0 ? "bg-blue-50 dark:bg-blue-900" : ""}>
                <div className="px-4 py-5 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                      {revision.description}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <Link href={`/wiki/${params.slug}?revision=${revision.id}`} className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                        <FiExternalLink className="mr-1" />
                        보기
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex items-center">
                      <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiUser className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        {revision.author}
                      </p>
                      {index === 0 && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          최신
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                      <FiClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <p>
                        <time dateTime={revision.timestamp}>{new Date(revision.timestamp).toLocaleString()}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}