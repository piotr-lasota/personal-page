// noinspection JSUnusedGlobalSymbols
import React from 'react';
import { Box, Typography } from '@mui/material';
import Seo from '../components/Seo';

const Bio = (): JSX.Element => (
  <Box>
    <Seo title="Bio" />
    <Typography variant="h2" align="center" color="primary">
      Who am I?
    </Typography>
  </Box>
);

export default Bio;
