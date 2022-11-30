import readingTime from 'reading-time';
// import english from 'retext-english';
// import remark2retext from 'remark-retext';
// import { visit } from 'unist-util-visit';

export const useMarkdownCounts = (markdownDoc: string) => {
  const stats = readingTime(markdownDoc);

  return {
    words: stats.words.total,
  };
};
