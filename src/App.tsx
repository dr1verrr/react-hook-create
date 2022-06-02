import { CircularProgress } from '@mui/material'
import { ErrorFn, NextOrObserver, User } from 'firebase/auth'
import { Suspense, lazy, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Layout } from 'layouts'
import { authStateListener } from 'listeners'
import { AuthenticatedRoute, PublicRoute } from 'routes'
import { store } from 'store'
import { setAuth } from 'store/auth/auth.actions'
import { setAndSaveState } from 'utils'
import { NotFound } from 'views'

import './App.css'

const Home = lazy(() => import('views/Home/Home'))
const SignIn = lazy(() => import('views/SignIn/SignIn'))
const SignUp = lazy(() => import('views/SignUp/SignUp'))
const ForgotPassword = lazy(() => import('views/ForgotPassword/ForgotPassword'))
const Profile = lazy(() => import('views/Profile/Profile'))

export const queryClient = new QueryClient()

function App() {
  const observer: NextOrObserver<User> = user => {
    const isAuthenticated = !!user

    if (!isAuthenticated) queryClient.removeQueries('user')

    setAndSaveState(store.dispatch, setAuth(isAuthenticated), {
      key: 'auth',
      value: isAuthenticated
    })
  }

  const onError: ErrorFn = ({ message }) => toast(message, { type: 'error' })

  useEffect(() => {
    authStateListener(observer, onError)
  }, [])

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Suspense
              fallback={
                <CircularProgress sx={{ position: 'absolute', left: '50px', bottom: '50px' }} />
              }
            >
              <Routes>
                <Route element={<PublicRoute />}>
                  <Route path='/signin' element={<SignIn />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/forgot-password' element={<ForgotPassword />} />
                </Route>
                <Route element={<AuthenticatedRoute />}>
                  <Route path='/profile' element={<Profile />} />
                </Route>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
