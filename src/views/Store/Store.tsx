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
import { Box, Container, Grid, TextField } from '@mui/material'
import { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import Tags from 'components/store/Tags'

const schema = yup.object().shape({
  name: yup.string().required('Name is required.').max(30),
  description: yup.string().max(5000).optional().notRequired(),
  notes: yup.string().max(1000).optional().notRequired(),
  code: yup.string().required('Code is required.').max(20000),
  related: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      name: yup.string()
    })
  ),
  tags: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      label: yup.string()
    })
  )
})

//TODO: decompose all related with (name, tag) logic

type Tag = {
  id: number
  label: string
}

export default function Store() {
  const tags = useRef<Tag[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: 'use',
      description: '',
      notes: '',
      code: '',
      related: [],
      tags: []
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
            <Tags tagsRef={tags} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
