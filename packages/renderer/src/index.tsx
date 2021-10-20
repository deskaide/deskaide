import './shim';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import App from './app';
import ThemeProvider from './components/ThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
