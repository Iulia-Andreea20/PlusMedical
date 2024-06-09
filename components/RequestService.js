import * as React from 'react';
import { Box, Typography, Stack, Link } from '@mui/material';
import InfoBox from '@components/InfoBox';

const RequestService = () => {
  return (
    <Box sx={{ mt: 20 }}>
      <Stack spacing={3}>
      <InfoBox
          title="MedicalPlus Card Information"
          content={
            <>
              If you need any more information, check out the Q&A section 
              <Link href="/#faq" sx={{ color: '#2D7BD4', marginLeft: '5px' }}>
                here
              </Link>.
            </>
          }
        />
        <InfoBox
          title="Request a PlusMedical Card"
          content="Do you want to send a request for a MedicalPlus?"
          link={{ href: '/requestform', text: 'Click here to request a service.' }}
        />
      </Stack>
    </Box>
  );
};

export default RequestService;
