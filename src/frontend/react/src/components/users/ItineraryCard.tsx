import React, { useState } from 'react';
import { Typography, Box, IconButton, Button, Stack } from '@mui/material';
import { ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material';
import moment from 'moment';
import SavedScheduleCard from './SavedScheduleCard'; 

interface Itinerary {
  startDate: string;
  endDate: string;
  planData: Record<string, any[]>;
}

interface ItineraryCardProps {
  itinerary: Itinerary;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ itinerary }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentDate, setCurrentDate] = useState(itinerary.startDate);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDateChange = (date: string) => {
    setCurrentDate(date);
  };

  const formatDayOfWeek = (date: string) => {
    return moment(date).format('ddd');
  };

  return (
    <div >



<Stack direction='row'>
    <Box
        sx={{
            // border: '1px solid orange',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            padding: '4px 12px',
            width:'520px',
            mb:'20px',
            justifyContent:'space-between',
            backgroundColor:'#f4f4f4'
            
        }}
    >
        <Typography variant="h6"  sx={{fontFamily: '"Lexend", sans-serif',fontWeight:'300',fontSize:'18px'}}>{`${itinerary.startDate} - ${itinerary.endDate}`}</Typography>
        <IconButton onClick={toggleExpand}>
            {isExpanded ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </IconButton>
    </Box>
</Stack>



      {isExpanded && (
        <div className="journey-details">
          <Box display="flex"  marginBottom={2} gap='10px'>
            {Object.keys(itinerary.planData).map((date) => (
              <Button
                key={date}
                onClick={() => handleDateChange(date)}
                style={{
                  backgroundColor: date === currentDate ? 'orange' : '#f8f8f8',
                  color: date === currentDate ? '#fff' : '#888',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                sx={{
                  minWidth: { xs: '43px', sm: '55px', md: '60px' },
                  minHeight: { xs: '40px', sm: '60px', md: '65px' },
                  padding: { xs: '10px 8px', sm: '8px 10px', md: '8px 16px' },
                  borderRadius: { xs: '12px', sm: '18px', md: '20px' },
                }}
              >
                <Typography
                  variant="caption"
                  style={{
                    fontWeight: 'normal',
                    fontFamily: 'Lexend',
                    lineHeight: 1,
                  }}
                >
                  {formatDayOfWeek(date)}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: 400,
                    fontFamily: 'Lexend',
                    lineHeight: 1,
                  }}
                  sx={{ fontSize: { xs: '1.3em', sm: '1.4em', md: '1.5em' } }}
                >
                  {moment(date).format('DD')}
                </Typography>
              </Button>
            ))}
          </Box>




          {Object.keys(itinerary.planData).map((date) => (
            <div key={date} style={{ display: date === currentDate ? 'block' : 'none' }}>


              {itinerary.planData[date].map((item, itemIndex) => (
                <SavedScheduleCard
                  key={item.id}
                  item={item}
                  index={itemIndex + 1}
                  onStartTimeClick={() => {}}
                  highlightedStartTime={null}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItineraryCard;
