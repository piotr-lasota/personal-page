import React, { useMemo } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import CommentsSection from './CommentsSection';
import ContentfulRichText from './ContentfulRichText';
import enabledFeatures from '../../../enabledFeatures';
import BlogPostActionsSpeedDial from './BlogPostActionsSpeedDial';
import { useOwnerIdentity } from '../../../../hooks';

type ContentfulRichText = {
  raw: string;
  references: [];
};
type BlogPostProps = {
  title: string;
  content: ContentfulRichText;
  slug: string;
};

const BlogPost = ({ title, content, slug }: BlogPostProps): JSX.Element => {
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

  const isOwner = useOwnerIdentity();

  const actions = useMemo(
    () =>
      isOwner ? (
        <BlogPostActionsSpeedDial postLocation={`/blog/management/${slug}`} />
      ) : (
        <Box />
      ),
    [isOwner, slug]
  );

  return (
    <Box>
      <Typography variant="h2" align="center" color="primary" sx={{ mb: 5 }}>
        {title}
      </Typography>
      <ContentfulRichText richText={content} />
      <Divider sx={{ my: 5 }} />
      {commentsSection}
      {actions}
    </Box>
  );
};

export default BlogPost;
