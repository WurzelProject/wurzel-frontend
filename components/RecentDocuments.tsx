import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function RecentDocuments() {
  const recentDocs = ['인공지능', '블록체인', '메타버스', '양자컴퓨팅', '사물인터넷']

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-gray-100">
        <BookOpen className="mr-2" /> 최근 문서
      </h2>
      <ul className="space-y-2">
        {recentDocs.map((doc, index) => (
          <li key={index}>
            <Link href={`/wiki/${encodeURIComponent(doc)}`} className="text-blue-600 hover:underline dark:text-blue-400">
              {doc}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}