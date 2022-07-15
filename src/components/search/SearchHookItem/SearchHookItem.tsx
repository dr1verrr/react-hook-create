import { ListItemText, MenuItem, MenuItemProps } from '@mui/material'
import { useWatch } from 'react-hook-form'

import { Result } from '../SearchHookModal/SearchHookModal'

interface SearchHookItemProps extends MenuItemProps {
  idx: number
  result: Result
}

function SearchHookItem({ result, idx, ...props }: SearchHookItemProps) {
  const selectedId = useWatch({ name: 'selectedId' })

  return (
    <MenuItem
      ref={el => {
        if (idx === selectedId) {
          el?.scrollIntoView({ block: 'start' })
        }
      }}
      selected={idx === selectedId}
      {...props}
    >
      <ListItemText>{result.name}</ListItemText>
    </MenuItem>
  )
}

export default SearchHookItem
