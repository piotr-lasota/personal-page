import React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';

const CommentsLoadingSpinner = (): JSX.Element => (
  <Grid container direction="row" spacing={3} alignItems="center">
    <Grid item>
      <CircularProgress />
    </Grid>
    <Grid item>
      <Typography>Fetching comments...</Typography>
    </Grid>
  </Grid>
);

export default CommentsLoadingSpinner;
