import React, { useCallback } from 'react';
import { Grid } from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import CommentsList from './CommentsList';
import { Comment } from './models';

export type CommentsSectionComponentProps = {
  onCommentButtonClick?: () => void;
  comments: Comment[];
};

const CommentsSectionComponent = ({
  onCommentButtonClick = () => {},
  comments
}: CommentsSectionComponentProps): JSX.Element => {
  const handleCommentButtonClicked = useCallback(
    () => onCommentButtonClick(),
    [onCommentButtonClick]
  );

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
