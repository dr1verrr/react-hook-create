import { lazy } from 'react'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'

import style from './MarkdownPreview.module.css'

const CodePreview = lazy(() => import('components/preview/CodePreview'))

export default function MarkdownPreview(props: ReactMarkdownOptions) {
  return (
    <ReactMarkdown
      className={style.reactMarkDown}
      skipHtml={false}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return (
            <CodePreview
              children={String(children).replace(/\n$/, '')}
              language={(match && match[1]) || ''}
              PreTag='div'
            />
          )
        }
      }}
      {...props}
    />
  )
}
