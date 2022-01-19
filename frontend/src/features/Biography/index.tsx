import React from 'react';
import { Grid, Typography } from '@mui/material';
import BiographyHeaderCell from './BiographyHeaderCell';
import BiographyRow from './BiographyRow';
import BiographyContentCell from './BiographyContentCell';

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

const Biography = (): JSX.Element => (
  <Grid component="section" container direction="column" spacing={10}>
    <Grid component="header" item xs={12}>
      <Typography variant="h2" align="center" color="primary">
        Who am I?
      </Typography>
    </Grid>

    <BiographyRow>
      <BiographyHeaderCell>
        <LifeStageHeader period="'18 and beyond" label="Software Developer" />
      </BiographyHeaderCell>

      <BiographyContentCell>
        <Typography align="justify">
          After realizing that mechanical engineering is not my thing I decided
          to deep dive into professional software development. And it was a head
          first dive. I quit my well-paid job, placed all my eggs in one basked
          and decided that if I&apos;m to fail miserably then at least it will
          be trying to do something that I wanted to try for a long time. I fell
          in love with everything code (although it being unrequited love at
          first) and gradually gained skills and knowledge to become an
          autonomous specialist able to join any team on any product.
        </Typography>
      </BiographyContentCell>
    </BiographyRow>

    <BiographyRow reverseRowAboveMedium>
      <BiographyHeaderCell>
        <LifeStageHeader period="'14 - '18" label="Mechanical Engineer" />
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
        <LifeStageHeader period="'10 - '15" label="Student" />
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
  </Grid>
);

export default Biography;
