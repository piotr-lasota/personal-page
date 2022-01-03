import { Comment } from './models';

const getCommentsForPost = async (slug: string): Promise<Comment[]> => {
  await new Promise((res) => {
    setTimeout(res, 5000);
  });

  return [
    {
      author: 'John',
      text: `${slug} was a really interesting lecture`,
      publishedAt: new Date('2021-10-11T03:15:12+1:00')
    }
  ];
};

export default {
  getCommentsForPost
};
