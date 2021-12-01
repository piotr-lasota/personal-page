import React from 'react';
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import { Box, Container } from '@mui/material';
import NavigationBar from './NavigationBar';

// eslint-disable-next-line
const TopLayout = ({ children, theme }) => {
  return (
    <ThemeTopLayout theme={theme}>
      <Container maxWidth="md">
        <NavigationBar />
        <Box sx={{ mb: 2 }} />
        {children}
      </Container>
    </ThemeTopLayout>
  );
};

export default TopLayout;
