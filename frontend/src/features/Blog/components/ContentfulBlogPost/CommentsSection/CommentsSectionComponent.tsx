import React from 'react';
import { Grid } from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import CommentsList from './CommentsList';
import { PublishedComment } from '../../../models';

export type CommentsSectionComponentProps = {
  onCommentButtonClick?: () => void;
  comments: PublishedComment[];
};

const CommentsSectionComponent = ({
  onCommentButtonClick = () => {},
  comments
}: CommentsSectionComponentProps): JSX.Element => {
  const handleCommentButtonClicked = () => onCommentButtonClick();

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <CommentsList comments={comments} />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleCommentButtonClicked}>
          Comment
        </Button>
      </Grid>
    </Grid>
  );
};

export default CommentsSectionComponent;
