import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '@components/AuthContext';

const UserIcon = () => {
  const [user, setUser] = useState({ firstName: null, lastName: null, email: null });
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getUserInitials = (firstName, lastName) => {
    if (firstName && lastName) {
      return firstName[0] + lastName[0];
    }
    return firstName[0];
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar sx={{ bgcolor: '#4194FE' }}>
          {user.firstName && user.lastName
            ? getUserInitials(user.firstName, user.lastName)
            : user.email ? user.email[0].toUpperCase() : ''}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        PaperProps={{
          style: {
            borderRadius: '15px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            width: '100px',
            marginTop: '7px',
          },
        }}
      >
        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
        {/* <MenuItem onClick={handleClose}>Request</MenuItem> */}
      </Menu>
    </>
  );
};

export default UserIcon;
