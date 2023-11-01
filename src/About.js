import React from 'react';
import { Typography, Container, Paper, Box } from '@mui/material';

function About() {
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
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '32px', textAlign: 'center' }}>
          <Typography variant="h4" component="h1" sx={{ marginBottom: '16px'}}>
            About AnimeHub
          </Typography>
          <Typography variant="body1">
          AnimeHub is a dedicated platform that provides a seamless and immersive experience for watching anime. It offers a wide range of anime shows, movies, and series from various genres, allowing anime enthusiasts to explore and enjoy their favorite content in one place. With AnimeHub, users can access a vast library of anime titles, discover new releases, and indulge in the captivating world of animation. Whether you are a seasoned anime fan or new to the genre, AnimeHub offers a convenient and user-friendly platform to stream and watch anime anytime, anywhere.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default About;