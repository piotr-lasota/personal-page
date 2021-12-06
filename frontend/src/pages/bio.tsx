// noinspection JSUnusedGlobalSymbols
import React, { ReactNode } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Seo from '../components/Seo';

type CellProps = { children: ReactNode };
type RowProps = { children: ReactNode; invertOnMedium?: boolean };

const BiographyRow = ({ children, invertOnMedium }: RowProps): JSX.Element => {
  return (
    <Grid
      item
      xs={12}
      container
      direction={{ xs: invertOnMedium ? 'column-reverse' : 'row', md: 'row' }}
    >
      {children}
    </Grid>
  );
};
BiographyRow.defaultProps = {
  invertOnMedium: false
};

const HeaderCell = ({ children }: CellProps): JSX.Element => (
  <Grid
    item
    xs={12}
    md={6}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}
  >
    {children}
  </Grid>
);

const ContentCell = ({ children }: CellProps): JSX.Element => (
  <Grid item xs={12} md={6}>
    {children}
  </Grid>
);

const Bio = (): JSX.Element => (
  <Box>
    <Seo title="Bio" />
    <Grid container direction="column" spacing={10}>
      <Grid item xs={12}>
        <Typography variant="h2" align="center" color="primary">
          Who am I?
        </Typography>
      </Grid>

      <BiographyRow>
        <HeaderCell>
          <Typography variant="h2" align="center">
            First Left
          </Typography>
        </HeaderCell>

        <ContentCell>
          <Typography align="justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            nec lobortis purus, sed blandit neque. Nulla iaculis velit eu risus
            efficitur sodales. Cras tempus sed urna ac sollicitudin. Sed porta
            purus ac dictum vehicula. Nam sagittis lobortis accumsan. In in
            sollicitudin tortor, mattis vestibulum libero. Praesent felis dolor,
            interdum vel metus eu, dignissim rhoncus dolor. Etiam consequat
            metus tellus, sit amet viverra mauris tempus posuere.
          </Typography>
        </ContentCell>
      </BiographyRow>

      <BiographyRow invertOnMedium>
        <ContentCell>
          <Typography align="justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            nec lobortis purus, sed blandit neque. Nulla iaculis velit eu risus
            efficitur sodales. Cras tempus sed urna ac sollicitudin. Sed porta
            purus ac dictum vehicula. Nam sagittis lobortis accumsan. In in
            sollicitudin tortor, mattis vestibulum libero. Praesent felis dolor,
            interdum vel metus eu, dignissim rhoncus dolor. Etiam consequat
            metus tellus, sit amet viverra mauris tempus posuere. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Maecenas nec lobortis
            purus, sed blandit neque. Nulla iaculis velit eu risus efficitur
            sodales. Cras tempus sed urna ac sollicitudin. Sed porta purus ac
            dictum vehicula. Nam sagittis lobortis accumsan. In in sollicitudin
            tortor, mattis vestibulum libero. Praesent felis dolor, interdum vel
            metus eu, dignissim rhoncus dolor. Etiam consequat metus tellus, sit
            amet viverra mauris tempus posuere.
          </Typography>
        </ContentCell>

        <HeaderCell>
          <Typography variant="h2" align="center">
            Second Right
          </Typography>
        </HeaderCell>
      </BiographyRow>

      <BiographyRow>
        <HeaderCell>
          <Typography variant="h2" align="center">
            Third Left
          </Typography>
        </HeaderCell>

        <ContentCell>
          <Typography align="justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            nec lobortis purus, sed blandit neque. Nulla iaculis velit eu risus
            efficitur sodales. Cras tempus sed urna ac sollicitudin. Sed porta
            purus ac dictum vehicula. Nam sagittis lobortis accumsan. In in
            sollicitudin tortor, mattis vestibulum libero. Praesent felis dolor,
            interdum vel metus eu, dignissim rhoncus dolor. Etiam consequat
            metus tellus, sit amet viverra mauris tempus posuere.
          </Typography>
        </ContentCell>
      </BiographyRow>

      <BiographyRow invertOnMedium>
        <ContentCell>
          <Typography align="justify">
            Nulla iaculis velit eu risus efficitur sodales. Cras tempus sed urna
            ac sollicitudin. Sed porta purus ac dictum vehicula. Nam sagittis
            lobortis accumsan. In in sollicitudin tortor, mattis vestibulum
            libero. Praesent felis dolor, interdum vel metus eu, dignissim
            rhoncus dolor. Etiam consequat metus tellus, sit amet viverra mauris
            tempus posuere. Nulla iaculis velit eu risus efficitur sodales. Cras
            tempus sed urna ac sollicitudin. Sed porta purus ac dictum vehicula.
            Nam sagittis lobortis accumsan. In in sollicitudin tortor, mattis
            vestibulum libero. Praesent felis dolor, interdum vel metus eu,
            dignissim rhoncus dolor. Etiam consequat metus tellus, sit amet
            viverra mauris tempus posuere.
          </Typography>
        </ContentCell>

        <HeaderCell>
          <Typography variant="h2" align="center">
            Fourth Left
          </Typography>
        </HeaderCell>
      </BiographyRow>
    </Grid>
  </Box>
);

export default Bio;
