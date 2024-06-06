import * as React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from '@components/AppAppBar';
import Hero from '@components/Hero';
// import LogoCollection from '@components/LogoCollection';
import Highlights from '@components/Highlights';
// import Pricing from '@components/Pricing';
import Services from '@components/Services';
import Partners from '@components/Partners';
import FAQ from '@components/FAQ';
import Footer from '@components/Footer';
import getLPTheme from '@pages/getLPTheme';
import CreditCardDisplay from '@components/CreditCardDisplay';

export default function LandingPage() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      {/* <CreditCardDisplay
        cardHolder="Your Plus Medical Card"
        cardNumber="1234567812341234"
        expiry="07/27"
        cvc="123"
      /> */}
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <Services />
        <Divider />
        <Partners />
        {/* <LogoCollection /> */}
        <Divider />
        <Highlights />
        <Divider />
        {/* <Pricing /> */}
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}