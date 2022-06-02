import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Container, Grid, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { sendPasswordReset } from 'app/actions'
import { errorHandler } from 'handlers'

const schema = yup.object().shape({
  email: yup.string().required('Email is a required field').email('Invalid email format').max(40)
})

type FormValues = {
  email: string
}

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  const onSubmit = ({ email }: FormValues) => {
    errorHandler(async () => {
      await sendPasswordReset(email)
      const messageOnSuccess = `Password reset link sent! Please check your spam folder.`
      toast(messageOnSuccess, {
        type: 'info'
      })
    })
  }

  return (
    <Container component='div' maxWidth='xs'>
      <Box
        component='form'
        autoComplete='true'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='email'
              label='Email Address'
              autoComplete='email'
              error={!!errors?.email}
              helperText={errors?.email?.message}
              {...register('email')}
            />
          </Grid>
        </Grid>
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
          Send recovery code
        </Button>
      </Box>
    </Container>
  )
}
