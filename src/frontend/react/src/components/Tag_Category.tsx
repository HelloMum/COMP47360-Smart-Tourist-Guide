import { Box } from '@mui/material';


const Tag = ({ category }) => {
  return (
    <Box sx={{
      backgroundColor: '#f3f3f3', 
      color: '#616161',
      padding: {
        xs: '0px 3px', 
        sm: '0px 9px'  
      },
      borderRadius: '4px',
      fontSize: '12px',
      marginRight: {
        xs: '4px',
        sm: '6px'
      }, 
      display: 'inline-block',
      boxSizing: 'border-box',
    }}>
      {category}
    </Box>
  );
}

export default Tag;
