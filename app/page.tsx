import Link from 'next/link'
import { Github } from 'lucide-react'
import RecentDocuments from '@/components/RecentDocuments'
import RandomDocument from '@/components/RandomDocument'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">Wurzel Engine에 오신 것을 환영합니다</h1>

      {/* 나중에 상황에 따라 삭제될 수도 있음, 생각보다 안 어울리는듯 */}
      <div className="max-w-2xl text-center mb-8">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Wurzel Engine은 지식을 쉽게 공유할 수 있는 현대적인 오픈소스 위키 플랫폼이에요.
          <br/>
          직관적인 인터페이스와 강력한 기능을 통해 여러분의 아이디어를 효과적으로 정리하고 전파할 수 있습니다.
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <RecentDocuments />
          <RandomDocument />
        </div>

        <div className="text-center flex flex-col items-center">
          <Link href="/document/new" className="inline-block bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 mb-4">
            새 문서 작성하기
          </Link>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://github.com/WurzelProject"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200"
            >
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            {/* 추후 다른 소셜 미디어를 여기에 추가할 수도 */}
          </div>
        </div>
      </div>
    </div>
  )
}