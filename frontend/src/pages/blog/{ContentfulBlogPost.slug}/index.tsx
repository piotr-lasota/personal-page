import React from 'react';
import { graphql } from 'gatsby';
import { Box } from '@mui/material';
import { Seo } from '../../../components';
import { ContentfulBlogPost } from '../../../features/Blog/components';

type BlogPostProps = {
  data: {
    contentfulBlogPost: {
      title: string;
      publishingDate: string;
      slug: string;
      content: {
        raw: string;
        references: [];
      };
    };
  };
};
const BlogPost = ({
  data: {
    contentfulBlogPost: { content, title, slug }
  }
}: BlogPostProps): JSX.Element => {
  return (
    <Box>
      <Seo title={title} />
      <ContentfulBlogPost title={title} content={content} slug={slug} />
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
