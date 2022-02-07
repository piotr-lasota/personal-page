import React from 'react';
import { Box } from '@mui/material';
import { graphql } from 'gatsby';
import { Seo } from '../../../components';
import { CommentsManagementSection } from '../../../features/Blog/components';

type ManageCommentsPageProps = {
  data: {
    contentfulBlogPost: {
      title: string;
      slug: string;
    };
  };
};
const ManageCommentsPage = ({
  data: {
    contentfulBlogPost: { title, slug }
  }
}: ManageCommentsPageProps): JSX.Element => (
  <Box>
    <Seo title="Manage comments" noIndex />
    <CommentsManagementSection title={title} slug={slug} />
  </Box>
);

export default ManageCommentsPage;

export const query = graphql`
  query ($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      slug
    }
  }
`;
