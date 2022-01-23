import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { Alert, Box, Snackbar } from '@mui/material';
import api from '../../api';
import ToggleableCommentsList from './ToggleableCommentsList';
import DeleteCommentsConfirmationDialog from './DeleteCommentsConfirmationDialog';
import { PublishedComment } from '../../models';
import { ToastDurationInMilliseconds } from '../../../../constants';

export type CommentsManagerProps = {
  slug: string;
  title: string;
};
const CommentsManagerContainer = ({
  slug,
  title
}: CommentsManagerProps): JSX.Element => {
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);

  const [showCommentsDeletedSnackbar, setShowCommentsDeletedSnackbar] =
    useState(false);
  const [
    showDeletingCommentsFailedSnackbar,
    setShowDeletingCommentsFailedSnackbar
  ] = useState(false);

  const [commentsToDelete, setCommentsToDelete] = useState<PublishedComment[]>(
    []
  );

  const fetchCommentsForPost = useCallback(
    () => api.getCommentsForPost(slug),
    [slug]
  );

  const commentsQuery = useQuery(['comments', slug], fetchCommentsForPost);

  const comments = useMemo(
    () => commentsQuery.data ?? [],
    [commentsQuery.data]
  );

  const handleDeleteCommentsClicked = (
    commentsMarkedForDeletion: PublishedComment[]
  ) => {
    setCommentsToDelete(commentsMarkedForDeletion);
    setShowDeleteConfirmationDialog(true);
  };

  const handleCommentsDeletionConfirmationClicked = async (): Promise<void> => {
    setShowDeleteConfirmationDialog(false);
    try {
      await api.deleteCommentsInPost(slug, commentsToDelete);
    } catch {
      setShowDeletingCommentsFailedSnackbar(true);
    } finally {
      await commentsQuery.refetch();
    }

    setShowCommentsDeletedSnackbar(true);
  };

  const handleCommentsDeletionCancellationClicked = () => {
    setShowDeleteConfirmationDialog(false);
  };

  const handleCommentsDeletedSnackbarClosed = () => {
    setShowCommentsDeletedSnackbar(false);
  };

  const handleDeletingCommentsFailedSnackbarClosed = () => {
    setShowDeletingCommentsFailedSnackbar(false);
  };

  return (
    <Box>
      <ToggleableCommentsList
        title={title}
        slug={slug}
        comments={comments}
        onDeleteCommentsClicked={handleDeleteCommentsClicked}
      />
      <DeleteCommentsConfirmationDialog
        isOpen={showDeleteConfirmationDialog}
        onConfirmed={handleCommentsDeletionConfirmationClicked}
        onCancelled={handleCommentsDeletionCancellationClicked}
      />

      <Snackbar
        open={showCommentsDeletedSnackbar}
        autoHideDuration={ToastDurationInMilliseconds}
        onClose={handleCommentsDeletedSnackbarClosed}
      >
        <Alert
          onClose={handleCommentsDeletedSnackbarClosed}
          severity="success"
          variant="filled"
        >
          Comments deleted
        </Alert>
      </Snackbar>
      <Snackbar
        open={showDeletingCommentsFailedSnackbar}
        autoHideDuration={ToastDurationInMilliseconds}
        onClose={handleDeletingCommentsFailedSnackbarClosed}
      >
        <Alert
          onClose={handleDeletingCommentsFailedSnackbarClosed}
          severity="error"
          variant="filled"
        >
          Failed trying to delete some of the comments
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CommentsManagerContainer;
