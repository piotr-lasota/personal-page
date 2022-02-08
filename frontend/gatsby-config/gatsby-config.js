/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies */
const path = require('path');
const dotenv = require('dotenv');

const envFilesPath = path.resolve(
  __dirname,
  '..',
  `.env.${process.env.NODE_ENV}`
);
dotenv.config({
  path: envFilesPath
});

const gatsbySourceContentfulOptions =
  process.env.CONTENTFUL_IS_PREVIEW === 'true'
    ? {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_PREVIEW_API_KEY,
        host: 'preview.contentful.com'
      }
    : {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY
      };

module.exports = {
  siteMetadata: {
    title: 'Piotr Lasota',
    description:
      'Personal page with opinions of my own and not that of the company I work for',
    author: 'Piotr Lasota',
    siteUrl: process.env.SITE_URL,
    pages: [
      {
        name: 'Home',
        link: ''
      },
      {
        name: 'Bio',
        link: 'bio'
      },
      {
        name: 'Blog',
        link: 'blog'
      }
    ]
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: 'jsx',
        allExtensions: true
      }
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.resolve(__dirname, '..', 'src', 'images')
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png'
      }
    },
    {
      resolve: 'gatsby-theme-material-ui',
      options: {
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: 'Ubuntu',
                variants: ['300', '400', '500']
              }
            ]
          }
        }
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: gatsbySourceContentfulOptions
    }
  ]
};
