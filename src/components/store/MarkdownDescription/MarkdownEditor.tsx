import { yupResolver } from '@hookform/resolvers/yup'
import { BaseTextFieldProps, Stack, TextField, Typography } from '@mui/material'
import { FocusEvent, lazy, useState } from 'react'
import { useForm } from 'react-hook-form'
import codeTheme from 'react-syntax-highlighter/dist/cjs/styles/prism/darcula'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import * as yup from 'yup'

import style from './MarkdownEditor.module.css'

type MarkdownEditorProps<T> = T &
  (
    | {
        yupRule?: yup.StringSchema<string | undefined>
        maxLength?: number
      }
    | {
        yupRule: yup.StringSchema<string | undefined>
        maxLength: number
      }
  )
//type MarkdownEditorProps = Props &
//  (

//  )

const ReactMarkdown = lazy(() => import('react-markdown'))

SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('ts', typescript)

export default function MarkdownEditor({
  yupRule,
  inputRef,
  maxLength,
  ...TextFieldParams
}: MarkdownEditorProps<BaseTextFieldProps>) {
  const schema = yup.object().shape({
    content: yupRule || yup.string().max(5000).optional()
  })

  const [isEditorActive, setEditorActive] = useState<boolean>(false)
  const {
    register,
    watch,
    formState: { errors }
  } = useForm<{ content: string }>({
    resolver: yupResolver(schema),
    defaultValues: {
      content: ''
    }
  })

  const content = watch('content')

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    setEditorActive(true)
  }

  return (
    <Stack direction='column' spacing={2}>
      <Typography variant='caption'>
        <>
          {content.length}/{maxLength}
        </>
      </Typography>

      <TextField
        inputRef={inputRef}
        variant='outlined'
        fullWidth
        id='outlined-multiline-static'
        label='Description(Markdown)'
        minRows={4}
        multiline
        spellCheck={false}
        error={!!errors?.content?.message}
        helperText={errors?.content?.message}
        onFocus={onFocus}
        onKeyDown={e => {
          if (e.code === 'Tab') {
            e.preventDefault()
          }
        }}
        {...register('content')}
        {...TextFieldParams}
      />
      {isEditorActive && (
        <ReactMarkdown
          className={style.reactMarkDown}
          skipHtml={false}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={codeTheme}
                  language={match ? match[1] : 'js'}
                  PreTag='div'
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {content}
        </ReactMarkdown>
      )}
    </Stack>
  )
}
