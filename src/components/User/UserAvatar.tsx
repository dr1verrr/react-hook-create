import { Avatar, AvatarProps, Skeleton } from '@mui/material'

import useAuthUser from 'hooks/useAuthUser'

function UserAvatar(props: AvatarProps) {
  const { isLoading, user } = useAuthUser()

  return isLoading ? (
    <Skeleton variant='circular'>
      <Avatar {...props} />
    </Skeleton>
  ) : (
    <Avatar src={`${user?.photoURL}`} alt={user?.displayName || ''} {...props} />
  )
}

export default UserAvatar
