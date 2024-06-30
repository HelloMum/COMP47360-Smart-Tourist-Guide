import { FavoriteBorderRounded } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import React from 'react'

const Btn_Like = () => {
  return (
    <div>
           <Box
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
          bgcolor: 'rgba(255, 255, 255, 0.0)',
          borderRadius: '50%',
        }}
      >
     <IconButton>
            <FavoriteBorderRounded style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
          </IconButton>
      </Box>
    </div>
  )
}

export default Btn_Like
