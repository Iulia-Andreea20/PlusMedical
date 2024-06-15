import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import Footer from '@components/Footer';
import UserIcon from '@components/UserIcon';
import { useState } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
const AdminDashboard = () => {
    const [cnp, setCnp] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState('');
    const [approve, setApprove] = useState(false);
    const [reject, setReject] = useState(false);
    const [approvedAmount, setApprovedAmount] = useState('');
    const [rejectReason, setRejectReason] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const handleSearch = async () => {
      setError(null);
      setUserInfo(null);
      setSelectedDocument(null);
      setSuccessMessage('');
      setApprove(false);
      setReject(false);
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
      const handleApprove = () => {
        setApprove(true);
        setReject(false);
      };
    
      const handleReject = () => {
        setReject(true);
        setApprove(false);
      };
    
      const handleApproveSubmit = async () => {
        try {
          const response = await fetch('/api/update-request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              id: userInfo.requests.id, 
              status: 'Approved', 
              approvedAmount: approvedAmount, 
              rejectedReason: null 
            }),
          });
          if (response.ok) {
            setSuccessMessage('Request has been approved successfully.');
            setApprove(false);
            setReject(false);
          } else {
            const errorData = await response.json();
            setError(errorData.error || 'Failed to approve request');
          }
        } catch (error) {
          setError('Failed to approve request');
        }
      };
      
      const handleRejectSubmit = async () => {
        try {
          const response = await fetch('/api/update-request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              id: userInfo.requests.id, 
              status: 'Rejected', 
              approvedAmount: null, 
              rejectedReason: rejectReason 
            }),
          });
          if (response.ok) {
            setSuccessMessage('Request has been rejected successfully.');
            setApprove(false);
            setReject(false);
          } else {
            const errorData = await response.json();
            setError(errorData.error || 'Failed to reject request');
          }
        } catch (error) {
          setError('Failed to reject request');
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
  <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)', mb: 8 }}>
    <Box sx={{ mt: 2, mb: 4, flexGrow: 1 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for client using CNP..."
        value={cnp}
        onChange={(e) => setCnp(e.target.value)}
        sx={{ marginBottom: '2rem' }}
        InputProps={{
          endAdornment: (
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          ),
        }}
      />
      {error && <Typography color="error">{error}</Typography>}
      {userInfo && (
        <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: 2, bgcolor: '#e3f2fd' }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Box>
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
                          <Typography variant="body2"><strong>Upload Date:</strong> {new Date(document.uploadDate).toLocaleDateString()}</Typography>
                          <Button variant="contained" color="primary" onClick={() => handleDocumentClick(document.path)} sx = {{mt: 1}}>
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
                      <Typography variant="body2"><strong>Requested Amount:</strong> {userInfo.requests.requestedAmount} RON</Typography>
                      {userInfo.requests.status === 'Approved' && (
                        <Typography variant="body2"><strong>Approved Amount:</strong> {userInfo.requests.cards.approvedAmount} RON</Typography>
                      )}
                        {userInfo.requests.status === 'Rejected' && (
                        <Typography variant="body2"><strong>Rejected Reason:</strong> {userInfo.requests.rejectedReason}</Typography>
                        )}
                      {userInfo.requests.cards && userInfo.requests.status === 'Approved' && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="h6">Card Information</Typography>
                          <Typography variant="body2"><strong>Card Number:</strong> {userInfo.requests.cards.cardNumber}</Typography>
                          <Typography variant="body2"><strong>Maximum Balance:</strong> {userInfo.requests.cards.approvedAmount} RON</Typography>
                          <Typography variant="body2"><strong>Current Balance:</strong> {userInfo.requests.cards.currentBalance} RON</Typography>
                          <Typography variant="body2"><strong>Expiration Date:</strong> {new Date(userInfo.requests.cards.expirationDate).toLocaleDateString()}</Typography>
                        </Box>
                      )}
                      {userInfo.requests.status === 'Pending' && (
                        <Box sx={{ display: 'flex', mt: 2 }}>
                          <button
                            type="button"
                            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:focus:ring-green-800"
                            onClick={handleApprove}
                          >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                              <path d="M16.707 5.707l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 11.586l7.293-7.293a1 1 0 1 1 1.414 1.414z"/>
                            </svg>
                            <span className="sr-only">Approve</span>
                          </button>
                          <button
                            type="button"
                            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:focus:ring-red-800 ml-2"
                            onClick={handleReject}
                          >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                              <path d="M4.293 4.293a1 1 0 0 1 1.414 0L9 7.586l3.293-3.293a1 1 0 0 1 1.414 1.414L10.414 9l3.293 3.293a1 1 0 0 1-1.414 1.414L9 10.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L7.586 9 4.293 5.707a1 1 0 0 1 0-1.414z"/>
                            </svg>
                            <span className="sr-only">Reject</span>
                          </button>
                        </Box>
                      )}
                      {approve && (
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            required
                            fullWidth
                            id="approvedAmount"
                            label="Approved Amount"
                            value={approvedAmount}
                            onChange={(e) => setApprovedAmount(e.target.value)}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">RON</InputAdornment>,
                            }}
                            sx={{ mt: 2 }}
                          />
                          <Button variant="contained" color="success" sx={{ mt: 1 }} onClick={handleApproveSubmit}>
                            Submit Approved Amount
                          </Button>
                        </Box>
                      )}
                      {reject && (
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            fullWidth
                            label="Reason for Rejection"
                            variant="outlined"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                          />
                          <Button variant="contained" color="error" sx={{ mt: 1 }} onClick={handleRejectSubmit}>
                            Submit Rejection Reason
                          </Button>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              </Grid>
              {selectedDocument && (
                <Grid item xs={12} md={8.5}>
                  <Box>
                    <iframe src={selectedDocument} width="100%" height="1000px" />
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  </Container>
  <Footer />
</>

  );
};

export default AdminDashboard;
