import { Link, Typography } from '@mui/material'

export default function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/dr1verrr/react-hook-cheatsheet'>
        react-hook-cheatsheet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
