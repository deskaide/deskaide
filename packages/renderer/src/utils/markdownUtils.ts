// directly stolen from (Joplin): https://github.com/laurent22/joplin/blob/873808a66aeb96919fb8c990f135d0673cb662a7/packages/lib/markdownUtils.ts#L208
export const titleFromMdBody = (body: string) => {
  if (!body) return '';

  const mdLinkRegex = /!?\[([^\]]+?)\]\(.+?\)/g;
  const emptyMdLinkRegex = /!?\[\]\((.+?)\)/g;
  const filterRegex = /^[# \n\t*`-]*/;
  const lines = body.trim().split('\n');
  const title = lines[0].trim();
  return title
    .replace(filterRegex, '')
    .replace(mdLinkRegex, '$1')
    .replace(emptyMdLinkRegex, '$1')
    .substring(0, 80);
};
