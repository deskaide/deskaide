import { version } from '../../../package.json';

export const versions = process.versions;
export const info = {
  name: 'Deskaide',
  versions: {
    app: version,
    ...versions,
  },
};
