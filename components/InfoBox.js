import * as React from 'react';
import { Box, Typography, Link } from '@mui/material';
import NextLink from 'next/link';

const InfoBox = ({ title, content, link }) => (
  <Box
    sx={{
      p: 3,
      mb: 10,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 5,
      backgroundColor: '#E4F0FE',
      boxShadow: 1,
    }}
  >
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" gutterBottom>
      {content}
    </Typography>
    {link && (
        <Link component={NextLink} href={link.href} sx={{ color: '#2D7BD4' }}>
          {link.text}
        </Link>
      )}
  </Box>
);

export default InfoBox;
