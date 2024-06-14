import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';
import Footer from '@components/Footer';
import Header from '@components/AppAppBar';

const RequestDetails = () => {
  const router = useRouter();
  const { email } = router.query;
  const [requestDetails, setRequestDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;
    const fetchRequestDetails = async () => {
      if (email) {
        try {
          const response = await fetch(`/api/request-details?email=${encodeURIComponent(email)}`);
          const data = await response.json();
          if (!response.ok) {
            setError(data.message || 'No request found for this user');
          } else {
            setRequestDetails(data.request);
          }
        } catch (error) {
          console.error('Error fetching request details:', error);
          setError('Failed to fetch request details');
        }
      }
    };

    fetchRequestDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!requestDetails) {
    return <div>Loading...</div>;
  }

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

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', mt: 15 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Arial, sans-serif'}}>
            Request Details
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '100%', maxWidth: 800, px: 2 }}>
            <Card sx={{
                width: '100%',
                mb: 2,
                bgcolor: '#e3f2fd',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: 2,
              }}>
              <CardContent>
              <Typography variant="body2" color= "text.secondary" sx={{ fontFamily: 'Arial, sans-serif' }}>
                  Service: PlusMedical
                </Typography>
                <Typography variant="body2" color= "text.secondary" sx={{ fontFamily: 'Arial, sans-serif' }}>
                  Status: <span style={{ color: getStatusColor(requestDetails.status) }}>{requestDetails.status}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Arial, sans-serif' }}>
                  Date Requested: {new Date(requestDetails.requestDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Arial, sans-serif' }}>
                  Requested Amount: {requestDetails.requestedAmount} RON
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default RequestDetails;
