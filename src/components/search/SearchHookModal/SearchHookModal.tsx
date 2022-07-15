import { Box, Modal, ModalProps } from '@mui/material'
import { Tag } from 'forms/CreateHookForm/index.d'
import {
  ReactNode,
  cloneElement,
  createContext,
  memo,
  useContext,
  useEffect,
  useState
} from 'react'

type Result = {
  id: number
  name: string
  description: string
  code: string
  tags: Tag[]
  language: string
}

type SearchFormValues = {
  input: string
  results: Result[]
  selectedId: number
}

interface SearchHookModalProps extends Omit<ModalProps, 'children' | 'open'> {
  children: JSX.Element | ReactNode
  openElement: JSX.Element
}

type SearchHookModalContextType = {
  onClose: () => unknown
}

const SeachHookModalContext = createContext({} as SearchHookModalContextType)

const useSearchHookModal = () => useContext(SeachHookModalContext)

export { SearchFormValues, Result, useSearchHookModal }

function SearchHookModal({ openElement, children, ...modalProps }: SearchHookModalProps) {
  const [isOpen, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Escape') handleClose()
    }

    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <>
      {cloneElement(openElement, { onClick: () => setOpen(true) })}
      <Modal
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          height: 'fit-content'
        }}
        {...modalProps}
        open={isOpen}
      >
        <SeachHookModalContext.Provider value={{ onClose: handleClose }}>
          <Box margin={3} height='fit-content' maxHeight='90vh' maxWidth={600} width='100%'>
            {children}
          </Box>
        </SeachHookModalContext.Provider>
      </Modal>
    </>
  )
}

export default memo(SearchHookModal)
