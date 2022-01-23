import React from 'react';
import { PublishedComment } from '../../../../models';
import NoCommentsLabel from './NoCommentsLabel';
import CommentsListComponent from './CommentsListComponent';

export type CommentsListContainerProps = {
  comments: PublishedComment[];
};
const CommentsListContainer = ({
  comments
}: CommentsListContainerProps): JSX.Element => {
  if (comments.length === 0) {
    return <NoCommentsLabel />;
  }

  return <CommentsListComponent comments={comments} />;
};

export default CommentsListContainer;
