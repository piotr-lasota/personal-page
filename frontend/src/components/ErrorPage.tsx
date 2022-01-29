import React from 'react';

import { Box, Typography } from '@mui/material';
import { Seo } from '.';

export type ErrorPageProps = {
  code: number;
  title: string;
  text: string;
};
const ErrorPage = ({ title, text, code }: ErrorPageProps): JSX.Element => (
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
    <Seo title={title} />
    <Typography variant="h2" align="center" color="primary">
      {code}
    </Typography>
    <Typography
      align="center"
      sx={{
        mt: 2
      }}
    >
      Well... that didn&apos;t work out.
    </Typography>
    <Typography align="center">{text}</Typography>
  </Box>
);

export default ErrorPage;
