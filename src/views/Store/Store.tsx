/*

TODO: Create a page with capabilities to store hook(s)

* BEHAVIOR:
on redirect to this page user will see...

* FORM:
!1) name
 2) tags
 3) description
 4) notes
!5) code
 6) related hooks list

/name=70%/tags=30%/
/description/
/notes/
/related hooks list/
/code/

? CONDITIONS:
1) watch clipboard. If it's a hook find the name and code, paste it into form automatically.
some links here:
* https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read

2) if no hook found in clipboard add "use" prefix

*/
import { yupResolver } from '@hookform/resolvers/yup'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Box, Chip, Container, Grid, TextField } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required('Name is required.').max(30),
  description: yup.string().max(5000).optional().notRequired(),
  notes: yup.string().max(1000).optional().notRequired(),
  code: yup.string().required('Code is required.').max(20000),
  related: yup.string().optional().notRequired(),
  tag: yup.string().min(3).max(30).trim()
})

interface StoreHookFormInputs {
  name: string
  tag?: string
  description?: string
  notes?: string
  related?: string
  code: string
}

type Tag = {
  id: number
  label: string
}

//TODO: decompose all related with (name, tag) logic

export default function Store() {
  const [tags, setTags] = useState<Tag[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors }
  } = useForm<StoreHookFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: 'use'
    }
  })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.length < 3) setValue('name', 'use')

    if (value.includes(' ')) {
      setValue('name', value.trim())
    }

    if (value.length === 4) {
      setValue(
        'name',
        value
          .split('')
          .filter((_, i) => value.length - 1 !== i)
          .join('') + value[value.length - 1].toUpperCase()
      )
    }
  }

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const tag = value.trim()

    //const validateTag = () => {}

    if (value.includes(' ')) {
      let hasError = false

      if (tags.findIndex(t => t.label === tag) > -1) {
        setError('tag', { type: 'validate', message: 'tag is already exist.' })
        hasError = true
      }

      if (!hasError) {
        yup
          .reach(schema, 'tag')
          .validate(tag)
          .then(() => {
            clearErrors('tag')
            setTags(prev => [...prev, { id: tags.length, label: tag }])
          })
          .catch((err: any) => {
            setError('tag', { type: 'validate', message: err.message })
          })
      }
      setValue('tag', '')
    }
  }

  const onTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && getValues().tag === '') {
      setTags(tags => tags.filter((_, idx) => idx !== tags.length - 1))
    }
  }

  const onSubmit = () => {}

  return (
    <Container maxWidth='lg'>
      <Box component='form' autoComplete='true' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Grid container spacing={3} pt={3} pb={3}>
          <Grid item xs={4}>
            <TextField
              required
              variant='outlined'
              inputProps={{ style: { fontSize: '26px', fontWeight: 700, fontFamily: 'monospace' } }}
              fullWidth
              autoFocus
              spellCheck={false}
              error={!!errors?.name?.message}
              helperText={errors?.name?.message}
              {...register('name', { onChange: handleNameChange })}
            />
          </Grid>
          <Grid item xs={6}>
            <Box flexDirection='column' display='flex' alignItems='flex-start'>
              {!tags.length && (
                <TextField
                  variant='standard'
                  label='#tags'
                  spellCheck={false}
                  error={!!errors?.tag?.message}
                  helperText={errors?.tag?.message}
                  {...register('tag', { onChange: handleTagChange })}
                />
              )}

              <Grid container spacing={1} mt={2}>
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
                      onKeyDown={onTagKeyDown}
                      autoFocus
                      variant='standard'
                      spellCheck={false}
                      error={!!errors?.tag?.message}
                      helperText={errors?.tag?.message}
                      {...register('tag', { onChange: handleTagChange })}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
