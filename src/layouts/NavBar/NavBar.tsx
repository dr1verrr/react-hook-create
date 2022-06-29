import InfoIcon from '@mui/icons-material/Info'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { ThemeButton } from 'components/buttons'
import { UserAvatar } from 'components/user'
import { displayLoading, requireAuth } from 'hoc'
import { toggleSidebar } from 'store/ui/ui.actions'

function NavBar() {
  const dispatch = useDispatch()
  const menuHandler = () => dispatch(toggleSidebar())

  type NavButton = {
    id: number
    element: JSX.Element | null
  }

  const navButtons: NavButton[] = [
    {
      id: 0,
      element: (
        <ButtonGroup sx={{ mr: 2, display: { xs: 'none', md: 'block' } }}>
          <Box component={Link} to='/store' mr={1}>
            <Button color='inherit' sx={{ textTransform: 'none' }}>
              store
            </Button>
          </Box>
          <Box component={Link} to='/hooks'>
            <Button color='inherit' sx={{ textTransform: 'none' }}>
              hooks
            </Button>
          </Box>
        </ButtonGroup>
      )
    },
    {
      id: 1,
      element: <ThemeButton sx={{ mr: 1 }} />
    },
    {
      id: 2,
      element: requireAuth(
        <Link to='/profile'>
          <IconButton sx={{ mr: 1 }}>
            <UserAvatar sx={{ width: '24px', height: '24px' }} />
          </IconButton>
        </Link>,
        <Link to='/signin'>
          <Button variant='text' color='inherit'>
            Sign in
          </Button>
        </Link>
      )
    },
    {
      id: 3,
      element: (
        <Link to='/about'>
          <IconButton>
            <InfoIcon color='info' />
          </IconButton>
        </Link>
      )
    }
  ]

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
      <Container maxWidth='lg' disableGutters sx={{ padding: '0 15px' }}>
        <Toolbar variant='dense' sx={{ pt: { xs: 1, md: 0 }, pb: { xs: 1, md: 0 } }} disableGutters>
          <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color='inherit'
                aria-label='menu'
                onClick={menuHandler}
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component={Link}
                to='/'
                fontSize='18px'
                pt={2}
                pb={2}
                sx={{
                  transition: 'opacity .2s',
                  display: {
                    xs: 'none',
                    md: 'block'
                  },
                  ':hover': {
                    opacity: 0.75
                  }
                }}
              >
                React Hook Cheatsheet
              </Typography>
            </Box>
            <Stack direction='row' alignItems='center'>
              {navButtons.map(({ id, element }) => (
                <Box key={id}>{element}</Box>
              ))}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
