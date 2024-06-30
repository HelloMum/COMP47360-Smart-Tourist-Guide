import React, { useState } from 'react';
import { Card, Box, CardMedia, Typography, Stack, IconButton } from '@mui/material';
import { AccessTimeRounded, CloseRounded, DateRangeRounded, ExpandLessRounded, ExpandMoreRounded, LocationOnRounded, PublicRounded } from '@mui/icons-material';
import theme from '../../theme';
import Btn_Like from '../Btn_Like';
import Btn_Add from '../Btn_Add';
import Tag_Category from '../Tag_Category';
import Tag_IsFree from '../Tag_IsFree';
import { useTheme } from '@mui/material/styles';



const EventCard_PopUp = ({ event,onClose }) => {

  const theme = useTheme(); 

  const imageUrl = event.image_url || "images/events/default.jpg";
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  

  
  
  return (



      <Stack direction="row" width='450px'>

          {/*--------------------- Close Button ---------------*/}
          
      <Box position="absolute" top={0} right={0} zIndex="tooltip">
        <IconButton onClick={onClose} sx={{fontSize:'small'}}>
          <CloseRounded />
        </IconButton>
      </Box>

        {/*------------------   picture  -------------------- */}

        <Box sx={{ position: 'relative', width: '140px', height: isExpanded?'190px' :'128px',boxShadow: 1 ,borderRadius: '2px',marginTop: '5px',}}>
          <CardMedia
          
            component="img"
            height="100"
            image={imageUrl}
            alt={event.name}
            sx={{   objectFit: 'cover', borderRadius: '2px',width: '140px', height: isExpanded?'190px' :'135px', }}
          />
          {/* <Btn_Like /> */}
        </Box>


          {/*------------------   title  -------------------- */}

        <Box sx={{ marginLeft: '20px', flexGrow: 1 }}>
        <Typography
  sx={{
    ...theme.typography.cardTitle,
    whiteSpace: isExpanded ? 'normal' : 'nowrap', 
    overflow: 'hidden',
    textOverflow: isExpanded ? 'clip' : 'ellipsis',
    maxWidth: '250px',
    display: 'inline-block', 
  }}
  component="div"
  title={event.name}
>
  {event.name}
</Typography>



          {/*------------------ cartegory & isFree  -------------------- */}

          <Stack direction='row' spacing={1}>
            <Tag_Category category={event.combined_category} />
            {event.is_free && <Tag_IsFree isFree={event.is_free} />}
            <PublicRounded sx={{ fontSize: 'large', marginRight: 1 ,cursor:'pointer'}} onClick={() => window.open(event.event_site_url, '_blank')}/>
              
          </Stack>



          {/*------------------ date & time & address-------------------- */}

          <Stack gap={'4px'} marginTop={'2px'}> 

          {/* date & time */}
          <Box display="flex" alignItems="center" marginTop={1}>
            
          <DateRangeRounded sx={{ fontSize: 'large',marginRight:1 }} />
            <Typography variant="body2" color="text.secondary" style={{ marginRight: '50px' }}>
                    
            
            </Typography> 
            
            <AccessTimeRounded sx={{ fontSize: 'large' ,marginRight:1}}/>
    
            <Typography variant="body2" color="text.secondary" marginRight={4}>
             
           
            </Typography>
     
            



</Box>
  


           {/* address */}
           <Box display="flex" alignItems="center" >

          <LocationOnRounded sx={{ fontSize: 'large' ,marginRight:1}}/>
          <Typography variant="body2" color="text.secondary">
        
        
            {event.address}
          </Typography>
             </Box> 
 

{isExpanded&&
             (<Typography variant="body2" color="text.secondary" sx={{ ...theme.typography.smallText,marginLeft: '3px' ,width: '300px'}}>               
        {event.description}
      </Typography>)}

          
          </Stack>



          <Stack direction='row' justifyContent="space-between" sx={{ width: '95%', paddingY: 1 }}>
            <Btn_Add />
           {/* {!isExpanded && <ExpandMoreRounded onClick={toggleExpand} />} */}
          {isExpanded && <ExpandLessRounded onClick={toggleExpand} />}
          </Stack> 
          
          
        </Box>
      </Stack>

  );
}

export default EventCard_PopUp;