import { createElement } from 'react';
import styled from 'styled-components';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkReact from 'remark-react';
import { defaultSchema } from 'hast-util-sanitize';

import 'github-markdown-css/github-markdown.css';

import { Box } from './Box';

interface Props {
  doc: string;
  onClick: (e: unknown) => void;
}

const Wrapper = styled(Box)`
  height: calc(100vh - 228px);

  .diary-preview {
    overflow-y: auto;
    background: var(--color-bg-1);
    border-radius: 4px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: ${({ theme }) => theme.space[4]}px;
    padding-top: 0;

    pre {
      background: var(--color-bg-2);
      overflow: auto;
      white-space: pre-wrap;
      padding: ${({ theme }) => theme.space[4]}px;
      margin: ${({ theme }) => theme.space[4]}px 0;
      word-break: break-all;
    }
  }
`;

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className'],
  },
};

export const DiaryPreview: React.FC<Props> = (props) => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    // @ts-expect-error: yeah it’s not okay per react types, but it works fine.
    .use(remarkReact, {
      createElement,
      sanitize: schema,
    })
    .processSync(props.doc).result as React.ReactNode;
  return (
    <Wrapper>
      <Box height="100%" className="diary-preview" onClick={props.onClick}>
        {md}
      </Box>
    </Wrapper>
  );
};
