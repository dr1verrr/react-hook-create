import { BaseTextFieldProps, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'

import { getError } from 'components/helpers'

interface MarkdownFieldProps extends BaseTextFieldProps {
  maxLength: number
  formName?: string
}

export default function MarkdownField({
  maxLength,
  formName = 'hooks',
  name,
  ...inputProps
}: MarkdownFieldProps) {
  const {
    register,
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext()

  const fieldName = name || 'markdown'

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.length > maxLength) {
      setValue(fieldName, getValues(fieldName))
    } else {
      setValue(fieldName, value)
    }
  }

  return (
    <TextField
      variant='outlined'
      fullWidth
      id='outlined-multiline-static'
      label='Description(Markdown)'
      minRows={4}
      multiline
      spellCheck={false}
      error={!!getError(errors, fieldName)}
      helperText={getError(errors, fieldName)?.message}
      {...register(fieldName, { onChange })}
      {...inputProps}
    />
  )
}
