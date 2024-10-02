'use client'

import { useEffect, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { useParams } from 'next/navigation'
import FloatingToolbar from '@/components/FloatingToolbar'

// TODO: api
const mockMarkdown = `
# 샘플 문서

이것은 **마크다운** 문서의 예시입니다.

## 섹션 1

이 섹션에서는 다양한 마크다운 요소를 보여줍니다.

### 리스트 예시

- 항목 1
- 항목 2
- 항목 3

## 섹션 2

여기에는 [링크 예시](https://example.com)가 있습니다.

### 코드 블록 예시

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

#### 인라인 코드

이것은 \`인라인 코드\` 예시입니다.
`

export default function WikiPage() {
    const params = useParams()
    const [content, setContent] = useState('')

    useEffect(() => {
        // TODO: api
        setContent(mockMarkdown)
    }, [params.slug])

    return (
        <div className="relative min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <FloatingToolbar documentId={params.slug as string} />
            <div className="max-w-4xl mx-auto">
                <article className="prose dark:prose-invert lg:prose-lg mx-auto">
                    <Markdown
                        options={{
                            overrides: {
                                h1: { props: { className: "text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100" } },
                                h2: { props: { className: "text-2xl font-semibold mb-3 mt-6 text-gray-800 dark:text-gray-200" } },
                                h3: { props: { className: "text-xl font-semibold mb-2 mt-4 text-gray-800 dark:text-gray-200" } },
                                h4: { props: { className: "text-lg font-semibold mb-2 mt-4 text-gray-800 dark:text-gray-200" } },
                                p: { props: { className: "mb-4 text-gray-700 dark:text-gray-300" } },
                                a: { props: { className: "text-blue-600 hover:underline dark:text-blue-400" } },
                                ul: { props: { className: "list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300" } },
                                ol: { props: { className: "list-decimal pl-5 mb-4 text-gray-700 dark:text-gray-300" } },
                                li: { props: { className: "mb-1" } },
                                code: { props: { className: "bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono text-gray-800 dark:text-gray-200" } },
                                pre: { props: { className: "bg-gray-100 dark:bg-gray-800 rounded p-4 mb-4 overflow-x-auto" } },
                            },
                        }}
                    >
                        {content}
                    </Markdown>
                </article>
            </div>
        </div>
    )
}