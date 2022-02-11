import { Typography } from '@mui/material';
import React from 'react';

type LifeStageHeaderProps = {
  period: string;
  label: string;
};
const LifeStageHeader = ({
  period,
  label
}: LifeStageHeaderProps): JSX.Element => (
  <>
    <Typography variant="h4" align="center" fontWeight="light">
      {period}
    </Typography>
    <Typography variant="h3" align="center" fontWeight="light">
      {label}
    </Typography>
  </>
);

export default LifeStageHeader;
