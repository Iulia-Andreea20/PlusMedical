import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from '@components/AppAppBar';
import Hero from '@components/Hero';
import Highlights from '@components/Highlights';
import Services from '@components/Services';
import Partners from '@components/Partners';
import FAQ from '@components/FAQ';
import Footer from '@components/Footer';
import getLPTheme from '@pages/getLPTheme';
import SignInSide from '@components/SignInSide';
import SignUp from '@components/SignUp';
import { AuthProvider } from '@components/AuthContext';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { scroller } from 'react-scroll';
import RequestForm from '@components/RequestForm';

function LandingPageContent() {
  const location = useLocation();
  const router = useRouter();
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

  useEffect(() => {
    if (router.asPath.includes('#faq')) {
      scroller.scrollTo('faq', {
        duration: 2500,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  }, [router.asPath]);

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      {location.pathname === '/' && <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Divider />
            <Box sx={{ bgcolor: 'background.default' }}>
              <Services id="services"/>
              <Divider />
              <Partners id="testimonials"/>
              <Highlights id="highlights"/>
              <FAQ id="faq" />
              <Footer />
            </Box>
          </>
        } />
        <Route exact path="/sign-in" element={<SignInSide />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/requestform" element={<RequestForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default function LandingPage() {
  return (
    <AuthProvider>
      <Router>
        <LandingPageContent />
      </Router>
    </AuthProvider>
  );
}
