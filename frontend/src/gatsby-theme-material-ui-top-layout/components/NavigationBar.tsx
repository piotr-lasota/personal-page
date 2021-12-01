import { AppBar, Box, Container, Grid, Toolbar } from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

type Page = {
  name: string;
  link: string;
};

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
      <AppBar position="fixed" color="transparent" sx={{ bgcolor: 'white' }}>
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
                  <Button color="inherit" to={page.link}>
                    {page.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={(theme) => theme.mixins.toolbar} /> {/* toolbar offset */}
    </Box>
  );
};

export default NavigationBar;
