// src/components/Dashboard.tsx
import React, { useState } from 'react';
import { Box, Button, Stack, SxProps, Theme } from '@mui/material';
import AccountSettings from '../../components/users/MyAccount';
import SavedSchedule from '../../components/users/MyPlans';
import FetchItinerary from '../../components/users/MyPlans';

const buttonStyle: SxProps<Theme> = {
    justifyContent: 'flex-start',
    color: 'orange',
    width: '130px',
    

    '&:hover': {
        backgroundColor: '#fff9eb', // Maintain the hover effect
        boxShadow: 'none', // Ensure no shadow on hover
    }
};

const Dashboard: React.FC = () => {
    const [selectedSection, setSelectedSection] = useState<string>('account');

    const handleButtonClick = (section: string) => {
        setSelectedSection(section);
    };

    return (
        <Stack 
            direction='row'
            sx={{ height: '80vh', marginTop: 15, marginX: '20vw' }}
        >
            <Box
                sx={{
                    width: '15vw',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingX: '3vw',
                    borderRight: '1px solid #ddd',
                    height: '100%',
                    position: 'relative',
                }}
            >
                <Stack spacing={2}>
                    <Button
                        variant='text'
                        onClick={() => handleButtonClick('account')}
                        sx={{
                            ...buttonStyle,
                            backgroundColor: selectedSection === 'account' ? '#fff9eb' : 'transparent',
                            // textDecoration: selectedSection === 'account' ? 'underline' : 'none', // Add underline for selected section
                        }}
                    >
                        My Account
                    </Button>
                    <Button
                        variant='text'
                        onClick={() => handleButtonClick('savedSchedule')}
                        sx={{
                            ...buttonStyle,
                            backgroundColor: selectedSection === 'savedSchedule' ? '#fff9eb' : 'transparent',
                            // textDecoration: selectedSection === 'savedSchedule' ? 'underline' : 'none', // Add underline for selected section
                        }}
                    >
                        My Schedule
                    </Button>
                </Stack>
            </Box>
            <Box sx={{ width: '60vw', overflowY: 'auto' }}>
                {selectedSection === 'account' && <AccountSettings />}
                {/* {selectedSection === 'savedSchedule' && <SavedSchedule />} */}
                {selectedSection === 'savedSchedule' && <FetchItinerary />}
            </Box>
        </Stack>
    );
};

export default Dashboard;
