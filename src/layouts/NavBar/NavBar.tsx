import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { signout } from 'app/auth'
import { ThemeButton, UserAvatar } from 'components'
import { errorHandler } from 'handlers'
import { displayLoading, requireAuthentication } from 'hoc'

const NavBar: FC = () => {
  return (
    <AppBar
      position='sticky'
      color='inherit'
      sx={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)', top: 0, flexGrow: 1 }}
    >
      {displayLoading(
        <LinearProgress
          sx={{ position: 'absolute', left: 0, bottom: 0, right: 0, height: '2px' }}
        />
      )}
      <Container maxWidth='lg'>
        <Toolbar variant='dense' sx={{ pt: { xs: 1, sm: 0 }, pb: { xs: 1, sm: 0 } }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color='inherit'
                aria-label='menu'
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Link to='/'>
                <Typography
                  component='div'
                  fontSize='18px'
                  pt={2}
                  pb={2}
                  sx={{
                    transition: 'opacity .2s',
                    display: {
                      xs: 'none',
                      sm: 'block'
                    },
                    ':hover': {
                      opacity: 0.75
                    }
                  }}
                >
                  React Hook Cheatsheet
                </Typography>
              </Link>
            </Box>

            <Stack direction='row' alignItems='center'>
              <Button sx={{ textTransform: 'none', mr: 1, pl: 2, pr: 2 }}>Save Hook</Button>

              {requireAuthentication(
                <Link to='/profile'>
                  <IconButton sx={{ mr: 1 }}>
                    <UserAvatar sx={{ width: '30px', height: '30px' }} />
                  </IconButton>
                </Link>
              )}
              <ThemeButton sx={{ mr: 1 }} />

              {requireAuthentication(
                <Button
                  variant='text'
                  color='inherit'
                  onClick={() =>
                    errorHandler(signout, () => toast('Sign-out successfull.', { icon: '👋' }))
                  }
                >
                  Sign out
                </Button>,
                <Link to='/signin'>
                  <Button variant='text' color='inherit'>
                    Sign in
                  </Button>
                </Link>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
