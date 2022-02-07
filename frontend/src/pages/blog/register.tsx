// noinspection JSUnusedGlobalSymbols
import React from 'react';
import { Box } from '@mui/material';
import { Seo } from '../../components';
import { BlogPostRegistration } from '../../features/Blog/components';

const Register = (): JSX.Element => {
  return (
    <Box>
      <Seo title="Register a post" />
      <BlogPostRegistration />
    </Box>
  );
};

export default Register;
