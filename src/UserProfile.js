import React, { useEffect, useState } from 'react';
import { Typography, Box, Avatar, Button, Paper } from '@mui/material';
import { UserAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { user, logOut } = UserAuth();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const { displayName, email, photoURL } = user;
      setProfile({ displayName, email, photoURL });
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await logOut();
      showLogoutMessage();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const showLogoutMessage = () => {
    console.log('Logout successful');
  };

  if (!profile) {
    return null;
  }

  const { displayName, email, photoURL } = profile;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        marginTop: '-100px',
      }}
    >
      <Box
        component={Paper}
        elevation={3}
        sx={{
          padding: '20px',
          marginTop: '32px',
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        <Avatar
          alt={displayName}
          src={photoURL}
          sx={{ width: 120, height: 120, marginBottom: 2, margin: '0 auto' }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {displayName}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          {email}
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleSignOut}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}