import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import LinkMui from '@mui/material/Link'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { signin } from 'app/auth'
import { AuthButtons, Copyright } from 'components'
import { errorHandler } from 'handlers'

const schema = yup.object().shape({
  email: yup.string().required('Email is a required field').email('Invalid email format').max(40),
  password: yup.string().required('Password is a required field').min(5).max(50)
})

type FormValues = {
  email: string
  password: string
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  const onSubmit = ({ email, password }: FormValues) => {
    errorHandler(
      () => signin(email, password),
      () => toast('Signed in.', { icon: '🙌' })
    )
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box
          component='form'
          autoComplete='true'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            autoComplete='email'
            autoFocus
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
            {...register('email')}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            id='password'
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
            autoComplete='current-password'
            {...register('password')}
          />

          <Box
            display={'flex'}
            flexWrap={'wrap'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap='15px'
          >
            <Button
              type='submit'
              variant='contained'
              size='large'
              sx={{ mt: 3, mb: 3, whiteSpace: 'nowrap' }}
            >
              Sign In
            </Button>
            <AuthButtons />
          </Box>

          <Grid container mt={1}>
            <Grid item xs>
              <Link to={'/forgot-password'}>
                <LinkMui component='span' variant='body2'>
                  Forgot password?
                </LinkMui>
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signup'>
                <LinkMui component='span' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </LinkMui>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
