import { yupResolver } from '@hookform/resolvers/yup'
import { BaseTextFieldProps, Grid, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import * as yup from 'yup'

import TagView from './Tag'

type Tag = {
  id: number
  label: string
}

interface TagsProps extends BaseTextFieldProps {
  maxTagsLength?: number
  tagsName: string
  containerWidth?: number | string
}

const schema = yup.object().shape({
  tag: yup
    .string()
    .min(3)
    .max(30)
    .trim()
    .matches(/^(?!.*[0-9]-[0-9])[a-z0-9]+(-[a-z0-9]+)?$/, 'Incorrect tag name')
    .test('Starts with digits', 'tag could not start with digits', value =>
      isNaN(Number(value?.charAt(0)))
    )
})

function Tags({ tagsName = 'tags', maxTagsLength = 10, containerWidth, ...inputProps }: TagsProps) {
  const {
    register,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors, isDirty }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const { setValue: setContextValue, getValues: getContextValue } = useFormContext()
  const [tags, setTags] = useState<Tag[]>(getContextValue(tagsName) || [])

  useEffect(() => {
    setContextValue(tagsName, tags)
  }, [tags])

  const validateAndCreateTag = async <T extends string>(value: T) => {
    const tag = value.trim().replaceAll(' ', '')
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
      if (e.code === 'Enter') e.preventDefault()

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

  const onDelete = useCallback((tagId: number) => {
    setTags(tags => tags.filter(t => t.id !== tagId))
  }, [])

  return (
    <Stack direction='column' maxWidth='fit-content'>
      <Typography variant='caption' maxWidth='fit-content'>
        {tags.length}/{maxTagsLength}
      </Typography>
      <Grid
        container
        spacing={1}
        flexWrap='wrap'
        width='fit-content'
        maxWidth={containerWidth || '100%'}
        mt={tags.length > 0 ? 1 : 0}
      >
        {tags.map(tag => (
          <TagView key={tag.id} id={tag.id} label={tag.label} onDelete={onDelete} />
        ))}
        {tags.length < maxTagsLength && (
          <Grid item>
            <TextField
              variant='standard'
              autoFocus={isDirty}
              label={tags.length > 0 ? null : '#tag'}
              spellCheck={false}
              error={!!errors.tag}
              helperText={errors?.tag?.message}
              onKeyDown={onKeyDown}
              {...register('tag', { onChange })}
              {...inputProps}
            />
          </Grid>
        )}
      </Grid>
    </Stack>
  )
}

export default Tags
