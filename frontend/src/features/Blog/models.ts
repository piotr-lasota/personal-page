export type Comment = {
  author: string;
  text: string;
};

export type PublishedComment = Comment & {
  publishedAt: Date;
};
