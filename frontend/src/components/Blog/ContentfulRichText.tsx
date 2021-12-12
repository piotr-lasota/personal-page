import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Typography } from '@mui/material';

const options: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_, children) => (
      <Typography variant="h1" color="primary">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <Typography variant="h2" color="primary">
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <Typography variant="h3" color="primary">
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
    [BLOCKS.PARAGRAPH]: (_, children) => <Typography>{children}</Typography>
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
  <>{renderRichText(richText, options)}</>
);

export default ContentfulRichText;
