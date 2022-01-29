import React from 'react';
import { Grid, Switch, Typography } from '@mui/material';
import { PublishedComment } from '../../models';

const publishingDateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
};

export type EditableCommentProps = {
  isToggled: boolean;
  comment: PublishedComment;
  onToggleClicked?: (comment: PublishedComment, isMarked: boolean) => void;
};
const EditableComment = ({
  isToggled = false,
  comment,
  onToggleClicked = () => {}
}: EditableCommentProps): JSX.Element => {
  const handleCommentToggleClicked = () => {
    onToggleClicked(comment, isToggled);
  };

  const publishingDateText = comment.publishedAt.toLocaleString(
    'pl-PL',
    publishingDateFormatOptions
  );

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={1}>
        <Switch
          color="error"
          onChange={handleCommentToggleClicked}
          checked={isToggled}
        />
      </Grid>
      <Grid item xs={11}>
        <Grid container direction="column">
          <Grid item>
            <Typography>
              <b>{comment.author}</b>, published on {publishingDateText}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              <i>{comment.text}</i>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditableComment;
