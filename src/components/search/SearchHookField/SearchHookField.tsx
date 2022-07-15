import { BaseTextFieldProps, TextField } from '@mui/material'
import { ChangeEvent, memo } from 'react'
import { useFormContext } from 'react-hook-form'

import { Result } from '../SearchHookModal/SearchHookModal'

interface SearchHookFieldProps extends BaseTextFieldProps {
  name?: string
  hooks: Result[]
}

function SearchHookField({ name = 'input', hooks, ...props }: SearchHookFieldProps) {
  const { register, setValue } = useFormContext()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const clean = (text: string) => text.replace(/[^a-zA-Z0-9 ]/g, '')

    const getResults = (filterkeyword: string) => {
      const pattern = new RegExp('\\b' + clean(filterkeyword), 'i')
      return hooks.filter(x => pattern.test(clean(x.name)))
    }

    setValue('results', getResults(e.target.value))
  }

  return (
    <TextField
      autoComplete='off'
      spellCheck={false}
      variant='outlined'
      fullWidth
      autoFocus
      {...register(name, { onChange, max: 30, maxLength: 10 })}
      {...props}
    />
  )
}

export default memo(SearchHookField)
