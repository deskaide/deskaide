import styled from 'styled-components';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeFormat from 'rehype-format';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';

import 'prism-themes/themes/prism-one-dark.css';

import { Box } from './Box';
import { Text } from './Text';

interface Props {
  doc: string;
  onClick: React.MouseEventHandler;
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
      background: var(--color-bg-0);
      overflow: auto;
      white-space: pre-wrap;
      padding: ${({ theme }) => theme.space[4]}px;
      margin: ${({ theme }) => theme.space[4]}px 0;
      word-break: break-all;
    }

    .code-highlight,
    pre[class*='language-'] {
      background: var(--color-bg-0);
    }
  }
`;

export const DiaryPreview: React.FC<Props> = (props) => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrismPlus)
    .use(rehypeRaw)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .processSync(props.doc);

  return (
    <Wrapper>
      <Box height="100%" className="diary-preview" onClick={props.onClick}>
        <Text variant="raw" html={String(md)}></Text>
      </Box>
    </Wrapper>
  );
};
