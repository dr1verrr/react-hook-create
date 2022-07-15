import { Box, Button, ButtonGroup, ButtonGroupProps } from '@mui/material'
import { memo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

interface LanguageChooseProps extends ButtonGroupProps {
  name: string
}

function LanguageChoose({ name, ...props }: LanguageChooseProps) {
  const { setValue } = useFormContext()

  const fieldName = name || 'language'
  const language = useWatch({ name: fieldName })

  const setLanguage = (lang: string) => {
    setValue(fieldName, lang)
  }

  return (
    <ButtonGroup size='small'>
      <Button
        color={'info'}
        onClick={() => setLanguage('js')}
        variant={language === 'js' ? 'contained' : 'outlined'}
      >
        js
      </Button>
      <Button
        color={'info'}
        onClick={() => setLanguage('ts')}
        variant={language === 'ts' ? 'contained' : 'outlined'}
      >
        ts
      </Button>
      <Button
        color={'info'}
        onClick={() => setLanguage('jsx')}
        variant={language === 'jsx' ? 'contained' : 'outlined'}
      >
        jsx
      </Button>
      <Button
        color={'info'}
        onClick={() => setLanguage('tsx')}
        variant={language === 'tsx' ? 'contained' : 'outlined'}
      >
        tsx
      </Button>
    </ButtonGroup>
  )
}

export default LanguageChoose
