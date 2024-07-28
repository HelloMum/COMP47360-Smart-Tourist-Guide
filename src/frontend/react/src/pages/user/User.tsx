// src/components/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, SxProps, Theme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import AccountSettings from '../../components/users/MyAccount';
import SavedSchedule from '../../components/users/MyPlans';
import FetchItinerary from '../../components/users/MyPlans';

const buttonStyle: SxProps<Theme> = {
    justifyContent: 'flex-start',
    color: 'orange',
    width: {xs:'50px',sm:'100px',md:'110px',lg:'130px'},
    fontSize:{xs:'11px',sm:'12px',md:'12px',lg:'13px'},

    '&:hover': {
        backgroundColor: '#fff9eb', // Maintain the hover effect
        boxShadow: 'none', // Ensure no shadow on hover
    }
};

const Dashboard: React.FC = () => {
    const location = useLocation();
    const [selectedSection, setSelectedSection] = useState<string>('account');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const section = queryParams.get('section');
        if (section) {
            setSelectedSection(section);
        }
    }, [location]);

    const handleButtonClick = (section: string) => {
        setSelectedSection(section);
    };

    return (
        <Stack 
            direction='row'
            sx={{ height: '80vh', marginTop: '100px', 
                marginX:{ sm:'1vw',md:'15vw',lg:'20vw' }
            }}
        >
            <Box
                sx={{
                    width: {sm:'17vw',lg:'15vw'},
                    display: 'flex',
                    flexDirection: 'column',
                    paddingX: {xs:'2vw',sm:'3vw'},
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
                        }}
                    >
                        My Plans
                    </Button>
                </Stack>
            </Box>
            <Box sx={{ width: {xs:'78vw',sm:'70vw'}, 
                
                overflowY: 'auto' }}>
                {selectedSection === 'account' && <AccountSettings />}
                {selectedSection === 'savedSchedule' && <FetchItinerary />}
            </Box>
        </Stack>
    );
};

export default Dashboard;
