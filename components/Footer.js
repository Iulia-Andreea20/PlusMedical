import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="white" mt={1}>
      {' © '}
      {new Date().getFullYear()}
      <Link href="https://www.linkedin.com/in/iulia-andreea-grigore-4a504920a/" target="_blank" rel="noopener" color="inherit">
        {' Grigore Iulia-Andreea'}
      </Link>
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'black', color: 'white', py: { xs: 4, sm: 6 } }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Copyright />
      </Container>
    </Box>
  );
}
