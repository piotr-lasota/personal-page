import React from 'react';
import { Grid, Typography } from '@mui/material';
import BiographyHeaderCell from './BiographyHeaderCell';
import BiographyRow from './BiographyRow';
import BiographyContentCell from './BiographyContentCell';
import biography from './content';
import LifeStageHeader from './LifeStageHeader';

const isOdd = (index: number) => index % 2 !== 0;
const Biography = (): JSX.Element => (
  <Grid component="section" container direction="column" spacing={5}>
    <Grid component="header" item xs={12}>
      <Typography variant="h2" align="center" color="primary">
        Who am I?
      </Typography>
    </Grid>

    {biography.map(({ content, label, periodDescription }, index) => (
      <BiographyRow key={label} reverseRowAboveMedium={isOdd(index)}>
        <BiographyHeaderCell>
          <LifeStageHeader period={periodDescription} label={label} />
        </BiographyHeaderCell>

        <BiographyContentCell>
          <Typography align="justify">{content}</Typography>
        </BiographyContentCell>
      </BiographyRow>
    ))}
  </Grid>
);

export default Biography;
