import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Button, Box, Tooltip, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';
import ApiRoundedIcon from '@mui/icons-material/ApiRounded';

function CustomAppBar() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isMobileScreen = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleSoccerClick = () => {
    navigate('/');
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      handleCloseUserMenu(); // Close the menu after successful logout
    } catch (error) {
      console.log(error);
    }
  };

  const drawerItems = [
    { text: 'Details', link: '/' },
    { text: 'About', link: '/about' },
    { text: 'Contact', link: '/contact' },
  ];

  const renderNavigation = () => {
    if (isMobileScreen) {
      return (
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer} variant="persistent">
          <List sx={{ width: 240 }}>
            {drawerItems.map((item, index) => (
              <ListItem button key={index} component={Link} to={item.link} onClick={toggleDrawer}>
                <ListItemText primary={item.text} primaryTypographyProps={{ style: { color: '#000', fontWeight: 'bold' } }} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      );
    } else {
      return (
        <React.Fragment>
          {drawerItems.map((item, index) => (
            <Button key={index} component={Link} to={item.link} sx={{ fontWeight: 'bold', color: '#fff' }}>
              {item.text}
            </Button>
          ))}
        </React.Fragment>
      );
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobileScreen ? (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        ) : null}
        <ApiRoundedIcon sx={{ marginRight: '8px', cursor: 'pointer' }} onClick={handleSoccerClick} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleSoccerClick}>
          AnimeHub
        </Typography>
        {renderNavigation()}
        {user?.displayName ? (
          <div>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.email} src={user.photoURL} />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button sx={{ fontWeight: 'bold', color: '#fff' }}>Login</Button>
          </Link>
        )}
      </Toolbar>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={user?.displayName ? anchorElUser : null} // Use conditional expression for anchorEl
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" style={{ color: "black" }}>
            <Link to="/playerlist" style={{ textDecoration: "none", color: "black" }}>Dashboard</Link>
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" style={{ color: "black" }}>
            <Link to="/userprofile" style={{ textDecoration: "none", color: "black" }}>User Profile</Link>
          </Typography>
        </MenuItem>

        <MenuItem>
          <Typography textAlign="center" style={{ color: "black" }}>
            <Box textAlign="center" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
              Logout
            </Box>
          </Typography>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default CustomAppBar;