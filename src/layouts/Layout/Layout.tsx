import { CssBaseline, PaletteMode, useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { NavBar } from 'layouts'
import { useAppSelector } from 'store'
import { loadState, setAndSaveState } from 'utils'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const useSelector = useAppSelector
  const themeSelector = useSelector(state => state.ui.theme)

  const isPrefersModeChecked = useRef(false)
  const isFirstRender = useRef(true)

  const getTheme = (mode: PaletteMode) => {
    return createTheme({
      palette: {
        mode
      }
    })
  }
  const [theme, setTheme] = useState(getTheme(loadState('theme') || 'light'))

  useEffect(() => {
    if (isPrefersModeChecked.current || !loadState('theme')) {
      const mode = prefersDarkMode ? 'dark' : 'light'
      setAndSaveState(setTheme, getTheme(mode), {
        key: 'theme',
        value: mode
      })
    }
    if (!isPrefersModeChecked.current) isPrefersModeChecked.current = true
  }, [prefersDarkMode])

  useEffect(() => {
    if (!isFirstRender.current) {
      setAndSaveState(setTheme, getTheme(themeSelector), {
        key: 'theme',
        value: themeSelector
      })
    } else {
      isFirstRender.current = false
    }
  }, [themeSelector])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />

      <ToastContainer
        theme={theme.palette.mode === 'dark' ? 'light' : 'dark'}
        position='bottom-right'
      />
      {children}
    </ThemeProvider>
  )
}

export default Layout
