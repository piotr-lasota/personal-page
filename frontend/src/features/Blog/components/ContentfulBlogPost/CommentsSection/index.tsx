import React, { useCallback, useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import CommentsSectionComponent from './CommentsSectionComponent';
import WriteCommentDialog from './WriteCommentDialog';
import api from '../../../api';
import CommentsLoadingSpinner from './CommentsLoadingSpinner';

type CommentsSectionContainerProps = {
  slug: string;
};
const CommentsSectionContainer = ({
  slug
}: CommentsSectionContainerProps): JSX.Element => {
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);

  const fetchCommentsForPost = useCallback(
    () => api.getCommentsForPost(slug),
    [slug]
  );

  const commentsQuery = useQuery(['comments', slug], fetchCommentsForPost);

  const handleCommentClicked = useCallback(
    () => setCommentDialogOpen(true),
    [setCommentDialogOpen]
  );
  const closeCommentDialog = useCallback(
    () => setCommentDialogOpen(false),
    [setCommentDialogOpen]
  );
  const handleCancelled = useCallback(
    () => closeCommentDialog(),
    [closeCommentDialog]
  );
  const handleCommentPosted = useCallback(
    () => closeCommentDialog(),
    [closeCommentDialog]
  );

  if (!commentsQuery.data) {
    return <CommentsLoadingSpinner />;
  }

  return (
    <Box>
      <CommentsSectionComponent
        comments={commentsQuery.data}
        onCommentButtonClick={handleCommentClicked}
      />
      <WriteCommentDialog
        open={commentDialogOpen}
        onCommentPosted={handleCommentPosted}
        onCancelled={handleCancelled}
      />
    </Box>
  );
};

export default CommentsSectionContainer;
