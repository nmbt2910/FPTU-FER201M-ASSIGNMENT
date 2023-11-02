import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Grid,
  Snackbar,
} from '@mui/material';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    setNameError(value.length > 0 && !/^[a-zA-Z]+$/.test(value) ? 'Name must contain only characters' : '');
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(value.length > 0 && !/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : '');
  };

  const handleMessageChange = (event) => {
    const value = event.target.value;
    setMessage(value);
    setMessageError(value.length > 0 && value.split(' ').length < 10 ? 'Message must be at least 10 words' : '');
  };

  const handleSubmit = async () => {
    if (name.length === 0 || email.length === 0 || message.length === 0) {
      // Display error messages for empty fields
      setNameError(name.length === 0 ? 'Name is required' : '');
      setEmailError(email.length === 0 ? 'Email is required' : '');
      setMessageError(message.length === 0 ? 'Message is required' : '');
      return;
    }

    if (nameError || emailError || messageError) {
      // Prevent form submission if there are validation errors
      return;
    }

    try {
      const response = await fetch('https://6540cf3145bedb25bfc2a8ea.mockapi.io/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setName('');
      setEmail('');
      setMessage('');
      setIsSnackbarOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        marginTop: '-113px',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h4" component="h1" sx={{ marginBottom: '20px' }}>
            Contact BlogPage
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={handleNameChange}
                error={!!nameError}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                multiline
                rows={4}
                fullWidth
                value={message}
                onChange={handleMessageChange}
                error={!!messageError}
                helperText={messageError}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Message sent successfully!"
        />
      </Container>
    </Box>
  );
}

export default Contact;