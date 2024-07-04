import React, { useContext, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ListContext } from '../../contexts/ListContext';
import ListCard from './ListCard';
import { NAVBAR_HEIGHT } from '../../constants';
import Btn_Close_List from './Btn_Close_List';
import moment from 'moment';
import { ClearRounded } from '@mui/icons-material';
import AlertModal from '../AlertModal';

interface ListProps {
  onClose: () => void;
}

const List: React.FC<ListProps> = ({ onClose }) => {
  const { listItems, removeFromList, selectedDates, setPlanData, clearList } = useContext(ListContext);
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);

  // Validate the selection format
  const validateSelection = (selection) => {
    if (!Array.isArray(selection.ids)) {
      throw new Error('Invalid selection format: ids should be an array');
    }
    if (selection.ids.length === 0) {
      throw new Error('Selection cannot be empty');
    }
  };

  // click 'generate' btn to post data to backend
  const handleGeneratePlan = async () => {
    if (listItems.length === 0) {
      setAlertOpen(true);
      return;
    }

    const selection = {
      ids: listItems.map(item => item.id)
    };

    if (!selectedDates || !selectedDates[0] || !selectedDates[1]) {
      console.error('Error: Start date and end date must be selected.');
      return;
    }

    const startDate = selectedDates[0].format('YYYY-MM-DD');
    const endDate = selectedDates[1].format('YYYY-MM-DD');

    try {
      // Validate data format
      validateSelection(selection);

      // Log the data to be sent
      console.log('Data to be sent to backend:', selection, startDate, endDate);

      const response = await fetch(`http://localhost:8080/itinerary/create?startDate=${startDate}&endDate=${endDate}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selection),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      // Log the data received from the backend
      console.log('Data received from backend:', data);
      setPlanData(data);
      navigate('/schedule');
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '18vw',
          height: `calc(100vh - ${NAVBAR_HEIGHT})`,
          marginTop: '50px',
          backgroundColor: 'white',
          boxShadow: 1,
          zIndex: 10,
          position: 'fixed',
          right: 0,
        }}
      >
        <Box sx={{ padding: '16px', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1001 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <Button
              variant="outlined"
              sx={{
                borderRadius: '100px',
                width: '150px',
                height: '35px',
                fontSize: '14px',
                boxShadow: 0,
                borderColor: '#4CAF50',
                color: '#4CAF50',
                borderWidth: '1.5px',
                '&:hover': {
                  borderColor: '#388E3C',
                  backgroundColor: 'rgba(76, 175, 80, 0.3)',
                },
                '&:active': {
                  borderColor: '#388E3C',
                  backgroundColor: 'rgba(76, 175, 80, 0.12)',
                  color: '#388E3C',
                },
              }}
              onClick={handleGeneratePlan}
            >
              Generate Plan
            </Button> 
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginX: '10px',
            }}
          >
            <Typography variant="h6">{listItems.length} items</Typography>

            <Button
              variant="outlined"
              startIcon={<ClearRounded sx={{ fontSize: '16px', marginRight: '-6px' }} />} 
              sx={{
                borderRadius: '4px',
                paddingX: '4px',
                paddingY: '1px',
                fontSize: '10px',
                boxShadow: 0,
                borderColor: 'orange',
                color: 'orange',
                borderWidth: '1.5px',
                '&:hover': {
                  borderColor: 'orange',
                  backgroundColor: 'rgba(250, 161, 54, 0.3)',
                },
                '&:active': {
                  borderColor: 'orange',
                  backgroundColor: 'rgba(250, 161, 54, 0.12)',
                  color: 'orange',
                },
              }}
              onClick={clearList}
            >
              Clear All
            </Button>  
          </Box>
        </Box>

        <Box
          sx={{
            padding: '16px',
            paddingTop: '0px',
            overflowY: 'auto',
            height: 'calc(100% - 120px)',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          {listItems.map((item) => (
            <ListCard
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              onRemove={removeFromList}
            />
          ))}
        </Box>
      </Box>

      <Btn_Close_List onClose={onClose} />

      <AlertModal
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        title="Warning"
        message="Please add travel spots or events to your list first."
      />
    </>
  );
};

export default List;
