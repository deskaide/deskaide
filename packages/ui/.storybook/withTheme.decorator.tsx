import React from 'react';
import { ThemeProvider } from 'styled-components';
import { light } from '../src/styles';

export const withTheme = (Story) => (
  <ThemeProvider theme={light}>
    <Story />
  </ThemeProvider>
);
