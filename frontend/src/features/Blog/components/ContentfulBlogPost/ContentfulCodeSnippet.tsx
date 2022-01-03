import React, { ReactNode } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type ContentfulCodeSnippetProps = {
  language: 'javascript' | 'c#';
  children: ReactNode;
};
const ContentfulCodeSnippet = ({
  language,
  children
}: ContentfulCodeSnippetProps): JSX.Element => (
  <SyntaxHighlighter language={language} style={github}>
    {children}
  </SyntaxHighlighter>
);

export default ContentfulCodeSnippet;
