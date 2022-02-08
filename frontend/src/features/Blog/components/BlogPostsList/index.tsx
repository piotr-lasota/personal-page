import { Box, Card, Grid, Typography, Zoom } from '@mui/material';
import { CardActionArea, Fab } from 'gatsby-theme-material-ui';
import React, { useMemo } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { BlogPostSummary } from '../../models';
import { useOwnerIdentity } from '../../../../hooks';

type BlogPostsListProps = {
  blogPosts: BlogPostSummary[];
};
const Index = ({ blogPosts }: BlogPostsListProps): JSX.Element => {
  const isOwner = useOwnerIdentity();

  const registerNewPostLinkFab = useMemo(
    () => (
      <Box sx={{ position: 'sticky' }}>
        <Zoom in={isOwner}>
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: 'absolute',
              bottom: (theme) => theme.spacing(blogPosts.length > 5 ? 3 : 0),
              right: (theme) => theme.spacing(3)
            }}
            href="/blog/register"
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </Box>
    ),
    [isOwner, blogPosts.length]
  );

  return (
    <Box>
      <Grid container direction="column" spacing={10}>
        <Grid item>
          <Typography variant="h2" align="center" color="primary">
            Blog
          </Typography>
        </Grid>

        {blogPosts.map((blogPost) => (
          <Grid key={blogPost.slug} item xs={12}>
            <Card elevation={0}>
              <CardActionArea to={`/blog/${blogPost.slug}`}>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Typography color="primary" align="center">
                      {blogPost.publishingDate}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center" variant="h5">
                      {blogPost.title}
                    </Typography>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {registerNewPostLinkFab}
    </Box>
  );
};

export default Index;
