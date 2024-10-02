import React from 'react'
import Link from 'next/link'
import { Edit2, Clock } from 'lucide-react'

interface FloatingToolbarProps {
    documentId: string
}

const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ documentId }) => {
    return (
        <div className="fixed top-20 right-4 z-10">
            <div className="bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-full shadow-lg p-1 flex space-x-1">
                <Link href={`/document/${documentId}`} passHref>
                    <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200">
                        <Edit2 size={20} />
                        <span className="sr-only">수정</span>
                    </button>
                </Link>
                <Link href={`/history/${documentId}`} passHref>
                    <button className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                        <Clock size={20} />
                        <span className="sr-only">역사</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default FloatingToolbar