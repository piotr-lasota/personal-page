import { Grid } from '@mui/material';
import React, { ReactNode } from 'react';

type BiographyProps = {
  children: ReactNode;
  reverseRowAboveMedium?: boolean;
};

const BiographyRow = ({
  children,
  reverseRowAboveMedium
}: BiographyProps): JSX.Element => {
  return (
    <Grid
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

BiographyRow.defaultProps = {
  reverseRowAboveMedium: false
};

export default BiographyRow;
