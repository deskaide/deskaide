import React from 'react';
import { GlobalStyle } from '../src/styles/GlobalStyles';
import { withTheme } from './withTheme.decorator';

const withGlobalStyle = (Story) => (
  <>
    <GlobalStyle />
    <Story />
  </>
);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [withGlobalStyle, withTheme];
