import type {
  ThemeInterface,
  CustomNumberArrayType,
  CustomStringArrayType,
} from '../../types/ThemeInterface';

const space: CustomNumberArrayType = [
  0, 4, 8, 16, 32, 64,
] as CustomNumberArrayType;

const fontSizes: CustomStringArrayType = [
  '13px',
  '15px',
  '18px',
  '22px',
  '26px',
  '31px',
  '37px',
  '45px',
  '54px',
  '65px',
] as CustomStringArrayType;

const fonts = {
  body: "'Fira Sans', AnekBangla, sans-serif",
  heading: "'PT Sans', AnekBangla, sans-serif",
  code: "'Fira Code', monospace",
};

const breakpoints = ['240px', '480px', '768px', '1024px', '1224px'];

const mediaQueries = {
  xs: `@media only screen and (min-width : ${breakpoints[1]})`,
  sm: `@media only screen and (min-width : ${breakpoints[2]})`,
  md: `@media only screen and (min-width : ${breakpoints[3]})`,
  lg: `@media only screen and (min-width : ${breakpoints[4]})`,
};

const lineHeights: CustomNumberArrayType = [
  1, 1.3, 1.6, 2,
] as CustomNumberArrayType;

const fontWeights: CustomNumberArrayType = [
  400, 500, 700,
] as CustomNumberArrayType;

const colors = {
  primary: ['#532FA8', '#6237C6', '#9577D9'],
  dark: ['#191924', '#27283F', '#53556E'],
  light: ['#E7E7EE', '#F6F6F9', '#FFFFFF'],
  success: ['#04A660', '#07C270', '#3ADA8A'],
  error: ['#BD170D', '#F2564D', '#F47771'],
  warning: ['#C26C00', '#FF8E00', '#FDA642'],
};

const elevations = [
  '0px 0px 1px rgba(39, 40, 63, 0.08), 0px 0.4px 2px rgba(83, 85, 110, 0.16)',
  '0px 0px 1px rgba(39, 40, 63, 0.08), 0px 2px 4px rgba(25, 25, 36, 0.16)',
  '0px 2px 8px rgba(39, 40, 63, 0.08), 0px 16px 32px rgba(25, 25, 36, 0.16)',
];

space.sm = space[1];
space.md = space[2];
space.lg = space[3];
space.xl = space[4];
space.xxl = space[5];

fontSizes.label2 = fontSizes[0];
fontSizes.label1 = fontSizes[1];
fontSizes.body = fontSizes[2];
fontSizes.h6 = fontSizes[2];
fontSizes.h5 = fontSizes[3];
fontSizes.h4 = fontSizes[4];
fontSizes.h3 = fontSizes[5];
fontSizes.h2 = fontSizes[6];
fontSizes.h1 = fontSizes[7];
fontSizes.display1 = fontSizes[8];
fontSizes.display2 = fontSizes[9];

lineHeights.heading = lineHeights[1];
lineHeights.body = lineHeights[2];
lineHeights.list = lineHeights[3];

fontWeights.normal = fontWeights[0];
fontWeights.medium = fontWeights[1];
fontWeights.bold = fontWeights[2];

export const baseTheme: ThemeInterface = {
  name: 'baseTheme',
  space,
  fontSizes,
  fonts,
  breakpoints,
  mediaQueries,
  lineHeights,
  fontWeights,
  colors,
  elevations,
};
