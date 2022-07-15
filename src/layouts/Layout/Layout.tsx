import { CircularProgress, CssBaseline, PaletteMode, useMediaQuery } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { ReactNode, Suspense, lazy, useEffect, useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { NavBar } from 'layouts'
import MediaQuery from 'services'
import { useAppSelector } from 'store'
import { loadState, saveState } from 'utils'

const SideBar = lazy(() => import('layouts/SideBar'))

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const themeSelector = useAppSelector(state => state.ui.theme)

  const isPrefersModeChecked = useRef(false)
  const isFirstRender = useRef(true)

  const getLocalTheme = () => loadState('theme')

  const getTheme = (mode: PaletteMode) => {
    return createTheme({
      palette: {
        mode
      }
    })
  }

  const [theme, setTheme] = useState(getTheme(getLocalTheme() || 'light'))

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', theme.palette.mode)
  }, [theme])

  useEffect(() => {
    const localTheme = getLocalTheme()

    if (isPrefersModeChecked.current || !localTheme) {
      const mode = prefersDarkMode ? 'dark' : 'light'
      setTheme(getTheme(mode))
      saveState('theme', mode)
    }
    if (!isPrefersModeChecked.current) isPrefersModeChecked.current = true
  }, [prefersDarkMode])

  useEffect(() => {
    if (!isFirstRender.current) {
      setTheme(getTheme(themeSelector))
      saveState('theme', themeSelector)
    } else {
      isFirstRender.current = false
    }
  }, [themeSelector])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />

      <Suspense
        fallback={<CircularProgress sx={{ position: 'absolute', left: '50px', bottom: '50px' }} />}
      >
        <MediaQuery query='(max-width: 900px)'>
          <SideBar />
        </MediaQuery>
      </Suspense>

      <Suspense
        fallback={<CircularProgress sx={{ position: 'absolute', left: '50px', bottom: '50px' }} />}
      >
        {children}
      </Suspense>
      <ToastContainer
        theme={theme.palette.mode === 'dark' ? 'light' : 'dark'}
        position='bottom-right'
      />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
