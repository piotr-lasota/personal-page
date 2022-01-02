import React from 'react';
import { Grid } from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import CommentsList from './CommentsList';
import { Comment } from './models';

export type CommentsSectionComponentProps = {
  comments: Comment[];
};

const CommentsSectionComponent = ({
  comments
}: CommentsSectionComponentProps): JSX.Element => (
  <Grid container direction="column" spacing={3}>
    <Grid item>
      <CommentsList comments={comments} />
    </Grid>
    <Grid item>
      <Button variant="contained">Comment</Button>
    </Grid>
  </Grid>
);

export default CommentsSectionComponent;
