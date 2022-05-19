import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { getAuthData } from 'app/auth'
import { onAuthStateChanged, User } from 'firebase/auth'
import { Header } from 'layouts'
import { lazy, Suspense, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PublicRoute } from 'routes'
import { store } from 'store'
import { setUser } from 'store/user/user.actions'
import { getWithSpecificFields } from 'utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import authStateListener from 'listeners/authStateListener'

const Home = lazy(() => import('views/Home/Home'))
const SignIn = lazy(() => import('views/SignIn/SignIn'))
const SignUp = lazy(() => import('views/SignUp/SignUp'))
const ForgotPassword = lazy(() => import('views/ForgotPassword/ForgotPassword'))

function App(): JSX.Element {
  useEffect(() => {
    authStateListener((user: any) => {
      store.dispatch(setUser(user ? getWithSpecificFields(user) : null))
      if (user) toast('User authenticated')
    })
  }, [])

  return (
    <Provider store={store}>
      <ToastContainer />
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
