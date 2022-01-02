import { Grid } from '@mui/material';
import React, { ReactNode } from 'react';

export type BiographyProps = {
  children: ReactNode;
  reverseRowAboveMedium?: boolean;
};
const BiographyRow = ({
  children,
  reverseRowAboveMedium = false
}: BiographyProps): JSX.Element => {
  return (
    <Grid
      component="section"
      item
      xs={12}
      container
      direction={{
        xs: 'column',
        md: reverseRowAboveMedium ? 'row-reverse' : 'row'
      }}
    >
      {children}
    </Grid>
  );
};

export default BiographyRow;
