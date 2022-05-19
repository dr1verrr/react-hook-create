import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const isAuthenticated: boolean = useSelector((state: any) => state.user.authenticated)

  console.log(isAuthenticated)

  return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}

export default PublicRoute
