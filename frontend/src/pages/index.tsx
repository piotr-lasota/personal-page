// noinspection JSUnusedGlobalSymbols
import React from 'react';
import { Box, Typography } from '@mui/material';
import Seo from '../components/Seo';

const IndexPage = (): JSX.Element => (
  <Box>
    <Seo title="Home" />
    <Typography variant="h2" align="center">
      Index page
    </Typography>
  </Box>
);

export default IndexPage;
