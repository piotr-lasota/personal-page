// noinspection JSUnusedGlobalSymbols
import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import { graphql, useStaticQuery } from 'gatsby';
import { CardActionArea } from 'gatsby-theme-material-ui';
import { Seo } from '../../components';

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
  const {
    allContentfulBlogPost: { nodes: blogPosts }
  } = useStaticQuery<QueryData>(
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

  return blogPosts ?? [];
};

const Blog = (): JSX.Element => {
  const blogPosts = useBlogPostsList();

  return (
    <Box>
      <Seo title="Blog" />

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
    </Box>
  );
};

export default Blog;
