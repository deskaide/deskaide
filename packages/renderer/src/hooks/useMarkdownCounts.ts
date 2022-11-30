import readingTime from 'reading-time';

export const useMarkdownCounts = (markdownDoc: string) => {
  const stats = readingTime(markdownDoc);

  return {
    words: stats.words.total,
  };
};
