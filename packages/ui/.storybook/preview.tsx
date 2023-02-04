import React from 'react';
import { withTheme } from './withTheme.decorator';

const withGlobalStyle = (Story) => (
  <>
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
