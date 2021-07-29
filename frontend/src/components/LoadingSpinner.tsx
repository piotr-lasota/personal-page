import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';

type LoadingSpinnerProps = {
  header?: string;
  text?: string;
};

const LoadingSpinner = ({ header, text }: LoadingSpinnerProps): JSX.Element => (
  <Box p={5}>
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      {header && (
        <Grid item>
          <Typography variant="h4">{header.toUpperCase()}</Typography>
        </Grid>
      )}
      <Grid item>
        <CircularProgress />
      </Grid>
      {text && (
        <Grid item>
          <Typography variant="subtitle1">{text}</Typography>
        </Grid>
      )}
    </Grid>
  </Box>
);

LoadingSpinner.defaultProps = {
  header: null,
  text: null
};

export default LoadingSpinner;
