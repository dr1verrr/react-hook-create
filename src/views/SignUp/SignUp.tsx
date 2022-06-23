import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import LinkMui from '@mui/material/Link'
import { reload, sendEmailVerification, updateProfile } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { signup } from 'app/auth'
import { Copyright } from 'components'
import { AuthButtons } from 'components/buttons'
import { errorHandler } from 'handlers'

const schema = yup.object().shape({
  nickName: yup
    .string()
    .required('Nickname is a required field.')
    .min(3, 'First Name must be at least 3 characters')
    .max(30, 'First Name must be at most 30 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'This field cannot contain white space and special character'),
  email: yup.string().required('Email is a required field').email('Invalid email format').max(40),
  password: yup.string().required('Password is a required field').min(5).max(50)
})

type FormValues = {
  nickName: string
  email: string
  password: string
  remember: boolean
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  const remember = watch('remember')

  const onSubmit = ({ email, password, nickName }: FormValues) => {
    errorHandler(async () => {
      const user = await signup(email, password)
      toast('Sign-up successfull.', { type: 'success' })
      await updateProfile(user, { displayName: nickName })
      reload(user)

      await sendEmailVerification(user)
      toast('Email verification sent! Please check your spam folder.', {
        type: 'info'
      })
    })
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
          Sign up
        </Typography>
        <Box
          component='form'
          autoComplete={`${!!remember}`}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                autoComplete='given-name'
                fullWidth
                id='nickName'
                label='Nickname'
                autoFocus
                error={!!errors?.nickName}
                helperText={errors?.nickName?.message}
                {...register('nickName')}
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
                error={!!errors?.email}
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
                error={!!errors?.password}
                helperText={errors?.password?.message}
                {...register('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color='primary' defaultValue='false' {...register('remember')} />
                }
                label='Remember me'
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
