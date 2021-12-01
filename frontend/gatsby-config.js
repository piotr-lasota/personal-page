module.exports = {
  siteMetadata: {
    title: 'Piotr Lasota',
    description:
      'Personal page with opinions of my own and not that of the company I work for',
    author: 'Piotr Lasota',
    siteUrl: 'https://piotr-lasot.pl/',
    pages: [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'Bio',
        link: '/bio'
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
        path: `${__dirname}/src/images`
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
    'gatsby-theme-material-ui'
  ]
};
