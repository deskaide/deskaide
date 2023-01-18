export type CustomNumberArrayType = Array<number> & { [index: string]: number };
export type CustomStringArrayType = Array<string> & { [index: string]: string };

export interface ThemeInterface {
  name: string;
  colors: {
    bg0?: string;
    bg1?: string;
    bg2?: string;
    text0?: string;
    text1?: string;
    text2?: string;
    primary: string[];
    dark: string[];
    light: string[];
    success: string[];
    error: string[];
    warning: string[];
  };
  elevations: string[];
  space: CustomNumberArrayType;
  fontSizes: CustomStringArrayType;
  fonts: {
    body: string;
    heading: string;
    code: string;
  };
  breakpoints: string[];
  mediaQueries: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  lineHeights: CustomNumberArrayType;
  fontWeights: CustomNumberArrayType;
}
