import { Button } from '@mui/material'
import React from 'react'

const Btn_Add = () => {
  return (
    <div>
      <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '25px',
              padding: '1px 1px',
              fontSize: '0.8rem',
              textTransform: 'none',
              boxShadow: 'none',
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
                boxShadow: 'none'
              }
            }}
          >
            add
          </Button>  
    </div>
  )
}

export default Btn_Add
