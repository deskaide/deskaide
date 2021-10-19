// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// import SEO from './SEO';
// import { baseTheme as theme } from '../styles/themes';

// export const ThemeContext = React.createContext();

// const Provider = ({ children }) => {
//   const [colorMode, rawSetColorMode] = useState(undefined);

//   useEffect(() => {
//     const root = document.documentElement;
//     const mql = window.matchMedia('(prefers-color-scheme: dark)');
//     const prefersDarkFromMQ = mql.matches;
//     const persistedPreference = localStorage.getItem('color-mode');

//     let initialColorMode = 'light';

//     const hasUsedToggle = typeof persistedPreference === 'string';

//     if (hasUsedToggle) {
//       initialColorMode = persistedPreference;
//     } else {
//       initialColorMode = prefersDarkFromMQ ? 'dark' : 'light';
//     }

//     root.style.setProperty('--initial-color-mode', initialColorMode);

//     Object.entries(theme.colors).forEach(([name, values]) => {
//       values.forEach((color, index) => {
//         const cssVarName = `--color-${name}-${index}`;

//         root.style.setProperty(cssVarName, color);
//       });
//     });

//     if (initialColorMode === 'dark') {
//       theme.colors.dark.forEach((color, index) => {
//         const cssVarName = `--color-bg-${index}`;

//         root.style.setProperty(cssVarName, color);
//       });
//       theme.colors.light.forEach((color, index) => {
//         const cssVarName = `--color-text-${index}`;

//         root.style.setProperty(cssVarName, color);
//       });
//       theme.colors.primary.forEach((color, index) => {
//         const cssVarName = `--color-accent-${
//           theme.colors.primary.length - (index + 1)
//         }`;

//         root.style.setProperty(cssVarName, color);
//       });
//     } else {
//       theme.colors.light.forEach((color, index) => {
//         const cssVarName = `--color-bg-${index}`;

//         root.style.setProperty(cssVarName, color);
//       });
//       theme.colors.dark.forEach((color, index) => {
//         const cssVarName = `--color-text-${index}`;

//         root.style.setProperty(cssVarName, color);
//       });
//       theme.colors.primary.forEach((color, index) => {
//         const cssVarName = `--color-accent-${index}`;

//         root.style.setProperty(cssVarName, color);
//       });
//     }

//     rawSetColorMode(initialColorMode);
//   }, []);

//   const contextValue = React.useMemo(() => {
//     function setColorMode(newValue) {
//       const root = window.document.documentElement;

//       localStorage.setItem('color-mode', newValue);

//       if (newValue === 'dark') {
//         theme.colors.light.forEach((color, index) => {
//           const cssVarName = `--color-text-${index}`;

//           root.style.setProperty(cssVarName, color);
//         });
//         theme.colors.dark.forEach((color, index) => {
//           const cssVarName = `--color-bg-${index}`;

//           root.style.setProperty(cssVarName, color);
//         });
//         theme.colors.primary.forEach((color, index) => {
//           const cssVarName = `--color-accent-${
//             theme.colors.primary.length - (index + 1)
//           }`;

//           root.style.setProperty(cssVarName, color);
//         });
//       } else {
//         theme.colors.light.forEach((color, index) => {
//           const cssVarName = `--color-bg-${index}`;

//           root.style.setProperty(cssVarName, color);
//         });
//         theme.colors.dark.forEach((color, index) => {
//           const cssVarName = `--color-text-${index}`;

//           root.style.setProperty(cssVarName, color);
//         });
//         theme.colors.primary.forEach((color, index) => {
//           const cssVarName = `--color-accent-${index}`;

//           root.style.setProperty(cssVarName, color);
//         });
//       }

//       rawSetColorMode(newValue);
//     }

//     return {
//       colorMode,
//       setColorMode,
//     };
//   }, [colorMode, rawSetColorMode]);

//   return (
//     <ThemeContext.Provider
//       value={{
//         ...contextValue,
//       }}
//     >
//       <SEO />
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// const ThemeProvider = ({ children }) => <Provider>{children}</Provider>;

// Provider.propTypes = {
//   children: PropTypes.element.isRequired,
// };

// ThemeProvider.propTypes = {
//   children: PropTypes.element.isRequired,
// };

// export default ThemeProvider;
