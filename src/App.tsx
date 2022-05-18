import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { onAuthStateChanged, User } from 'firebase/auth'
import { lazy, Suspense, useEffect } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { store } from '.'
import './App.css'
import { getAuthData } from './app/auth'
import { Header } from './layouts'
import { setUser } from './store/actions'

const Home = lazy(() => import('./views/Home/Home'))
const SignIn = lazy(() => import('./views/SignIn/SignIn'))
const SignUp = lazy(() => import('./views/SignUp/SignUp'))
const ForgotPassword = lazy(() => import('./views/ForgotPassword/ForgotPassword'))

function App(): JSX.Element {
  useEffect(() => {
    onAuthStateChanged(getAuthData(), (user: User | null) => {
      console.log(
        {
          displayName: user?.displayName,
          email: user?.email,
          emailVerified: user?.emailVerified,
          photoURL: user?.photoURL,
        },
        user
      )

      store.dispatch(
        setUser({
          displayName: user?.displayName,
          email: user?.email,
          emailVerified: user?.emailVerified,
          photoURL: user?.photoURL,
        })
      )
    })
  }, [])

  return (
    <Provider store={store}>
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
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default App
