import React from 'react';
import { Card, Box, Skeleton, Stack, Typography } from '@mui/material';

const SkeletonEventCard: React.FC = () => {
  return (
    <Card
      sx={{
        borderRadius: '7px',
        overflow: 'hidden',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
        width: "98%",
        paddingX: '20px',
        paddingY: '12px',
        marginBottom: 3,
        marginLeft: '3px',
        marginTop: '3px',
        height: { xs:'130px',sm:'140px',md:'170px'},

      }}
    >
      <Stack direction="row">
        <Box sx={{ position: 'relative', 
        width: {xs:'80px',sm:'90px',md:'180px'}, 
          height: {xs:'100px',sm:'100px',md:'128px'},
          boxShadow: 0, borderRadius: '4px', marginTop: '10px' }}>


          <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" sx={{ borderRadius: '4px' }} />
        </Box>

        <Box sx={{ marginLeft: '20px', flexGrow: 1 }}>
          <Skeleton variant="text" width="90%" height={30} animation="wave" />
      
            <Skeleton variant="text" width="70%" height={30}animation="wave"  />
                       
         
              <Skeleton variant="text" width="70%" height={30} animation="wave"  />
        
              <Skeleton variant="text" width="70%" height={30} animation="wave"  />
          
          
      
          
          
         
       
    
         
        </Box>
      </Stack>
    </Card>
  );
};

export default SkeletonEventCard;
