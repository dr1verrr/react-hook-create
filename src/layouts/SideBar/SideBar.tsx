import InboxIcon from '@mui/icons-material/Inbox'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography
} from '@mui/material'
import { KeyboardEventHandler } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { useAppSelector } from 'store'
import { toggleSidebar } from 'store/ui/ui.actions'

export default function SideBar() {
  const isOpen = useAppSelector(state => state.ui.sidebar)
  const dispatch = useDispatch()
  const handleClose = () => dispatch(toggleSidebar())
  const handleKey: KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === 'Enter') handleClose()
  }

  type SideBarListItem = {
    id: number
    icon?: JSX.Element | null
    text?: JSX.Element | null | string
    link: string
  }

  const listItems: SideBarListItem[] = [
    { id: 0, icon: <InboxIcon />, text: 'explore hooks', link: '/explore' },
    { id: 1, icon: <LibraryAddIcon />, text: 'store', link: '/store' }
  ]

  return (
    <SwipeableDrawer onOpen={handleClose} open={isOpen} onClose={handleClose} onKeyDown={handleKey}>
      <Box role='presentation'>
        <List>
          <Box onClick={handleClose}>
            <ListItem disablePadding>
              <Container maxWidth='lg' disableGutters sx={{ padding: '0 15px' }}>
                <ListItemIcon>
                  <IconButton>
                    <MenuIcon />
                  </IconButton>
                </ListItemIcon>

                <ListItemText>
                  <Typography
                    component={Link}
                    variant='h6'
                    to='/'
                    pt={1}
                    pb={1}
                    sx={{
                      display: 'block',
                      transition: 'opacity .2s',
                      ':hover': {
                        opacity: 0.75
                      }
                    }}
                  >
                    React Cheatsheet
                  </Typography>
                </ListItemText>
              </Container>
            </ListItem>
            <Divider />
            {listItems.map(({ id, icon, text, link }) => (
              <Link to={link} key={id}>
                <ListItem disablePadding>
                  <ListItemButton>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    {text && <ListItemText>{text}</ListItemText>}
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </Box>
        </List>
        <Divider />
      </Box>
    </SwipeableDrawer>
  )
}
