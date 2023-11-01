import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, CardMedia, Pagination, useMediaQuery } from '@mui/material';

function Details({ players }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const playersPerPage = isSmallScreen ? 5 : 10; // Adjust the number of players per page for smaller screens

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
          <Card key={data.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="img" height="180" image={data.img} alt={data.name} />
            <CardContent sx={{ flex: '1 0 auto' }}>
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
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', flexShrink: 0, marginBottom: '10px' }}>
              <Link to={`/watch/${data.id}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                  Show Info
                </Button>
              </Link>
            </Box>
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
    </Box>
  );
}

export default Details;