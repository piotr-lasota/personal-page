import React, { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import api from '../../api';
import ToggleableCommentsList from './ToggleableCommentsList';
import DeleteCommentsConfirmationDialog from './DeleteCommentsConfirmationDialog';
import { PublishedComment } from '../../models';
import { useConfirmableActionWithResultNotification } from '../../../../hooks';
import { Toast } from '../../../../components';

export type CommentsManagerProps = {
  slug: string;
  title: string;
};
const CommentsManagerContainer = ({
  slug,
  title
}: CommentsManagerProps): JSX.Element => {
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

  const deleteSelectedComments = useCallback<() => Promise<void>>(async () => {
    await api.deleteCommentsInPost(slug, commentsToDelete);
  }, [commentsToDelete, slug]);

  const [show, handle] = useConfirmableActionWithResultNotification({
    actionToConfirm: deleteSelectedComments,
    onSuccess: commentsQuery.refetch,
    onFailed: commentsQuery.refetch
  });

  const handleDeleteCommentsClicked = (
    selectedComments: PublishedComment[]
  ) => {
    setCommentsToDelete(selectedComments);
    handle.confirmationRequested();
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
        isOpen={show.confirmationPrompt}
        onConfirmed={handle.confirmed}
        onCancelled={handle.cancelled}
      />

      <Toast
        open={show.successNotification}
        message="Comments deleted"
        severity="success"
        onDismissed={handle.successDismissed}
      />

      <Toast
        open={show.failureNotification}
        message="Failed trying to delete some of the comments"
        severity="error"
        onDismissed={handle.failureDismissed}
      />
    </Box>
  );
};

export default CommentsManagerContainer;
