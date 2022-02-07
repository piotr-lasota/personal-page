/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const fetch = require('cross-fetch');

function getBlogPostSlugs() {
  const apiKey = process.env.CONTENTFUL_DELIVERY_API_KEY;
  const spaceId = process.env.CONTENTFUL_SPACE_ID;

  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: 'query { blogPostCollection { items { slug } } }'
      })
    }
  )
    .then((response) => {
      if (response.status >= 400) {
        console.error(response);
        process.exit();
      }

      return response.json();
    })
    .then((content) => {
      const blogPostSlugs = (content.data?.blogPostCollection?.items ?? []).map(
        (blogPost) => blogPost.slug
      );

      return blogPostSlugs;
    });
}

function persist(blogPostTitles) {
  const twoSpaces = '  ';

  fs.writeFileSync(
    'staticwebapp.config.json',
    JSON.stringify(blogPostTitles, null, twoSpaces)
  );
}

function appendBlogPostCommentRoutes(config, blogPostSlugs) {
  return {
    ...config,
    routes: [
      ...blogPostSlugs.map((slug) => ({
        route: `/blog/${slug}/comments`,
        allowedRoles: ['owner']
      })),
      ...config.routes
    ]
  };
}

getBlogPostSlugs().then((slugs) => {
  const currentConfigFileContent = fs.readFileSync(
    'staticwebapp.config.source.json'
  );

  const currentConfig = JSON.parse(currentConfigFileContent);

  const configWithRoutePerPost = appendBlogPostCommentRoutes(
    currentConfig,
    slugs
  );

  persist(configWithRoutePerPost);

  process.exit();
});
