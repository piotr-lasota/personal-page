// noinspection JSUnusedGlobalSymbols
import React from 'react';
import { Box } from '@mui/material';
import { Biography, Seo } from '../components';

const Bio = (): JSX.Element => (
  <Box>
    <Seo title="Bio" />
    <Biography />
  </Box>
);

export default Bio;
