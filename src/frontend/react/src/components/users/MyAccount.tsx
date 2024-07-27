import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button, Avatar, Stack } from '@mui/material';
import { Email, Favorite } from '@mui/icons-material';
import Tag_Category from '../Tag_Category';


const AccountSettings: React.FC = () => {
    const [statistics, setStatistics] = useState<any>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchStatistics = async () => {
            try {
                const response = await fetch(`/api/itinerary/statistics?token=${token}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setStatistics(data);
                console.log('statistics', data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchEmail = async () => {
            try {
                const response = await fetch('api/users/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setEmail(data.email);
                console.log('email', data.email);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchStatistics();
        fetchEmail();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <Box sx={{ paddingX: '4vw' }}>
            <h2 style={{ marginBottom: '30px', fontFamily: '"Lexend", sans-serif', fontSize: '22px' }}>My Profile</h2>

            <Stack direction='row'>
                <Avatar
                    alt="User Avatar"
                    src="images/avatar-loged.png"
                    sx={{ width: 90, height: 90 }}
                />

                <Stack direction='column' gap='10px' sx={{ marginLeft: '40px', marginTop: '15px' }}>
                    <Stack direction='row' gap='20px'>
                        <Email sx={{ fontSize: '22px', color: '#666' }} />
                        {email && <div className="value">{email}</div>}
                    </Stack>

                    <Stack direction='row' gap='20px'>
                        <Favorite sx={{ fontSize: '22px', color: '#666' }} />
                        {statistics && <Tag_Category category={statistics.favouriteCategory} />}
                    </Stack>
                </Stack>
            </Stack>

            <Typography variant="h6" sx={{ marginTop: '80px', fontFamily: '"Lexend", sans-serif', fontSize: '22px' }}>Change Password</Typography>

            <Box sx={{ display: 'flex', gap: 2, marginY: 2 }}>
                <TextField
                    label="Current password"
                    type="password"
                    fullWidth
                    sx={{ height: '40px', maxWidth: '300px' }}
                />
                <TextField
                    label="New password"
                    type="password"
                    fullWidth
                    sx={{ height: '40px', maxWidth: '300px' }}
                />
            </Box>

            <Button
                variant="contained"
                sx={{
                    boxShadow: 'none',
                    borderRadius: '26px',
                    width: '100px',
                    '&:hover': {
                        boxShadow: 'none',
                    }
                }}
            >
                Change
            </Button>
        </Box>
    );
};

export default AccountSettings;
