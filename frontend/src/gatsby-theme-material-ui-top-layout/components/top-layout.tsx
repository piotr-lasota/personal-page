import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import { Box, Container, Theme } from '@mui/material';

import { graphql, useStaticQuery } from 'gatsby';
import { NavigationBar } from '../../components';

type QueryData = {
  site: {
    siteMetadata: {
      pages: {
        name: string;
        link: string;
      }[];
    };
  };
};

type TopLayoutProps = {
  children: JSX.Element;
  theme: Theme;
};
// eslint-disable-next-line
const TopLayout = ({ children, theme }: TopLayoutProps): JSX.Element => {
  const {
    site: {
      siteMetadata: { pages }
    }
  } = useStaticQuery<QueryData>(
    graphql`
      query {
        site {
          siteMetadata {
            pages {
              name
              link
            }
          }
        }
      }
    `
  );

  return (
    <ThemeTopLayout theme={theme}>
      <Container maxWidth="md">
        <NavigationBar pages={pages} />
        <Box sx={{ mb: 2 }} />
        {children}
      </Container>
    </ThemeTopLayout>
  );
};

export default TopLayout;
