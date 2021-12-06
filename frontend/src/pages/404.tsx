// noinspection JSUnusedGlobalSymbols
import React from 'react';

import { Box, Typography } from '@mui/material';
import Seo from '../components/Seo';

const NotFoundPage: React.FC = () => (
  <Box
    sx={{
      height: '70vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Seo title="Not found" />
    <Typography variant="h2" align="center" color="primary">
      404
    </Typography>
    <Typography
      // variant="h4"
      align="center"
      sx={{
        mt: 2
      }}
    >
      Well... that didn&apos;t work out.
    </Typography>
    <Typography align="center">This page does not exist!</Typography>
  </Box>
);

export default NotFoundPage;
