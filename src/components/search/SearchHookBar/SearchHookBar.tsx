import { Card, Paper, Stack } from '@mui/material'
import { KeyboardEvent, createContext, useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import SearchHookField from '../SearchHookField'
import { Result, SearchFormValues, useSearchHookModal } from '../SearchHookModal/SearchHookModal'
import SearchHookResults from '../SearchHookResults'

type SearchHookBarProps = { onChoose: (hook: Result, id: number) => unknown } & (
  | {
      hooksData?: Result[]
      type?: 'global'
    }
  | {
      hooksData: Result[]
      type?: 'local'
    }
)

type SearchHookBarContextType = {
  onChoose: (hook: Result, id: number) => unknown
}

const SearchHookBarContext = createContext({} as SearchHookBarContextType)

export const useSearchHookBar = () => useContext(SearchHookBarContext)

export default function SearchHookBar({
  onChoose,
  hooksData = [],
  type = 'local'
}: SearchHookBarProps) {
  const [hooks, setHooks] = useState(hooksData)

  const methods = useForm<SearchFormValues>({
    defaultValues: {
      input: '',
      results: hooks,
      selectedId: 0
    }
  })

  useEffect(() => {
    if (type === 'global') {
      const fetchHooks = () => {}
    }
  }, [])

  useEffect(() => {
    methods.setValue('results', hooks)
  }, [hooks])

  const { onClose } = useSearchHookModal()

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const selectedId = methods.getValues('selectedId')
    const results = methods.getValues('results')

    if (e.code === 'Enter') {
      onClose()
      onChoose(results[selectedId], results[selectedId].id)
    }

    if (e.code === 'ArrowUp') {
      if (selectedId > 0) {
        methods.setValue('selectedId', selectedId - 1)
      }

      if (selectedId === 0) {
        methods.setValue('selectedId', results.length - 1)
      }
    }

    if (e.code === 'ArrowDown') {
      if (selectedId < results.length - 1) {
        methods.setValue('selectedId', selectedId + 1)
      }

      if (selectedId === results.length - 1) {
        methods.setValue('selectedId', 0)
      }
    }

    if (e.code !== 'Enter' && e.code !== 'ArrowDown' && e.code !== 'ArrowUp') {
      methods.setValue('selectedId', 0)
    }
  }

  return (
    //<Box
    //  minWidth={0}
    //  width={600}
    //  maxWidth={600}
    //  margin={2}
    //  height='fit-content'
    //  maxHeight='85vh'
    //  marginTop='10vh'
    //>
    <FormProvider {...methods}>
      <Stack direction='column' spacing={2}>
        <SearchHookBarContext.Provider value={{ onChoose }}>
          <Paper>
            <SearchHookField
              onKeyDown={onKeyDown}
              hooks={hooks}
              inputProps={{ style: { fontFamily: 'monospace', fontSize: '25px' } }}
            />
          </Paper>
          <Card variant='outlined'>
            <SearchHookResults />
          </Card>
        </SearchHookBarContext.Provider>
      </Stack>
    </FormProvider>
    //</Box>
  )
}
