import { lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './layouts'

const SignIn = lazy(() => import('./views/SignIn'))
const SignUp = lazy(() => import('./views/SignUp'))
const ForgotPassword = lazy(() => import('./views/ForgotPassword'))

function App(): JSX.Element {
  return (
    <div className='App'>
      <Router>
        <Header />

        <Suspense fallback={<div>Loading...</div>}>
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
