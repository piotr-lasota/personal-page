/* eslint-disable react/prop-types,no-underscore-dangle */
import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Box, Typography } from '@mui/material';
import ContentfulCodeSnippet from './ContentfulCodeSnippet';

const options: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: ({ data }) => {
      if (data.target.__typename === 'ContentfulCodeSnippet') {
        return (
          <Box>
            <Box sx={{ '& p': { fontFamily: 'Monospace', marginTop: 1 } }}>
              <Typography fontSize={14}>{data.target.caption}</Typography>
            </Box>
            <Box sx={{ '& pre': { marginTop: 0 } }}>
              <ContentfulCodeSnippet language={data.target.language}>
                {data.target.snippet.snippet}
              </ContentfulCodeSnippet>
            </Box>
          </Box>
        );
      }
      return <div>entry</div>;
    },
    [BLOCKS.HEADING_1]: (_, children) => (
      <Typography variant="h4" color="primary">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <Typography variant="h4" color="primary">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <Typography variant="h4" color="primary">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_4]: (_, children) => (
      <Typography variant="h4" color="primary">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_5]: (_, children) => (
      <Typography variant="h5" color="primary">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_6]: (_, children) => (
      <Typography variant="h6" color="primary">
        {children}
      </Typography>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (_, children) => (
      <Typography color="primary">{children}</Typography>
    ),
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <Typography align="justify">{children}</Typography>
    )
  }
};

export type ContentfulRichTextProps = {
  richText: {
    raw: string;
    references: [];
  };
};
const ContentfulRichText = ({
  richText
}: ContentfulRichTextProps): JSX.Element => (
  <Typography component="article">
    {renderRichText(richText, options)}
  </Typography>
);

export default ContentfulRichText;
