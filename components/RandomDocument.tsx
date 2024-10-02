import { Shuffle } from 'lucide-react'

export default function RandomDocument() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">랜덤 문서</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          랜덤 문서 기능은 위키에 있는 수많은 지식중, 쓸때없는 지식도 알게해주는 재미있는 방법이죠!
          <br/>
          이 버튼을 클릭하면 무작위로 선택된 문서로 이동하여 예상치 못한 흥미로운 정보를 접할 수 있어요
        </p>
      </div>
      <button
        className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 flex items-center justify-center mt-auto"
      >
        <Shuffle className="mr-2" /> 랜덤 문서 보기
      </button>
    </div>
  )
}