import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardProps,
  Icon,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Typography
} from '@mui/material'

function UserDashboardSkeleton(cardProps: CardProps = {}) {
  return (
    <Card {...cardProps} sx={{ p: 1 }}>
      <CardContent>
        <IconButton>
          <Skeleton variant='circular'>
            <Avatar />
          </Skeleton>
        </IconButton>

        <Skeleton>
          <Typography variant='overline' display='block'>
            UID: {'K'.repeat(28)}
          </Typography>
        </Skeleton>

        <Skeleton>
          <Typography fontSize={18} mt={1} gutterBottom>
            Big Smoke
          </Typography>
        </Skeleton>

        <Skeleton>
          <Typography>Last login: dd/mm/yyyy</Typography>
        </Skeleton>

        <Skeleton>
          <Typography sx={{ mb: 1.5 }}>Account registered: dd/mm/yyyy</Typography>
        </Skeleton>
        <Skeleton>
          <Stack direction='row' flexWrap='wrap' alignItems='center'>
            <Typography mr={1}>Email: </Typography>
            <Stack direction='row' alignItems='center'>
              <Link mr={1}>emailsample@sample.com</Link>
              <Icon />
            </Stack>
            <Button>Send code</Button>
          </Stack>
        </Skeleton>
      </CardContent>
      <CardActions>
        <Skeleton>
          <Button variant='outlined' startIcon={<Icon />}>
            Sign out
          </Button>
          <Button variant='contained'>
            <Icon />
          </Button>
        </Skeleton>
      </CardActions>
    </Card>
  )
}

export default UserDashboardSkeleton
