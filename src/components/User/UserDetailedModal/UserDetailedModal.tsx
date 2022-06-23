import { Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { User } from 'firebase/auth'
import PropTypes from 'prop-types'
import { Dispatch, SetStateAction } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula'

SyntaxHighlighter.registerLanguage('json', json)

type UserDetailedModalProps = {
  user: User | null | undefined
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

function UserDetailedModal({ user, open, setOpen }: UserDetailedModalProps) {
  const handleClose = () => setOpen(false)

  return (
    <Modal
      open={open}
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

UserDetailedModal.propTypes = {
  user: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func
}

UserDetailedModal.defaultProps = {
  user: null,
  open: false
}

export default UserDetailedModal
