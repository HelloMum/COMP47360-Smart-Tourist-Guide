import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button, Avatar } from '@mui/material';

const AccountSettings: React.FC = () => {
    const [statistics, setStatistics] = useState<any>(null);
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

        fetchStatistics();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box sx={{ paddingX: '4vw' }}>
            <h2 style={{ marginLeft: 10, marginTop: 10, fontFamily: '"Lexend", sans-serif', fontSize: '22px' }}>My Profile</h2>
            <Avatar
                alt="User Avatar"
                src="images/avatar-loged.png"
                sx={{ width: 100, height: 100 }}
            />
            <Typography>Your email address</Typography> {/* Replace this line if you want to display a static email */}
            {statistics && <div className="value">{statistics.favouriteCategory}</div>}
            
            <Typography variant="h6" sx={{ marginTop: 4, fontFamily: '"Lexend", sans-serif', fontSize: '22px' }}>Change Password</Typography>

            <Box sx={{ display: 'flex', gap: 2, marginY: 2 }}>
                <TextField
                    label="Current password"
                    type="password"
                    fullWidth
                    sx={{ height: '50px' }}
                />
                <TextField
                    label="New password"
                    type="password"
                    fullWidth
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
