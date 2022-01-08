import { Comment, PublishedComment } from './models';

type CommentResponse = {
  user: string;
  text: string;
  publishedAt: string;
};
const getCommentsForPost = async (
  slug: string
): Promise<PublishedComment[]> => {
  const response = await fetch(`/api/blog/posts/${slug}/comments`);

  if (!response.ok) {
    return [];
  }

  const content: CommentResponse[] = await response.json();

  return content.map((comment) => ({
    author: comment.user,
    text: comment.text,
    publishedAt: new Date(comment.publishedAt)
  }));
};

const publishCommentForPost = async (
  slug: string,
  comment: Comment
): Promise<void> => {
  const response = await fetch(`/api/blog/posts/${slug}/comments`, {
    method: 'post',
    body: JSON.stringify(comment)
  });

  if (!response.ok) {
    throw new Error('Failed saving the comment');
  }
};

export default {
  getCommentsForPost,
  publishCommentForPost
};
