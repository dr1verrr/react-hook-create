import { ListProps } from '@mui/material'
import { useWatch } from 'react-hook-form'

import SearchHookItems from '../SearchHookItems/SearchHookItems'

interface SearchHookResultsProps extends ListProps {
  name?: string
}

// TODO: optimize with slice. Implement infinite scroll

export default function SearchHookResults({
  name = 'results',
  ...listProps
}: SearchHookResultsProps) {
  const results = useWatch({ name })

  return <SearchHookItems results={results} />
}
