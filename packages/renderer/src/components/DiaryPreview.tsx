import React from 'react';
import styled from 'styled-components';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkReact from 'remark-react';
import { defaultSchema } from 'hast-util-sanitize';

import 'github-markdown-css/github-markdown.css';

import Box from './Box';
import RemarkCode from './RemarkCode';

interface Props {
  doc: string;
  onClick: (e: any) => void;
}

const Wrapper = styled(Box)`
  height: calc(100vh - 188px);

  .diary-preview {
    overflow-y: auto;
    background: ${({ theme }) => theme.colors.dark[1]};
    border-radius: 4px;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    padding: ${({ theme }) => theme.space[4]}px;
    padding-top: 0;

    pre {
      background: rgba(28, 31, 35, 0.45);
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

const DiaryPreview: React.FC<Props> = (props) => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, {
      createElement: React.createElement,
      sanitize: schema,
      remarkReactComponents: {
        code: RemarkCode,
      },
    })
    .processSync(props.doc).result;
  return (
    <Wrapper>
      <Box height="100%" className="diary-preview" onClick={props.onClick}>
        {md}
      </Box>
    </Wrapper>
  );
};

export default DiaryPreview;
