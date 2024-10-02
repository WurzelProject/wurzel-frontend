'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface DocumentView {
    id: string
    title: string
    views: number
}

export default function RealtimeChart() {
    const [data, setData] = useState<DocumentView[]>([])

    useEffect(() => {
        const mockData = [
            { id: "1", title: "Ample/논란 및 사건사고", views: 120 },
            { id: "2", title: "Ample", views: 98 },
            { id: "3", title: "TypeScript", views: 86 },
            { id: "4", title: "Wurzel Wiki", views: 65 },
            { id: "5", title: "아 배고파", views: 54 }
        ]
        setData(mockData)

        const interval = setInterval(() => {
            setData(prevData =>
                prevData.map(item => ({
                    ...item,
                    views: item.views + Math.floor(Math.random() * 10)
                })).sort((a, b) => b.views - a.views)
            )
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-full">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
                <TrendingUp className="mr-2" strokeWidth={2.5} />
                실시간 인기 문서
            </h2>
            <ul className="space-y-4">
                {data.map((item, index) => (
                    <li key={item.id}>
                        <Link href={`/document/${item.id}`} className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-xl transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600">
              <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-3 font-bold ${
                  index === 0 ? 'bg-blue-500 text-white' :
                      index === 1 ? 'bg-blue-400 text-white' :
                          index === 2 ? 'bg-blue-300 text-blue-800' :
                              'bg-gray-300 text-gray-600 dark:bg-gray-500 dark:text-gray-200'
              }`}>
                {index + 1}
              </span>
                            <div className="flex-grow">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {item.views.toLocaleString()} 조회
                                </p>
                            </div>
                            <ChevronRight className="text-gray-400" size={18} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}