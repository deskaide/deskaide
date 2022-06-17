import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';

import type { FC, ReactElement } from 'react';
import type { RenderOptions } from '@testing-library/react';

import { light } from '../src/styles/themes';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={light}>
      <Router>{children}</Router>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
