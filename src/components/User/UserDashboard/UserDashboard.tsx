import { VerifiedUser } from '@mui/icons-material'
import GppMaybeIcon from '@mui/icons-material/GppMaybe'
import InfoIcon from '@mui/icons-material/Info'
import LogoutIcon from '@mui/icons-material/Logout'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RefreshIcon from '@mui/icons-material/Refresh'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardProps,
  IconButton,
  Link,
  MenuItem,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { deleteUser, reload, sendEmailVerification } from 'firebase/auth'
import PropTypes from 'prop-types'
import { lazy, useState } from 'react'
import { toast } from 'react-toastify'

import { signout } from 'app/auth'
import { Menu } from 'components/mui-components'
import AlertDialog from 'components/mui-components/AlertDialog'
import { errorHandler } from 'handlers'
import { UserQuery } from 'hooks/useAuthUser'

import UserDashboardSkeleton from './UserDashboardSkeleton'

const UserDetailedModal = lazy(() => import('components/user/UserDetailedModal'))

interface Props extends UserQuery, CardProps {}

function UserDashboard({ user, isLoading, ...cardProps }: Props) {
  const [userModal, setUserModal] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const openUserModal = () => setUserModal(true)
  const openDeleteDialog = () => setDeleteDialog(true)

  if (isLoading) return <UserDashboardSkeleton {...cardProps} />

  if (user) {
    const { displayName, email, emailVerified, photoURL, metadata, isAnonymous, uid } = user

    return (
      <Card variant='outlined' {...cardProps} sx={{ p: 1 }}>
        <CardContent>
          <IconButton
            LinkComponent={Link}
            target={photoURL ? '_blank' : '_self'}
            href={photoURL || '#'}
            sx={{ textDecoration: 'none', mb: 1 }}
          >
            <Avatar src={`${photoURL}`} alt={displayName || ''} />
          </IconButton>
          <Typography color='text.secondary' variant='overline' display='block'>
            UID: {uid}
          </Typography>

          <Typography sx={{ fontSize: 18 }} color='text.primary' gutterBottom>
            {displayName}
          </Typography>

          <Typography>
            Last login: {new Date(metadata.lastSignInTime || '').toLocaleString()}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            Account registered: {new Date(metadata.creationTime || '').toLocaleString()}
          </Typography>
          <Stack direction='row' flexWrap='wrap' alignItems='center'>
            <Stack direction='row' alignItems='center'>
              <Typography mr={1}>Email: {isAnonymous && 'none(anonymous)'}</Typography>

              {email && (
                <Link
                  href={`https://${email?.split('@')[1]}`}
                  target='_blank'
                  mr={1}
                  sx={{ wordBreak: 'break-all' }}
                >
                  {email}
                </Link>
              )}

              {emailVerified && (
                <Tooltip title='Verified'>
                  <VerifiedUser color='success' />
                </Tooltip>
              )}
            </Stack>
            {!emailVerified && !isAnonymous && (
              <>
                <Tooltip title='Need to confirm email'>
                  <IconButton>
                    <GppMaybeIcon color='secondary' />
                  </IconButton>
                </Tooltip>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={() => {
                    errorHandler(
                      () => sendEmailVerification(user!),
                      () => {
                        toast('Email verification sent! Please check your spam folder.', {
                          type: 'info'
                        })
                      }
                    )
                  }}
                >
                  Send code
                </Button>
              </>
            )}
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            variant='outlined'
            startIcon={<LogoutIcon />}
            onClick={() => {
              errorHandler(signout, () => toast('Sign-out successfull.', { icon: '👋' }))
            }}
          >
            Sign out
          </Button>
          <Menu
            MenuButton={
              <Button variant='contained'>
                <MoreHorizIcon />
              </Button>
            }
          >
            <MenuItem
              onClick={() => {
                errorHandler(
                  () => reload(user!),
                  () => toast('Refreshed.', { type: 'info' })
                )
              }}
            >
              <Stack direction='row' alignItems='center' gap={1}>
                <RefreshIcon color='primary' />
                <Typography variant='body1' color='primary'>
                  Refresh
                </Typography>
              </Stack>
            </MenuItem>

            <MenuItem onClick={openUserModal}>
              <Stack direction='row' alignItems='center' gap={1}>
                <InfoIcon color='info' />
                <Typography variant='body1' color='primary'>
                  Detailed info
                </Typography>
              </Stack>
            </MenuItem>

            <MenuItem onClick={openDeleteDialog}>
              <Stack direction='row' alignItems='center' gap={1}>
                <RemoveCircleOutlineIcon color='error' />
                <Typography variant='body1' color='error'>
                  Delete account
                </Typography>
              </Stack>
            </MenuItem>
          </Menu>

          <UserDetailedModal open={userModal} setOpen={setUserModal} user={user} />

          <AlertDialog
            open={deleteDialog}
            setOpen={setDeleteDialog}
            message='Warning'
            confirmButton={
              <Button
                variant='contained'
                color='error'
                onClick={() => {
                  errorHandler(
                    () => deleteUser(user!),
                    () => toast('Account deleted.', { type: 'warning' })
                  )
                }}
              >
                Delete account
              </Button>
            }
            declineButton={<Button variant='contained'>Close</Button>}
          />
        </CardActions>
      </Card>
    )
  }

  return null
}

UserDashboard.propTypes = {
  user: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
}

UserDashboard.defaultProps = {
  user: null,
  isLoading: false
}

export default UserDashboard
