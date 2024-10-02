import Link from 'next/link'

export default function Footer() {
  return (
      <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © 2024 Wurzel Engine. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/terms" className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
              이용약관
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
              개인정보처리방침
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
              문의하기
            </Link>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Made with <span className="text-red-500">❤</span> by naijun0403
          </p>
        </div>
      </footer>
  )
}