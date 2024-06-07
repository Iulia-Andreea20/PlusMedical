import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';

const defaultTheme = createTheme();

export default function SignUpSide() {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const validateName = (name) => {
    const re = /^[A-Z][a-zA-Z-]*$/;
    return re.test(name);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const data = new FormData(event.currentTarget);
    const formData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phoneNumber: data.get('phoneNumber'),
      password: data.get('password'),
    };

    const newErrors = {};

    if (!formData.firstName || !validateName(formData.firstName)) {
      newErrors.firstName = 'First name should contain only letters, start with a capital letter, and can contain a hyphen.';
    }

    if (!formData.lastName || !validateName(formData.lastName)) {
      newErrors.lastName = 'Last name should contain only letters, start with a capital letter, and can contain a hyphen.';
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phoneNumber || !validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits.';
    }

    if (!formData.password || !validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain one capital letter, one number, and one special character.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Send the data to the server using POST
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push('/sign-in');
    } else {
      const errorData = await response.json();
      console.error(errorData.error);
    }
  };

  const handleSignInClick = (event) => {
    event.preventDefault();
    setSubmitted(false);
    router.push('/sign-in');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#db1e63' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={submitted && Boolean(errors.firstName)}
                  helperText={submitted && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={submitted && Boolean(errors.lastName)}
                  helperText={submitted && errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={submitted && Boolean(errors.email)}
                  helperText={submitted && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="tel"
                  error={submitted && Boolean(errors.phoneNumber)}
                  helperText={submitted && errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={submitted && Boolean(errors.password)}
                  helperText={submitted && errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <a
                  href="#"
                  onClick={handleSignInClick}
                  style={{  color: '#2D7BD4', cursor: 'pointer' }}
                >
                  <Typography variant="body2">
                    Already have an account? Sign in
                  </Typography>
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}