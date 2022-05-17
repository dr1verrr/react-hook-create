import LinkMui from '@mui/material/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
} from '@mui/material'
import { AuthButtons, Copyright } from '../components'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is a required field')
    .min(3, 'First Name must be at least 3 characters')
    .max(30, 'First Name must be at most 30 characters'),
  lastName: yup
    .string()
    .required('Last Name is a required field')
    .min(3, 'Last Name must be at least 3 characters')
    .max(30, 'Last Name must be at most 30 characters'),
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
    console.log(errors)
  }, [errors])

  const onSubmit = (data: any) => console.log(data, errors)

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
        <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                fullWidth
                required
                id='firstName'
                label='First Name'
                autoFocus
                error={Boolean(errors?.firstName?.message)}
                helperText={errors?.firstName?.message}
                {...register('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                autoComplete='family-name'
                error={Boolean(errors?.lastName?.message)}
                helperText={errors?.lastName?.message}
                {...register('lastName')}
              />
            </Grid>
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
