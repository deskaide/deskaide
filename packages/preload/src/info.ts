import { version } from '../../../buildResources/meta.json';

export const versions = process.versions;
export const info = {
  name: 'Deskaide',
  versions: {
    app: version,
    ...versions,
  },
};
