import './shim';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './app';
import ThemeProvider from './components/ThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
