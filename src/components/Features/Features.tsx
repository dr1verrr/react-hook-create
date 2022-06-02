import { Container } from '@mui/material'
import { Box } from '@mui/material'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula'

SyntaxHighlighter.registerLanguage('jsx', jsx)

const codeSample = `const useArray = (initialValue = []) => {
  const [value, setValue] = useState(initialValue)

  const push = element => {
    setValue(oldValue => [...oldValue, element])
  }

  const removeByIndex = idx => {
    setValue(oldValue => oldValue.filter((_, i) => i !== idx))
  }

  const isEmpty = () => value.length === 0

  return { value, setValue, push, removeByIndex, isEmpty }
}
`

const Features = () => {
  return (
    <Container maxWidth='lg' component='main'>
      <Box component='section' pt='30px' pb='30px'>
        <SyntaxHighlighter style={dracula} language='jsx'>
          {codeSample}
        </SyntaxHighlighter>
      </Box>
    </Container>
  )
}

export default Features
