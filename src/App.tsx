import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts'
import { Header } from './layouts'

const SignIn = lazy(() => import('./views/SignIn'))
const SignUp = lazy(() => import('./views/SignUp'))
const ForgotPassword = lazy(() => import('./views/ForgotPassword'))

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <Header />

        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5 }}>
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  )
}

export default App
