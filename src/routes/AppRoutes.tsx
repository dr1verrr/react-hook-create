import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import AuthenticatedRoute from './AuthenticatedRoute'
import PublicRoute from './PublicRoute'

const Home = lazy(() => import('views/Home'))
const SignIn = lazy(() => import('views/SignIn'))
const SignUp = lazy(() => import('views/SignUp'))
const ForgotPassword = lazy(() => import('views/ForgotPassword'))
const Profile = lazy(() => import('views/Profile'))
const About = lazy(() => import('views/About'))
const SaveHook = lazy(() => import('views/SaveHook'))
const NotFound = lazy(() => import('views/NotFound'))

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='*' element={<NotFound />} />
      <Route element={<PublicRoute />}>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Route>
      <Route element={<AuthenticatedRoute />}>
        <Route path='/save-hook' element={<SaveHook />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/about' element={<About />} />
    </Routes>
  )
}

export default AppRoutes
