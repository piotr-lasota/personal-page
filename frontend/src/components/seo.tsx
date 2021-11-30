/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

type SeoProps = {
  description?: string;
  lang?: string;
  meta?: Array<{name: string, content: string}>;
  title: string;
}

const defaultSeoProps: SeoProps = {
  description: '',
  lang: 'en',
  meta: [],
  title: ''
}

const Seo = ({ description, lang, meta, title }: SeoProps): JSX.Element => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription: string = description || site.siteMetadata.description;
  const defaultTitle: string = site.siteMetadata?.title;

  const baseMeta = [
    {
      name: `description`,
      content: metaDescription
    },
    {
      property: `og:title`,
      content: title
    },
    {
      property: `og:description`,
      content: metaDescription
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      name: `twitter:card`,
      content: `summary`
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata?.author || ``
    },
    {
      name: `twitter:title`,
      content: title
    },
    {
      name: `twitter:description`,
      content: metaDescription
    }
  ];

  const userDefinedMeta = meta ?? [];

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={baseMeta.concat(userDefinedMeta)}
    />
  );
};

Seo.defaultProps = defaultSeoProps;

export default Seo;
