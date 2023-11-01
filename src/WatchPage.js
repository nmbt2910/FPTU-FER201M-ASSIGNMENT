import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

function WatchPage({ players }) {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await fetch(
          `https://6540cf3145bedb25bfc2a8ea.mockapi.io/Anime/${playerId}`
        );
        if (response.ok) {
          const playerData = await response.json();
          setPlayer(playerData);
        } else {
          console.error('Failed to fetch player data');
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId]);

  const getPlayerVideoId = (clipUrl) => {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|embed\/videoseries\?si=|embed\/videoseries\?si=.+&amp;))([^&?]+)/;
    const match = clipUrl.match(regex);

    if (match && match[1]) {
      return match[1];
    }

    return '';
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (!player) {
    return <Typography variant="h6">Player not found</Typography>;
  }

  const increaseSizeByPercentage = (value, percentage) => {
    return Math.round(value + (value * percentage) / 100);
  };

  const increasedWidth = increaseSizeByPercentage(560, 50);
  const increasedHeight = increaseSizeByPercentage(315, 50);

  return (
    <Box
      sx={{
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center', // Center all the text
      }}
    >
      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>
        {player.name}
      </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: `${increasedWidth}px` }}>
          <YouTube
            videoId={getPlayerVideoId(player.clip)}
            opts={{
              width: `${increasedWidth}px`,
              height: `${increasedHeight}px`,
              playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
              },
            }}
          />
        </Box>
      </Box>
      <Paper elevation={3} sx={{ marginTop: '20px', width: '100%', padding: '20px' }}>
        <Typography variant="body2" component="div">
          <Box fontWeight="fontWeightBold">Club:</Box> {player.club}
        </Typography>
        <Typography variant="body2" component="div">
          <Box fontWeight="fontWeightBold">Nation:</Box> {player.nation}
        </Typography>
        <Typography variant="body2" component="div">
          <Box fontWeight="fontWeightBold">Cost:</Box> {player.cost}
        </Typography>
        <Typography variant="body1" component="div" sx={{ marginTop: '10px' }}>
          {player.info}
        </Typography>
      </Paper>
    </Box>
  );
}

export default WatchPage;