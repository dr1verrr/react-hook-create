import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './layouts'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'

const SignIn = lazy(() => import('./views/SignIn'))
const SignUp = lazy(() => import('./views/SignUp'))
const ForgotPassword = lazy(() => import('./views/ForgotPassword'))

function App(): JSX.Element {
  return (
    <div className='App'>
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
    </div>
  )
}

export default App
