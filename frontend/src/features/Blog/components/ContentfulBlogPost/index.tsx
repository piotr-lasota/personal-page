import React from 'react';
import { Box, Typography } from '@mui/material';
import ContentfulRichText from './ContentfulRichText';

type ContentfulRichText = {
  raw: string;
  references: [];
};
type BlogPageProps = {
  title: string;
  content: ContentfulRichText;
};

const BlogPost = ({ title, content }: BlogPageProps): JSX.Element => (
  <Box>
    <Typography variant="h3" align="center" color="primary" sx={{ mb: 5 }}>
      {title}
    </Typography>
    <ContentfulRichText richText={content} />
  </Box>
);

export default BlogPost;
