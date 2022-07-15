import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal as MuiModal, ModalProps as MuiModalProps } from '@mui/material'
import { cloneElement, useState } from 'react'

interface ModalProps extends Omit<MuiModalProps, 'open'> {
  openElement: JSX.Element
  open?: boolean
  contentMaxWidth?: string | number
}

function Modal({ openElement, children, contentMaxWidth = '85vw', ...props }: ModalProps) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {cloneElement(openElement, { onClick: () => setOpen(true) })}
      <MuiModal
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}
        {...props}
      >
        <Box
          width={contentMaxWidth}
          minWidth={0}
          maxWidth={contentMaxWidth}
          margin={2}
          height='fit-content'
        >
          <Box component='div' onClick={handleClose} textAlign='right'>
            <Button variant='contained' color='inherit' sx={{ mb: 1 }}>
              <CloseIcon color='info' />
            </Button>
          </Box>
          {children}
        </Box>
      </MuiModal>
    </>
  )
}

export default Modal
