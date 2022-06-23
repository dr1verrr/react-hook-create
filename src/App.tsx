import { ErrorFn, NextOrObserver, User } from 'firebase/auth'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Layout } from 'layouts'
import { authStateListener } from 'listeners'
import AppRoutes from 'routes/AppRoutes'
import { store } from 'store'
import { setAuth } from 'store/auth/auth.actions'
import { saveState } from 'utils'

import './App.css'

const queryClient = new QueryClient()

function App() {
  const observer: NextOrObserver<User> = user => {
    store.dispatch(setAuth(!!user))
    saveState('auth', !!user)
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
            <AppRoutes />
          </Layout>
        </Router>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
