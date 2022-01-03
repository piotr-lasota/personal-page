import React from 'react';
import { Grid } from '@mui/material';
import { PublishedComment } from '../../../../models';
import Comment from './Comment';

const chronologically = (a: PublishedComment, b: PublishedComment) =>
  b.publishedAt.getTime() - a.publishedAt.getTime();

export type CommentsListProps = {
  comments: PublishedComment[];
};
const CommentsList = ({ comments }: CommentsListProps): JSX.Element => (
  <Grid container direction="column" spacing={1}>
    {comments.sort(chronologically).map((comment) => (
      <Grid item key={`${comment.author}-${comment.publishedAt}`}>
        <Comment comment={comment} />
      </Grid>
    ))}
  </Grid>
);

export default CommentsList;
