'use client'

import { useState } from 'react'
import { FiSend, FiGithub } from 'react-icons/fi'

export default function ContactUs() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage('')

        // TODO: 언젠간 구현할듯
        await new Promise(resolve => setTimeout(resolve, 1000))

        setIsSubmitting(false)
        setSubmitMessage('메시지가 성공적으로 전송되었습니다.')
        setName('')
        setEmail('')
        setMessage('')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">문의하기</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">일반 문의</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">이름</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="홍길동"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">이메일</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="example@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">메시지</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="문의 내용을 입력해주세요."
                                        rows={4}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                                    >
                                        <FiSend className="mr-2" />
                                        {isSubmitting ? '전송 중...' : '전송하기'}
                                    </button>
                                </div>
                            </form>
                            {submitMessage && (
                                <div className="mt-4 text-sm text-center text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800 p-3 rounded-lg">
                                    {submitMessage}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">오픈소스 기여</h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                Wurzel Engine은 오픈소스 프로젝트입니다. 버그 리포트, 기능 제안, 또는 코드 기여를 환영합니다.
                            </p>
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">기여 방법:</h3>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>GitHub 저장소에서 이슈 생성하기</li>
                                    <li>풀 리퀘스트 제출하기</li>
                                    <li>프로젝트 문서 개선하기</li>
                                </ul>
                                <a
                                    href="https://github.com/WurzelProject/wurzel-frontend"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                                >
                                    <FiGithub className="mr-2" />
                                    GitHub에서 기여하기
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}