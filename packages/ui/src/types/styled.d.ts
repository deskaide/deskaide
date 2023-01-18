import 'styled-components';

import type { ThemeInterface } from './ThemeInterface';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeInterface {}
}
