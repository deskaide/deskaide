import { unified } from 'unified';
import remarkParse from 'remark-parse';
import stringify from 'remark-stringify';
import english from 'retext-english';
import remark2retext from 'remark-retext';
import { visit } from 'unist-util-visit';

export const useMarkdownCounts = (markdownDoc: string) => {
  const counts: Record<string, number> = {};

  function count() {
    return function counter(tree: any) {
      function visitor(node: { type: string }) {
        counts[node.type] = (counts[node.type] || 0) + 1;
      }
      visit(tree, visitor);
      return counts;
    };
  }

  unified()
    .use(remarkParse)
    .use(remark2retext, unified().use(english).use(count))
    .use(stringify)
    .processSync(markdownDoc);

  return {
    paragraphs: counts.ParagraphNode,
    sentences: counts.SentenceNode,
    words: counts.WordNode,
  };
};
