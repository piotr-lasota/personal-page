import { Comment, PublishedComment } from './models';

const registerPost = async (slug: string): Promise<void> => {
  const response = await fetch(`/api/blog/posts/${slug}`, {
    method: 'put'
  });

  if (!response.ok) {
    throw new Error('Failed registering a post');
  }
};

type CommentResponse = {
  id: string;
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
    id: comment.id,
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

const deleteCommentsInPost = async (
  slug: string,
  comments: PublishedComment[]
): Promise<void> => {
  const commentIds = comments.map((comment) => comment.id);

  const response = await fetch(`/api/blog/posts/${slug}/comments`, {
    method: 'delete',
    body: JSON.stringify(commentIds)
  });

  if (!response.ok) {
    throw new Error('Failed deleting comments');
  }
};

export default {
  registerPost,
  getCommentsForPost,
  publishCommentForPost,
  deleteCommentsInPost
};
