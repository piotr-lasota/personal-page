// noinspection JSUnusedGlobalSymbols
import React from 'react';

import { Box, Typography } from '@mui/material';
import Seo from '../components/Seo';

const NotFoundPage: React.FC = () => (
  <Box>
    <Seo title="404: Not found" />
    <Typography variant="h1" align="center">
      404
    </Typography>
    <Typography
      variant="h4"
      align="center"
      sx={{
        mt: 2
      }}
    >
      Well... that didn&apos;t work out
    </Typography>
  </Box>
);

export default NotFoundPage;
