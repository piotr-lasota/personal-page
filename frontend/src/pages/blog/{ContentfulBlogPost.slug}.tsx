import * as React from 'react';
import { graphql } from 'gatsby';
import { Box } from '@mui/material';
import { ContentfulBlogPost, Seo } from '../../components';

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
  data: {
    contentfulBlogPost: { content, title }
  }
}: BlogPostProps): JSX.Element => {
  return (
    <Box>
      <Seo title={title} />
      <ContentfulBlogPost title={title} content={content} />
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
        references {
          ... on ContentfulCodeSnippet {
            contentful_id
            __typename
            caption
            language
            snippet {
              snippet
            }
          }
        }
      }
    }
  }
`;
