import styled from 'styled-components';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeFormat from 'rehype-format';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import rehypeRewrite from 'rehype-rewrite';

import '../styles/themes/syntax-open-sourcerer.css';
// import 'prism-themes/themes/prism-one-dark.css';

import { Box } from './Box';
import { Text } from './Text';
import { useMemo } from 'react';

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

    .contains-task-list {
      margin: ${({ theme }) => theme.space[4]}px 0;

      .task-list-item {
        p {
          margin: 0;
        }

        &::before {
          content: none;
        }
      }
    }
  }
`;

export const DiaryPreview: React.FC<Props> = (props) => {
  const md = useMemo(() => {
    return unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRewrite, {
        rewrite: (node, index, parent) => {
          if (
            index !== null &&
            index >= 0 &&
            parent?.children &&
            node.type === 'element' &&
            node.tagName === 'pre'
          ) {
            parent.children[index] = {
              type: 'element',
              tagName: 'div',
              properties: { className: 'deskaide-highlight' },
              children: [
                {
                  ...node,
                },
              ],
            };
          }
          if (
            node.type === 'element' &&
            node.tagName === 'input' &&
            node?.properties?.type === 'checkbox' &&
            node?.properties?.disabled
          ) {
            console.log(node);
            delete node.properties.disabled;
            node.properties['aria-disabled'] = 'true';
            node = {
              ...node,
              properties: {
                ...node.properties,
              },
            };
          }
        },
      })
      .use(rehypePrismPlus)
      .use(rehypeRaw)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .processSync(props.doc);
  }, [props.doc]);

  return (
    <Wrapper>
      <Box height="100%" className="diary-preview" onClick={props.onClick}>
        {props.doc ? (
          <Text variant="raw" html={String(md)}></Text>
        ) : (
          <Text variant="p" color="text2" opacity={0.64} fontFamily="code">
            Double click to start writing...
          </Text>
        )}
      </Box>
    </Wrapper>
  );
};
