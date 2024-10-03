'use client'

import { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import FloatingToolbar from '@/components/FloatingToolbar'
import { FiAlertCircle, FiHome, FiPlus } from 'react-icons/fi'

interface Document {
    content: string
    isPrivate: boolean
}

// Mock data
const mockDocuments: { [key: string]: Document } = {
    'public-doc': {
        content: `
# 공개 문서

이 문서는 누구나 볼 수 있는 공개 문서입니다.

## 섹션 1

여기에 공개 내용이 들어갑니다.

## 섹션 2

더 많은 공개 내용이 여기에 있습니다.
    `,
        isPrivate: false
    },
    'private-doc': {
        content: `
# 비공개 문서

이 문서는 액세스 토큰이 필요한 비공개 문서입니다.

## 기밀 섹션

여기에 비공개 내용이 들어갑니다.

## 또 다른 기밀 섹션

더 많은 비공개 내용이 여기에 있습니다.
    `,
        isPrivate: true
    }
}

const MOCK_ACCESS_TOKEN = 'secret123'

export default function WikiPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [document, setDocument] = useState<Document | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [accessToken, setAccessToken] = useState(searchParams.get('access_token') || '')

    useEffect(() => {
        fetchDocument()
    }, [params.slug, accessToken])

    function fetchDocument() {
        setIsLoading(true)
        setError('')

        setTimeout(() => {
            const doc = mockDocuments[params.slug as string]
            if (!doc) {
                setError('문서를 찾을 수 없습니다')
                setIsLoading(false)
                return
            }

            if (doc.isPrivate && accessToken !== MOCK_ACCESS_TOKEN) {
                setDocument({ content: '', isPrivate: true })
            } else {
                setDocument(doc)
            }
            setIsLoading(false)
        }, 1000)
    }

    function handleAccessTokenSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        fetchDocument()
    }

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">로딩 중...</div>
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full">
                    <div className="flex items-center justify-center mb-6">
                        <FiAlertCircle className="text-red-500 w-16 h-16" />
                    </div>
                    <h1 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
                        문서를 찾을 수 없습니다
                    </h1>
                    <p className="text-center mb-8 text-gray-600 dark:text-gray-400">
                        요청하신 문서를 찾을 수 없습니다. 새로운 문서를 생성하시겠습니까?
                    </p>
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={() => router.push('/')}
                            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                        >
                            <FiHome className="mr-2" />
                            홈으로 돌아가기
                        </button>
                        <button
                            onClick={() => router.push(`/document/new?title=${params.slug}`)}
                            className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200"
                        >
                            <FiPlus className="mr-2" />
                            새 문서 생성하기
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (document?.isPrivate && !document.content) {
        return (
            <div className="flex justify-center items-center h-screen">
                <form onSubmit={handleAccessTokenSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">비공개 문서</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">이 문서에 접근하려면 액세스 토큰이 필요합니다.</p>
                    <input
                        type="text"
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
                        placeholder="액세스 토큰 입력"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        접근하기
                    </button>
                </form>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <FloatingToolbar documentId={params.slug as string} />
            <div className="max-w-4xl mx-auto">
                <article className="prose dark:prose-invert lg:prose-lg mx-auto">
                    <Markdown
                        options={{
                            overrides: {
                                h1: { props: { className: "text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100" } },
                                h2: { props: { className: "text-2xl font-semibold mb-3 mt-6 text-gray-800 dark:text-gray-200" } },
                                h3: { props: { className: "text-xl font-semibold mb-2 mt-4 text-gray-800 dark:text-gray-200" } },
                                h4: { props: { className: "text-lg font-semibold mb-2 mt-4 text-gray-800 dark:text-gray-200" } },
                                p: { props: { className: "mb-4 text-gray-700 dark:text-gray-300" } },
                                a: { props: { className: "text-blue-600 hover:underline dark:text-blue-400" } },
                                ul: { props: { className: "list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300" } },
                                ol: { props: { className: "list-decimal pl-5 mb-4 text-gray-700 dark:text-gray-300" } },
                                li: { props: { className: "mb-1" } },
                                code: { props: { className: "bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono text-gray-800 dark:text-gray-200" } },
                                pre: { props: { className: "bg-gray-100 dark:bg-gray-800 rounded p-4 mb-4 overflow-x-auto" } },
                            },
                        }}
                    >
                        {document?.content || ''}
                    </Markdown>
                </article>
            </div>
        </div>
    )
}