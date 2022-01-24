import React, { useCallback, useState } from 'react';
import { Alert, Box, Snackbar } from '@mui/material';
import { useQuery } from 'react-query';
import CommentsSectionComponent from './CommentsSectionComponent';
import WriteCommentDialog from './WriteCommentDialog';
import api from '../../../api';
import CommentsLoadingSpinner from './CommentsLoadingSpinner';
import { Comment } from '../../../models';
import { ToastDurationInMilliseconds } from '../../../../../constants';

type CommentsSectionContainerProps = {
  slug: string;
};
const CommentsSectionContainer = ({
  slug
}: CommentsSectionContainerProps): JSX.Element => {
  const [canPostComment, setCanPostComment] = useState(true);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);

  const [showCommentPostedSnackbar, setShowCommentPostedSnackbar] =
    useState(false);

  const [
    showCommentPostingFailedSnackbar,
    setShowCommentPostingFailedSnackbar
  ] = useState(false);

  const fetchCommentsForPost = useCallback(
    () => api.getCommentsForPost(slug),
    [slug]
  );

  const commentsQuery = useQuery(['comments', slug], fetchCommentsForPost);

  const handleCommentButtonClicked = () => {
    setCommentDialogOpen(true);
  };

  const handleCommentCancelled = () => {
    setCommentDialogOpen(false);
  };

  const handleCommentPostedSnackbarCancelled = () => {
    setShowCommentPostedSnackbar(false);
  };

  const handleCommentPostingFailedSnackbarCancelled = () => {
    setShowCommentPostingFailedSnackbar(false);
  };

  const handleCommentPosted = async (comment: Comment): Promise<void> => {
    setCanPostComment(false);
    setCommentDialogOpen(false);
    try {
      await api.publishCommentForPost(slug, comment);
      setShowCommentPostedSnackbar(true);
    } catch {
      setShowCommentPostingFailedSnackbar(true);
    } finally {
      await commentsQuery.refetch();
      setCanPostComment(true);
    }
  };

  if (!commentsQuery.data) {
    return <CommentsLoadingSpinner />;
  }

  return (
    <Box>
      <CommentsSectionComponent
        comments={commentsQuery.data}
        onCommentButtonClick={handleCommentButtonClicked}
      />
      <WriteCommentDialog
        canPost={canPostComment}
        open={commentDialogOpen}
        onCommentPosted={handleCommentPosted}
        onCancelled={handleCommentCancelled}
      />
      <Snackbar
        open={showCommentPostedSnackbar}
        autoHideDuration={ToastDurationInMilliseconds}
        onClose={handleCommentPostedSnackbarCancelled}
      >
        <Alert
          onClose={handleCommentPostedSnackbarCancelled}
          severity="success"
          variant="filled"
        >
          Comment sent
        </Alert>
      </Snackbar>
      <Snackbar
        open={showCommentPostingFailedSnackbar}
        autoHideDuration={ToastDurationInMilliseconds}
        onClose={handleCommentPostingFailedSnackbarCancelled}
      >
        <Alert
          onClose={handleCommentPostingFailedSnackbarCancelled}
          severity="error"
          variant="filled"
        >
          Posting a comment failed, please try again later
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CommentsSectionContainer;
