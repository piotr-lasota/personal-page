/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import { useForm } from 'react-hook-form';
import { Comment } from '../../../models';

const defaultValues: Comment = {
  author: '',
  text: ''
};
export type WriteCommentDialogProps = {
  open?: boolean;
  canPost?: boolean;
  onCommentPosted?: (comment: Comment) => void;
  onCancelled?: () => void;
};
const WriteCommentDialog = ({
  open = false,
  canPost = false,
  onCommentPosted = () => {},
  onCancelled = () => {}
}: WriteCommentDialogProps): JSX.Element => {
  const [shouldReset, setShouldReset] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Comment>({
    defaultValues
  });

  useEffect(() => {
    if (!shouldReset) {
      return;
    }

    reset(defaultValues);
    setShouldReset(false);
  }, [reset, setShouldReset, shouldReset]);

  const handleCancelClicked = () => onCancelled();

  const handleSubmitClicked = handleSubmit((comment: Comment) => {
    onCommentPosted(comment);
    setShouldReset(true);
  });

  return (
    <Dialog open={open}>
      <DialogTitle>Comment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          required
          aria-required
          label="Who are you?"
          id="author"
          type="email"
          variant="standard"
          error={!!errors.author}
          {...register('author', {
            required: true,
            minLength: 3,
            maxLength: 100
          })}
        />
        <TextField
          multiline
          fullWidth
          required
          aria-required
          label="What would you like to say?"
          id="text"
          type="text"
          variant="standard"
          error={!!errors.text}
          {...register('text', {
            required: true,
            minLength: 1,
            maxLength: 1000
          })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClicked}>Cancel</Button>
        <Button onClick={handleSubmitClicked} disabled={!canPost}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WriteCommentDialog;
