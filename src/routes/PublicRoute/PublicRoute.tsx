import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from 'store'

const PublicRoute = (): ReactElement => {
  const isAuthenticated = useAppSelector(state => state.auth)

  return !isAuthenticated ? <Outlet /> : <Navigate to={'/profile'} />
}

export default PublicRoute
