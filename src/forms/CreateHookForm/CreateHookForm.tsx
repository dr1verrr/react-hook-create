/* eslint-disable no-console */

/*

? CONDITIONS:
1) watch clipboard. If it's a hook find the name and code, paste it into form automatically.
some links here:
* https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read

2) if no hook found in clipboard add "use" prefix

*/
import ClearIcon from '@mui/icons-material/Clear'
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { Suspense, lazy, memo } from 'react'

import {
  CodeField,
  LanguageChoose,
  MarkdownField,
  NameField,
  PrettierField,
  Tags,
  Watch
} from 'components/forms'
import { Modal } from 'components/mui-components'

const MarkdownPreview = lazy(() => import('components/preview/MarkdownPreview'))
const CodePreview = lazy(() => import('components/preview/CodePreview'))

// TODO: make Watch component dynamically typed(fix type issue when pass as children)

type CreateHookFormProps = {
  id: number
  name: string
  showNumber: boolean
  onDelete: () => unknown
}

function CreateHookForm({ id, name, showNumber = false, onDelete }: CreateHookFormProps) {
  const getInputName = (fieldName: string) => {
    return `${name}.${id}.${fieldName}`
  }

  return (
    <Container maxWidth='lg'>
      <Card
        variant='outlined'
        sx={{ mb: 5, pt: 1, pb: 3, position: 'relative', overflow: 'visible' }}
      >
        {showNumber && (
          <Box display='flex' justifyContent='flex-end'>
            <IconButton onClick={onDelete} size='small' sx={{ ml: 1, mr: 1 }}>
              <ClearIcon />
            </IconButton>
          </Box>
        )}
        <Stack direction='row' flexWrap='wrap' justifyContent='space-between'>
          {showNumber && (
            <Badge color='secondary' sx={{ m: 2 }} badgeContent={id ? `${id + 1}` : '1'} />
          )}
        </Stack>
        <Grid container spacing={3} p={2}>
          <Grid item xs>
            <Stack direction='column' spacing={2}>
              <NameField
                id={id}
                formName={name}
                name={getInputName('name')}
                sx={{ maxWidth: 350 }}
              />
              <Tags tagsName={getInputName('tags')} containerWidth={900} maxTagsLength={10} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction='column' spacing={2}>
              <Typography variant='caption'>
                <Watch name={getInputName('description')} render={value => value?.length} />/{3000}
              </Typography>
              <MarkdownField
                name={getInputName('description')}
                label='Description(Markdown)'
                minRows={6}
                maxRows={20}
                sx={{ maxWidth: 700 }}
                maxLength={3000}
                placeholder='this hook does...'
              />

              <Watch
                name={getInputName('description')}
                render={desc =>
                  desc?.length > 0 ? (
                    <Card variant='outlined'>
                      <CardContent sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <Suspense fallback={<CircularProgress />}>
                          <MarkdownPreview children={`${desc}`} />
                        </Suspense>
                      </CardContent>
                    </Card>
                  ) : null
                }
              />
            </Stack>
          </Grid>
          <Grid item xs>
            <Stack direction='column' spacing={2}>
              <Typography variant='caption'>
                <Watch name={getInputName('notes')} render={value => value?.length} />/{500}
              </Typography>
              <MarkdownField
                name={getInputName('notes')}
                label='Notes(Markdown)'
                minRows={4}
                maxRows={12}
                sx={{ maxWidth: 500 }}
                maxLength={500}
                placeholder='some notes here...'
              />
              <Watch
                name={getInputName('notes')}
                render={notes =>
                  notes?.length > 0 ? (
                    <Card variant='outlined'>
                      <CardContent sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <Suspense fallback={<CircularProgress />}>
                          <MarkdownPreview children={`${notes}`} />
                        </Suspense>
                      </CardContent>
                    </Card>
                  ) : null
                }
              />
            </Stack>
          </Grid>
          <Grid item xs>
            <Stack direction='column' spacing={2}>
              <Typography variant='caption'>
                <Watch name={getInputName('code')} render={value => value?.length} />/{10000}
              </Typography>
              <CodeField
                formName='hooks'
                maxLength={10000}
                maxRows={12}
                name={getInputName('code')}
                placeholder='your hook code here...'
              />
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              sx={{ mt: 2 }}
              justifyContent='space-between'
              flexWrap='wrap'
            >
              <Stack direction='row' spacing={2} mr={2}>
                <Modal
                  contentMaxWidth={750}
                  openElement={
                    <Button size='small' variant='outlined'>
                      Prettier
                    </Button>
                  }
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Paper sx={{ overflow: 'auto' }}>
                    <PrettierField name={getInputName('prettier')} minRows={8} />
                  </Paper>
                </Modal>
                <Watch
                  name={getInputName('code')}
                  render={code =>
                    code?.length > 0 ? (
                      <Modal
                        contentMaxWidth={1200}
                        openElement={
                          <Button size='small' variant='outlined'>
                            Preview
                          </Button>
                        }
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Suspense
                          fallback={
                            <CircularProgress
                              sx={{
                                color: '#fff',
                                position: 'absolute',
                                top: '50%',
                                left: '50%'
                              }}
                            />
                          }
                        >
                          <Watch
                            name={getInputName('language')}
                            render={language => (
                              <CodePreview
                                language={`${language}`}
                                showLineNumbers
                                children={`${code}`}
                              />
                            )}
                          />
                        </Suspense>
                      </Modal>
                    ) : null
                  }
                />
              </Stack>

              <LanguageChoose name={getInputName('language')} size='small' />
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

export default memo(CreateHookForm)
