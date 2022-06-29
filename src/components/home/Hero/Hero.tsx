import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function Hero() {
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
        <Link to='/store'>
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
        </Link>
      </Container>
    </Box>
  )
}

export default Hero
