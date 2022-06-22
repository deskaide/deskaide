import { exposeInMainWorld } from './exposeInMainWorld';

// Export for types in contracts.d.ts
export const versions = process.versions;
export const info = {
  name: 'Deskaide',
  versions: {
    app: '1.0.0',
    ...versions,
  },
};

exposeInMainWorld('info', info);
