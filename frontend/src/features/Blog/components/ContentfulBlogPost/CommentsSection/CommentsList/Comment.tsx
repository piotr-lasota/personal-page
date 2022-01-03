import React from 'react';
import { Grid, Typography } from '@mui/material';
import { PublishedComment } from '../../../../models';

const publishingDateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
};

export type CommentProps = {
  comment: PublishedComment;
};
const Comment = ({
  comment: { author, text, publishedAt }
}: CommentProps): JSX.Element => {
  const publishingDateText = publishedAt.toLocaleString(
    'en-UK',
    publishingDateFormatOptions
  );
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography>
          {author}, {publishingDateText}
        </Typography>
      </Grid>
      <Grid item>
        <Typography fontWeight="light">{text}</Typography>
      </Grid>
    </Grid>
  );
};

export default Comment;
