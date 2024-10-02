import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'

interface Announcement {
    id: number
    title: string
    content: string
    date: string
}

const announcements: Announcement[] = [
    {
        id: 1,
        title: '새로운 기능 업데이트',
        content: 'Wurzel Engine에 새로운 편집 기능이 추가되었습니다. 이제 더욱 쉽게 문서를 작성하고 편집할 수 있습니다.',
        date: '2023-06-15'
    },
    {
        id: 2,
        title: '서버 점검 안내',
        content: '2023년 6월 20일 오전 2시부터 4시까지 서버 점검이 예정되어 있습니다. 이 시간 동안 서비스 이용이 제한될 수 있습니다.',
        date: '2023-06-18'
    },
    {
        id: 3,
        title: '커뮤니티 이벤트 안내',
        content: '다음 주 토요일에 온라인 커뮤니티 밋업을 진행합니다. 많은 참여 부탁드립니다.',
        date: '2023-06-22'
    }
]

export default function Announcements() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                    공지사항
                </h1>
                <div className="space-y-4">
                    {announcements.map((announcement) => (
                        <Link href={`/announcements/${announcement.id}`} key={announcement.id} className="block">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                                <div className="px-6 py-5 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                                            {announcement.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {announcement.date}
                                        </p>
                                    </div>
                                    <FiChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}