import React, { useCallback, useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import { useQuery } from 'react-query';
import { IconButton } from 'gatsby-theme-material-ui';
import CloseIcon from '@mui/icons-material/Close';
import CommentsSectionComponent from './CommentsSectionComponent';
import WriteCommentDialog from './WriteCommentDialog';
import api from '../../../api';
import CommentsLoadingSpinner from './CommentsLoadingSpinner';
import { Comment } from '../../../models';

const CommentPostedToastDurationInMilliseconds = 6000;

type CommentsSectionContainerProps = {
  slug: string;
};
const CommentsSectionContainer = ({
  slug
}: CommentsSectionContainerProps): JSX.Element => {
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);

  const [showCommentPostedSnackbar, setShowCommentPostedSnackbar] =
    useState(false);

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

  const handleCommentPosted = async (comment: Comment): Promise<void> => {
    setCommentDialogOpen(false);
    await api.publishCommentForPost(slug, comment);
    setShowCommentPostedSnackbar(true);
    await commentsQuery.refetch();
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
        open={commentDialogOpen}
        onCommentPosted={handleCommentPosted}
        onCancelled={handleCommentCancelled}
      />
      <Snackbar
        open={showCommentPostedSnackbar}
        autoHideDuration={CommentPostedToastDurationInMilliseconds}
        onClose={handleCommentPostedSnackbarCancelled}
        message="Comment sent"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCommentPostedSnackbarCancelled}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default CommentsSectionContainer;
