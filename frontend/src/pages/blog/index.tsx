// noinspection JSUnusedGlobalSymbols
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Seo } from '../../components';

const Blog = (): JSX.Element => (
  <Box>
    <Seo title="Blog" />
    <Typography variant="h2" align="center" color="primary">
      Blog
    </Typography>
    <Typography align="center">List of blogposts goes here</Typography>
  </Box>
);

export default Blog;
