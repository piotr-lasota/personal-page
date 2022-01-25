import React, { useMemo } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import enabledFeatures from '../../../enabledFeatures';
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

const BlogPost = ({ title, content, slug }: BlogPageProps): JSX.Element => {
  const commentsSection = useMemo(() => {
    if (enabledFeatures.blogPostComments) {
      return (
        <Box sx={{ mb: 5 }}>
          <CommentsSection slug={slug} />
        </Box>
      );
    }

    return <Box />;
  }, [slug]);

  return (
    <Box>
      <Typography variant="h3" align="center" color="primary" sx={{ mb: 5 }}>
        {title}
      </Typography>
      <ContentfulRichText richText={content} />
      <Divider sx={{ my: 5 }} />
      {commentsSection}
    </Box>
  );
};

export default BlogPost;
