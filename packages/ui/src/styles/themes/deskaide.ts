import type { Theme } from 'theme-ui';

export const deskaide: Theme = {
  fonts: {
    body: "'Fira Sans', AnekBangla, sans-serif",
    heading: "'PT Sans', AnekBangla, sans-serif",
    code: "'Fira Code', monospace",
  },
  colors: {
    text: '#27283F',
    primary: '#6237C6',
    background: '#F6F6F9',
    modes: {
      dark: {
        text: '#F6F6F9',
        primary: '#6237C6',
        background: '#27283F',
      },
    },
  },
  buttons: {
    primary: {
      color: 'text',
      bg: 'primary',
      cursor: 'pointer',
    },
    secondary: {
      color: 'text',
      bg: 'red',
      cursor: 'pointer',
    },
  },
};
