import { ListItemText, MenuItem, MenuList, MenuListProps } from '@mui/material'
import { memo } from 'react'

import { Watch } from 'components/forms'

import { useSearchHookBar } from '../SearchHookBar/SearchHookBar'
import SearchHookItem from '../SearchHookItem/SearchHookItem'
import { useSearchHookModal } from '../SearchHookModal/SearchHookModal'

interface SearchHookItemsProps extends MenuListProps {}

function SearchHookItems({ results, ...menuProps }: SearchHookItemsProps) {
  const { onClose } = useSearchHookModal()
  const { onChoose } = useSearchHookBar()

  return (
    <MenuList {...menuProps} sx={{ maxHeight: '30vh', overflowY: 'auto' }}>
      {Array.isArray(results) &&
        (results.length > 0 ? (
          results?.map((result, idx) => (
            <SearchHookItem
              onClick={() => {
                onClose()
                onChoose(result, result.id)
              }}
              key={idx}
              idx={idx}
              result={result}
              divider={idx !== results.length - 1}
            />
          ))
        ) : (
          <MenuItem>
            <ListItemText>
              <Watch name='input' render={value => `No results for "${value}"`} />
            </ListItemText>
          </MenuItem>
        ))}
    </MenuList>
  )
}

export default memo(SearchHookItems)
