import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Header from '@components/AppAppBar'; 
import Footer from '@components/Footer'; 
import CreditCardDisplay from '@components/CreditCardDisplay'; 

const CardDetails = () => {
const [cardDetails, setCardDetails] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
    const fetchCardDetails = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user?.email;
    try {
        const response = await fetch('/api/card-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        });

        if (!response.ok) {
        throw new Error('Failed to fetch card details');
        }

        const data = await response.json();
        setCardDetails(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
    };

    fetchCardDetails();
}, []);

  return (
    <>
    <Header />
    <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ mt: 8, mb: 4, flexGrow: 1 }}>
        {loading ? (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Loading...
          </Typography>
        ) : error ? (
          <Typography variant="body1" color="error" sx={{ textAlign: 'center' }}>
            {error}
          </Typography>
        ) : (
          cardDetails && (
            <CreditCardDisplay
              cardHolder={cardDetails.cardHolder}
              cardNumber={cardDetails.cardNumber}
              expiry={cardDetails.expiry}
              cvc={cardDetails.cvc}
            />
          )
        )}
      </Box>
    </Container>
    <Footer />
  </>
  );
};

export default CardDetails;
