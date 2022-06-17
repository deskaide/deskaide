import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';

import * as themes from './styles/themes';
import { ThemeContext } from './components/ThemeProvider';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';

const App: React.FC = () => {
  const context = useContext(ThemeContext);
  const selectedTheme = context?.colorMode as keyof typeof themes;

  return (
    <>
      {selectedTheme ? (
        <ThemeProvider theme={themes[selectedTheme]}>
          <GlobalStyles />
          <Router>
            <Routes />
          </Router>
        </ThemeProvider>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default App;
