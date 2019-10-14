import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 16px;
    font-family: 'Fira Code', monospace;
    font-variant-ligatures: normal;
  }

  /* fira-code-regular - latin */
  @font-face {
    font-family: 'Fira Code';
    font-style: normal;
    font-weight: 400;
    src: local(''),
         url('./assets/fonts/fira-code-v5-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
         url('./assets/fonts/fira-code-v5-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }

  /* fira-code-700 - latin */
  @font-face {
    font-family: 'Fira Code';
    font-style: normal;
    font-weight: 700;
    src: local(''),
         url('./assets/fonts/fira-code-v5-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
         url('./assets/fonts/fira-code-v5-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
`;

export default GlobalStyle;
