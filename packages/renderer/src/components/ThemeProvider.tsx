import * as React from 'react';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { SEO } from './SEO';
import { baseTheme as theme } from '../styles/themes';
import type { RootState } from '../store';

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { appSettings } = useSelector((state: RootState) => state.settings);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkFromMQ = mql.matches;
    const persistedPreference = appSettings.theme;

    let initialColorMode = 'light';

    const hasUsedToggle = typeof persistedPreference === 'string';

    if (hasUsedToggle) {
      initialColorMode = persistedPreference as string;
    } else {
      initialColorMode = prefersDarkFromMQ ? 'dark' : 'light';
    }

    root.style.setProperty('--initial-color-mode', initialColorMode);

    Object.entries(theme.colors).forEach(([name, values]) => {
      if (Array.isArray(values)) {
        values.forEach((color, index) => {
          const cssVarName = `--color-${name}-${index}`;

          root.style.setProperty(cssVarName, color);
        });
      }
    });

    if (initialColorMode === 'dark') {
      theme.colors.dark.forEach((color, index) => {
        const cssVarName = `--color-bg-${index}`;

        root.style.setProperty(cssVarName, color);
      });
      theme.colors.light.forEach((color, index) => {
        const cssVarName = `--color-text-${index}`;

        root.style.setProperty(cssVarName, color);
      });
      theme.colors.primary.forEach((color, index) => {
        const cssVarName = `--color-accent-${
          theme.colors.primary.length - (index + 1)
        }`;

        root.style.setProperty(cssVarName, color);
      });
    } else {
      theme.colors.light.forEach((color, index) => {
        const cssVarName = `--color-bg-${index}`;

        root.style.setProperty(cssVarName, color);
      });
      theme.colors.dark.forEach((color, index) => {
        const cssVarName = `--color-text-${index}`;

        root.style.setProperty(cssVarName, color);
      });
      theme.colors.primary.forEach((color, index) => {
        const cssVarName = `--color-accent-${index}`;

        root.style.setProperty(cssVarName, color);
      });
    }
  }, []);

  return (
    <>
      <SEO title="Deskaide" />
      {children}
    </>
  );
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Provider>{children}</Provider>;
