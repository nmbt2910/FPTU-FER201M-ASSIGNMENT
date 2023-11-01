import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Paper, Alert } from '@mui/material';
import { UserAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { getAuth, deleteUser } from "firebase/auth";

export default function Login() {
  const { googleSignIn, user } = UserAuth();
  const auth = getAuth();
  const navigate = useNavigate();
  const cuser = auth.currentUser;

  const [errorMessage, setErrorMessage] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null && user.email === "edogawa618@gmail.com") {
      navigate('/playerlist');
    } else {
      if (user != null && user.email !== "edogawa618@gmail.com") {
        setErrorMessage("You are not authorized to login");
        deleteUser(cuser);
      }
    }
  }, [user, navigate, cuser]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      marginTop="-113px"
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '32px', textAlign: 'center' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            {errorMessage && (
              <Alert severity="error" sx={{ marginBottom: '16px' }}>
                {errorMessage}
              </Alert>
            )}
            <Typography variant="h4" component="h1" sx={{ marginBottom: '16px' }}>
              Login with Google
            </Typography>
            <Box width="100%" display="flex" justifyContent="center">
              <GoogleButton onClick={handleGoogleSignIn} />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}