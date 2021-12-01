import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import { Box, Container, Theme } from '@mui/material';

import NavigationBar from './NavigationBar';

type TopLayoutProps = {
  children: JSX.Element;
  theme: Theme;
};

// eslint-disable-next-line
const TopLayout = ({ children, theme }: TopLayoutProps) : JSX.Element => {
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
