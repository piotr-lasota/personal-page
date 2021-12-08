import React from 'react';
import { AppBar, Box, Container, Grid, Theme, Toolbar } from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import { graphql, useStaticQuery } from 'gatsby';

type Page = {
  name: string;
  link: string;
};

const ToolbarSpacer = (): JSX.Element => (
  <Box sx={(theme) => theme.mixins.toolbar} />
);

const NavigationBar = (): JSX.Element => {
  const {
    site: {
      siteMetadata: { pages: pagesData }
    }
  } = useStaticQuery(
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
  const pages: Page[] = pagesData;

  return (
    <Box>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          backgroundColor: (theme: Theme) => theme.palette.background.default
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse'
          }}
        >
          <Toolbar>
            <Grid container direction="row" spacing={4}>
              {pages.map((page) => (
                <Grid item key={page.name}>
                  <Button
                    color="inherit"
                    to={`/${page.link}`}
                    role="button"
                    aria-label="page.name"
                  >
                    {page.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <ToolbarSpacer />
    </Box>
  );
};

export default NavigationBar;
