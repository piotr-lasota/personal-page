export type Comment = {
  author: string;
  text: string;
};

export type PublishedComment = Comment & {
  id: string;
  publishedAt: Date;
};
