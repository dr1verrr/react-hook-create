import { yupResolver } from '@hookform/resolvers/yup'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { BaseTextFieldProps, Box, Chip, Grid, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type Tag = {
  id: number
  label: string
}

interface TagsProps extends BaseTextFieldProps {
  tagsRef: React.MutableRefObject<Tag[] | any[]>
  containerWidth?: number | string
}

const schema = yup.object().shape({
  tag: yup
    .string()
    .min(3)
    .max(30)
    .trim()
    .matches(/^(?!.*[0-9]-[0-9])[a-z0-9]+(-[a-z0-9]+)?$/, 'Incorrect tag name')
    .test(
      'Starts with digits',
      'tag could not start with digits', // a message can also be a function
      value => isNaN(Number(value?.charAt(0)))
    )
})

export default function Tags({ tagsRef, containerWidth, ...inputProps }: TagsProps) {
  const [tags, setTags] = useState<Tag[]>([])
  const {
    register,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors }
  } = useForm<{ tag: string }>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    tagsRef.current = tags
  }, [tags])

  const validateAndCreateTag = async <T extends string>(value: T) => {
    const tag = value.trim()
    const isTagExist = tags.findIndex(t => t.label === tag) > -1

    if (isTagExist) {
      setError('tag', { type: 'validate', message: 'tag is already exist.' })
    }

    if (!isTagExist) {
      try {
        await yup.reach(schema, 'tag').validate(tag)

        clearErrors('tag')
        setTags(prev => [...prev, { id: (tags?.pop()?.id as number) + 1 || 0, label: tag }])
      } catch (err: any) {
        setError('tag', { type: 'validate', message: err.message })
      }
    }
  }

  const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Backspace' && getValues().tag === '') {
      setTags(tags => tags.filter((_, idx) => idx !== tags.length - 1))
    }

    if (e.code === 'Enter' || e.code === 'Space') {
      await validateAndCreateTag(getValues('tag')!)
      setValue('tag', '')
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.includes(' ')) {
      setValue('tag', '')
    }
  }

  return (
    <Stack direction='column'>
      <Typography variant='caption'>{tags.length}/10</Typography>
      <Box flexDirection='column' display='flex' alignItems='flex-start'>
        {!tags.length && (
          <TextField
            variant='standard'
            label='#tag'
            spellCheck={false}
            error={!!errors?.tag?.message}
            helperText={errors?.tag?.message}
            onKeyDown={onKeyDown}
            {...register('tag', { onChange })}
            {...inputProps}
          />
        )}

        <Grid container spacing={1} mt={2} flexWrap='wrap' width={containerWidth || '100%'}>
          {tags.map(tag => (
            <Grid key={tag.id} item>
              <Chip
                color='primary'
                key={tag.id}
                label={tag.label}
                variant='outlined'
                deleteIcon={<HighlightOffIcon />}
                onDelete={() => {
                  setTags(tags => tags.filter(t => t.id !== tag.id))
                }}
              />
            </Grid>
          ))}
          {tags.length > 0 && tags.length !== 10 && (
            <Grid item>
              <TextField
                autoFocus
                variant='standard'
                spellCheck={false}
                error={!!errors?.tag?.message}
                helperText={errors?.tag?.message}
                onKeyDown={onKeyDown}
                {...register('tag', { onChange: onChange })}
                {...inputProps}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Stack>
  )
}
