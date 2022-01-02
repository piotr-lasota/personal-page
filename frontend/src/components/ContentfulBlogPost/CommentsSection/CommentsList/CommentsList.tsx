import React from 'react';
import { Grid } from '@mui/material';
import { Comment as CommentModel } from '../models';
import Comment from './Comment';

const chronologically = (a: CommentModel, b: CommentModel) =>
  b.publishedAt.getTime() - a.publishedAt.getTime();

export type CommentsListProps = {
  comments: CommentModel[];
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
