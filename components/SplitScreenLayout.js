import * as React from 'react';
import { Grid, Box, Typography, Stack, Paper } from '@mui/material';
import { useRouter } from 'next/router';

export default function SplitScreenLayout({ children }) {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <Grid container component="main" sx={{ height: '100vh', position: 'relative' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        }}
      >
        <Box
          component="img"
          src="/images/logo.png"
          alt="Logo"
          onClick={handleLogoClick}
          sx={{
            width: '225px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(54, 149, 254, 0.4)',
            cursor: 'pointer',
            padding: 2,
            mb: 2,
          }}
        />
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
              fontWeight: 'bold',
              letterSpacing: '0.1rem',
              color: '#3E4D6C',
            }}
          >
            Plus
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: '#3695FE',
                fontWeight: 'bold',
                letterSpacing: '0.1rem',
              }}
            >
              Medical
            </Typography>
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
        {children}
      </Grid>
    </Grid>
  );
}
