import Link from 'next/link'
import { Github, Shuffle, PenSquare } from 'lucide-react'
import RecentDocuments from '@/components/RecentDocuments'
import RealtimeChart from '@/components/RealtimeChart'

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">Wurzel Engine에 오신 것을 환영합니다</h1>

        <div className="max-w-2xl text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Wurzel Engine은 지식을 쉽게 공유할 수 있는 현대적인 오픈소스 위키 플랫폼이에요.
            <br/>
            여러분의 독창적인 생각을 뿌리내리고, 함께 성장하는 지식의 숲을 만들어보세요.
          </p>
        </div>

        <div className="w-full max-w-4xl">
          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-4 mb-8">
            <Link href="/document/new" className="w-full md:w-auto bg-blue-500 text-white py-3 px-6 rounded-2xl hover:bg-blue-600 transition duration-300 flex items-center justify-center">
              <PenSquare className="mr-2" size={20} />
              새 문서 작성하기
            </Link>
            <Link href="/random" className="w-full md:w-auto bg-green-500 text-white py-3 px-6 rounded-2xl hover:bg-green-600 transition duration-300 flex items-center justify-center">
              <Shuffle className="mr-2" size={20} />
              랜덤 문서 보기
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <RecentDocuments />
            <RealtimeChart />
          </div>

          <div className="text-center">
            <a
                href="https://github.com/WurzelProject"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200"
            >
              <Github size={24} className="mr-2" />
              <span>GitHub에서 기여하기</span>
            </a>
          </div>
        </div>
      </div>
  )
}