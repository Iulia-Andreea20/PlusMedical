import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container, TextField, Button } from '@mui/material';
import Footer from '@components/Footer';
import UserIcon from '@components/UserIcon';
import { useState } from 'react';
const AdminDashboard = () => {
    const [cnp, setCnp] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
  
    const handleSearch = async () => {
      setError(null);
      setUserInfo(null);
      try {
        const response = await fetch(`/api/cnp-search?cnp=${cnp}`);
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.userData);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'User not found');
        }
      } catch (error) {
        setError('Failed to fetch user information');
      }
    };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', marginBottom: '1rem' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img src={'/images/logo.png'} alt="Logo" style={{ marginRight: '15px', height: '40px' }} />
            <Typography variant="h6" component="div">
              Admin Dashboard
            </Typography>
          </Box>
            <UserIcon />
        </Toolbar>
      </AppBar>
      <Container sx={{ flex: 1 }}>
        <Box sx={{ mt: 2, mb: 4 }}>
        <TextField 
            fullWidth 
            variant="outlined" 
            placeholder="Search for client using CNP..." 
            value={cnp}
            onChange={(e) => setCnp(e.target.value)}
            sx={{ marginBottom: '2rem' }} 
            InputProps={{
              endAdornment: (
                <Button variant="contained" color="primary"  onClick={handleSearch}>
                  Search
                </Button>
              ),
            }}
          />
        </Box>
        {error && <Typography color="error">{error}</Typography>}
        {userInfo && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">User Information</Typography>
            <Typography variant="body1"><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {userInfo.email}</Typography>
            <Typography variant="body1"><strong>Phone Number:</strong> {userInfo.phoneNumber}</Typography>
            {userInfo.addresses && userInfo.addresses.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Addresses</Typography>
                {userInfo.addresses.map((address, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="body2"><strong>Street:</strong> {address.street}</Typography>
                    <Typography variant="body2"><strong>Number:</strong> {address.number}</Typography>
                    {address.block && <Typography variant="body2"><strong>Block:</strong> {address.block}</Typography>}
                    {address.staircase && <Typography variant="body2"><strong>Staircase:</strong> {address.staircase}</Typography>}
                    {address.apartment && <Typography variant="body2"><strong>Apartment:</strong> {address.apartment}</Typography>}
                    <Typography variant="body2"><strong>Locality:</strong> {address.locality}</Typography>
                    <Typography variant="body2"><strong>Province:</strong> {address.province}</Typography>
                    <Typography variant="body2"><strong>Country:</strong> {address.country}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Container>
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Footer />
      </Box>
    </>
  );
};

export default AdminDashboard;
