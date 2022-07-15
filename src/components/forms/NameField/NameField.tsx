import { BaseTextFieldProps, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'

import { getError } from 'components/helpers'

interface NameFieldProps extends Omit<BaseTextFieldProps, 'id'> {
  id: number
  formName?: string
}

function NameField({ name, id, formName = 'hooks', ...props }: NameFieldProps) {
  const {
    register,
    formState: { errors },
    setValue
  } = useFormContext()

  const fieldName = name || 'name'

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (!value.startsWith('use')) {
      setValue(fieldName, 'use')
    } else if (value.length === 4) {
      setValue(
        fieldName,
        value
          .split('')
          .filter((_, i) => value.length - 1 !== i)
          .join('') + value[value.length - 1].toUpperCase()
      )
    }

    if (value.includes(' ')) {
      setValue(fieldName, value.replaceAll(' ', ''))
    }
  }

  return (
    <TextField
      required
      variant='outlined'
      inputProps={{
        style: { fontSize: '26px', fontWeight: 500, fontFamily: 'monospace' }
      }}
      fullWidth
      type='text'
      spellCheck={false}
      autoFocus
      error={!!getError(errors, fieldName)}
      helperText={getError(errors, fieldName)?.message}
      {...register(fieldName, { onChange: onChange, pattern: RegExp('[A-Za-z]+') })}
      {...props}
    />
  )
}

export default NameField
