import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, ButtonGroup, Container } from '@mui/material'
import { CreateHookForm } from 'forms'
import { CreateHookFormValues } from 'forms/CreateHookForm/index.d'
import _ from 'lodash'
import { ChangeEvent, useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { array, number, object, string } from 'yup'

import SearchHookBar from 'components/search/SearchHookBar/SearchHookBar'
import SearchHookModal from 'components/search/SearchHookModal'

// TODO: Implement effector state management, and replace redux by effector

export const schema = object().shape({
  hooks: array().of(
    object().shape({
      name: string().required('Name is required.').min(4).max(30),
      tags: array()
        .of(
          object().shape({
            id: number(),
            label: string()
          })
        )
        .optional(),
      notes: string().max(500).optional(),
      description: string().max(3000).optional(),
      code: string().required('Code is required.').max(10000),
      related: string().optional(),
      language: string().required().oneOf(['js', 'ts', 'tsx', 'jsx'])
    })
  ),
  prettier: object().shape({})
})

type CreateHooksValues = {
  hooks: CreateHookFormValues[]
  prettier: object
}

type CreateHookFormsProps = {
  single?: boolean
}

// TODO: make validation

export default function CreateHookForms({ single }: CreateHookFormsProps) {
  const defaultValue = {
    id: 0,
    name: 'use',
    tags: [],
    notes: '',
    description: '',
    code: '',
    related: '',
    language: 'js'
  }

  const methods = useForm<CreateHooksValues>({
    defaultValues: {
      hooks: [defaultValue],
      prettier: {}
    },
    resolver: yupResolver(schema),
    shouldFocusError: true,
    shouldUnregister: false
  })

  const [currentFormIndex, setCurrentFormIndex] = useState(0)
  const { fields, replace, append, remove } = useFieldArray({
    control: methods.control,
    name: 'hooks',
    keyName: 'uid'
  })

  useEffect(() => {
    console.log('fields changed', fields)

    setCurrentFormIndex(fields.length - 1)
  }, [fields])

  useEffect(() => {
    console.log('errors', methods.formState.errors)
    console.log('get field state hooks', methods.getFieldState('hooks'))
  }, [fields])

  const form = {
    get: {
      hooks: () => methods.getValues('hooks'),
      prettier: () => methods.getValues('prettier')
    },
    delete: (index: number | number[]) => {
      remove(index)
    },
    deleteAll: () => {
      replace([defaultValue])
    },
    create: () => {
      const ids = form.get.hooks().map(h => h.id)

      append({ ...defaultValue, id: Math.max(...ids) + 1 })
    },
    createByFiles: (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()

      if (e.target.files && e.target.files?.length + fields.length > 30) {
        return toast('Could not add more than 30 hooks at once', { type: 'error' })
      }

      _.forEach(e.target.files, file => {
        const reader = new FileReader()
        reader.readAsText(file)

        reader.onload = () => {
          const splittedFileName = file.name.split('.')

          const ids = form.get.hooks().map(h => h.id)

          append({
            language: splittedFileName.pop(),
            name: splittedFileName.shift(),
            code: `${reader.result}`,
            id: Math.max(...ids) + 1
          })
        }
      })
    },
    onValid: () => {
      console.log('on submit', form.get.hooks())
      toast(`hook(s) submitted`, { icon: '🚀' })
    },
    onInvalid: () => {
      const errors = methods.formState.errors?.hooks
      if (errors) {
        const firstErrorIndex = Number(Object.keys(errors).shift())
        const firstError = errors[firstErrorIndex]

        setCurrentFormIndex(firstErrorIndex)
        toast(`Invalid form fields: ${Object.keys(firstError!).join(', ')}. `, { type: 'error' })
      }
    }
  }

  return (
    <Container maxWidth='lg'>
      {!single && (
        <Box p={1}>
          <Button variant='contained' component='label'>
            Browse
            <input
              type='file'
              accept='.ts, .js, .tsx, .jsx'
              hidden
              multiple
              onChange={form.createByFiles}
            />
          </Button>
          {fields.length < 30 && (
            <Button onClick={form.create} sx={{ mt: 2, mb: 2 }}>
              Add hook
            </Button>
          )}
          {fields.length > 1 && (
            <ButtonGroup variant='outlined' sx={{ display: 'flex' }}>
              <SearchHookModal openElement={<Button>{fields.length}/30</Button>}>
                <SearchHookBar
                  type='local'
                  hooksData={form.get.hooks()}
                  onChoose={(hook, id) => {
                    const formId = fields.findIndex(f => f.id === id)
                    setCurrentFormIndex(formId)
                  }}
                />
              </SearchHookModal>
              <Button onClick={form.deleteAll}>Remove all</Button>
            </ButtonGroup>
          )}
        </Box>
      )}
      <FormProvider {...methods}>
        <Button onClick={methods.handleSubmit(form.onValid, form.onInvalid)} type='submit'>
          Submit
        </Button>
        <Box
          component='form'
          autoComplete='false'
          onSubmit={methods.handleSubmit(form.onValid, form.onInvalid)}
          sx={{ mt: 1 }}
        >
          {fields[currentFormIndex] && (
            <CreateHookForm
              name='hooks'
              key={fields[currentFormIndex].uid}
              id={currentFormIndex}
              showNumber={fields.length > 1}
              onDelete={() => form.delete(currentFormIndex)}
            />
          )}
        </Box>
      </FormProvider>
    </Container>
  )
}
