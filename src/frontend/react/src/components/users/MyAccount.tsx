import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button, Avatar, Stack, IconButton, InputAdornment } from '@mui/material';
import { Email, Favorite, Visibility, VisibilityOff } from '@mui/icons-material';
import Tag_Category from '../Tag_Category';

const AccountSettings: React.FC = () => {
    const [statistics, setStatistics] = useState<any>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [changePasswordMessage, setChangePasswordMessage] = useState<string | null>(null);

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

    const handleChangePassword = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('/api/users/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, oldPassword: currentPassword, newPassword })
            });
            const data = await response.json();
            setChangePasswordMessage(data.message);
        } catch (error) {
            setChangePasswordMessage("Error changing password: " + error.message);
        }
    };

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    if (error) return <div>Error: {error}</div>;

    const fsFontsize = "0.875rem";

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

            <Typography variant="h6" sx={{ marginTop: '80px', fontFamily: '"Lexend", sans-serif', fontSize: '22px',marginBottom:'30px' }}>Change Password</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginY: 2 }}>
                <TextField
                    label="Current password"
                    type={showCurrentPassword ? "text" : "password"}
                    fullWidth
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    sx={{
                        '& .MuiInputBase-root': { height: '45px', width: '230px' },
                        '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
                        '& .MuiInputLabel-shrink': { transform: 'translate(14px, -6px) scale(0.75)' },
                        '& .MuiInputBase-input': {
                            padding: '14px',
                            fontSize: fsFontsize,
                            ...(showCurrentPassword ? {} : {
                                '-webkit-text-security': 'disc',
                                fontSize: '24px', 
                            })
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={toggleShowCurrentPassword}
                                    edge="end"
                                >
                                    {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        style: { fontSize: fsFontsize }
                    }}
                    InputLabelProps={{ style: { fontSize: fsFontsize } }}
                />
                <TextField
                    label="New password"
                    type={showNewPassword ? "text" : "password"}
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{
                        '& .MuiInputBase-root': { height: '45px', width: '230px' },
                        '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
                        '& .MuiInputLabel-shrink': { transform: 'translate(14px, -6px) scale(0.75)' },
                        '& .MuiInputBase-input': {
                            padding: '14px',
                            fontSize: fsFontsize,
                            ...(showNewPassword ? {} : {
                                '-webkit-text-security': 'disc',
                                fontSize: '24px', 
                            })
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={toggleShowNewPassword}
                                    edge="end"
                                >
                                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        style: { fontSize: fsFontsize }
                    }}
                    InputLabelProps={{ style: { fontSize: fsFontsize } }}
                />
            </Box>

            <Button
                variant="contained"
                onClick={handleChangePassword}
                sx={{
                    boxShadow: 'none',
                    borderRadius: '26px',
                    width: '100px',
                    mt:'10px',
                    '&:hover': {
                        boxShadow: 'none',
                    }
                }}
            >
                Change
            </Button>

            {changePasswordMessage && (
                <Typography variant="body2" sx={{ marginTop: '20px', color: changePasswordMessage.includes('successfully') ? 'green' : 'red' }}>
                    {changePasswordMessage}
                </Typography>
            )}
        </Box>
    );
};

export default AccountSettings;
