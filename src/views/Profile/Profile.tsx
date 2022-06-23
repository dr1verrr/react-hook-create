import { Container, Typography } from '@mui/material'
import { lazy, useEffect } from 'react'

import { useAuthUser } from 'hooks'

const UserDashboard = lazy(() => import('components/user/UserDashboard'))

function Profile() {
  const userQuery = useAuthUser()
  const { isLoading, user } = userQuery

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <Container disableGutters sx={{ p: '0 15px' }}>
      <Typography variant='h3' pt={2}>
        Profile
      </Typography>
      <UserDashboard {...userQuery} />
    </Container>
  )
}

export default Profile
