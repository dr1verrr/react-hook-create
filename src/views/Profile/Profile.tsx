import RefreshIcon from '@mui/icons-material/Refresh'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'
import { reload } from 'firebase/auth'
import { lazy, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { signout } from 'app/auth'
import { errorHandler } from 'handlers'
import { useAuthUser } from 'hooks'
import { switchModal } from 'store/ui/ui.actions'

const UserDetailedModal = lazy(() => import('components/User/UserDetailedModal'))

const Profile = () => {
  const { isLoading, user } = useAuthUser()
  const dispatch = useDispatch()
  const toggleModal = () => dispatch(switchModal())

  useEffect(() => {
    console.log(user)
  }, [user])

  if (!isLoading && !user) return null

  return (
    <Container>
      <Typography variant='h6' pt={2}>
        Profile
      </Typography>
      <Card variant='outlined' sx={{ m: '15px 0' }}>
        <CardContent>
          {isLoading ? (
            <Skeleton variant='circular'>
              <Avatar sx={{ mb: 1 }} />
            </Skeleton>
          ) : (
            <IconButton
              LinkComponent={Link}
              target={user?.photoURL ? '_blank' : '_self'}
              href={user?.photoURL || '#'}
              sx={{ textDecoration: 'none', mb: 1 }}
            >
              <Avatar src={`${user?.photoURL}`} alt={user?.displayName || ''} />
            </IconButton>
          )}

          {isLoading ? (
            <Skeleton>
              <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                {'n'.repeat(30)}
              </Typography>
            </Skeleton>
          ) : (
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
              {user?.displayName}
            </Typography>
          )}

          {isLoading ? (
            <Skeleton>
              <Typography variant='h5' component='div'>
                Last login: dd/mm/yyyy, 00:00:00
              </Typography>
            </Skeleton>
          ) : (
            <Typography>
              Last login: {new Date(user?.metadata.lastSignInTime || '').toLocaleString()}
            </Typography>
          )}
          {isLoading ? (
            <Skeleton>
              <Typography variant='h5' component='div' sx={{ mb: 1.5 }} color='text.secondary'>
                Account registered: dd/mm/yyyy, 00:00:00
              </Typography>
            </Skeleton>
          ) : (
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Account registered: {new Date(user?.metadata.creationTime || '').toLocaleString()}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {isLoading ? (
            <Skeleton>
              <Stack direction='row' flexWrap='wrap'>
                <Button size='small'>Logout</Button>
                <Button>
                  <RefreshIcon />
                  Refresh
                </Button>
                <Button>Detailed info</Button>
              </Stack>
            </Skeleton>
          ) : (
            <Stack direction='row' flexWrap='wrap'>
              <Button
                size='small'
                onClick={async () => {
                  await errorHandler(signout)
                  toast('Sign-out successfull.', { icon: '👋' })
                }}
              >
                Logout
              </Button>
              <Button
                onClick={async () => {
                  if (user) {
                    await errorHandler(() => reload(user))
                    toast('Refreshed.', { type: 'info' })
                  }
                }}
              >
                <RefreshIcon />
                Refresh
              </Button>
              <UserDetailedModal user={user} />
              <Button onClick={toggleModal}>Detailed info</Button>
            </Stack>
          )}
        </CardActions>
      </Card>
    </Container>
  )
}

export default Profile
