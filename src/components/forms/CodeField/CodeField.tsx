import { BaseTextFieldProps, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'

import { getError } from 'components/helpers'

//import CounterOf from 'components/helpers/CounterOf'

interface CodeFieldProps extends BaseTextFieldProps {
  maxLength: number
  formName?: string
}

function CodeField({ name, formName = 'hooks', maxLength, ...props }: CodeFieldProps) {
  const {
    register,
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext()

  const fieldName = name || 'code'

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
      inputProps={{
        style: { fontFamily: 'monospace' }
      }}
      variant='outlined'
      fullWidth
      label='Code'
      required
      multiline
      spellCheck={false}
      error={!!getError(errors, fieldName)}
      helperText={getError(errors, fieldName)?.message}
      {...register(fieldName, { onChange })}
      {...props}
    />
  )
}

export default CodeField
