import { Button } from '@mui/material'
import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Authenticated: FC<{
  children: ReactNode
  showAlternative: boolean
  altCallback: () => any
}> = ({ children, showAlternative = false, altCallback }) => {
  const user = useSelector((state: any) => state.user)

  if (user.authenticated) {
    if (showAlternative)
      return (
        <Button color='inherit' onClick={altCallback}>
          Logout
        </Button>
      )
    return null
  }

  return <Link to={'/signin'}>{children || 'Sign In'}</Link>
}

export default Authenticated
