import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import LinkMui from '@mui/material/Link'
import { emailVerify } from 'app/actions'
import { signup } from 'app/auth'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { errorHandler } from 'utils'
import * as yup from 'yup'
import { AuthButtons, Copyright } from '../../components'

const schema = yup.object().shape({
  email: yup.string().required('Email is a required field').email('Invalid email format').max(40),
  password: yup.string().required('Password is a required field').min(5).max(50),
})

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    console.log('Form errors', errors)
  }, [errors])

  const onSubmit = ({ email, password }: any) => {
    errorHandler(() => {
      signup(email, password).then(user => {
        toast(`User with email: ${user.email} successfully registered`, { type: 'success' })
        emailVerify(user).then(() => {
          toast('Sent email verification link. Please check your spam folder', { type: 'info' })
        })
      })
    })
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box
          component='form'
          autoComplete='true'
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                type='email'
                label='Email Address'
                autoComplete='email'
                error={Boolean(errors?.email?.message)}
                helperText={errors?.email?.message}
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                error={Boolean(errors?.password?.message)}
                helperText={errors?.password?.message}
                {...register('password')}
              />
            </Grid>
          </Grid>

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
              Sign Up
            </Button>
            <AuthButtons />
          </Box>
          <Grid container justifyContent='flex-end' mt={1}>
            <Grid item>
              <Link to='/signin'>
                <LinkMui component='span' variant='body2'>
                  Already have an account? Sign in
                </LinkMui>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}
