import { Grid } from '@mui/material';
import React, { ReactNode } from 'react';

type BiographyContentCellProps = {
  children: ReactNode;
};

const BiographyContentCell = ({
  children
}: BiographyContentCellProps): JSX.Element => (
  <Grid item xs={12} md={6}>
    {children}
  </Grid>
);

export default BiographyContentCell;
