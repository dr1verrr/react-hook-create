import { Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { User } from 'firebase/auth'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula'

import { useAppSelector } from 'store'
import { setModal } from 'store/ui/ui.actions'

SyntaxHighlighter.registerLanguage('json', json)

const UserDetailedModal: FC<{ user: User | null | undefined }> = ({ user }) => {
  const dispatch = useDispatch()
  const isOpen = useAppSelector(state => state.ui.modal.visible)

  const handleClose = () => dispatch(setModal({ visible: false }))

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={{ background: 'red' }}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          JSON
        </Typography>
        <SyntaxHighlighter style={dracula} language='json'>
          {JSON.stringify(user, null, 2)}
        </SyntaxHighlighter>
      </Box>
    </Modal>
  )
}

export default UserDetailedModal
