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
import { Box, Button, Container, Grid, Stack } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import MarkdownEditor from 'components/store/MarkdownDescription'
import NameField from 'components/store/NameField'
import Tags from 'components/store/Tags'

const schema = yup.object().shape({
  name: yup.string().required('Name is required.').max(30),
  notes: yup.string().max(1000).optional().notRequired(),
  code: yup.string().required('Code is required.').max(20000),
  related: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      name: yup.string()
    })
  )
})

type Tag = {
  id: number
  label: string
}

export default function Store() {
  const tags = useRef<Tag[]>([])
  const description = useRef<string>('')
  const name = useRef<string>('use')
  const notes = useRef<string>('')

  const { handleSubmit } = useForm()

  const onSubmit = () => {
    console.log(tags.current, description.current, notes.current)
  }

  return (
    <Container maxWidth='lg'>
      <Box component='form' autoComplete='true' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Grid container spacing={3} p={2}>
          <Grid item xs>
            <Stack direction='row' spacing={2} flexWrap='nowrap'>
              <NameField nameRef={name} sx={{ maxWidth: 350 }} />
              <Tags tagsRef={tags} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <MarkdownEditor
              minRows={8}
              inputRef={description}
              maxRows={20}
              sx={{ maxWidth: 700 }}
              yupRule={yup.string().max(2500).optional()}
              maxLength={2500}
            />
          </Grid>
          <Grid item xs>
            <MarkdownEditor
              label='Notes(Markdown)'
              minRows={4}
              inputRef={notes}
              maxRows={12}
              sx={{ maxWidth: 500 }}
              yupRule={yup.string().max(500).optional()}
              maxLength={500}
            />
          </Grid>
        </Grid>

        <Button type='submit'>Submit</Button>
      </Box>
    </Container>
  )
}
