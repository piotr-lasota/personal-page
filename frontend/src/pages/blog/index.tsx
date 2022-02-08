// noinspection JSUnusedGlobalSymbols
import React from 'react';
import { Box } from '@mui/material';
import { graphql, useStaticQuery } from 'gatsby';
import { Seo } from '../../components';
import { BlogPostsList } from '../../features/Blog/components';

type ContentfulBlogPostData = {
  title: string;
  slug: string;
  publishingDate: string;
};
type QueryData = {
  allContentfulBlogPost: {
    nodes?: ContentfulBlogPostData[];
  };
};
const useBlogPostsList = (): ContentfulBlogPostData[] => {
  const blogPostsQueryResult = useStaticQuery<QueryData>(
    graphql`
      query {
        allContentfulBlogPost(sort: { fields: [publishingDate], order: DESC }) {
          nodes {
            title
            slug
            publishingDate(formatString: "YYYY MMMM DD")
          }
        }
      }
    `
  );

  return blogPostsQueryResult?.allContentfulBlogPost?.nodes ?? [];
};

const Blog = (): JSX.Element => {
  const blogPosts = useBlogPostsList();

  return (
    <Box>
      <Seo title="Blog" />
      <BlogPostsList blogPosts={blogPosts} />
    </Box>
  );
};

export default Blog;
