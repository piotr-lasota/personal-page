import React from 'react';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Button } from 'gatsby-theme-material-ui';

export type DeleteCommentsConfirmationDialogProps = {
  isOpen?: boolean;
  onCancelled?: () => void;
  onConfirmed?: () => void;
};

const DeleteCommentsConfirmationDialog = ({
  isOpen = false,
  onCancelled = () => {},
  onConfirmed = () => {}
}: DeleteCommentsConfirmationDialogProps): JSX.Element => (
  <Dialog open={isOpen}>
    <DialogTitle>Delete selected comments?</DialogTitle>

    <DialogActions>
      <Button onClick={onCancelled}>Cancel</Button>
      <Button onClick={onConfirmed}>Post</Button>
    </DialogActions>
  </Dialog>
);

export default DeleteCommentsConfirmationDialog;
