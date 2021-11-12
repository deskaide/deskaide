import React, { useState, useLayoutEffect } from 'react';

import SEO from './SEO';
import { baseTheme as theme } from '../styles/themes';

export const ThemeContext = React.createContext<{
  colorMode: string | undefined;
  setColorMode: (newValue: string) => void;
} | null>(null);

const Provider: React.FC = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState<string | undefined>(undefined);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkFromMQ = mql.matches;
    const persistedPreference = localStorage.getItem('color-mode');

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

    rawSetColorMode(initialColorMode);
  }, []);

  const contextValue = React.useMemo(() => {
    function setColorMode(newValue: string) {
      const root = window.document.documentElement;

      localStorage.setItem('color-mode', newValue);

      if (newValue === 'dark') {
        theme.colors.light.forEach((color, index) => {
          const cssVarName = `--color-text-${index}`;

          root.style.setProperty(cssVarName, color);
        });
        theme.colors.dark.forEach((color, index) => {
          const cssVarName = `--color-bg-${index}`;

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

      rawSetColorMode(newValue);
    }

    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode, rawSetColorMode]);

  return (
    <ThemeContext.Provider
      value={{
        ...contextValue,
      }}
    >
      <SEO title="Deskaide" />
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeProvider: React.FC = ({ children }) => (
  <Provider>{children}</Provider>
);

export default ThemeProvider;
