import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

type MetaItem =
  | { name: string; content: string }
  | { property: string; content: string };

export type SeoProps = {
  description?: string;
  lang?: string;
  meta?: MetaItem[];
  title: string;
  noIndex?: boolean;
};
const Seo = ({
  description = '',
  lang = 'en',
  meta = [],
  noIndex = false,
  title
}: SeoProps): JSX.Element => {
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

  const baseMeta: MetaItem[] = [
    {
      name: 'description',
      content: metaDescription
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: metaDescription
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:creator',
      content: site.siteMetadata?.author || ''
    },
    {
      name: 'twitter:title',
      content: title
    },
    {
      name: 'twitter:description',
      content: metaDescription
    },
    noIndex
      ? {
          name: 'robots',
          content: 'noindex'
        }
      : null
  ].flatMap((metaElement) => (metaElement ? [metaElement] : []));

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

export default Seo;
