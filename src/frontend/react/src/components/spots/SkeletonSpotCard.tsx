import React from 'react';
import { Card, Box, Skeleton, Stack } from '@mui/material';
import { useResponsiveCardWidth } from '../../utils/useResponsiveSizes';

const SkeletonSpotCard: React.FC = () => {
  const cardWidth = useResponsiveCardWidth();

  return (
    <Card sx={{ 
      borderRadius: '8px', 
      overflow: 'hidden', 
      boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.1)', 
      width: cardWidth, 
      marginBottom: 2, 
      gap: 1 ,
      height:"300px"
    }}>
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Skeleton variant="rectangular" width="100%" height={170} />
      </Box>

      <Stack sx={{ paddingTop: '8px', paddingLeft: '12px' }} gap={'0px'}>
        <Skeleton variant="text" width="60%" height={30} animation="wave" />

        <Stack direction={"row"} gap={0.3}>
          <Skeleton variant="text" width="80%" height={30} animation="wave"/>

        </Stack>
        <Stack direction="row">
          <Skeleton variant="text" width="30%" height={30} animation="wave" />
        </Stack>
        <Stack direction='row' justifyContent="space-between" sx={{ width: '95%'}}>
          <Skeleton variant="text" width="20%" height={30} animation="wave"/>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SkeletonSpotCard;
