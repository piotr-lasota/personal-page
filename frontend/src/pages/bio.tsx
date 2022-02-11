import { Box } from '@mui/material';
import React from 'react';
import { Seo } from '../components';
import { Biography } from '../features/Biography/components';

const BioPage = (): JSX.Element => {
  return (
    <Box>
      <Seo title="Biography" />
      <Biography />
    </Box>
  );
};

export default BioPage;
