/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';
import { useForm } from 'react-hook-form';

type CommentData = {
  author: string;
  text: string;
};

type PostedComment = {
  author: string;
  text: string;
  submittedAt: Date;
};

export type WriteCommentDialogProps = {
  open?: boolean;
  onCommentPosted?: (comment: PostedComment) => void;
  onCancelled?: () => void;
};
const WriteCommentDialog = ({
  open,
  onCommentPosted = () => {},
  onCancelled = () => {}
}: WriteCommentDialogProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CommentData>();

  const handleCancelClicked = useCallback(() => onCancelled(), [onCancelled]);

  const handleSubmitClicked = useCallback(
    (comment: CommentData) => {
      onCommentPosted({
        author: comment.author,
        text: comment.text,
        submittedAt: new Date()
      });
    },
    [onCommentPosted]
  );

  return (
    <Dialog open={!!open}>
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
          {...register('author', { required: true, minLength: 3 })}
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
          {...register('text', { required: true, minLength: 1 })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClicked}>Cancel</Button>
        <Button onClick={handleSubmit(handleSubmitClicked)}>Post</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WriteCommentDialog;
