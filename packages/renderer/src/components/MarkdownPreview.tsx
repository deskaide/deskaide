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

import { Box } from './Box';
import { Text } from './Text';
import { useMemo } from 'react';

interface Props {
  doc: string;
  onClick: React.MouseEventHandler;
}

export const MarkdownPreview: React.FC<Props> = (props) => {
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
            delete node.properties.disabled;
            node.properties['aria-disabled'] = 'true';
            node = {
              ...node,
              properties: {
                ...node.properties,
              },
            };
          }

          if (
            node.type === 'element' &&
            node.tagName === 'code' &&
            Object.keys(node?.properties ?? {}).length === 0
          ) {
            node.properties = {
              ...node.properties,
              className: 'deskaide-inline-highlight',
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
    <Box height="100%" className="deskaide-md-preview" onClick={props.onClick}>
      {props.doc ? (
        <Text variant="raw" html={String(md)}></Text>
      ) : (
        <Text variant="p" color="text2" opacity={0.64} fontFamily="code">
          Double click to start writing...
        </Text>
      )}
    </Box>
  );
};
