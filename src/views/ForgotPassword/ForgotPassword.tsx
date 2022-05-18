import { Box, Button, Container, Grid, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  email: yup.string().required('Email is a required field').email('Invalid email format').max(40),
})

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit = (data: any) => console.log(data, errors)

  return (
    <Container component='div' maxWidth='xs'>
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id='email'
              label='Email Address'
              autoComplete='email'
              error={Boolean(errors?.email?.message)}
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
