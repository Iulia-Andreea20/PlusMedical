import * as React from 'react';
import { Box, Container } from '@mui/material';
import Header from '@components/AppAppBar';
import Footer from '@components/Footer';
import RequestService from '@components/RequestService';

export default function Dashboard() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
      <Header />
      <Container sx={{ flexGrow: 1, mt: 4 }}>
        <RequestService />
      </Container>
        <Footer />
    </Box>
  );
}
