import React from 'react';
/** @jsxImportSource theme-ui */
import { ThemeProvider } from 'theme-ui';
import { deskaide } from '../src/styles';

export const withTheme = (Story) => (
  <ThemeProvider theme={deskaide}>
    <Story />
  </ThemeProvider>
);
