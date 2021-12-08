import React from 'react';
import { Grid, Typography } from '@mui/material';
import BiographyHeaderCell from './BiographyHeaderCell';
import BiographyRow from './BiographyRow';
import BiographyContentCell from './BiographyContentCell';

const Biography = (): JSX.Element => (
  <Grid container direction="column" spacing={10}>
    <Grid item xs={12}>
      <Typography variant="h2" align="center" color="primary">
        Who am I?
      </Typography>
    </Grid>

    <BiographyRow>
      <BiographyHeaderCell>
        <Typography variant="h2" align="center">
          First Left
        </Typography>
      </BiographyHeaderCell>

      <BiographyContentCell>
        <Typography align="justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec
          lobortis purus, sed blandit neque. Nulla iaculis velit eu risus
          efficitur sodales. Cras tempus sed urna ac sollicitudin. Sed porta
          purus ac dictum vehicula. Nam sagittis lobortis accumsan. In in
          sollicitudin tortor, mattis vestibulum libero. Praesent felis dolor,
          interdum vel metus eu, dignissim rhoncus dolor. Etiam consequat metus
          tellus, sit amet viverra mauris tempus posuere.
        </Typography>
      </BiographyContentCell>
    </BiographyRow>

    <BiographyRow reverseRowAboveMedium>
      <BiographyHeaderCell>
        <Typography variant="h2" align="center">
          Second Right
        </Typography>
      </BiographyHeaderCell>

      <BiographyContentCell>
        <Typography align="justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec
          lobortis purus, sed blandit neque. Nulla iaculis velit eu risus
          efficitur sodales. Cras tempus sed urna ac sollicitudin. Sed porta
          purus ac dictum vehicula. Nam sagittis lobortis accumsan. In in
          sollicitudin tortor, mattis vestibulum libero. Praesent felis dolor,
          interdum vel metus eu, dignissim rhoncus dolor. Etiam consequat metus
          tellus, sit amet viverra mauris tempus posuere. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Maecenas nec lobortis purus, sed
          blandit neque. Nulla iaculis velit eu risus efficitur sodales. Cras
          tempus sed urna ac sollicitudin. Sed porta purus ac dictum vehicula.
          Nam sagittis lobortis accumsan. In in sollicitudin tortor, mattis
          vestibulum libero. Praesent felis dolor, interdum vel metus eu,
          dignissim rhoncus dolor. Etiam consequat metus tellus, sit amet
          viverra mauris tempus posuere.
        </Typography>
      </BiographyContentCell>
    </BiographyRow>

    <BiographyRow>
      <BiographyHeaderCell>
        <Typography variant="h2" align="center">
          Third Left
        </Typography>
      </BiographyHeaderCell>

      <BiographyContentCell>
        <Typography align="justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec
          lobortis purus, sed blandit neque. Nulla iaculis velit eu risus
          efficitur sodales. Cras tempus sed urna ac sollicitudin. Sed porta
          purus ac dictum vehicula. Nam sagittis lobortis accumsan. In in
          sollicitudin tortor, mattis vestibulum libero. Praesent felis dolor,
          interdum vel metus eu, dignissim rhoncus dolor. Etiam consequat metus
          tellus, sit amet viverra mauris tempus posuere.
        </Typography>
      </BiographyContentCell>
    </BiographyRow>

    <BiographyRow reverseRowAboveMedium>
      <BiographyHeaderCell>
        <Typography variant="h2" align="center">
          Fourth Left
        </Typography>
      </BiographyHeaderCell>

      <BiographyContentCell>
        <Typography align="justify">
          Nulla iaculis velit eu risus efficitur sodales. Cras tempus sed urna
          ac sollicitudin. Sed porta purus ac dictum vehicula. Nam sagittis
          lobortis accumsan. In in sollicitudin tortor, mattis vestibulum
          libero. Praesent felis dolor, interdum vel metus eu, dignissim rhoncus
          dolor. Etiam consequat metus tellus, sit amet viverra mauris tempus
          posuere. Nulla iaculis velit eu risus efficitur sodales. Cras tempus
          sed urna ac sollicitudin. Sed porta purus ac dictum vehicula. Nam
          sagittis lobortis accumsan. In in sollicitudin tortor, mattis
          vestibulum libero. Praesent felis dolor, interdum vel metus eu,
          dignissim rhoncus dolor. Etiam consequat metus tellus, sit amet
          viverra mauris tempus posuere.
        </Typography>
      </BiographyContentCell>
    </BiographyRow>
  </Grid>
);

export default Biography;
