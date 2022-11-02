import { baseTheme } from './baseTheme';

import type { ThemeInterface } from '../../types/ThemeInterface';

export const dark: ThemeInterface = {
  ...baseTheme,
  name: 'dark',
  colors: {
    ...baseTheme.colors,
    bg0: baseTheme.colors.dark[0],
    bg1: baseTheme.colors.dark[1],
    bg2: baseTheme.colors.dark[2],
    text0: baseTheme.colors.light[0],
    text1: baseTheme.colors.light[1],
    text2: baseTheme.colors.light[2],
  },
  elevations: [
    '0px 0px 1px rgba(39, 40, 63, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.32)',
    '0px 0px 1px rgba(39, 40, 63, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.32)',
    '0px 2px 8px rgba(39, 40, 63, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.16)',
    '0px 2px 8px rgba(39, 40, 63, 0.08), 0px 16px 32px rgba(0, 0, 0, 0.16)',
  ],
};
