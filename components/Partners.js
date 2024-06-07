import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const partners = [
  {
    name: 'Muntenia Hospital',
    benefit: 'First consultation free and 5% off on full treatment with PlusMedical card.',
  },
  {
    name: 'Sanador Center',
    benefit: '10% discount on all treatments with PlusMedical card.',
  },
  {
    name: 'Innovation Medical Center',
    benefit: 'Use your PlusMedical Card for treatment and get free X-rays.',
  },
];

export default function Partners() {
  return (
    <Container
      id="partners"
      sx={{
        pt: { xs: 4, sm: 3 },
        pb: { xs: 8, sm: 16 },
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
          mt: { xs: 4, sm: 10 },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Potential Partners
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore the benefits offered by our potential partners. Enjoy exclusive
          offers and discounts by using your PlusMedical card at these locations.
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ mt: { xs: 2, sm: 4 } }}>
        {partners.map((partner, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  {partner.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {partner.benefit}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
