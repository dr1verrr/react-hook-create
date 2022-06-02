import { Box, Button, Container, Typography } from '@mui/material'
import { FC } from 'react'

const Hero: FC = () => {
  return (
    <Box
      component='header'
      sx={{
        background: '#0057b7',
        pt: {
          md: '64px',
          xs: '30px'
        },
        pb: {
          md: '64px',
          xs: '30px'
        }
      }}
      color='#fff'
    >
      <Container maxWidth='lg' sx={{ textAlign: 'center' }}>
        <Typography variant='h1' fontWeight='bold' fontSize='36px' mb={3}>
          React Hook Cheatsheet
        </Typography>

        <Typography fontSize='24px' mb={3}>
          A List with your Favorite Hooks.
        </Typography>
        <Button
          variant='contained'
          sx={{
            color: '#000',
            background: '#ebedf0',
            fontWeight: 'bold',
            fontSize: '20px',
            paddingLeft: '30px',
            paddingRight: '30px',
            textTransform: 'none',
            ':hover': {
              background: '#c8c9cc'
            }
          }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  )
}

export default Hero
