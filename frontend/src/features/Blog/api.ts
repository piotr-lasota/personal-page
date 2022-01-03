import { Comment, PublishedComment } from './models';

const getCommentsForPost = async (
  slug: string
): Promise<PublishedComment[]> => {
  await new Promise((res) => {
    setTimeout(res, 2000);
  });

  return [
    {
      author: 'John',
      text: `${slug} was a really interesting lecture`,
      publishedAt: new Date()
    }
  ];
};

const publishCommentForPost = async (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  slug: string,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  comment: Comment
): Promise<void> => {
  await new Promise((res) => {
    setTimeout(res, 2000);
  });
};

export default {
  getCommentsForPost,
  publishCommentForPost
};
