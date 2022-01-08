import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import ContentfulRichText from './ContentfulRichText';
import CommentsSection from './CommentsSection';

type ContentfulRichText = {
  raw: string;
  references: [];
};
type BlogPageProps = {
  title: string;
  content: ContentfulRichText;
  slug: string;
};

const BlogPost = ({ title, content, slug }: BlogPageProps): JSX.Element => (
  <Box>
    <Typography variant="h3" align="center" color="primary" sx={{ mb: 5 }}>
      {title}
    </Typography>
    <ContentfulRichText richText={content} />
    <Divider sx={{ my: 5 }} />
    <Box sx={{ mb: 5 }}>
      <CommentsSection slug={slug} />
    </Box>
  </Box>
);

export default BlogPost;
