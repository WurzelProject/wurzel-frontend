import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

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
        content: 'Wurzel Engine에 새로운 편집 기능이 추가되었습니다. 이제 더욱 쉽게 문서를 작성하고 편집할 수 있습니다. 새로운 기능에는 실시간 협업 편집, 버전 관리 시스템, 그리고 향상된 마크다운 지원이 포함됩니다. 이러한 기능들은 사용자들이 더 효율적으로 지식을 공유하고 관리할 수 있도록 도와줄 것입니다. 자세한 사용 방법은 도움말 섹션을 참조해 주세요.',
        date: '2023-06-15'
    },
    {
        id: 2,
        title: '서버 점검 안내',
        content: '2023년 6월 20일 오전 2시부터 4시까지 서버 점검이 예정되어 있습니다. 이 시간 동안 서비스 이용이 제한될 수 있습니다. 점검 내용에는 데이터베이스 최적화, 보안 업데이트, 그리고 새로운 기능 배포가 포함됩니다. 불편을 끼쳐 드려 죄송합니다. 더 나은 서비스를 제공하기 위한 과정이니 양해 부탁드립니다.',
        date: '2023-06-18'
    },
    {
        id: 3,
        title: '커뮤니티 이벤트 안내',
        content: '다음 주 토요일에 온라인 커뮤니티 밋업을 진행합니다. 많은 참여 부탁드립니다. 이번 밋업에서는 Wurzel Engine의 활용 사례를 공유하고, 사용자들 간의 네트워킹 시간을 가질 예정입니다. 또한, 개발팀과의 Q&A 세션도 마련되어 있어 여러분의 의견을 직접 들을 수 있는 기회가 될 것입니다. 참가 신청은 이벤트 페이지에서 할 수 있습니다.',
        date: '2023-06-22'
    }
]

export default function AnnouncementDetail({ params }: { params: { id: string } }) {
    const announcement = announcements.find(a => a.id === parseInt(params.id))

    if (!announcement) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/announcements" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors duration-200">
                    <FiArrowLeft className="mr-2" />
                    <span className="text-sm font-medium">공지사항 목록으로 돌아가기</span>
                </Link>
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {announcement.title}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {announcement.date}
                        </p>
                    </div>
                    <div className="px-6 py-5">
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {announcement.content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}