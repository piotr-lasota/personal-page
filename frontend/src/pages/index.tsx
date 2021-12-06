// noinspection JSUnusedGlobalSymbols
import React from 'react';
import { Box, Typography } from '@mui/material';
import Seo from '../components/Seo';

const IndexPage = (): JSX.Element => {
  return (
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
      <Seo title="Home" />
      <Typography variant="h2" align="center" color="primary">
        Hello there!
      </Typography>
      <Typography align="center">
        Let&apos;s talk about software engineering
      </Typography>
    </Box>
  );
};

export default IndexPage;
