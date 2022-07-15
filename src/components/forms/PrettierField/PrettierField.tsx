import { BaseTextFieldProps, TextField } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

interface PrettierFieldProps extends BaseTextFieldProps {}

export default function PrettierField({ name, ...props }: PrettierFieldProps) {
  const {
    register,
    getValues,
    setValue,
    formState: { isDirty }
  } = useFormContext()
  const fieldName = name || 'prettier'

  const prettierrcDefault = {
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    arrowParens: 'avoid',
    tabWidth: 2,
    useTabs: false,
    trailingComma: 'none'
  }

  const prev = useRef(getValues(fieldName))

  const onUnmount = () => {
    const prettierConfig = getValues(fieldName)

    try {
      const parsedConfig = JSON.parse(prettierConfig)
      if (Object.keys(parsedConfig).length === 0) {
        throw new Error()
      }
      if (prettierConfig !== prev.current) {
        toast('💾 Prettier config saved.')
      }
    } catch (err) {
      if (prettierConfig.trim() === '') {
        if (!isDirty) {
          setValue(fieldName, JSON.stringify(prettierrcDefault, null, 2))
          toast('🚀 No prettier rules. Instead set the default.')
        } else {
          if (prev.current !== prettierConfig.trim()) {
            setValue(fieldName, prettierConfig.trim())
            toast('💾 No prettier rules.')
          }
        }
      } else {
        setValue(fieldName, JSON.stringify(prettierrcDefault, null, 2))
        toast('Invalid prettier config. Instead set the default.', { type: 'error' })
      }
    } finally {
      prev.current = getValues(fieldName)
    }
  }

  useEffect(() => {
    return () => onUnmount()
  }, [])

  return (
    <TextField
      autoFocus
      inputProps={{
        style: { fontFamily: 'monospace' }
      }}
      variant='filled'
      fullWidth
      placeholder='{
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid",
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "none"
}'
      label='Prettier rules'
      required
      multiline
      spellCheck={false}
      {...register(fieldName)}
      {...props}
    />
  )
}
