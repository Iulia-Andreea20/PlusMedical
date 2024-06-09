import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SplitScreenLayout from '@components/SplitScreenLayout';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';

const defaultTheme = createTheme();

export default function RequestForm() {
  const [fileErrors, setFileErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isGuarantor, setIsGuarantor] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const data = new FormData(event.currentTarget);
    const errors = {};

    // Validate CNP
    const cnp = data.get('cnp');
    if (!cnp) {
      errors.cnp = 'CNP is required.';
    } else if (!/^\d{13}$/.test(cnp)) {
      errors.cnp = 'CNP must be exactly 13 digits.';
    }

    // Validate other required fields
    const requiredFields = ['city', 'street', 'number', 'incomeStatement', 'idCopy', 'requestedAmount'];
    requiredFields.forEach(field => {
      if (!data.get(field)) {
        errors[field] = 'This field is required.';
      }
    });

    // Validate number field
    const number = data.get('number');
    if (number && !/^\d+$/.test(number)) {
      errors.number = 'Number must be a numeric value.';
    }

    // Validate requested amount
    const requestedAmount = data.get('requestedAmount');
    if (requestedAmount && !/^\d+$/.test(requestedAmount)) {
      errors.requestedAmount = 'Requested amount must be numeric.';
    } else if (requestedAmount && parseInt(requestedAmount) < 5000) {
      errors.requestedAmount = 'The minimum loan amount is 5000 RON.';
    }

    // Validate apartment field
    const ap = data.get('ap');
    if (ap && !/^\d+$/.test(ap)) {
      errors.ap = 'Apartment Number must be a numeric value.';
    }

    // Validate Guarantor CNP if the checkbox is checked
    if (isGuarantor) {
      const guarantorId = data.get('guarantorId');
      if (!guarantorId) {
        errors.guarantorId = 'Guarantor CNP is required.';
      } else if (!/^\d{13}$/.test(guarantorId)) {
        errors.guarantorId = 'Guarantor CNP must be exactly 13 digits.';
      } else if (guarantorId === cnp) {
        errors.guarantorId = 'Guarantor CNP must be different from Personal CNP.';
      }
    }

    // Validate file uploads
    const incomeStatement = data.get('incomeStatement');
    const idCopy = data.get('idCopy');

    if (incomeStatement && incomeStatement.type !== 'application/pdf') {
      errors.incomeStatement = 'This field is required.';
    } else if (incomeStatement && incomeStatement.size > 5 * 1024 * 1024) {
      errors.incomeStatement = 'Income statement file size should be less than 5MB.';
    }

    if (idCopy && idCopy.type !== 'application/pdf') {
      errors.idCopy = 'This field is required.';
    } else if (idCopy && idCopy.size > 5 * 1024 * 1024) {
      errors.idCopy = 'ID copy file size should be less than 5MB.';
    }

    // Set form errors
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Handle form submission logic
      console.log('Form Data:', data);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const { name } = event.target;
    const errors = { ...fileErrors };

    if (file && file.type !== 'application/pdf') {
      errors[name] = 'Only PDF files are allowed.';
    } else if (file && file.size > 5 * 1024 * 1024) {
      errors[name] = 'File size should be less than 5MB.';
    } else {
      delete errors[name];
    }

    setFileErrors(errors);
    if (Object.keys(errors).length === 0) {
      setFormErrors((prevErrors) => {
        const { [name]: _, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (value) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setIsGuarantor(checked);
    if (!checked) {
      setFormErrors((prevErrors) => {
        const { guarantorId, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <SplitScreenLayout>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#4caf50' }}>
              <RequestQuoteIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Request Form
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="cnp"
                label="Personal CNP"
                name="cnp"
                autoComplete="cnp"
                autoFocus
                error={formSubmitted && Boolean(formErrors.cnp)}
                helperText={formSubmitted && formErrors.cnp}
                onChange={handleInputChange}
                sx={{ mb: 0 }}
              />
              <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1, mb: 1, fontSize: '0.875rem' }}>
                Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="city"
                    error={formSubmitted && Boolean(formErrors.city)}
                    helperText={formSubmitted && formErrors.city}
                    onChange={handleInputChange}
                    sx={{ mb: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="street"
                    label="Street"
                    name="street"
                    autoComplete="street"
                    error={formSubmitted && Boolean(formErrors.street)}
                    helperText={formSubmitted && formErrors.street}
                    onChange={handleInputChange}
                    sx={{ mb: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="number"
                    label="Number"
                    name="number"
                    autoComplete="number"
                    error={formSubmitted && Boolean(formErrors.number)}
                    helperText={formSubmitted && formErrors.number}
                    onChange={handleInputChange}
                    sx={{ mb: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="block"
                    label="Block"
                    name="block"
                    autoComplete="block"
                    onChange={handleInputChange}
                    sx={{ mb: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="scara"
                    label="Scara"
                    name="scara"
                    autoComplete="scara"
                    onChange={handleInputChange}
                    sx={{ mb: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="ap"
                    label="Apartment Number"
                    name="ap"
                    autoComplete="ap"
                    error={formSubmitted && Boolean(formErrors.ap)}
                    helperText={formSubmitted && formErrors.ap}
                    onChange={handleInputChange}
                    sx={{ mb: 1 }}
                  />
                </Grid>
              </Grid>
              <TextField
                margin="normal"
                required
                fullWidth
                type="file"
                id="incomeStatement"
                label="Income Statement"
                name="incomeStatement"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: 'application/pdf' }}
                onChange={handleFileChange}
                error={formSubmitted && (Boolean(fileErrors.incomeStatement) || Boolean(formErrors.incomeStatement))}
                helperText={formSubmitted && (fileErrors.incomeStatement || formErrors.incomeStatement)}
                sx={{ mb: 0 }}
              />
              <Typography variant="caption" color="textSecondary" sx={{ mb: 3 }}>
                * Please upload a PDF file containing your income statement for the last 6 months.
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                type="file"
                id="idCopy"
                label="Identity Card Copy"
                name="idCopy"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: 'application/pdf' }}
                onChange={handleFileChange}
                error={formSubmitted && (Boolean(fileErrors.idCopy) || Boolean(formErrors.idCopy))}
                helperText={formSubmitted && (fileErrors.idCopy || formErrors.idCopy)}
                sx={{ mb: 0 }}
              />
              <Typography variant="caption" color="textSecondary" sx={{ mb: 2 }}>
                * Please upload a PDF file containing a copy of your ID.
              </Typography>
              <TextField
                required
                fullWidth
                id="requestedAmount"
                label="Requested Amount"
                name="requestedAmount"
                autoComplete="requestedAmount"
                InputProps={{
                  endAdornment: <InputAdornment position="end">RON</InputAdornment>,
                }}
                error={formSubmitted && Boolean(formErrors.requestedAmount)}
                helperText={formSubmitted && formErrors.requestedAmount}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              <FormControlLabel
                control={<Checkbox value="isGuarantor" color="primary" onChange={handleCheckboxChange} />}
                label="I am a guarantor"
                sx={{ mb: 0 }}
              />
              {isGuarantor && (
                <TextField
                  margin="normal"
                  fullWidth
                  id="guarantorId"
                  label="Guarantor CNP"
                  name="guarantorCNP"
                  autoComplete="guarantorCNP"
                  error={formSubmitted && Boolean(formErrors.guarantorId)}
                  helperText={formSubmitted && formErrors.guarantorId}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
              >
                Send Request
              </Button>
            </Box>
          </Box>
        </Container>
      </SplitScreenLayout>
    </ThemeProvider>
  );
}
