// noinspection JSUnusedGlobalSymbols
import React from 'react';
import { Box } from '@mui/material';
import { Seo } from '../components';
import Biography from '../features/Biography';

const Bio = (): JSX.Element => (
  <Box>
    <Seo title="Bio" />
    <Biography />
  </Box>
);

export default Bio;
