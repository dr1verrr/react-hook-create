import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { Header } from 'layouts'
import authStateListener from 'listeners/authStateListener'
import { lazy, Suspense, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PublicRoute } from 'routes'
import { store } from 'store'
import { setUser } from 'store/user/user.actions'
import { getWithSpecificFields } from 'utils'
import './App.css'

const Home = lazy(() => import('views/Home/Home'))
const SignIn = lazy(() => import('views/SignIn/SignIn'))
const SignUp = lazy(() => import('views/SignUp/SignUp'))
const ForgotPassword = lazy(() => import('views/ForgotPassword/ForgotPassword'))

function App(): JSX.Element {
  const userChecked = useRef(false)

  useEffect(() => {
    authStateListener((user: any) => {
      store.dispatch(setUser(user ? getWithSpecificFields(user) : null))

      if (userChecked.current) {
        toast(user ? 'Authenticated' : 'Logged out', { type: 'info' })
      }
      if (!userChecked.current) userChecked.current = true
    })
  }, [])

  return (
    <Provider store={store}>
      <ToastContainer position='bottom-right' />
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
            <Route element={<PublicRoute />}>
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
            </Route>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='*' element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default App
