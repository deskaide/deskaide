import { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';

import * as themes from './styles/themes';
import { ThemeContext } from './components/ThemeProvider';
import { GlobalStyle } from './styles';
import Routes from './routes';

const App: React.FC = () => {
  const context = useContext(ThemeContext);
  const selectedTheme = context?.colorMode as keyof typeof themes;

  return (
    <>
      {selectedTheme ? (
        <ThemeProvider theme={themes[selectedTheme]}>
          <GlobalStyle />
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
