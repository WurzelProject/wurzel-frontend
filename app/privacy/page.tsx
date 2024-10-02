export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">개인정보 처리방침</h1>
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
                    <div className="px-6 py-8 sm:p-10 space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">1. 수집하는 개인정보 항목</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Wurzel Engine은 위키 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>필수항목: 이메일 주소, 비밀번호</li>
                                <li>선택항목: 닉네임, 프로필 이미지</li>
                                <li>자동수집항목: IP 주소, 브라우저 정보, 접속 로그</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">2. 개인정보의 수집 및 이용 목적</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                수집한 개인정보는 다음과 같은 목적으로 이용됩니다:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>위키 서비스 제공 및 운영</li>
                                <li>회원 관리 및 본인 확인</li>
                                <li>콘텐츠 제공 및 문의사항 응대</li>
                                <li>서비스 이용 통계 및 분석</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">3. 개인정보의 보유 및 이용 기간</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                회원의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>회원 가입 및 관리 기록: 3년 (전자상거래등에서의 소비자보호에 관한 법률)</li>
                                <li>위키 문서 편집 기록: 영구 보관 (위키의 특성상 문서의 변경 이력 관리를 위함)</li>
                                <li>IP 주소, 접속 로그: 3개월 (통신비밀보호법)</li>
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">4. 개인정보의 파기 절차 및 방법</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                개인정보 파기 절차 및 방법은 다음과 같습니다:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>파기 절차: 이용자가 회원가입 등을 위해 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정 기간 저장된 후 파기됩니다.</li>
                                <li>파기 방법: 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}