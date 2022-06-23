import { DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import PropTypes from 'prop-types'
import { Dispatch, SetStateAction } from 'react'

type AlertDialogProps = {
  title?: string
  message?: string
  confirmButton: JSX.Element
  declineButton: JSX.Element
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AlertDialog({
  title,
  message,
  confirmButton,
  declineButton,
  open,
  setOpen
}: AlertDialogProps) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      {title && <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>}

      {message && (
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <div onClick={handleClose}>{confirmButton}</div>
        <div onClick={handleClose}>{declineButton}</div>
      </DialogActions>
    </Dialog>
  )
}

AlertDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  confirmButton: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  declineButton: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

AlertDialog.defaultProps = {
  confirmButton: 'Confirm',
  declineButton: 'Decline',
  open: false
}
