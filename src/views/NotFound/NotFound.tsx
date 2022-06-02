import { Box, Typography } from '@mui/material'

import backgroundImage from './assets/background_2560x1440.jpg'

const NotFound = () => {
  return (
    <Box position='relative' overflow='hidden' minHeight={'calc(100vh - 58px)'}>
      <img
        src={backgroundImage}
        alt=''
        style={{
          minHeight: '100%',
          width: '100%',
          objectPosition: 'center',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          zIndex: -1,
          overflow: 'hidden'
        }}
      />
      <Box display='flex' justifyContent={'center'} padding='15px' flexWrap='wrap' columnGap='10px'>
        <Typography variant='h4' fontWeight='700' color='red'>
          404 |
        </Typography>
        <Typography
          variant='h4'
          color='#272727'
          sx={{
            whiteSpace: 'nowrap',
            background: '#fff',
            paddingLeft: 1,
            paddingRight: 1
          }}
        >
          Page not found
        </Typography>
      </Box>
    </Box>
  )
}

export default NotFound
