import { yupResolver } from '@hookform/resolvers/yup'
import { BaseTextFieldProps, TextField } from '@mui/material'
import { ChangeEvent, FocusEvent, MutableRefObject } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

interface NameFieldProps extends BaseTextFieldProps {
  nameRef: MutableRefObject<string>
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required.').max(30)
})

export default function NameField({ nameRef, ...TextFieldProps }: NameFieldProps) {
  const {
    register,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: 'use'
    }
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.length < 3) setValue('name', 'use')

    if (value.length === 4) {
      setValue(
        'name',
        value
          .split('')
          .filter((_, i) => value.length - 1 !== i)
          .join('') + value[value.length - 1].toUpperCase()
      )
    }

    if (value.includes(' ')) {
      setValue('name', value.replaceAll(' ', ''))
    }
  }

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    nameRef.current = e.target.value
  }

  return (
    <TextField
      required
      variant='outlined'
      inputProps={{
        style: { fontSize: '26px', fontWeight: 700, fontFamily: 'monospace' }
      }}
      fullWidth
      autoFocus
      spellCheck={false}
      error={!!errors?.name?.message}
      helperText={errors?.name?.message}
      {...register('name', { onChange: onChange, onBlur })}
      {...TextFieldProps}
    />
  )
}
