export type BlogPostSummary = {
  title: string;
  slug: string;
  publishingDate: string;
};

export type Comment = {
  author: string;
  text: string;
};

export type PublishedComment = Comment & {
  id: string;
  publishedAt: Date;
};
