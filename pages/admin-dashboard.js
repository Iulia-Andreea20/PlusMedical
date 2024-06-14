import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container, TextField, Button, Link } from '@mui/material';
import Footer from '@components/Footer';
import UserIcon from '@components/UserIcon';
import { useState } from 'react';

const AdminDashboard = () => {
    const [cnp, setCnp] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState('');
  
    const handleSearch = async () => {
      setError(null);
      setUserInfo(null);
      setSelectedDocument(null);
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

    const getStatusColor = (status) => {
        switch (status) {
          case 'Pending':
            return 'orange';
          case 'Approved':
            return 'green';
          case 'Rejected':
            return 'red';
          default:
            return 'text.secondary';
        }
      };

      const handleDocumentClick = (fileName) => {
        setSelectedDocument(`/api/documents?fileName=${encodeURIComponent(fileName)}`);
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
          <Box sx={{ display: 'flex', mt: 4 }}>
          <Box sx={{ flex: 1, mr: 2 }}>
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
              {userInfo.documents && userInfo.documents.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6">Documents</Typography>
                  {userInfo.documents.map((document, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="body2"><strong>Type:</strong> {document.documentType}</Typography>
                      <Typography variant="body2"><strong>Upload Date:</strong> {document.uploadDate}</Typography>
                        <Typography variant="body2"><strong>Path:</strong> {document.path}</Typography>
                      <Button variant="contained" color="primary" onClick={() => handleDocumentClick(document.path)}>
                        View Document
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
            {userInfo.requests && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Request</Typography>
                <Typography variant="body2"><strong>Request Date:</strong> {new Date(userInfo.requests.requestDate).toLocaleDateString()}</Typography>
                <Typography variant="body2"><strong>Status:</strong> <span style={{ color: getStatusColor(userInfo.requests.status) }}>{userInfo.requests.status}</span></Typography>
                <Typography variant="body2"><strong>Requested Amount:</strong> {userInfo.requests.requestedAmount}</Typography>
                {userInfo.requests.cards && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2"><strong>Card Number:</strong> {userInfo.requests.cards.cardNumber}</Typography>
                    <Typography variant="body2"><strong>Signature:</strong> {userInfo.requests.cards.signature}</Typography>
                    <Typography variant="body2"><strong>Current Balance:</strong> {userInfo.requests.cards.currentBalance}</Typography>
                    <Typography variant="body2"><strong>Approved Amount:</strong> {userInfo.requests.cards.approvedAmount}</Typography>
                    <Typography variant="body2"><strong>Expiration Date:</strong> {userInfo.requests.cards.expirationDate}</Typography>
                  </Box>
                )}
              </Box>
            )}
            </Box>
            {selectedDocument && (
              <Box sx={{ flex: 2}}>
              <iframe src={selectedDocument} width="100%" height="650px" />
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
