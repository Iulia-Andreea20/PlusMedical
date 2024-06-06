import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import SavingsIcon from '@mui/icons-material/Savings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LaptopIcon from '@mui/icons-material/Laptop';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const items = [
  {
    icon: <LaptopIcon />,
    title: 'Effortless Online Access',
    description:
      'Easily access your card details, track spending, and upcoming instalment details through our secure online portal.',
  },
  {
    icon: <SavingsIcon />,
    title: 'Significant Savings',
    description:
      'Save on your medical treatments with special offers available exclusively to PlusMedical Card holders at our partner clinics and hospitals',
  },
  {
    icon: <SentimentVerySatisfiedIcon />,
    title: 'Great User Experience',
    description:
      'We\'ve designed our platform with you in mind. Our intuitive interface and user-friendly features make it easy to navigate and manage your healthcare finances.',
  },
  {
    icon: <AdsClickIcon />,
    title: 'Easy Online Application',
    description:
      'Applying for your PlusMedical Card is quick and easy. Our streamlined online application process allows you to get approved only in a few days, so you can focus on your health and well-being.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: '24/7 Dedicated Support',
    description:
      'Our dedicated customer support team is available 24/7 to address any questions or concerns you may have regarding your PlusMedical Card or associated financial services.',
  },
  {
    icon: <VerifiedUserIcon />,
    title: 'Your Data, Our Priority',
    description:
      'Rest assured that your personal and financial information is safeguarded with advanced security measures. Your data is securely stored and easily accessible whenever you need it',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
          Experience a new level of convenience and financial flexibility with the PlusMedical Card, designed to simplify your healthcare journey.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}