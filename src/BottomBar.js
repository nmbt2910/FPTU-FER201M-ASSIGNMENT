import React from 'react';
import { Box } from '@mui/material';

function BottomBar() {
  return (
    <Box
      sx={{
        backgroundColor: '#1976d2',
        color: '#ffffff',
        textAlign: 'center',
        padding: '12px',
        marginTop: '15px',
      }}
    >
      AnimeHub by JavaScript @ 2023
    </Box>
  );
}

export default BottomBar;