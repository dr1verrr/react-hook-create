import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface IAuthLink {
  withText?: boolean
  children: ReactNode
}

const AuthLink: FC<IAuthLink> = ({ children, withText }) => {
  // check if logged in

  return <Link to={'/signin'}>{children}</Link>
}

export default AuthLink
