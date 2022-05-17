import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { FC } from 'react'
import { AuthLink } from '../../components'

const Header: FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative'>
        <Toolbar variant='dense' sx={{ pt: '5px', pb: '5px' }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Link to='/'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  React Hook Cheatsheet
                </Typography>
              </Link>
            </Box>

            <AuthLink>
              <Button variant='text' color='inherit'>
                Sign in
              </Button>
            </AuthLink>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
