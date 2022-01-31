import React from 'react';
import { Grid } from '@mui/material';
import { PublishedComment } from '../../../../models';
import Comment from './Comment';

const latestFirst = (a: PublishedComment, b: PublishedComment) =>
  b.publishedAt.getTime() - a.publishedAt.getTime();

export type CommentsListProps = {
  comments: PublishedComment[];
};
const CommentsListComponent = ({
  comments
}: CommentsListProps): JSX.Element => (
  <Grid container direction="column" spacing={1}>
    {comments.sort(latestFirst).map((comment) => (
      <Grid item key={`${comment.id}`}>
        <Comment comment={comment} />
      </Grid>
    ))}
  </Grid>
);

export default CommentsListComponent;
