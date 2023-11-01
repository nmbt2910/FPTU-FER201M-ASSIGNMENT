import React, { useState } from 'react';
import AddPlayerForm from './AddPlayerForm';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CardMedia,
  Pagination,
  useMediaQuery,
} from '@mui/material';

function Details({ players }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const playersPerPage = isSmallScreen ? 5 : 10; // Adjust the number of players per page for smaller screens

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleClose = () => {
    setSelectedPlayer(null);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(players.length / playersPerPage);

  return (
    <Box sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(5, minmax(240px, 1fr))',
          gap: '16px',
        }}
      >
        {players.slice((currentPage - 1) * playersPerPage, currentPage * playersPerPage).map((data) => (
          <Card key={data.id}>
            <CardMedia component="img" height="180" image={data.img} alt={data.name} />
            <CardContent>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                {data.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
                Club: {data.club}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                Nation: {data.nation}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                Cost: {data.cost}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Button onClick={() => handlePlayerClick(data)} variant="contained" color="primary">
                  Show Info
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Box>
      )}
      <AddPlayerForm />

      <Dialog open={selectedPlayer !== null} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedPlayer?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe
              width="100%"
              height="100%"
              src={selectedPlayer?.clip}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          </Box>
          <DialogContentText sx={{ color: 'black', textAlign: 'center', marginTop: '16px' }}>
            <Typography variant="body1">{selectedPlayer?.info}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Details;