import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import { IconButton, IconButtonProps, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'

import { switchTheme } from 'store/ui/ui.actions'

function ThemeButton(props: IconButtonProps) {
  const dispatch = useDispatch()
  const toggleMode = () => dispatch(switchTheme())
  const {
    palette: { mode }
  } = useTheme()

  return (
    <IconButton {...props} onClick={props.onClick || toggleMode}>
      {mode === 'light' && <LightModeOutlined sx={{ color: '#000' }} />}
      {mode === 'dark' && <DarkModeOutlined />}
    </IconButton>
  )
}

export default ThemeButton
