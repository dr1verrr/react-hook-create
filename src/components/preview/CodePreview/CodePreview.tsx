import { SyntaxHighlighterProps } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import darcula from 'react-syntax-highlighter/dist/esm/styles/prism/darcula'

SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('ts', typescript)

function CodePreview({ children, ...props }: SyntaxHighlighterProps) {
  return (
    <SyntaxHighlighter
      customStyle={{ overflowY: 'auto', minHeight: 0, maxHeight: 'inherit', height: 'inherit' }}
      language='js'
      style={darcula}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  )
}

export default CodePreview
