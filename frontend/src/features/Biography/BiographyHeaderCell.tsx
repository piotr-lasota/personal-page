import { Grid } from '@mui/material';
import React, { ReactNode } from 'react';

type BiographyHeaderCellProps = {
  children: ReactNode;
};

const BiographyHeaderCell = ({
  children
}: BiographyHeaderCellProps): JSX.Element => (
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

export default BiographyHeaderCell;
