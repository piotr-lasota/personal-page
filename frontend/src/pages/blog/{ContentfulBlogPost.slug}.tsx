import * as React from 'react';
import { graphql } from 'gatsby';
import { Box, Typography } from '@mui/material';
import ContentfulRichText from '../../components/Blog/ContentfulRichText';
import { Seo } from '../../components';

type BlogPostProps = {
  data: {
    contentfulBlogPost: {
      title: string;
      publishingDate: string;
      content: {
        raw: string;
        references: [];
      };
    };
  };
};
const BlogPost = ({
  data: { contentfulBlogPost }
}: BlogPostProps): JSX.Element => {
  return (
    <Box>
      <Seo title={contentfulBlogPost.title} />
      <Typography variant="h3" align="center" color="primary">
        {contentfulBlogPost.title}
      </Typography>
      <ContentfulRichText richText={contentfulBlogPost.content} />
    </Box>
  );
};

export default BlogPost;

export const query = graphql`
  query ($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      slug
      publishingDate
      content {
        raw
      }
    }
  }
`;
