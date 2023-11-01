import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardMedia,
  TextField,
} from '@mui/material';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [newPlayerData, setNewPlayerData] = useState({
    name: '',
    club: '',
    nation: '',
    cost: '',
    img: '',
    clip: '',
    info: '',
  });
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlayerData, setEditedPlayerData] = useState({
    name: '',
    club: '',
    nation: '',
    cost: '',
    img: '',
    clip: '',
    info: '',
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        'https://6540cf3145bedb25bfc2a8ea.mockapi.io/Anime'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleAddPlayer = () => {
    setIsAddingPlayer(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlayerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        'https://6540cf3145bedb25bfc2a8ea.mockapi.io/Anime',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlayerData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to add player');
      }
      setIsAddingPlayer(false);
      setNewPlayerData({
        name: '',
        club: '',
        nation: '',
        cost: '',
        img: '',
        clip: '',
        info: '',
      });
      fetchPlayers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePlayer = async (playerId) => {
    try {
      const response = await fetch(
        `https://6540cf3145bedb25bfc2a8ea.mockapi.io/Anime/${playerId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete player');
      }
      fetchPlayers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPlayer = (player) => {
    setEditedPlayerData({
      name: player.name,
      club: player.club,
      nation: player.nation,
      cost: player.cost,
      img: player.img,
      clip: player.clip,
      info: player.info,
    });
    setIsEditing(true);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPlayerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdatePlayer = async () => {
    try {
      const response = await fetch(
        `https://6540cf3145bedb25bfc2a8ea.mockapi.io/Anime/${selectedPlayer.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedPlayerData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update player');
      }
      setIsEditing(false);
      setEditedPlayerData({
        name: '',
        club: '',
        nation: '',
        cost: '',
        img: '',
        clip: '',
        info: '',
      });
      fetchPlayers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.email !== 'edogawa618@gmail.com') {
      logOut();
      navigate('/login');
    } else {
      fetch('https://6540cf3145bedb25bfc2a8ea.mockapi.io/Anime')
        .then((response) => response.json())
        .then((data) => setPlayers(data))
        .catch((error) => console.log(error));
    }
  }, [user, navigate, logOut]);

  return (
    <Box sx={{ marginTop: '20px' }}>
      <Button
        onClick={handleAddPlayer}
        variant="contained"
        color="primary"
        sx={{ marginBottom: '16px' }}
      >
        Add New Player
      </Button>
      {players.map((player) => (
        <Card
          key={player.id}
          sx={{ marginBottom: '16px' }}
          onClick={() => handlePlayerClick(player)}
        >
          <CardMedia
            component="img"
            height="140"
            image={player.img}
            alt={player.name}
          />
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: 'bold', fontSize: '20px' }}
            >
              {player.name}
            </Typography>
            <Typography variant="body1">Club: {player.club}</Typography>
            <Typography variant="body1">Nation: {player.nation}</Typography>
            <Typography variant="body1">Cost: {player.cost}</Typography>
            <Box sx={{ marginTop: '10px' }}>
              <Button
                onClick={() => handleDeletePlayer(player.id)}
                variant="contained"
                color="error"
              >
                Delete Player
              </Button>
              <Button
                onClick={() => handleEditPlayer(player)}
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px' }}
              >
                Edit Player
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Dialog
        open={isAddingPlayer}
        onClose={() => setIsAddingPlayer(false)}
        maxWidth="sm"
      >
        <DialogTitle>Add New Player</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newPlayerData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="club"
            label="Club"
            type="text"
            fullWidth
            value={newPlayerData.club}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="nation"
            label="Nation"
            type="text"
            fullWidth
            value={newPlayerData.nation}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="cost"
            label="Cost"
            type="text"
            fullWidth
            value={newPlayerData.cost}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="img"
            label="Image URL"
            type="text"
            fullWidth
            value={newPlayerData.img}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="clip"
            label="Clip URL"
            type="text"
            fullWidth
            value={newPlayerData.clip}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="info"
            label="Info"
            type="text"
            fullWidth
            value={newPlayerData.info}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddingPlayer(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        maxWidth="sm"
      >
        <DialogTitle>Edit Player</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={editedPlayerData.name}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="club"
            label="Club"
            type="text"
            fullWidth
            value={editedPlayerData.club}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="nation"
            label="Nation"
            type="text"
            fullWidth
            value={editedPlayerData.nation}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="cost"
            label="Cost"
            type="text"
            fullWidth
            value={editedPlayerData.cost}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="img"
            label="Image URL"
            type="text"
            fullWidth
            value={editedPlayerData.img}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="clip"
            label="Clip URL"
            type="text"
            fullWidth
            value={editedPlayerData.clip}
            onChange={handleEditInputChange}
          />
          <TextField
            margin="dense"
            name="info"
            label="Info"
            type="text"
            fullWidth
            value={editedPlayerData.info}
            onChange={handleEditInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleUpdatePlayer} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      
    </Box>
  );
};

export default PlayerList;