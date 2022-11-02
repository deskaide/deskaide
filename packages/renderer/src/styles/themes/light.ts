import { baseTheme } from './baseTheme';

import type { ThemeInterface } from '../../types/ThemeInterface';

export const light: ThemeInterface = {
  ...baseTheme,
  name: 'light',
  colors: {
    ...baseTheme.colors,
    bg0: baseTheme.colors.light[0],
    bg1: baseTheme.colors.light[1],
    bg2: baseTheme.colors.light[2],
    text0: baseTheme.colors.dark[0],
    text1: baseTheme.colors.dark[1],
    text2: baseTheme.colors.dark[2],
  },
  elevations: [
    '0px 0px 1px rgba(39, 40, 63, 0.08), 0px 0.4px 2px rgba(83, 85, 110, 0.16)',
    '0px 0px 1px rgba(39, 40, 63, 0.08), 0px 2px 4px rgba(25, 25, 36, 0.16)',
    '0px 0px 1px rgba(39, 40, 63, 0.08), 0px 4px 8px rgba(25, 25, 36, 0.16)',
    '0px 2px 8px rgba(39, 40, 63, 0.08), 0px 16px 32px rgba(25, 25, 36, 0.16)',
  ],
};
