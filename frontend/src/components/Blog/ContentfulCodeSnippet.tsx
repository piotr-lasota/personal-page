import React, { ReactNode } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ContentfulCodeSnippet = ({
  children
}: {
  children: ReactNode;
}): JSX.Element => {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {children}
    </SyntaxHighlighter>
  );
};

export default ContentfulCodeSnippet;
