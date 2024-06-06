import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function CreditCardDisplay({ cardHolder, cardNumber, expiry, cvc }) {
  const [flipped, setFlipped] = React.useState(false);

  const maskedNumber = cardNumber.replace(/\d(?=\d{4})/g, '*');

  const formatCardNumber = (number) => {
    return number.replace(/(.{4})/g, '$1 ').trim();
  };

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D5E9FD', // Optional: Add a background color for better visualization
      }}
    >
      <Box
        sx={{
          width: '340px',
          height: '210px',
          position: 'relative',
          // perspective: '1000px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={handleFlip}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transition: 'transform 0.8s',
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#4D8EFF',
              color: 'white',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              padding: '16px',
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backfaceVisibility: 'hidden',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <Image
                  src="/images/logo.png"
                  alt="Stethoscope"
                  width={24}
                  height={24}
                />
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold' }}>
                  PlusMedical
                </Typography>
              </Box>
              <Image
                src="/visa-seeklogo.svg"
                alt="Visa Logo"
                width={48}
                height={24}
              />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', letterSpacing: '4px' }}>
              {formatCardNumber(maskedNumber)}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>
              {cardHolder}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: 'bold' }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', lineHeight: 1, fontSize: '10px' }}>VALID</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold', lineHeight: 1, fontSize: '10px' }}>THRU</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold', ml: 1, fontSize: '18px' }}>{expiry}</Typography>
            </Box>
          </Box>
          {/* Back Side */}
          <Box
            sx={{
              backgroundColor: '#4D8EFF',
              color: 'white',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              padding: '16px',
              position: 'absolute',
              width: '100%',
              height: '100%',
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <Box
              sx={{
                mt: 2,
                height: '20px',
                width: '100%',
                backgroundColor: 'black',
              }}
            />
            <Box
              sx={{
                mt: 2,
                height: '40px',
                backgroundColor: 'white',
                color: 'black',
                textAlign: 'right',
                padding: '7px',
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>***</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
